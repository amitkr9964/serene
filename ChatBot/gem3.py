import os
from dotenv import load_dotenv
import google.generativeai as genai

# ---------------- Setup Gemini ---------------------------------
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Configure safety settings to be less restrictive for mental health support
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_ONLY_HIGH"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_ONLY_HIGH"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_ONLY_HIGH"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_ONLY_HIGH"
    }
]

model = genai.GenerativeModel("gemini-2.5-flash", safety_settings=safety_settings)

generation_config = {
    "temperature": 0.8,
    "top_p": 0.9,
    "top_k": 50,
    "max_output_tokens": 1024,  # Increased from 512
}

SYSTEM_PROMPT = """
You are a supportive psychological assistant for higher education students.
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
            "Feeling nervous, anxious or on edge",
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

SUICIDE_KEYWORDS = ["suicide", "kill myself", "end my life", "self harm", "kill someone", "kill", "harm", "destroy myself"]

def is_crisis(message: str) -> bool:
    return any(word in message.lower() for word in SUICIDE_KEYWORDS)

# ---------------- Helper functions -----------------------------

def chat(user_input, history):
    """Send message + history to Gemini and return response text."""
    print(f"Chat function called with input: '{user_input}' and history length: {len(history)}")
    
    if is_crisis(user_input):
        return (
            "⚠️ I hear that you're feeling really overwhelmed and thinking about suicide. "
            "You're not alone, and your life is valuable. 🙏\n\n"
            "Please talk to someone you trust right now. "
            "In India, you can call **KIRAN Helpline at 1800-599-0019** (24/7, toll free). "
            "If outside India, please reach out to your local crisis hotline immediately."
            "If you want , I can arrange meeting with your college counsellor "
        )
    
    context = SYSTEM_PROMPT
    for u, b in history:
        context += f"\nStudent: {u}\nAssistant: {b}"
    context += f"\nStudent: {user_input}\nAssistant:"

    try:
        response = model.generate_content(context, generation_config=generation_config)
        
        # Check if response has content
        if response.candidates and response.candidates[0].content.parts:
            bot_reply = response.text.strip()
            
            # Add distress detection
            if looks_distressed(user_input):
                bot_reply += "\n\n💙 I notice you might be going through a tough time. Would you like to take a quick mental health screening? You can ask me about PHQ-9 for depression or GAD-7 for anxiety."
            
            return bot_reply
            
        else:
            return "I'm here to support you with your mental health concerns. How can I help you today?"
                
    except Exception as e:
        print(f"Error in chat function: {e}")
        return "I'm having a technical moment! Could you try asking again? I'm here to support you! 🤖"

def looks_distressed(text: str) -> bool:
    """Simple keyword detector for low mood / anxiety cues."""
    keywords = {"depress", "sad", "hopeless", "worthless",
                "anxious", "anxiety", "panic", "suicid", "tired of life"}
    t = text.lower()
    return any(k in t for k in keywords)

def run_test(name):
    """Ask all questions of PHQ-9 or GAD-7, score, and give next-step advice."""
    test = tests[name]
    print(f"\n📋 {test['title']}")
    print("Over the last 2 weeks, how often have you been bothered by the following?")
    print("0=Not at all | 1=Several days | 2=More than half the days | 3=Nearly every day\n")

    total = 0
    for i, q in enumerate(test["questions"], 1):
        while True:
            try:
                score = int(input(f"{i}. {q}: "))
                if score in (0, 1, 2, 3):
                    total += score
                    break
            except ValueError:
                pass
            print("Please enter 0, 1, 2, or 3.")

    # Determine severity level
    severity = "Unknown"
    for cutoff, level in test["cutoffs"]:
        if total <= cutoff:
            severity = level
            break

    print(f"\n📊 Your score: {total}/27 ({severity})")

    if severity == "Minimal":
        print("✅ Great! You seem to be doing well.")
    elif severity in ["Mild", "Moderate"]:
        print("⚠️ Consider speaking with a counselor or trusted friend.")
    else:  # Severe
        print("🚨 Please reach out to a mental health professional soon.")
        
    return total, severity

def main():
    print("🧠 Mental Health Support Chatbot")
    print("Type 'test' for mental health screening, 'quit' to exit.\n")
    
    history = []
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print("Bot: Take care! Remember, seeking help is a sign of strength. 💙")
            break
            
        if user_input.lower() == 'test':
            print("Which test would you like to take?")
            print("1. PHQ-9 (Depression)")
            print("2. GAD-7 (Anxiety)")
            choice = input("Enter 1 or 2: ").strip()
            
            if choice == "1":
                run_test("PHQ-9")
            elif choice == "2":
                run_test("GAD-7")
            else:
                print("Invalid choice. Type 'test' to try again.")
            continue
            
        if not user_input:
            continue
            
        reply = chat(user_input, history)
        history.append((user_input, reply))
        
        print(f"Bot: {reply}")
        
        # Note: distress detection is now handled inside the chat() function

if __name__ == "__main__":
    main()