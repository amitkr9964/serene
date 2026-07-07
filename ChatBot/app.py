from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
import re
from dotenv import load_dotenv
import google.generativeai as genai

# Configure logging at the very top
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------- Setup Gemini (copied from gem3.py) ---------------------------------
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    logger.error("CRITICAL: GEMINI_API_KEY environment variable is not set!")
    raise ValueError("GEMINI_API_KEY not set")

genai.configure(api_key=api_key)

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
    "max_output_tokens": 1024,
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

# ---------------- Screening data (copied from gem3.py) -------------------------------
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

SUICIDE_KEYWORDS = [
    "suicide", "kill myself", "end my life", "self harm", "kill someone",
    "destroy myself", "kill my", "harm my", "harm myself", "want to die"
]

def is_crisis(message: str) -> bool:
    pattern = r'\b(' + '|'.join(re.escape(word) for word in SUICIDE_KEYWORDS) + r')\b'
    return bool(re.search(pattern, message.lower()))

def looks_distressed(text: str) -> bool:
    """Simple keyword detector for low mood / anxiety cues."""
    keywords = {"depress", "sad", "hopeless", "worthless",
                "anxious", "anxiety", "panic", "suicid", "tired of life"}
    t = text.lower()
    return any(k in t for k in keywords)

def chat(user_input, history):
    """Send message + history to Gemini and return response text."""
    logger.info(f"Chat function called with input: '{user_input}' and history length: {len(history)}")
    
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
        logger.error(f"Error in chat function: {e}")
        return "I'm having a technical moment! Could you try asking again? I'm here to support you! 🤖"

def run_test_api(test_name, responses):
    """Run PHQ-9 or GAD-7 test with provided responses and return results."""
    test = tests[test_name]
    
    if len(responses) != len(test["questions"]):
        return f"Error: Expected {len(test['questions'])} responses, got {len(responses)}"
    
    # Validate all responses are 0-3
    for i, score in enumerate(responses):
        if score not in [0, 1, 2, 3]:
            return f"Error: Response {i+1} must be 0, 1, 2, or 3. Got {score}"
    
    total = sum(responses)
    
    # Determine severity level
    severity = "Unknown"
    for cutoff, level in test["cutoffs"]:
        if total <= cutoff:
            severity = level
            break
    
    max_score = 27 if test_name == 'PHQ-9' else 21
    result = f"📊 Your {test_name} score: {total}/{max_score} ({severity})\n\n"
    
    if severity == "Minimal":
        result += "✅ Great! You seem to be doing well."
    elif severity in ["Mild", "Moderate"]:
        result += "⚠️ Consider speaking with a counselor or trusted friend."
    else:  # Severe
        result += "🚨 Please reach out to a mental health professional soon."
        
    result += "\n\n⚠ Note: This tool is for awareness. Please seek help if you're in crisis."
    
    return result

app = Flask(__name__)

# Configure CORS dynamically to support frontend URL changes
allowed_origins = [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://127.0.0.1:3000', 
    'http://127.0.0.1:3001',
    'https://serene-sih.vercel.app'  # Default friend's frontend domain
]

# Read additional origins from env var (comma-separated list)
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    for origin in env_origins.split(","):
        cleaned = origin.strip()
        if cleaned:
            allowed_origins.append(cleaned)

CORS(app, origins=allowed_origins, 
     methods=['GET', 'POST', 'OPTIONS'], 
     allow_headers=['Content-Type'])

# Store conversation sessions with state management
conversation_sessions = {}

