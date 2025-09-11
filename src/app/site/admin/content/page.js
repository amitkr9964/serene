"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState } from "react";

export default function ContentManagement() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("resources");
  const [searchTerm, setSearchTerm] = useState("");
  const [contentFilter, setContentFilter] = useState("all");

  // Mock data for resources
  const resources = [
    {
      id: "RES001",
      title: "Managing Anxiety in Academic Settings",
      type: "Article",
      category: "Mental Health",
      language: "English",
      views: 1247,
      downloads: 89,
      rating: 4.8,
      status: "published",
      dateCreated: "2024-08-15",
      lastUpdated: "2024-09-01",
      author: "Dr. Sarah Chen",
      tags: ["anxiety", "academic-stress", "coping-strategies"],
    },
    {
      id: "RES002", 
      title: "Meditation for Stress Relief",
      type: "Audio",
      category: "Wellness",
      language: "Hindi",
      views: 892,
      downloads: 156,
      rating: 4.9,
      status: "published",
      dateCreated: "2024-07-20",
      lastUpdated: "2024-08-10",
      author: "Dr. Aisha Patel",
      tags: ["meditation", "stress-relief", "mindfulness"],
    },
    {
      id: "RES003",
      title: "Understanding Depression Symptoms",
      type: "Video",
      category: "Educational",
      language: "English",
      views: 2156,
      downloads: 0,
      rating: 4.7,
      status: "published", 
      dateCreated: "2024-06-30",
      lastUpdated: "2024-08-25",
      author: "Dr. Michael Rodriguez",
      tags: ["depression", "symptoms", "awareness"],
    },
    {
      id: "RES004",
      title: "Crisis Support Guidelines",
      type: "Document",
      category: "Emergency",
      language: "Multiple",
      views: 445,
      downloads: 67,
      rating: 4.6,
      status: "draft",
      dateCreated: "2024-09-05",
      lastUpdated: "2024-09-10",
      author: "Dr. James Wilson",
      tags: ["crisis", "emergency", "guidelines"],
    },
    {
      id: "RES005",
      title: "Building Healthy Study Habits",
      type: "Interactive",
      category: "Academic",
      language: "Spanish",
      views: 678,
      downloads: 34,
      rating: 4.5,
      status: "published",
      dateCreated: "2024-08-01",
      lastUpdated: "2024-08-20",
      author: "Dr. Maria Santos", 
      tags: ["study-habits", "academic-success", "productivity"],
    },
  ];

  // Mock data for peer support posts
  const peerPosts = [
    {
      id: "POST001",
      title: "Struggling with finals week anxiety",
      community: "Computer Science", 
      author: "Anonymous #4729",
      content: "Has anyone else been feeling overwhelmed with upcoming finals? Looking for some coping strategies...",
      replies: 23,
      upvotes: 45,
      status: "active",
      datePosted: "2024-09-11",
      lastActivity: "2 hours ago",
      tags: ["anxiety", "finals", "study-stress"],
      flagged: false,
    },
    {
      id: "POST002",
      title: "Success story: Overcoming social anxiety",
      community: "Psychology",
      author: "Anonymous #3891", 
      content: "Wanted to share my journey of managing social anxiety through counseling and peer support...",
      replies: 67,
      upvotes: 128,
      status: "active",
      datePosted: "2024-09-10",
      lastActivity: "5 hours ago",
      tags: ["social-anxiety", "success-story", "recovery"],
      flagged: false,
    },
    {
      id: "POST003",
      title: "Inappropriate content example",
      community: "Engineering",
      author: "Anonymous #5672",
      content: "This is an example of content that has been flagged for review...",
      replies: 3,
      upvotes: 1,
      status: "flagged",
      datePosted: "2024-09-11", 
      lastActivity: "1 day ago",
      tags: ["flagged-content"],
      flagged: true,
    },
    {
      id: "POST004",
      title: "Tips for managing homesickness",
      community: "Medicine",
      author: "Anonymous #2847",
      content: "First year medical student here. Any advice on dealing with being away from home?",
      replies: 34,
      upvotes: 78,
      status: "active",
      datePosted: "2024-09-09",
      lastActivity: "1 day ago",
      tags: ["homesickness", "first-year", "adjustment"],
      flagged: false,
    },
  ];

  // Mock cultural content
  const culturalContent = [
    {
      id: "CUL001",
      title: "Islamic Perspectives on Mental Health",
      religion: "Islam",
      type: "Article",
      language: "Arabic, English",
      views: 567,
      rating: 4.9,
      status: "published",
      author: "Dr. Ahmed Hassan",
      dateCreated: "2024-08-20",
    },
    {
      id: "CUL002",
      title: "Buddhist Mindfulness Practices",
      religion: "Buddhism", 
      type: "Guided Practice",
      language: "English",
      views: 892,
      rating: 4.8,
      status: "published",
      author: "Lama Tenzin",
      dateCreated: "2024-07-15",
    },
    {
      id: "CUL003",
      title: "Christian Prayer for Healing",
      religion: "Christianity",
      type: "Audio",
      language: "English, Spanish",
      views: 445,
      rating: 4.7,
      status: "published",
      author: "Rev. Michael Johnson",
      dateCreated: "2024-08-10",
    },
  ];

  const Card = ({ children, className = "", style = {} }) => (
    <div
      className={`p-6 rounded-lg border ${className}`}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
    >
      {children}
    </div>
  );

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "published": return "var(--color-success)";
        case "draft": return "var(--color-warning)";
        case "flagged": return "var(--color-error)";
        case "under-review": return "var(--color-info)";
        case "active": return "var(--color-success)";
        default: return "var(--color-info)";
      }
    };

    return (
      <span
        style={{
          padding: "0.25rem 0.75rem",
          backgroundColor: `${getStatusColor(status)}20`,
          color: getStatusColor(status),
          borderRadius: "var(--radius-full)",
          fontSize: "0.8rem",
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {status.replace("-", " ")}
      </span>
    );
  };

  const RatingStars = ({ rating }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? "var(--color-warning)" : "var(--color-border)", fontSize: "0.8rem" }}>
          ⭐
        </span>
      ))}
      <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginLeft: "0.25rem" }}>
        ({rating})
      </span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "700", 
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem" 
          }}>
            Content Management
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Manage educational resources, peer support content, and cultural materials
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-secondary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🔍 Content Review
          </button>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ➕ Add Content
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { id: "resources", label: "Educational Resources", count: resources.length, icon: "📚" },
            { id: "peer-support", label: "Peer Support Posts", count: peerPosts.length, icon: "💬" },
            { id: "cultural", label: "Cultural Content", count: culturalContent.length, icon: "🌍" },
            { id: "analytics", label: "Content Analytics", count: null, icon: "📊" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "1rem 1.5rem",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid var(--color-primary)" : "2px solid transparent",
                color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text-secondary)",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.count && (
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Search Content
            </label>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
          
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Filter by Type
            </label>
            <select
              value={contentFilter}
              onChange={(e) => setContentFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="interactive">Interactive</option>
              <option value="document">Documents</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Status
            </label>
            <select
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="flagged">Flagged</option>
              <option value="under-review">Under Review</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Language
            </label>
            <select
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <option value="all">All Languages</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="arabic">Arabic</option>
              <option value="multiple">Multiple</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "resources" && (
        <Card>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
              Educational Resources ({resources.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Content Details
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Type & Category
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Engagement
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Rating
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Status
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Last Updated
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                          {resource.title}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                          By {resource.author}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          Language: {resource.language}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                          {resource.type}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          {resource.category}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                          👁️ {resource.views.toLocaleString()} views
                        </div>
                        {resource.downloads > 0 && (
                          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                            📥 {resource.downloads} downloads
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <RatingStars rating={resource.rating} />
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={resource.status} />
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                      {resource.lastUpdated}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          style={{
                            padding: "0.5rem",
                            backgroundColor: "var(--color-info)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          👁️ View
                        </button>
                        <button
                          style={{
                            padding: "0.5rem",
                            backgroundColor: "var(--color-secondary)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "peer-support" && (
        <Card>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
              Peer Support Posts ({peerPosts.length})
            </h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ 
                padding: "0.5rem 1rem", 
                backgroundColor: "var(--color-error-light)", 
                color: "var(--color-error)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}>
                🚩 1 Flagged Post
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {peerPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  padding: "1.5rem",
                  backgroundColor: post.flagged ? "var(--color-error-light)" : "var(--color-background)",
                  border: `1px solid ${post.flagged ? "var(--color-error)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-lg)",
                  borderLeft: post.flagged ? "4px solid var(--color-error)" : "4px solid transparent",
                }}
              >
                <div style={{ display: "flex", justifyContent: "between", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                          {post.title}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          <span>🏫 {post.community}</span>
                          <span>👤 {post.author}</span>
                          <span>📅 {post.datePosted}</span>
                          <span>⏰ {post.lastActivity}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <StatusBadge status={post.status} />
                        {post.flagged && (
                          <span style={{ 
                            padding: "0.25rem 0.75rem",
                            backgroundColor: "var(--color-error)",
                            color: "white",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.8rem",
                            fontWeight: "600"
                          }}>
                            🚩 FLAGGED
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)", marginBottom: "1rem", lineHeight: "1.5" }}>
                      {post.content}
                    </div>
                    
                    <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                          👍 {post.upvotes} upvotes
                        </span>
                        <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                          💬 {post.replies} replies
                        </span>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              style={{
                                padding: "0.25rem 0.5rem",
                                backgroundColor: "var(--color-primary-light)",
                                color: "var(--color-primary)",
                                borderRadius: "var(--radius-full)",
                                fontSize: "0.7rem",
                                fontWeight: "500",
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "var(--color-info)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          👁️ View Full Post
                        </button>
                        {post.flagged && (
                          <button
                            style={{
                              padding: "0.5rem 1rem",
                              backgroundColor: "var(--color-warning)",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--radius-md)",
                              cursor: "pointer",
                              fontSize: "0.8rem",
                            }}
                          >
                            🔍 Review Content
                          </button>
                        )}
                        <button
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: post.flagged ? "var(--color-error)" : "var(--color-secondary)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          {post.flagged ? "🗑️ Remove" : "⚡ Moderate"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "cultural" && (
        <Card>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
              Cultural Content ({culturalContent.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {culturalContent.map((content) => (
              <div
                key={content.id}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  borderTop: "4px solid var(--color-accent)",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
                    {content.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    <span>🕊️ {content.religion}</span>
                    <span>📄 {content.type}</span>
                    <span>🌍 {content.language}</span>
                  </div>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                      👁️ {content.views} views
                    </span>
                    <RatingStars rating={content.rating} />
                  </div>
                  <StatusBadge status={content.status} />
                </div>
                
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
                  By {content.author} • {content.dateCreated}
                </div>
                
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "var(--color-info)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      flex: 1,
                    }}
                  >
                    👁️ View Content
                  </button>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "var(--color-secondary)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      flex: 1,
                    }}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Performance */}
          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              Top Performing Content
            </h3>
            <div className="space-y-3">
              {[
                { title: "Understanding Depression Symptoms", views: 2156, type: "Video" },
                { title: "Managing Anxiety in Academic Settings", views: 1247, type: "Article" },
                { title: "Meditation for Stress Relief", views: 892, type: "Audio" },
                { title: "Building Healthy Study Habits", views: 678, type: "Interactive" },
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  padding: "0.75rem",
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)"
                }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {item.type}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-primary)" }}>
                    {item.views.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Community Engagement */}
          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              Community Engagement
            </h3>
            <div className="space-y-4">
              {[
                { community: "Computer Science", posts: 45, engagement: 92 },
                { community: "Psychology", posts: 38, engagement: 87 },
                { community: "Engineering", posts: 34, engagement: 78 },
                { community: "Medicine", posts: 29, engagement: 85 },
              ].map((item, index) => (
                <div key={index}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {item.community}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {item.posts} posts • {item.engagement}% engagement
                    </span>
                  </div>
                  <div style={{ 
                    width: "100%", 
                    height: "8px", 
                    backgroundColor: "var(--color-background)", 
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{ 
                      width: `${item.engagement}%`, 
                      height: "100%", 
                      backgroundColor: "var(--color-success)",
                      borderRadius: "4px"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Content Moderation */}
          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              Content Moderation
            </h3>
            <div className="space-y-4">
              {[
                { status: "Flagged Posts", count: 3, color: "var(--color-error)", icon: "🚩" },
                { status: "Under Review", count: 7, color: "var(--color-warning)", icon: "⏳" },
                { status: "Approved Today", count: 23, color: "var(--color-success)", icon: "✅" },
                { status: "Auto-Moderated", count: 156, color: "var(--color-info)", icon: "🤖" },
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "1rem",
                  padding: "1rem",
                  backgroundColor: `${item.color}10`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: "var(--radius-md)",
                }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: item.color,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: item.color }}>
                      {item.count}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
