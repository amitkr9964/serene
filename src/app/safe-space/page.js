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

  // Addiction Tracker state
  const [addictions, setAddictions] = useState([
    { id: 1, name: 'Social Media', type: 'digital', dailyGoal: 120, currentUsage: 85, lastChecked: '10:30 AM' },
    { id: 2, name: 'Caffeine', type: 'substance', dailyGoal: 2, currentUsage: 1, unit: 'cups', lastChecked: '9:15 AM' },
    { id: 3, name: 'Gaming', type: 'digital', dailyGoal: 60, currentUsage: 45, lastChecked: '8:20 PM' }
  ]);

  const [newAddiction, setNewAddiction] = useState({ name: '', type: 'digital', dailyGoal: '' });

  // Stress Monitor state
  const [stressData, setStressData] = useState({
    currentLevel: 3,
    heartRate: 72,
    hrvScore: 45,
    sleepQuality: 8.5,
    lastSync: 'Just now',
    weeklyAverage: 2.8,
    trends: [
      { time: '6:00', stress: 2, hr: 65 },
      { time: '9:00', stress: 4, hr: 78 },
      { time: '12:00', stress: 3, hr: 74 },
      { time: '15:00', stress: 5, hr: 82 },
      { time: '18:00', stress: 2, hr: 68 },
      { time: '21:00', stress: 1, hr: 62 }
    ]
  });

  const [connectedDevice, setConnectedDevice] = useState({
    name: 'Apple Watch Series 9',
    connected: true,
    battery: 78,
    lastSync: '2 minutes ago'
  });



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

  const addAddiction = () => {
    if (!newAddiction.name.trim() || !newAddiction.dailyGoal) return;
    
    const addiction = {
      id: Date.now(),
      name: newAddiction.name,
      type: newAddiction.type,
      dailyGoal: parseInt(newAddiction.dailyGoal),
      currentUsage: 0,
      unit: newAddiction.type === 'digital' ? 'minutes' : 'units',
      lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setAddictions([...addictions, addiction]);
    setNewAddiction({ name: '', type: 'digital', dailyGoal: '' });
  };

  const updateAddictionUsage = (id, usage) => {
    setAddictions(addictions.map(addiction => 
      addiction.id === id 
        ? { ...addiction, currentUsage: Math.max(0, usage), lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : addiction
    ));
  };

  const getStressLevel = (level) => {
    if (level <= 2) return { label: 'Low', color: 'var(--color-success)', emoji: '😌' };
    if (level <= 3) return { label: 'Moderate', color: 'var(--color-warning)', emoji: '😐' };
    if (level <= 4) return { label: 'High', color: 'var(--color-error)', emoji: '😰' };
    return { label: 'Very High', color: 'var(--color-error)', emoji: '😫' };
  };

  const sidebarItems = [
    { id: 'overview', icon: 'chart', label: 'Overview' },
    { id: 'journal', icon: 'book', label: 'My Journal' },
    { id: 'chat-history', icon: 'message', label: 'Chat Sessions' },
    { id: 'addiction-tracker', icon: 'shield', label: 'Addiction Tracker' },
    { id: 'stress-monitor', icon: 'activity', label: 'Stress Monitor' },
    { id: 'resources', icon: 'book', label: 'Saved Resources' },
    { id: 'planner', icon: 'calendar', label: 'Study Planner' },
    { id: 'mood-tracker', icon: 'heart', label: 'Mood Tracker' },
    { id: 'goals', icon: 'star', label: 'Goals & Habits' },
    { id: 'breathing', icon: 'wind', label: 'Breathing Space' },
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
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                    : 'hover:bg-gradient-to-r hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 hover:text-purple-700 dark:hover:text-purple-200'
                }`}
                style={{ 
                  color: activeTab === item.id ? "white" : "var(--color-text-primary)",
                  backgroundColor: activeTab === item.id ? "" : "transparent"
                }}
              >
                <AnimatedIcon 
                  type={item.icon} 
                  size={16} 
                  className="mr-3"
                  animate={activeTab === item.id}
                  style={{ color: activeTab === item.id ? "white" : "inherit" }}
                />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Back to Home */}
          <div className="p-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <Link href="/">
              <button 
                className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200 dark:hover:from-green-800 dark:hover:to-green-700 hover:text-green-700 dark:hover:text-green-200"
                style={{ color: "var(--color-text-primary)" }}
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

          {/* Addiction Tracker Tab */}
          {activeTab === 'addiction-tracker' && (
            <div className="space-y-6">
              {/* Add New Addiction */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4 flex items-center">
                  <AnimatedIcon name="shield" size={20} className="mr-2" />
                  Track New Habit/Addiction
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newAddiction.name}
                    onChange={(e) => setNewAddiction({...newAddiction, name: e.target.value})}
                    placeholder="Habit name (e.g., Social Media)"
                    className="p-3 rounded-md"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)"
                    }}
                  />
                  <select
                    value={newAddiction.type}
                    onChange={(e) => setNewAddiction({...newAddiction, type: e.target.value})}
                    className="p-3 rounded-md"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)"
                    }}
                  >
                    <option value="digital">Digital/Screen Time</option>
                    <option value="substance">Substance (Coffee, etc.)</option>
                    <option value="behavioral">Behavioral Habit</option>
                  </select>
                  <input
                    type="number"
                    value={newAddiction.dailyGoal}
                    onChange={(e) => setNewAddiction({...newAddiction, dailyGoal: e.target.value})}
                    placeholder="Daily limit"
                    className="p-3 rounded-md"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)"
                    }}
                  />
                  <button
                    onClick={addAddiction}
                    className="px-6 py-3 rounded-md text-white font-medium flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <AnimatedIcon name="plus" size={16} className="mr-2" />
                    Add Tracker
                  </button>
                </div>
              </div>

              {/* Current Addictions/Habits */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addictions.map((addiction) => {
                  const progress = (addiction.currentUsage / addiction.dailyGoal) * 100;
                  const isOverLimit = addiction.currentUsage > addiction.dailyGoal;
                  
                  return (
                    <div 
                      key={addiction.id}
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: "var(--color-surface)", 
                        border: `1px solid ${isOverLimit ? 'var(--color-error)' : 'var(--color-border)'}` 
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{addiction.name}</h4>
                        <span 
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: addiction.type === 'digital' ? 'rgba(59, 130, 246, 0.1)' : 
                                           addiction.type === 'substance' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                            color: addiction.type === 'digital' ? 'var(--color-primary)' : 
                                   addiction.type === 'substance' ? 'var(--color-success)' : 'var(--color-secondary)'
                          }}
                        >
                          {addiction.type}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Usage Today</span>
                          <span style={{ color: isOverLimit ? 'var(--color-error)' : 'var(--color-text-primary)' }}>
                            {addiction.currentUsage}/{addiction.dailyGoal} {addiction.unit || 'units'}
                          </span>
                        </div>
                        <div 
                          className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                        >
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(progress, 100)}%`,
                              backgroundColor: isOverLimit ? 'var(--color-error)' : 
                                             progress > 80 ? 'var(--color-warning)' : 'var(--color-success)'
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateAddictionUsage(addiction.id, addiction.currentUsage - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: 'var(--color-success)' }}
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateAddictionUsage(addiction.id, addiction.currentUsage + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: 'var(--color-error)' }}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          Last: {addiction.lastChecked}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Daily Summary */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4">Daily Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
                      {addictions.filter(a => a.currentUsage <= a.dailyGoal).length}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Goals Met</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-error)' }}>
                      {addictions.filter(a => a.currentUsage > a.dailyGoal).length}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Over Limit</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {Math.round((addictions.filter(a => a.currentUsage <= a.dailyGoal).length / addictions.length) * 100)}%
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stress Monitor Tab */}
          {activeTab === 'stress-monitor' && (
            <div className="space-y-6">
              {/* Device Connection Status */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4 flex items-center">
                  <AnimatedIcon name="watch" size={20} className="mr-2" />
                  Connected Device
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: connectedDevice.connected ? 'var(--color-success)' : 'var(--color-error)' }}
                    />
                    <div>
                      <p className="font-medium">{connectedDevice.name}</p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Battery: {connectedDevice.battery}% • Last sync: {connectedDevice.lastSync}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Sync Now
                  </button>
                </div>
              </div>

              {/* Current Stress Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{getStressLevel(stressData.currentLevel).emoji}</div>
                    <div className="text-2xl font-bold" style={{ color: getStressLevel(stressData.currentLevel).color }}>
                      {stressData.currentLevel}/5
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Current Stress</p>
                    <p className="text-xs font-medium" style={{ color: getStressLevel(stressData.currentLevel).color }}>
                      {getStressLevel(stressData.currentLevel).label}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="text-center">
                    <AnimatedIcon name="heart" size={24} className="mb-2 block mx-auto" color="var(--color-error)" />
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-error)' }}>
                      {stressData.heartRate}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Heart Rate (BPM)</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="text-center">
                    <AnimatedIcon name="activity" size={24} className="mb-2 block mx-auto" color="var(--color-warning)" />
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>
                      {stressData.hrvScore}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>HRV Score</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">😴</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
                      {stressData.sleepQuality}h
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sleep Quality</p>
                  </div>
                </div>
              </div>

              {/* Stress Trends */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4">Today's Stress Pattern</h3>
                <div className="space-y-3">
                  {stressData.trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-md" style={{ backgroundColor: "var(--color-surface-alt)" }}>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-12">{trend.time}</span>
                        <div className="flex items-center space-x-2">
                          <span>{getStressLevel(trend.stress).emoji}</span>
                          <span className="text-sm">Stress: {trend.stress}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AnimatedIcon name="heart" size={14} color="var(--color-error)" />
                        <span className="text-sm">{trend.hr} BPM</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <h3 className="font-semibold mb-4">Personalized Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-md" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--color-success)" }}>
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🧘</span>
                      <h4 className="font-medium">Breathing Exercise</h4>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Your stress level is moderate. Try a 5-minute breathing exercise.
                    </p>
                    <button className="mt-2 text-sm px-3 py-1 rounded-md" style={{ backgroundColor: 'var(--color-success)', color: 'white' }}>
                      Start Now
                    </button>
                  </div>

                  <div className="p-4 rounded-md" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", border: "1px solid var(--color-primary)" }}>
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">💧</span>
                      <h4 className="font-medium">Stay Hydrated</h4>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Drink a glass of water to help reduce stress and improve focus.
                    </p>
                    <button className="mt-2 text-sm px-3 py-1 rounded-md" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                      Set Reminder
                    </button>
                  </div>
                </div>
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
