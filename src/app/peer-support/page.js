"use client";

import Navbar from "../../components/Navbar";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";
import AnimatedIcon from "../../components/AnimatedIcon";

export default function PeerSupportPage() {
  const { theme } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const courses = [
    { id: 'all', name: 'All Courses', members: '15.2K' },
    { id: 'cs', name: 'Computer Science', members: '3.4K' },
    { id: 'eng', name: 'Engineering', members: '2.8K' },
    { id: 'med', name: 'Medicine', members: '2.1K' },
    { id: 'bus', name: 'Business', members: '1.9K' },
    { id: 'arts', name: 'Arts & Humanities', members: '1.7K' },
    { id: 'sci', name: 'Natural Sciences', members: '1.6K' },
    { id: 'psych', name: 'Psychology', members: '1.3K' },
    { id: 'law', name: 'Law', members: '0.9K' },
  ];

  const posts = [
    {
      id: 1,
      title: "Dealing with exam anxiety - tips that actually work?",
      content: "I've been struggling with severe anxiety before exams. My heart races and I can't focus. Has anyone found techniques that really help?",
      author: "Anonymous Student #4729",
      course: "Psychology",
      timestamp: "2 hours ago",
      replies: 23,
      hearts: 45,
      isAnonymous: true,
      tags: ["anxiety", "exams", "study-tips"],
      hasVolunteerResponse: true,
      hasAIResponse: true,
    },
    {
      id: 2,
      title: "Feeling isolated in my program",
      content: "Everyone seems to have their friend groups already. I'm in my second year and still feel like an outsider. Anyone else experience this?",
      author: "Anonymous Student #8192",
      course: "Computer Science",
      timestamp: "5 hours ago",
      replies: 18,
      hearts: 32,
      isAnonymous: true,
      tags: ["loneliness", "friendship", "social-anxiety"],
      hasVolunteerResponse: true,
      hasAIResponse: false,
    },
    {
      id: 3,
      title: "Balancing work and studies - anyone managing both?",
      content: "Working part-time while studying is exhausting. How do you manage time and avoid burnout?",
      author: "Anonymous Student #5634",
      course: "Business",
      timestamp: "1 day ago",
      replies: 31,
      hearts: 67,
      isAnonymous: true,
      tags: ["work-life-balance", "time-management", "burnout"],
      hasVolunteerResponse: true,
      hasAIResponse: true,
    },
    {
      id: 4,
      title: "Imposter syndrome in competitive program",
      content: "Sometimes I feel like I don't belong here. Everyone seems so much smarter. Does this feeling ever go away?",
      author: "Anonymous Student #3421",
      course: "Medicine",
      timestamp: "2 days ago",
      replies: 41,
      hearts: 89,
      isAnonymous: true,
      tags: ["imposter-syndrome", "self-doubt", "confidence"],
      hasVolunteerResponse: true,
      hasAIResponse: true,
    },
  ];

  const filteredPosts = selectedCourse === 'all' 
    ? posts 
    : posts.filter(post => post.course.toLowerCase().includes(selectedCourse));

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
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <AnimatedIcon name="users" size={14} color="white" /> Peer Support
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Student Community Platform
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
              Connect with peers in your field. Share experiences, seek support, and help others in a safe, moderated environment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Course Communities */}
            <div className="lg:col-span-1">
              <div
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  padding: "1.5rem",
                  position: "sticky",
                  top: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "var(--color-text-primary)",
                    marginBottom: "1rem",
                  }}
                >
                  Communities
                </h3>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        textAlign: "left",
                        backgroundColor: selectedCourse === course.id ? "var(--color-primary)" : "transparent",
                        color: selectedCourse === course.id ? "white" : "var(--color-text-primary)",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        if (selectedCourse !== course.id) {
                          e.target.style.backgroundColor = "var(--color-border)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (selectedCourse !== course.id) {
                          e.target.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.9rem" }}>{course.name}</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            opacity: 0.7,
                          }}
                        >
                          {course.members}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Guidelines */}
                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Community Guidelines
                  </h4>
                  <ul
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: "1.4",
                      margin: 0,
                      paddingLeft: "1rem",
                    }}
                  >
                    <li>Be respectful and supportive</li>
                    <li>No personal attacks or discrimination</li>
                    <li>Respect anonymity choices</li>
                    <li>Professional help for crises</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--color-text-primary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="replies">Most Replies</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowNewPostModal(true)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
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
                  <AnimatedIcon name="edit" size={16} className="mr-2" color="white" />
                  New Post
                </button>
              </div>

              {/* Posts */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Post Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {post.author}
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            •
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-primary)",
                              fontWeight: "500",
                            }}
                          >
                            {post.course}
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            •
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {post.timestamp}
                          </span>
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
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.5",
                        marginBottom: "1rem",
                      }}
                    >
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor: "var(--color-border)",
                            color: "var(--color-text-secondary)",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "var(--radius-md)",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--color-border)",
                      }}
                    >
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "none",
                            border: "none",
                            color: "var(--color-text-secondary)",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                          }}
                        >
                          <AnimatedIcon name="heart" size={16} /> {post.hearts}
                        </button>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "none",
                            border: "none",
                            color: "var(--color-text-secondary)",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                          }}
                        >
                          <AnimatedIcon name="message" size={16} /> {post.replies} replies
                        </button>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        {post.hasVolunteerResponse && (
                          <span
                            style={{
                              fontSize: "0.8rem",
                              backgroundColor: "var(--color-success)",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "var(--radius-md)",
                            }}
                          >
                            🎓 Volunteer
                          </span>
                        )}
                        {post.hasAIResponse && (
                          <span
                            style={{
                              fontSize: "0.8rem",
                              backgroundColor: "var(--color-primary)",
                              color: "white",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "var(--radius-md)",
                            }}
                          >
                            🤖 AI Helper
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button
                  style={{
                    padding: "0.75rem 2rem",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "var(--color-border)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "var(--color-surface)";
                  }}
                >
                  Load More Posts
                </button>
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Community Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "15.2K", label: "Active Members", icon: "users" },
                { number: "2.8K", label: "Discussions", icon: "message" },
                { number: "450", label: "Volunteer Responses", icon: "user-check" },
                { number: "98%", label: "Positive Feedback", icon: "star" },
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <AnimatedIcon name={stat.icon} size={32} color="var(--color-primary)" />
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "var(--color-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowNewPostModal(false)}
        >
          <div
            style={{
              backgroundColor: "var(--color-background)",
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              Create New Post
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Content
                </label>
                <textarea
                  rows="4"
                  placeholder="Share your thoughts, experiences, or questions..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-text-primary)",
                    resize: "vertical",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                  }}
                >
                  Post Anonymously
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
