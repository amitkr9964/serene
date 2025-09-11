import os
from dotenv import load_dotenv
import google.generativeai as genai
from rich.prompt import Prompt
from rich.console import Console

# ---------------- Setup Gemini ---------------------------------
load_dotenv()
console = Console()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

generation_config = {
    "temperature": 0.8,
    "top_p": 0.9,
    "top_k": 50,
    "max_output_tokens": 512,
}

SYSTEM_PROMPT = """
ou are a supportive psychological assistant for higher education students.
Your role:
- Answer in simple language to make it easy to understand for the students.
- Monitor emotional wellbeing through empathetic conversation.
- Detect stress, anxiety, depression cues.
- Suggest healthy coping strategies (exercise, meditation, time management).
- Motivate students with positivity and encouragement.
- If the student wants to take PHQ-9 or GAD-7 screening, launch it.
- If they talk about harming themselves, advise them to get immediate help.
- Act like a friend not a doctor so that students feel free to talk.
- Also give advice related to relationships.
Always reply conversationally, never like a robot.
"""

# ---------------- Screening data -------------------------------
tests = {
    "PHQ-9": {
        "title": "Patient Health Questionnaire – 9 (Depression)",
        "questions": [
            "Little interest or pleasure in doing things",
            "Feeling down, depressed, or hopeless",
            "Trouble falling or staying asleep, or sleeping too much",
            "Feeling tired or having little energy",
            "Poor appetite or overeating",
            "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
            "Trouble concentrating on things, such as reading or watching TV",
            "Moving/speaking so slowly that others notice, or being fidgety/restless",
            "Thoughts that you would be better off dead, or of hurting yourself",
        ],
        "cutoffs": [(4, "Minimal"), (9, "Mild"), (14, "Moderate"),
                    (19, "Moderately severe"), (27, "Severe")]
    },
    "GAD-7": {
        "title": "Generalized Anxiety Disorder – 7",
        "questions": [
            "Feeling nervous, anxious, or on edge",
            "Not being able to stop or control worrying",
            "Worrying too much about different things",
            "Trouble relaxing",
            "Being so restless that it is hard to sit still",
            "Becoming easily annoyed or irritable",
            "Feeling afraid as if something awful might happen",
        ],
        "cutoffs": [(4, "Minimal"), (9, "Mild"), (14, "Moderate"), (21, "Severe")]
    }
}
SUICIDE_KEYWORDS = ["suicide", "kill myself", "end my life", "self harm" , "kill someone" , "kill" , "harm" , "destroy myself"]

def is_crisis(message: str) -> bool:
    return any(word in message.lower() for word in SUICIDE_KEYWORDS)

# ---------------- Helper functions -----------------------------

def chat(user_input, history):
    # 🚨 Crisis override (never let Gemini handle this directly)
    if is_crisis(user_input):
        return (
            "⚠️ I hear that you’re feeling really overwhelmed and thinking about suicide. "
            "You’re not alone, and your life is valuable. 🙏\n\n"
            "Please talk to someone you trust right now. "
            "If you are in India, you can call the **KIRAN Mental Health Helpline at 1800-599-0019** "
            "(available 24/7, toll free). \n\n"
            "If you’d like, I can also help you connect with your college counsellor."
        )

    # 🧠 Normal Gemini flow
    context = SYSTEM_PROMPT
    for u, b in history:
        context += f"\nStudent: {u}\nAssistant: {b}"
    context += f"\nStudent: {user_input}\nAssistant:"

    try:
        response = model.generate_content(context, generation_config=generation_config)
        if response.candidates and response.candidates[0].content.parts:
            return response.text.strip()
    except Exception as e:
        return f"⚠ Error contacting model: {e}"

    return "⚠ Sorry, I couldn’t generate a safe response."


def looks_distressed(text: str) -> bool:
    """Simple keyword detector for low mood / anxiety cues."""
    keywords = {"depress", "sad", "hopeless", "worthless",
                "anxious", "anxiety", "panic", "suicid", "tired of life" , "fed up"}
    t = text.lower()
    return any(k in t for k in keywords)

