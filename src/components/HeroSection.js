"use client"
import { useState, useEffect } from "react";
import AnimatedIcon from "./AnimatedIcon";

// Single languages array at module root (not inside function)
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "অসমীয়া", flag: "🇮🇳" },
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const handleEmergencyClick = () => {
    setIsEmergencyActive(true);
    setConnectionStatus("connecting");
    setTimeout(() => {
      setConnectionStatus("connected");
    }, 3000);
  };

  const handleCloseEmergency = () => {
    setIsEmergencyActive(false);
    setConnectionStatus("connecting");
  };

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isEmergencyActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEmergencyActive]);
  
  return (
    <section
      id="home"
      style={{
        background: "var(--color-background)",
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 25% 25%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 75% 75%, var(--color-secondary) 0%, transparent 50%)",
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      <div
        className="max-w-7xl mx-auto flex flex-col gap-8"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Headline & Supporting Text */}
        <header className="w-full text-center mb-2 pt-2">
          <h1
            className="font-semibold"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.7rem)",
              color: "var(--color-text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Welcome to Serene 
          </h1>
          <p
            className="mx-auto"
            style={{
              fontSize: "1.08rem",
              color: "var(--color-text-secondary)",
              maxWidth: "520px",
            }}
          >
            Your AI-powered mental health companion for college students. Get
            support, resources, and guidance anytime.
          </p>
        </header>

        {/* Search Bar & Language Selector */}
        <div
          className="w-full flex justify-center items-center mb-2"
          style={{ marginTop: "8rem" }}
        >
          <div className="flex flex-col items-center w-full max-w-xl gap-2">
            <div className="w-full flex flex-col items-center">
              <label className="mb-2 text-base font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Search Serene
              </label>
              <div
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  boxShadow: "var(--shadow-sm)",
                  width: "100%",
                }}
              >
                {/* Language Dropdown */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() =>
                      setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                    }
                    style={{
                      background: "none",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.5rem 0.75rem",
                      cursor: "pointer",
                      color: "var(--color-text-primary)",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "var(--color-surface)",
                      minWidth: "80px",
                    }}
                  >
                    <span>
                      {
                        languages.find((lang) => lang.code === selectedLanguage)
                          ?.flag
                      }
                    </span>
                    <span>
                      {languages
                        .find((lang) => lang.code === selectedLanguage)
                        ?.code.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.7rem" }}>▼</span>
                  </button>
                  {isLanguageDropdownOpen && (
                    <div
                      className="scroll-minimal"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        minWidth: "200px",
                        marginTop: "0.35rem",
                        background:
                          "color-mix(in oklab, var(--color-surface), transparent 10%)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-xl)",
                        boxShadow: "var(--shadow-lg)",
                        zIndex: 50,
                        maxHeight: "260px",
                        overflowY: "auto",
                        padding: "0.25rem 0",
                        backdropFilter: "blur(10px)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setSelectedLanguage(language.code);
                            setIsLanguageDropdownOpen(false);
                          }}
                          style={{
                            width: "100%",
                            padding: "0.65rem 1.1rem",
                            border: "none",
                            background:
                              selectedLanguage === language.code
                                ? "color-mix(in oklab, var(--color-primary-light), transparent 80%)"
                                : "transparent",
                            color:
                              selectedLanguage === language.code
                                ? "var(--color-primary)"
                                : "var(--color-text-primary)",
                            fontSize: "1rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.7rem",
                            borderRadius: "0.5rem",
                            margin: "0.1rem 0",
                            transition:
                              "background 0.18s, color 0.18s, transform 0.12s",
                            textAlign: "left",
                            fontWeight:
                              selectedLanguage === language.code ? 600 : 400,
                            boxShadow:
                              selectedLanguage === language.code
                                ? "0 2px 8px color-mix(in oklab, var(--color-primary), transparent 85%)"
                                : "none",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.15rem",
                              marginRight: "0.2rem",
                            }}
                          >
                            {language.flag}
                          </span>
                          <span
                            style={{
                              fontWeight: 500,
                              minWidth: "2.6rem",
                              textAlign: "left",
                              opacity: 0.85,
                            }}
                          >
                            {language.code.toUpperCase()}
                          </span>
                          <span
                            style={{
                              fontWeight: 450,
                              flex: 1,
                              textAlign: "left",
                            }}
                          >
                            {language.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Ask anything about mental health, stress, anxiety, or type / for shortcuts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    background: "transparent",
                    fontSize: "1rem",
                    color: "var(--color-text-primary)",
                    outline: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <AnimatedIcon name="paperclip" size={18} />
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
                  >
                    <AnimatedIcon name="mic" size={18} />
                  </button>
                  <button
                    style={{
                      backgroundColor: "var(--color-primary)",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      padding: "0.75rem",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    <AnimatedIcon name="send" size={16} color="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards Row */}
        <section className="w-full" style={{ marginBottom: "2rem" }}>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Emergency Support */}
            <div
              className="feature-card border-2 border-red-500 rounded-xl px-4 py-4 shadow-md cursor-pointer flex flex-col justify-between h-full min-h-[100px] transition-all duration-150 hover:scale-[1.02] hover:shadow-xl focus:outline-none"
              style={{ background: "rgba(239, 68, 68, 0.7)", color: "white" }}
              tabIndex={0}
              role="button"
              onClick={handleEmergencyClick}
            >
              <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
                <AnimatedIcon name="alert" size={20} color="white" /> Emergency
              </div>
              <div className="text-sm">
                Immediate crisis support and helpline numbers
              </div>
              <div className="flex justify-end items-center mt-6">
                <span
                  className="text-sm font-medium"
                  style={{ color: "white", opacity: 0.92 }}
                >
                  Try Chatbot{" "}
                  <span style={{ fontSize: "1.1em", marginLeft: "0.2em" }}>
                    →
                  </span>
                </span>
              </div>
            </div>
            {/* Chat Assistant */}
            <div
              className="feature-card border-2 border-emerald-700 rounded-xl px-4 py-4 shadow-md cursor-pointer flex flex-col justify-between h-full min-h-[100px] transition-all duration-150 hover:scale-[1.02] hover:shadow-xl focus:outline-none"
              style={{ background: "rgba(4, 120, 87, 0.7)", color: "white" }}
              tabIndex={0}
              role="button"
              onClick={() => window.location.href = '/chat'}
            >
              <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
                <AnimatedIcon name="message-circle" size={20} color="white" /> Chat
              </div>
              <div className="text-sm">
                Talk to our AI assistant about your feelings
              </div>
              <div className="flex justify-end items-center mt-6">
                <span
                  className="text-sm font-medium"
                  style={{ color: "white", opacity: 0.92 }}
                >
                  Try Chatbot{" "}
                  <span style={{ fontSize: "1.1em", marginLeft: "0.2em" }}>
                    →
                  </span>
                </span>
              </div>
            </div>
            {/* Book Counselor */}
            <div
              className="feature-card border-2 border-blue-600 rounded-xl px-4 py-4 shadow-md cursor-pointer flex flex-col justify-between h-full min-h-[100px] transition-all duration-150 hover:scale-[1.02] hover:shadow-xl focus:outline-none"
              style={{ background: "rgba(37, 99, 235, 0.7)", color: "white" }}
              tabIndex={0}
              role="button"
              onClick={() => window.location.href = '/booking'}
            >
              <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
                <AnimatedIcon name="calendar" size={20} color="white" /> Book Session
              </div>
              <div className="text-sm">Schedule with campus counselors</div>
              <div className="flex justify-end items-center mt-6">
                <span
                  className="text-sm font-medium"
                  style={{ color: "white", opacity: 0.92 }}
                >
                  Book Now{" "}
                  <span style={{ fontSize: "1.1em", marginLeft: "0.2em" }}>
                    →
                  </span>
                </span>
              </div>
            </div>
            {/* My Safe Space */}
            <div
              className="feature-card border-2 border-purple-600 rounded-xl px-4 py-4 shadow-md cursor-pointer flex flex-col justify-between h-full min-h-[100px] transition-all duration-150 hover:scale-[1.02] hover:shadow-xl focus:outline-none"
              style={{ background: "rgba(147, 51, 234, 0.7)", color: "white" }}
              tabIndex={0}
              role="button"
              onClick={() => window.location.href = '/safe-space'}
            >
              <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
                <AnimatedIcon name="home" size={20} color="white" /> My Safe Space
              </div>
              <div className="text-sm">
                Your personal wellness dashboard and tools
              </div>
              <div className="flex justify-end items-center mt-6">
                <span
                  className="text-sm font-medium"
                  style={{ color: "white", opacity: 0.92 }}
                >
                  Enter Space{" "}
                  <span style={{ fontSize: "1.1em", marginLeft: "0.2em" }}>
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Widgets & Popular Resources */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mood Tracker */}
            <div className="card bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[160px]">
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Daily Mood Check
              </h3>
              <p
                className="mb-3 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                How are you feeling today?
              </p>
              <div className="flex gap-2 justify-center">
                {[
                  { mood: "sad", icon: "frown" },
                  { mood: "worried", icon: "meh" },
                  { mood: "neutral", icon: "meh" },
                  { mood: "happy", icon: "smile" },
                  { mood: "excited", icon: "laugh" }
                ].map((item, index) => (
                  <button
                    key={index}
                    style={{
                      background: "none",
                      border: "2px solid var(--color-border)",
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AnimatedIcon name={item.icon} size={16} color="var(--color-text-primary)" />
                  </button>
                ))}
              </div>
            </div>
            {/* Quick Stats */}
            <div className="card bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[160px]">
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Your Wellness Journey
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Chat Sessions
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    12
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Resources Viewed
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    8
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Streak Days
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-success)" }}
                  >
                    5 <AnimatedIcon name="zap" size={14} color="var(--color-success)" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Popular Resources */}
          <div className="card bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col min-h-[160px]">
            <h3
              className="text-base font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Popular Resources
            </h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: "wind",
                  title: "Breathing Exercises",
                  desc: "5 min guided session",
                },
                {
                  icon: "moon",
                  title: "Sleep Better",
                  desc: "Improve your sleep quality",
                },
                {
                  icon: "book-open",
                  title: "Anxiety Guide",
                  desc: "Understanding & coping",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <AnimatedIcon name={item.icon} size={18} color="var(--color-primary)" />
                  <div>
                    <div
                      className="font-medium text-sm"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        {/* <footer className="w-full flex flex-col items-center mt-8 pb-2">
          <div
            className="card rounded-xl shadow-lg max-w-md w-full mx-auto p-6"
            style={{ background: "var(--color-surface)" }}
          >
            <h3
              className="font-semibold text-lg mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Ready to start your wellness journey?
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Join thousands of students who trust Serene for their mental
              health support.
            </p>
            <button
              className="btn-primary w-full"
              style={{ fontSize: "1rem", padding: "0.75rem 1.5rem" }}
            >
              Get Started Now
            </button>
          </div>
        </footer> */}
      </div>

      {/* Emergency Modal */}
      {isEmergencyActive && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
          {/* Backdrop */}
          <div className="fixed inset-0 transition-all" />

          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              
              {/* Close Button */}
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={handleCloseEmergency}
                  className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Emergency Support
                  </h3>
                  
                  {connectionStatus === 'connecting' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center mb-4">
                        {/* Calling Animation */}
                        <div className="relative">
                          <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-red-400 opacity-75"></div>
                          <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-red-400 opacity-75" style={{animationDelay: '1s'}}></div>
                          <div className="relative inline-flex rounded-full h-16 w-16 bg-red-500 items-center justify-center">
                            <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium text-red-600 dark:text-red-400">Please hold on</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          We are connecting you to someone who can help you right away...
                        </p>
                        
                        {/* Loading dots */}
                        <div className="flex justify-center mt-4 space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {connectionStatus === 'connected' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative inline-flex rounded-full h-16 w-16 bg-green-500 items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                          Connected Successfully!
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          A crisis counselor is now available to help you. Please stay on the line.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      <strong>Emergency Helplines:</strong><br />
                      KIRAN Mental Health: 1800-599-0019<br />
                      Vandrevala Foundation: 9999 666 555<br />
                      iCALL: 9152987821
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {connectionStatus === 'connecting' && (
                  <button
                    onClick={handleCloseEmergency}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:w-auto transition-colors"
                  >
                    Cancel
                  </button>
                )}
                {connectionStatus === 'connected' && (
                  <>
                    <button
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors"
                    >
                      End Call
                    </button>
                    <button
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:w-auto transition-colors"
                    >
                      Mute
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
