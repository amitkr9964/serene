from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
from dotenv import load_dotenv

# Ensure we can load gem3 from the ChatBot directory
sys.path.append(os.path.join(os.path.dirname(__file__), 'ChatBot'))
load_dotenv(os.path.join(os.path.dirname(__file__), 'ChatBot', '.env'))

from gem3 import chat

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store session histories to avoid mixing conversations
session_histories = {}

@app.route('/chat', methods=['POST'])
def chat_api():
    try:
        data = request.json
        user_input = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get or create history for this session
        if session_id not in session_histories:
            session_histories[session_id] = []
            
        history = session_histories[session_id]
        
        reply = chat(user_input, history)
        history.append((user_input, reply))
        
        # Keep history clean
        if len(history) > 20:
            session_histories[session_id] = history[-20:]
        
        print(f"Session {session_id} - User: {user_input}")
        print(f"Session {session_id} - Bot: {reply}")
        
        return jsonify({'reply': reply})
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'Chat server is running'})

if __name__ == '__main__':
    print("Starting Flask chat server on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)