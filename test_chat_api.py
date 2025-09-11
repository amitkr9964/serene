import requests
import json

def test_chat_api():
    url = "http://localhost:5000/chat"
    
    # Test health endpoint first
    try:
        health_response = requests.get("http://localhost:5000/health")
        print(f"Health check: {health_response.status_code} - {health_response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
        return
    
    # Test chat endpoint
    test_messages = [
        "Hello",
        "How are you?",
        "I'm feeling anxious about my exams"
    ]
    
    for message in test_messages:
        try:
            response = requests.post(
                url, 
                headers={'Content-Type': 'application/json'},
                data=json.dumps({'message': message})
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ User: {message}")
                print(f"🤖 Bot: {data['reply']}\n")
            else:
                print(f"❌ Error {response.status_code}: {response.text}\n")
                
        except Exception as e:
            print(f"❌ Request failed: {e}\n")

if __name__ == "__main__":
    print("Testing Flask Chat API...")
    test_chat_api()