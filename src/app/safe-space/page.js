'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedIcon from '../../components/AnimatedIcon';

export default function SafeSpacePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Journal state
  const [journalEntry, setJournalEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: '2025-09-11',
      mood: '😊',
      title: 'Great Day!',
      content: 'Had a productive study session and felt really good about my progress...',
      tags: ['positive', 'study']
    },
    {
      id: 2,
      date: '2025-09-10',
      mood: '😐',
      title: 'Neutral Day',
      content: 'Nothing special happened today. Just regular classes and some homework...',
      tags: ['neutral', 'routine']
    }
  ]);

  // Todo state
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete Math Assignment', completed: false, priority: 'high', dueDate: '2025-09-12' },
    { id: 2, text: 'Review Chapter 5 for Biology', completed: true, priority: 'medium', dueDate: '2025-09-11' },
    { id: 3, text: 'Submit Project Proposal', completed: false, priority: 'high', dueDate: '2025-09-13' }
  ]);

  // Wellness data
  const [moodHistory] = useState([
    { date: '2025-09-07', mood: 4 },
    { date: '2025-09-08', mood: 3 },
    { date: '2025-09-09', mood: 5 },
    { date: '2025-09-10', mood: 3 },
    { date: '2025-09-11', mood: 4 }
  ]);



  const addJournalEntry = () => {
    if (!journalEntry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      mood: '😊',
      title: `Entry ${journalEntries.length + 1}`,
      content: journalEntry,
      tags: ['recent']
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setJournalEntry('');
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0]
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const sidebarItems = [
    { id: 'overview', icon: 'chart', label: 'Overview' },
    { id: 'journal', icon: 'book', label: 'My Journal' },
    { id: 'chat-history', icon: 'message', label: 'Chat Sessions' },
    { id: 'resources', icon: 'book', label: 'Saved Resources' },
    { id: 'planner', icon: 'calendar', label: 'Study Planner' },
    { id: 'mood-tracker', icon: 'heart', label: 'Mood Tracker' },
    { id: 'goals', icon: 'star', label: 'Goals & Habits' },
    { id: 'breathing', icon: 'activity', label: 'Breathing Space' },
    { id: 'achievements', icon: 'star', label: 'Achievements' }
  ];

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
                <span className="text-white text-lg font-bold">🏠</span>
              </div> */}
              <span className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                My Safe Space
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                    : ''
                }`}
                style={{ color: activeTab === item.id ? "var(--color-accent)" : "var(--color-text-primary)" }}
                onMouseOver={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = "var(--color-primary)";
                    e.target.style.color = "white";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "var(--color-text-primary)";
                  }
                }}
              >
                <AnimatedIcon 
                  type={item.icon} 
                  size={16} 
                  className="mr-3"
                  animate={true}
                />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Back to Home */}
          <div className="p-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <Link href="/">
              <button 
                className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors"
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "var(--color-primary)";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                <AnimatedIcon name="home" size={16} className="mr-3" />
                Back to Home
              </button>
            </Link>
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

      {/* Main Content */}
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
            <div>
              <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
                {sidebarItems.find(item => item.id === activeTab)?.label || 'My Safe Space'}
              </h1>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Your personal wellness sanctuary
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "var(--color-success)"
              }}
            >
              <AnimatedIcon type="zap" size={12} className="mr-1" />
              5 Day Streak
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors"
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "inherit";
              }}
            >
              <AnimatedIcon 
                type={isDarkMode ? "sun" : "moon"} 
                size={16} 
                animate={true}
              />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div 
                className="rounded-lg p-6"
                style={{ 
                  backgroundColor: "var(--color-surface-alt)",
                  border: "1px solid var(--color-border)"
                }}
              >
                <h2 className="text-lg font-semibold mb-2">Welcome Back! <AnimatedIcon name="star" size={18} /></h2>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  Here&#39;s your wellness summary for today. You&#39;re doing great!
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Streak Days</p>
                      <p className="text-2xl font-bold" style={{ color: "var(--color-success)" }}>5</p>
                    </div>
                    <AnimatedIcon name="zap" size={24} color="var(--color-success)" />
                  </div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Journal Entries</p>
                      <p className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>{journalEntries.length}</p>
                    </div>
                    <span className="text-2xl">📓</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Chat Sessions</p>
                      <p className="text-2xl font-bold" style={{ color: "var(--color-secondary)" }}>12</p>
                    </div>
                    <AnimatedIcon name="message" size={24} color="var(--color-secondary)" />
                  </div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Pending Tasks</p>
                      <p className="text-2xl font-bold" style={{ color: "var(--color-warning)" }}>{todos.filter(t => !t.completed).length}</p>
                    </div>
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <h3 className="font-semibold mb-4">Recent Journal Entries</h3>
                  {journalEntries.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-3 mb-3 p-3 rounded-md" style={{ backgroundColor: "var(--color-surface-alt)" }}>
                      <span className="text-lg">{entry.mood}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{entry.title}</p>
                        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{entry.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <h3 className="font-semibold mb-4">Today&#39;s Mood</h3>
                  <div className="flex justify-center space-x-3 mb-4">
                    {["😢", "😟", "😐", "🙂", "😊"].map((emoji, index) => (
                      <button
                        key={index}
                        className="w-12 h-12 rounded-full border-2 hover:scale-110 transition-transform"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <span className="text-xl">{emoji}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    How are you feeling today?
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Journal Tab */}
          {activeTab === 'journal' && (
            <div className="space-y-6">
              {/* New Entry */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4">Write New Entry</h3>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="What&#39;s on your mind today? How are you feeling?"
                  className="w-full h-32 p-3 rounded-md resize-none"
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)"
                  }}
                />
                <button
                  onClick={addJournalEntry}
                  className="mt-3 px-4 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Save Entry
                </button>
              </div>

              {/* Past Entries */}
              <div className="space-y-4">
                <h3 className="font-semibold">Past Entries</h3>
                {journalEntries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{entry.mood}</span>
                        <h4 className="font-medium">{entry.title}</h4>
                      </div>
                      <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
                      {entry.content}
                    </p>
                    <div className="flex space-x-2">
                      {entry.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: "var(--color-surface-alt)",
                            color: "var(--color-text-secondary)"
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Study Planner Tab */}
          {activeTab === 'planner' && (
            <div className="space-y-6">
              {/* Add New Task */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4">Add New Task</h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new task..."
                    className="flex-1 p-3 rounded-md"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)"
                    }}
                  />
                  <button
                    onClick={addTodo}
                    className="px-6 py-3 rounded-md text-white font-medium"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Add Task
                  </button>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                <h3 className="font-semibold">Your Tasks</h3>
                {todos.map((todo) => (
                  <div 
                    key={todo.id}
                    className={`p-4 rounded-lg flex items-center space-x-3 ${todo.completed ? 'opacity-60' : ''}`}
                    style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <p className={`${todo.completed ? 'line-through' : ''}`}>
                        {todo.text}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                        Due: {todo.dueDate}
                      </p>
                    </div>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        todo.priority === 'high' 
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                          : todo.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {todo.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat History Tab */}
          {activeTab === 'chat-history' && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4">Recent Chat Sessions</h3>
                {[
                  { id: 1, date: '2025-09-11', duration: '15 min', topic: 'Stress Management', mood: '😊' },
                  { id: 2, date: '2025-09-10', duration: '22 min', topic: 'Study Anxiety', mood: '😟' },
                  { id: 3, date: '2025-09-09', duration: '18 min', topic: 'Sleep Issues', mood: '😴' }
                ].map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-4 mb-3 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{session.mood}</span>
                      <div>
                        <p className="font-medium">{session.topic}</p>
                        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                          {session.date} • {session.duration}
                        </p>
                      </div>
                    </div>
                    <Link href="/chat">
                      <button className="text-sm px-3 py-1 rounded-md" style={{ backgroundColor: "var(--color-primary)", color: "white" }}>
                        Continue
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs would follow similar patterns... */}
          {activeTab === 'resources' && (
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <AnimatedIcon name="book" size={48} className="mb-4 block mx-auto" color="var(--color-primary)" />
              <h3 className="font-semibold mb-2">Saved Resources</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Your bookmarked articles, videos, and guides will appear here.</p>
            </div>
          )}

          {activeTab === 'mood-tracker' && (
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <span className="text-4xl mb-4 block">😊</span>
              <h3 className="font-semibold mb-2">Mood Tracker</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Track your emotional patterns and wellness trends over time.</p>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <AnimatedIcon name="target" size={48} className="mb-4 block mx-auto" color="var(--color-primary)" />
              <h3 className="font-semibold mb-2">Goals & Habits</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Set and track your wellness goals and daily habits.</p>
            </div>
          )}

          {activeTab === 'breathing' && (
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <span className="text-4xl mb-4 block">🧘</span>
              <h3 className="font-semibold mb-2">Breathing Space</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Guided breathing exercises and mindfulness activities.</p>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <AnimatedIcon name="trophy" size={48} className="mb-4 block mx-auto" color="var(--color-primary)" />
              <h3 className="font-semibold mb-2">Achievements</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Celebrate your wellness milestones and progress.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  </div>
  );
};
