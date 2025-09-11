"use client";

import Navbar from "../../components/Navbar";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";

export default function ResourcesPage() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('videos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'videos', name: 'Videos', icon: '🎥', count: 45 },
    { id: 'audios', name: 'Audio Guides', icon: '🎧', count: 32 },
    { id: 'saved', name: 'My Saved', icon: '💾', count: 12 },
    { id: 'research', name: 'Research Papers', icon: '📄', count: 28 },
    { id: 'games', name: 'Wellness Games', icon: '🎮', count: 15 },
    { id: 'articles', name: 'Articles', icon: '📖', count: 67 }
  ];

  const videoResources = [
    {
      id: 1,
      title: "Managing Anxiety Through Breathing Techniques",
      duration: "8:45",
      thumbnail: "🫁",
      category: "Anxiety Management",
      views: "2.3K",
      rating: 4.8,
      description: "Learn effective breathing exercises to calm anxiety and reduce stress.",
    },
    {
      id: 2,
      title: "Sleep Hygiene for Better Mental Health",
      duration: "12:30",
      thumbnail: "😴",
      category: "Sleep Wellness",
      views: "1.8K",
      rating: 4.9,
      description: "Practical tips for improving sleep quality and mental well-being.",
    },
    {
      id: 3,
      title: "Mindfulness Meditation for Beginners",
      duration: "15:20",
      thumbnail: "🧘‍♀️",
      category: "Mindfulness",
      views: "3.1K",
      rating: 4.7,
      description: "Introduction to mindfulness meditation practices for stress relief.",
    },
    {
      id: 4,
      title: "Building Healthy Relationships",
      duration: "18:15",
      thumbnail: "🤝",
      category: "Relationships",
      views: "1.5K",
      rating: 4.6,
      description: "Guidelines for creating and maintaining healthy interpersonal relationships.",
    },
    {
      id: 5,
      title: "Study Stress and Academic Pressure",
      duration: "10:45",
      thumbnail: "📚",
      category: "Academic Support",
      views: "2.7K",
      rating: 4.8,
      description: "Strategies for managing academic stress and maintaining mental wellness.",
    },
    {
      id: 6,
      title: "Understanding Depression Signs",
      duration: "14:30",
      thumbnail: "🌧️",
      category: "Mental Health Awareness",
      views: "1.9K",
      rating: 4.9,
      description: "Recognizing depression symptoms and when to seek professional help.",
    }
  ];

  const audioResources = [
    {
      id: 1,
      title: "Progressive Muscle Relaxation",
      duration: "20:00",
      thumbnail: "💪",
      category: "Relaxation",
      plays: "4.2K",
      rating: 4.9,
      description: "Guided progressive muscle relaxation for deep stress relief.",
    },
    {
      id: 2,
      title: "Nature Sounds for Focus",
      duration: "60:00",
      thumbnail: "🌿",
      category: "Focus & Concentration",
      plays: "8.5K",
      rating: 4.7,
      description: "Calming nature sounds to enhance focus during study sessions.",
    },
    {
      id: 3,
      title: "Self-Compassion Meditation",
      duration: "12:45",
      thumbnail: "💝",
      category: "Self-Care",
      plays: "2.8K",
      rating: 4.8,
      description: "Develop self-compassion and reduce self-criticism through guided meditation.",
    },
    {
      id: 4,
      title: "Bedtime Relaxation Stories",
      duration: "25:30",
      thumbnail: "🌙",
      category: "Sleep Aid",
      plays: "3.6K",
      rating: 4.6,
      description: "Soothing stories designed to help you fall asleep peacefully.",
    }
  ];

  const researchPapers = [
    {
      id: 1,
      title: "The Impact of Social Media on Student Mental Health",
      authors: "Dr. Sarah Johnson, Prof. Michael Chen",
      year: "2024",
      thumbnail: "📱",
      category: "Digital Wellness",
      citations: 127,
      description: "Comprehensive study on social media&#39;s effects on university students&#39; psychological well-being.",
    },
    {
      id: 2,
      title: "Mindfulness-Based Interventions in Higher Education",
      authors: "Dr. Priya Patel, Dr. James Wilson",
      year: "2023",
      thumbnail: "🧘",
      category: "Mindfulness Research",
      citations: 89,
      description: "Meta-analysis of mindfulness programs' effectiveness in university settings.",
    },
    {
      id: 3,
      title: "Cultural Factors in Mental Health Help-Seeking Behavior",
      authors: "Prof. Maria Rodriguez, Dr. Ahmed Hassan",
      year: "2024",
      thumbnail: "🌍",
      category: "Cultural Psychology",
      citations: 156,
      description: "Cross-cultural examination of mental health service utilization among diverse student populations.",
    }
  ];

  const wellnessGames = [
    {
      id: 1,
      title: "MoodTracker Challenge",
      thumbnail: "📊",
      category: "Mood Management",
      players: "12.4K",
      rating: 4.7,
      description: "Interactive mood tracking game with personalized insights and achievements.",
    },
    {
      id: 2,
      title: "Stress Buster Puzzles",
      thumbnail: "🧩",
      category: "Stress Relief",
      players: "8.9K",
      rating: 4.8,
      description: "Relaxing puzzle games designed to reduce stress and promote mindfulness.",
    },
    {
      id: 3,
      title: "Virtual Pet Wellness",
      thumbnail: "🐱",
      category: "Self-Care",
      players: "15.2K",
      rating: 4.6,
      description: "Care for a virtual pet while learning healthy habits and self-care practices.",
    }
  ];

  const getCurrentResources = () => {
    switch (activeCategory) {
      case 'videos': return videoResources;
      case 'audios': return audioResources;
      case 'research': return researchPapers;
      case 'games': return wellnessGames;
      case 'saved': return [...videoResources.slice(0, 2), ...audioResources.slice(0, 2)];
      default: return videoResources;
    }
  };

  const filteredResources = getCurrentResources().filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
                padding: "0.4rem 0.8rem",
                borderRadius: "var(--radius-lg)",
                fontSize: "0.8rem",
                fontWeight: "500",
                marginBottom: "0.75rem",
                display: "inline-block",
              }}
            >
              📚 Psychoeducational Resources
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Mental Wellness Resources
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-secondary)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Access videos, audio guides, research papers, and interactive games to support your mental health journey.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "0.875rem 1.25rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                color: "var(--color-text-primary)",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ marginBottom: "2rem" }}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: activeCategory === category.id ? "var(--color-primary)" : "var(--color-surface)",
                    color: activeCategory === category.id ? "white" : "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseOver={(e) => {
                    if (activeCategory !== category.id) {
                      e.target.style.backgroundColor = "var(--color-border)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeCategory !== category.id) {
                      e.target.style.backgroundColor = "var(--color-surface)";
                    }
                  }}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      backgroundColor: activeCategory === category.id ? "rgba(255,255,255,0.2)" : "var(--color-border)",
                      color: activeCategory === category.id ? "white" : "var(--color-text-secondary)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: "160px",
                    backgroundColor: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                    position: "relative",
                  }}
                >
                  {resource.thumbnail}
                  {(resource.duration || resource.year) && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        right: "0.75rem",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {resource.duration || resource.year}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.7rem",
                        fontWeight: "500",
                      }}
                    >
                      {resource.category}
                    </span>
                    {resource.rating && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <span style={{ color: "var(--color-warning)" }}>⭐</span>
                        <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          {resource.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.75rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {resource.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      marginBottom: "1rem",
                    }}
                  >
                    {resource.description}
                  </p>

                  {/* Stats */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {resource.views && `👁️ ${resource.views} views`}
                      {resource.plays && `▶️ ${resource.plays} plays`}
                      {resource.citations && `📄 ${resource.citations} citations`}
                      {resource.players && `🎮 ${resource.players} players`}
                    </div>
                    <button
                      style={{
                        padding: "0.4rem 0.8rem",
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      {activeCategory === 'videos' && '▶️ Watch'}
                      {activeCategory === 'audios' && '🎧 Listen'}
                      {activeCategory === 'research' && '📖 Read'}
                      {activeCategory === 'games' && '🎮 Play'}
                      {activeCategory === 'saved' && '📂 Open'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--color-text-secondary)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No resources found</h3>
              <p>Try adjusting your search terms or selecting a different category.</p>
            </div>
          )}

          {/* Feature Request */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2rem",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Can&#39;t find what you&#39;re looking for?
            </h3>
            <p
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              Request specific resources or suggest new content categories to help improve our library.
            </p>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary-dark)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
              }}
            >
              📝 Request Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
