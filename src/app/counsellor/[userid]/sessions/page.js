"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

export default function VideoSessions() {
  const { theme } = useTheme();
  const params = useParams();
  const [isInSession, setIsInSession] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionTimer, setSessionTimer] = useState(0);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const availableSessions = [
    {
      id: 1,
      studentId: "Student #1847",
      scheduledTime: "5:30 PM",
      status: "waiting",
      duration: "30 min",
      joinable: true,
    },
    {
      id: 2,
      studentId: "Student #2156",
      scheduledTime: "7:00 PM", 
      status: "scheduled",
      duration: "30 min",
      joinable: false,
    },
  ];

  useEffect(() => {
    let interval;
    if (isInSession) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = (student) => {
    setCurrentStudent(student);
    setIsInSession(true);
    setSessionTimer(0);
    setChatMessages([
      {
        id: 1,
        sender: 'system',
        message: `Session started with ${student.studentId}`,
        time: new Date().toLocaleTimeString(),
      }
    ]);
  };

  const endSession = () => {
    setIsInSession(false);
    setCurrentStudent(null);
    setSessionTimer(0);
    setChatMessages([]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: Date.now(),
        sender: 'counsellor',
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      }]);
      setNewMessage('');
    }
  };

  const reportTechnicalIssue = () => {
    alert('Technical support has been notified. A technician will assist you shortly.');
  };

  if (isInSession) {
    return (
      <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
        {/* Session Header */}
        <div
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "var(--color-success)",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }}
            />
            <div>
              <h2 style={{ margin: 0, color: "var(--color-text-primary)" }}>
                Session with {currentStudent?.studentId}
              </h2>
              <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                Duration: {formatTime(sessionTimer)} / 30:00
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={reportTechnicalIssue}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-warning)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              🔧 Technical Issue
            </button>
            <button
              onClick={endSession}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-error)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              📞 End Session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
          {/* Video Area */}
          <div className="lg:col-span-3 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Student Video (Remote) */}
              <div
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  position: "relative",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                  }}
                >
                  {currentStudent?.studentId}
                </div>
                {/* Placeholder for student video */}
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "var(--color-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                  }}
                >
                  👤
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Student Camera: ON
                </div>
              </div>

              {/* Counsellor Video (Self) */}
              <div
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  position: "relative",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                  }}
                >
                  You (Counsellor)
                </div>
                {/* Placeholder for counsellor video */}
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "var(--color-accent)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                  }}
                >
                  👨‍⚕️
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Your Camera: {videoEnabled ? 'ON' : 'OFF'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div
              style={{
                padding: "1rem",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                style={{
                  padding: "0.75rem",
                  backgroundColor: videoEnabled ? "var(--color-success)" : "var(--color-error)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  width: "50px",
                  height: "50px",
                }}
              >
                {videoEnabled ? '📹' : '📹'}
              </button>
              
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                style={{
                  padding: "0.75rem",
                  backgroundColor: audioEnabled ? "var(--color-success)" : "var(--color-error)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  width: "50px",
                  height: "50px",
                }}
              >
                {audioEnabled ? '🎤' : '🔇'}
              </button>

              <button
                style={{
                  padding: "0.75rem",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  width: "50px",
                  height: "50px",
                }}
              >
                🖥️
              </button>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div
            className="lg:col-span-1"
            style={{
              backgroundColor: "var(--color-surface)",
              borderLeft: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--color-text-primary)" }}>
                💬 Session Chat
              </h3>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "1rem",
                overflowY: "auto",
              }}
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: "1rem",
                    padding: "0.5rem",
                    backgroundColor: message.sender === 'counsellor' 
                      ? "var(--color-primary)" 
                      : message.sender === 'system'
                      ? "var(--color-accent)"
                      : "var(--color-background)",
                    color: message.sender === 'counsellor' || message.sender === 'system' 
                      ? "white" 
                      : "var(--color-text-primary)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                  }}
                >
                  <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
                    {message.sender === 'counsellor' ? 'You' : 
                     message.sender === 'system' ? 'System' : currentStudent?.studentId}
                  </div>
                  <div>{message.message}</div>
                  <div style={{ fontSize: "0.7rem", opacity: 0.8, marginTop: "0.25rem" }}>
                    {message.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div
              style={{
                padding: "1rem",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-text-primary)",
                    fontSize: "0.9rem",
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                  }}
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          🎥 Video Sessions
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1.1rem",
          }}
        >
          Join scheduled sessions or start emergency consultations
        </p>
      </div>

      {/* Available Sessions */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "var(--color-text-primary)",
            marginBottom: "1.5rem",
          }}
        >
          Ready to Join
        </h2>

        {availableSessions.length > 0 ? (
          <div className="space-y-3">
            {availableSessions.map((session) => (
              <div
                key={session.id}
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {session.studentId}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Scheduled: {session.scheduledTime} • Duration: {session.duration}
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: session.status === 'waiting' 
                        ? "var(--color-success)" 
                        : "var(--color-warning)",
                      color: "white",
                    }}
                  >
                    {session.status === 'waiting' ? 'Student Waiting' : 'Scheduled'}
                  </span>
                  
                  {session.joinable ? (
                    <button
                      onClick={() => startSession(session)}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        animation: "pulse 2s infinite",
                      }}
                    >
                      🎥 Join Now
                    </button>
                  ) : (
                    <button
                      disabled
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "var(--color-border)",
                        color: "var(--color-text-secondary)",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        cursor: "not-allowed",
                        fontSize: "0.9rem",
                      }}
                    >
                      Not Ready
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎥</div>
            <h3 style={{ marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>
              No sessions ready to join
            </h3>
            <p>Scheduled sessions will appear here when students are waiting.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          padding: "1.5rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "var(--color-text-primary)",
            marginBottom: "1rem",
          }}
        >
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            style={{
              padding: "1rem",
              backgroundColor: "var(--color-error)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "0.9rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚨</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
              Emergency Session
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
              Start immediate consultation
            </div>
          </button>
          
          <button
            style={{
              padding: "1rem",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "0.9rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔧</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
              Test Equipment
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
              Check camera & microphone
            </div>
          </button>
          
          <button
            onClick={reportTechnicalIssue}
            style={{
              padding: "1rem",
              backgroundColor: "var(--color-warning)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "0.9rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📞</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
              Technical Support
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
              Get help with video issues
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
