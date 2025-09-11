'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedIcon from '../../components/AnimatedIcon';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Serene, your AI mental health companion. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const responses = [
      "I understand you're going through something difficult. Would you like to talk about what's been weighing on your mind?",
      "Thank you for sharing that with me. It takes courage to open up. How has this been affecting your daily life?",
      "That sounds really challenging. Remember, it's okay to feel this way. Have you tried any coping strategies that have helped before?",
      "I hear you, and your feelings are completely valid. Would you like me to suggest some breathing exercises or grounding techniques?",
      "It's important that you're reaching out. You're not alone in this. Would you like to explore some resources that might help?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      <Navbar />
      <div 
        className="flex overflow-hidden"
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text-primary)",
          height: "calc(100vh - 64px)" // Subtract navbar height
        }}
      >
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 w-64 h-full transition-transform duration-300 ease-in-out`}>
        <div 
          className="h-full flex flex-col"
          style={{
            backgroundColor: "var(--color-surface)",
            borderRight: "1px solid var(--color-border)"
          }}
        >
          {/* Logo */}
          <div className="flex items-center p-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div className="flex items-center">
              {/* <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "0.75rem",
                }}
              >
                <span className="text-white text-lg font-bold">💬</span>
              </div> */}
              <span className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                AI Chat
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link 
              href="/#home" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-primary)" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--color-text-primary)";
              }}
            >
              <span className="mr-3">🏠</span>
              Home
            </Link>
            <Link 
              href="/#features" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-primary)" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--color-text-primary)";
              }}
            >
              <span className="mr-3">⚡</span>
              Features
            </Link>
            <Link 
              href="/#about" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-primary)" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--color-text-primary)";
              }}
            >
              <span className="mr-3">ℹ️</span>
              About
            </Link>
            <Link 
              href="/#contact" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-primary)" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--color-text-primary)";
              }}
            >
              <span className="mr-3">📞</span>
              Contact
            </Link>
            <div className="pt-4 mt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
              <div 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-emerald-100 dark:bg-emerald-900"
                style={{ color: "var(--color-primary)" }}
              >
                <span className="mr-3">💬</span>
                Chat Assistant
              </div>
            </div>
          </nav>

          {/* Theme Toggle */}
          <div className="p-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--color-text-secondary)";
              }}
            >
              <AnimatedIcon 
                type={isDarkMode ? "sun" : "moon"} 
                size={16} 
                className="mr-3"
                animate={true}
              />
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 md:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header 
          className="flex items-center justify-between px-4 py-3 md:px-6"
          style={{ 
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)"
          }}
        >
          <div className="flex items-center">
            <button
              className="md:hidden mr-3 p-2 rounded-md transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "inherit";
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <span className="text-white font-bold">🤖</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  Serene AI Assistant
                </h1>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Your mental health companion
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "var(--color-success)"
              }}
            >
              🟢 Online
            </span>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: message.type === 'user' ? "var(--color-secondary)" : "var(--color-primary)"
                    }}
                  >
                    <span className="text-white text-sm font-bold">
                      {message.type === 'user' ? '👤' : '🤖'}
                    </span>
                  </div>
                </div>

                {/* Message Content */}
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                  style={{
                    backgroundColor: message.type === 'user' 
                      ? "var(--color-secondary)" 
                      : "var(--color-surface-alt)",
                    color: message.type === 'user' 
                      ? "white" 
                      : "var(--color-text-primary)",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <p className="text-sm">{message.content}</p>
                  <p 
                    className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'opacity-60'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex mr-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <span className="text-white text-sm font-bold">🤖</span>
                </div>
              </div>
              <div
                className="px-4 py-2 rounded-lg rounded-bl-none"
                style={{
                  backgroundColor: "var(--color-surface-alt)",
                  color: "var(--color-text-primary)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div 
          className="p-4 md:p-6"
          style={{ 
            backgroundColor: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)"
          }}
        >
          <div className="flex items-center gap-3 w-full">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about mental health, stress, anxiety, or type / for shortcuts..."
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
              style={{
                border: "none",
                background: "transparent",
                fontSize: "1rem",
                color: "var(--color-text-primary)",
                outline: "none",
              }}
              maxLength={500}
            />
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                color: "var(--color-text-muted)",
              }}
              tabIndex={-1}
            >
              <span style={{ fontSize: "1.1rem" }}>📎</span>
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                color: "var(--color-text-muted)",
              }}
              tabIndex={-1}
            >
              <span style={{ fontSize: "1.1rem" }}>🎤</span>
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              style={{
                backgroundColor: "var(--color-primary)",
                border: "none",
                borderRadius: "var(--radius-md)",
                padding: "0.75rem",
                cursor: inputMessage.trim() ? "pointer" : "not-allowed",
                color: "white",
                opacity: inputMessage.trim() ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: "1rem" }}>➤</span>
            </button>
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: "var(--color-text-muted)" }}>
            Serene AI is here to listen and support you. In case of emergency, please contact professional help.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
