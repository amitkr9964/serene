from flask import Flask, request, jsonify
from flask_cors import CORS
from gem3 import chat

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

history = []

@app.route('/chat', methods=['POST'])
def chat_api():
    try:
        data = request.json
        user_input = data.get('message', '')
        
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400
        
        global history
        reply = chat(user_input, history)
        history.append((user_input, reply))
        
        print(f"User: {user_input}")
        print(f"Bot: {reply}")
        
        return jsonify({'reply': reply})
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'Chat server is running'})

if __name__ == '__main__':
    print("Starting Flask chat server on http://localhost:5000")
    print("Make sure you have 'gem3' module installed and working")
    app.run(host='0.0.0.0', port=5000, debug=True)