@app.route('/chat', methods=['POST'])
def chat_api():
    try:
        logger.info(f"Received request from: {request.remote_addr}")
        
        data = request.json
        user_input = data.get('message', '').strip()
        session_id = data.get('session_id', 'default')
        
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400

        if len(user_input) > 2000:
            return jsonify({'error': 'Message exceeds maximum length of 2000 characters'}), 400
        
        # Simple memory leak mitigation: clear oldest sessions if count is too high
        if len(conversation_sessions) > 500:
            keys = list(conversation_sessions.keys())
            for k in keys[:100]:
                conversation_sessions.pop(k, None)
        
        # Initialize session if not exists
        if session_id not in conversation_sessions:
            conversation_sessions[session_id] = {
                'history': [],
                'offered_test': False,
                'state': 'normal',  # normal, awaiting_test_choice, in_test
                'current_test': None,  # PHQ-9 or GAD-7
                'test_responses': [],  # Store responses as we go
                'current_question': 0  # Track which question we're on
            }
        
        session = conversation_sessions[session_id]
        history = session['history']
        
        # Cap history length to prevent memory leaks and token bloat
        if len(history) > 20:
            session['history'] = history[-20:]
            history = session['history']

        
        logger.info(f"Session ID: {session_id}")
        logger.info(f"Current history length: {len(history)}")
        logger.info(f"User input: {user_input}")
        logger.info(f"Session state: {session['state']}")
        
        # Handle quit/exit commands (like gem3.py main function)
        if user_input.lower() in ['quit', 'exit', 'bye']:
            reply = "Take care! Remember, seeking help is a sign of strength. 💙"
            return jsonify({'reply': reply})
        
        # Handle test command (like gem3.py main function)
        if user_input.lower() == 'test':
            session['state'] = 'awaiting_test_choice'
            reply = ("Which test would you like to take?\n"
                    "1. PHQ-9 (Depression)\n"
                    "2. GAD-7 (Anxiety)\n"
                    "Enter 1 or 2:")
            return jsonify({'reply': reply})
        
        # Handle test selection (like gem3.py main function)
        if session['state'] == 'awaiting_test_choice':
            if user_input == "1":
                session['state'] = 'in_test'
                session['current_test'] = 'PHQ-9'
                session['test_responses'] = []
                session['current_question'] = 0
                
                test_info = ("📋 Patient Health Questionnaire – 9 (Depression)\n"
                           "Over the last 2 weeks, how often have you been bothered by the following?\n"
                           "0=Not at all | 1=Several days | 2=More than half the days | 3=Nearly every day\n\n"
                           f"Question 1 of 9:\n{tests['PHQ-9']['questions'][0]}\n\n"
                           "Please enter 0, 1, 2, or 3:")
                return jsonify({'reply': test_info})
            elif user_input == "2":
                session['state'] = 'in_test'
                session['current_test'] = 'GAD-7'
                session['test_responses'] = []
                session['current_question'] = 0
                
                test_info = ("📋 Generalized Anxiety Disorder – 7\n"
                           "Over the last 2 weeks, how often have you been bothered by the following?\n"
                           "0=Not at all | 1=Several days | 2=More than half the days | 3=Nearly every day\n\n"
                           f"Question 1 of 7:\n{tests['GAD-7']['questions'][0]}\n\n"
                           "Please enter 0, 1, 2, or 3:")
                return jsonify({'reply': test_info})
            else:
                session['state'] = 'normal'
                reply = "Invalid choice. Type 'test' to try again."
                return jsonify({'reply': reply})
        
        # Handle individual test responses (like gem3.py run_test function)
        if session['state'] == 'in_test':
            try:
                score = int(user_input.strip())
                if score not in [0, 1, 2, 3]:
                    return jsonify({'reply': "Please enter 0, 1, 2, or 3."})
                
                # Store the response
                session['test_responses'].append(score)
                session['current_question'] += 1
                
                current_test = session['current_test']
                total_questions = len(tests[current_test]['questions'])
                
                # Check if we've answered all questions
                if session['current_question'] >= total_questions:
                    # Calculate final score
                    total_score = sum(session['test_responses'])
                    test = tests[current_test]
                    
                    # Determine severity level
                    severity = "Unknown"
                    for cutoff, level in test["cutoffs"]:
                        if total_score <= cutoff:
                            severity = level
                            break
                    
                    max_score = 27 if current_test == 'PHQ-9' else 21
                    result = f"📊 Your {current_test} score: {total_score}/{max_score} ({severity})\n\n"
                    
                    if severity == "Minimal":
                        result += "✅ Great! You seem to be doing well."
                    elif severity in ["Mild", "Moderate"]:
                        result += "⚠️ Consider speaking with a counselor or trusted friend."
                    else:  # Severe
                        result += "🚨 Please reach out to a mental health professional soon."
                        
                    result += "\n\n⚠ Note: This tool is for awareness. Please seek help if you're in crisis."
                    
                    # Reset session state
                    session['state'] = 'normal'
                    session['current_test'] = None
                    session['test_responses'] = []
                    session['current_question'] = 0
                    
                    # Add to history
                    session['history'].append((f"{current_test} Test", result))
                    
                    return jsonify({'reply': result})
                else:
                    # Ask next question
                    next_question = tests[current_test]['questions'][session['current_question']]
                    reply = (f"Question {session['current_question'] + 1} of {total_questions}:\n"
                           f"{next_question}\n\n"
                           "Please enter 0, 1, 2, or 3:")
                    return jsonify({'reply': reply})
                    
            except ValueError:
                return jsonify({'reply': "Please enter a valid number (0, 1, 2, or 3)."})
        
        # Legacy: Check if input looks like test responses (keep for backward compatibility)
        parts = user_input.split()
        if len(parts) == 9 and all(p.isdigit() and int(p) in [0,1,2,3] for p in parts):
            # PHQ-9 responses
            responses = [int(p) for p in parts]
            result = run_test_api("PHQ-9", responses)
            session['history'].append((user_input, result))
            return jsonify({'reply': result})
        elif len(parts) == 7 and all(p.isdigit() and int(p) in [0,1,2,3] for p in parts):
            # GAD-7 responses
            responses = [int(p) for p in parts]
            result = run_test_api("GAD-7", responses)
            session['history'].append((user_input, result))
            return jsonify({'reply': result})
        
        # Handle response after test offer
        if session['offered_test']:
            session['offered_test'] = False  # Reset so it doesn't stay stuck
            if user_input.lower() in ['yes', 'y', 'yeah', 'yep', 'ok', 'okay', 'sure']:
                session['state'] = 'awaiting_test_choice'
                reply = ("Great 🙂 Which one would you like?\n"
                        "1. PHQ-9 (Depression)\n" 
                        "2. GAD-7 (Anxiety)\n"
                        "Enter 1 or 2:")
                session['history'].append((user_input, reply))
                return jsonify({'reply': reply})
        
        # Handle distress detection and test offering (like gem3.py main function)
        if looks_distressed(user_input) and not session['offered_test']:
            session['offered_test'] = True
            reply = ("💙 I'm sorry you're feeling low. Would you like to take a quick questionnaire "
                    "(PHQ-9 for mood / GAD-7 for anxiety) to check how you're doing? \n\n"
                    "Type 'yes' to take a test, or continue the conversation normally.")
            session['history'].append((user_input, reply))
            return jsonify({'reply': reply})
            
        # Get bot response using the same chat function as gem3.py
        reply = chat(user_input, history)
        
        # Update conversation history
        session['history'].append((user_input, reply))
        
        logger.info(f"Bot reply length: {len(reply)}")
        logger.info(f"Updated history length: {len(session['history'])}")
        logger.info(f"Reply preview: {reply[:100]}...")
        
        response = jsonify({'reply': reply})
        return response
        
    except Exception as e:
        logger.error(f"Error in chat_api: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'Chat server is running'})

if __name__ == '__main__':
    logger.info("🧠 Mental Health Support Chatbot Server")
    logger.info("Starting Flask chat server")
    logger.info("Type 'test' for mental health screening, 'quit' to exit.")
    
    # Get port from environment variable (for production deployment)
    port = int(os.environ.get("PORT", 5000))
    # Set debug to False for production
    debug_mode = os.environ.get("FLASK_ENV") == "development"
    
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