def run_test(name):
    test = tests[name]
    console.print(f"\n📋 [bold yellow]{test['title']}[/bold yellow]")
    console.print("Over the last 2 weeks, how often have you been bothered by the following?")
    console.print("[dim]0=Not at all | 1=Several days | 2=More than half the days | 3=Nearly every day[/dim]\n")

    total = 0
    for i, q in enumerate(test["questions"], 1):
        while True:
            try:
                score = int(Prompt.ask(f"{i}. {q}", choices=["0", "1", "2", "3"]))
                total += score
                break
            except ValueError:
                console.print("[red]Please enter 0, 1, 2, or 3.[/red]")

    severity = next(label for cut, label in test["cutoffs"] if total <= cut)
    console.print(f"\n✅ [green]Your {name} score is {total} → {severity}[/green]")

    # ----- PHQ-9 Recommendations -----
    if name == "PHQ-9":
        if total >= 20:
            console.print("[bold red]That’s quite high. Please consider professional support.[/bold red]")
            console.print("📞 If you are in India, you can call the [bold yellow]KIRAN Mental Health Helpline[/bold yellow] at [bold green]1800-599-0019[/bold green] (available 24/7, toll free).")
            want_help = Prompt.ask("Would you like help booking an appointment with your college counsellor?", choices=["yes", "no"])


        elif 15 <= total <= 19:
            console.print("[yellow]Moderately severe symptoms detected.[/yellow]")
            choice = Prompt.ask("Would you prefer:\n1) Book an appointment\n2) Self-help videos", choices=["1", "2"])
            if choice == "1":
                print("Bot: Connecting you to a counselor...")
            else:
                print("Bot: Try these mood-lifting resources:\n"
                      "- https://www.youtube.com/watch?v=ZToicYcHIOU (guided meditation)\n"
                      "- https://www.youtube.com/watch?v=inpok4MKVLM (mindfulness)")

        elif 10 <= total <= 14:
            console.print("[blue]Mild depression symptoms detected.[/blue]")
            print("Suggestions:\n"
                  "- Journaling daily thoughts\n"
                  "- Talking to a trusted friend\n"
                  "- Music for mood support: https://www.youtube.com/watch?v=2ZKNqkDqL7w")

        else:
            console.print("[green]Minimal signs of depression 🙂[/green]")
            print("Keep up self-care:\n"
                  "- Regular physical activity\n"
                  "- Proper sleep\n"
                  "- Spend time in sunlight")

    # ----- GAD-7 Recommendations -----
    elif name == "GAD-7":
        if total >= 20:
            console.print("[bold red]Severe anxiety symptoms detected.[/bold red]")
            console.print("📞 If you are in India, please call the [bold yellow]KIRAN Mental Health Helpline[/bold yellow] at [bold green]1800-599-0019[/bold green] (24/7, toll free) for immediate support.")
            want_help = Prompt.ask("Would you like help booking an appointment with your college counsellor?", choices=["yes", "no"])


        elif 15 <= total <= 19:
            console.print("[yellow]Moderately severe anxiety.[/yellow]")
            choice = Prompt.ask("Choose an option:\n1) Book appointment\n2) Try calming resources", choices=["1", "2"])
            if choice == "1":
                print("Bot: Starting appointment request...")
            else:
                print("Try these calming videos:\n"
                      "- https://www.youtube.com/watch?v=aNXKjGFUlMs (Progressive Muscle Relaxation)\n"
                      "- https://www.youtube.com/watch?v=O-6f5wQXSu8 (Box Breathing for Anxiety)")

        elif 10 <= total <= 14:
            console.print("[blue]Moderate anxiety detected.[/blue]")
            print("Try:\n"
                  "- 5-4-3-2-1 grounding exercise\n"
                  "- Worry journal\n"
                  "- Calm app or Insight Timer (free anxiety meditations)")

        else:
            console.print("[green]Minimal anxiety 🙂[/green]")
            print("Keep it up:\n"
                  "- Daily light exercise\n"
                  "- Mindful breathing (2–3 mins)\n"
                  "- Avoid caffeine before bed")

    console.print("\n⚠ [bold red]Note:[/bold red] This tool is for awareness. Please seek help if you're in crisis.\n")


# ---------------- Main loop ------------------------------------

if __name__ == "__main__":

    history = []
    offered = False       # whether we already asked about a test

    print("🎓 Student Mental Health Assistant Ready. Type 'quit' to exit.\n")

    while True:
        user = input("You: ").strip()
        if user.lower() in {"quit", "exit"}:
            print("Bot: Take care! Stay strong 💪")
            break

        # 1️⃣ Check if user shows distress and we haven't offered yet
        if looks_distressed(user) and not offered:
            print("Bot: I’m sorry you’re feeling low. Would you like to take a quick questionnaire "
                  "(PHQ-9 for mood / GAD-7 for anxiety) to check how you’re doing? (yes/no)")
            offered = True
            continue

        # 2️⃣ Handle their answer after we offered
        if offered:
            if user.lower().startswith("y"):
                choice = input("Bot: Great 🙂 Which one would you like? (phq / gad / both) ").strip().lower()
                if "both" in choice:
                    console.print("\n📝 Let's start with PHQ-9 (Depression Screening):")
                    run_test("PHQ-9")
                    console.print("\n📝 Now let’s continue with GAD-7 (Anxiety Screening):")
                    run_test("GAD-7")
                elif "gad" in choice:
                    run_test("GAD-7")
                else:
                    run_test("PHQ-9")
                offered = False
                continue



        # 3️⃣ Normal chat via Gemini
        reply = chat(user, history)
        print("Bot:", reply, "\n")
        history.append((user, reply))