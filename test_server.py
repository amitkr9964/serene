from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

session_histories = {}

@app.route('/chat', methods=['POST'])
def chat_api():
    try:
        data = request.json
        user_input = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        # Simple echo response for testing
        reply = f"Echo: {user_input}"
        
        if session_id not in session_histories:
            session_histories[session_id] = []
            
        history = session_histories[session_id]
        history.append((user_input, reply))
        
        return jsonify({'reply': reply})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    print("Test Flask server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)