"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState, useEffect } from "react";

export default function SessionAnalytics() {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("sessions");
  const [liveMetrics, setLiveMetrics] = useState({
    activeSessions: 15,
    completedToday: 87,
    averageDuration: 42,
    satisfactionRate: 4.7,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeSessions: Math.max(5, prev.activeSessions + Math.floor(Math.random() * 3 - 1)),
        completedToday: prev.completedToday + Math.floor(Math.random() * 2),
        averageDuration: Math.max(30, prev.averageDuration + Math.floor(Math.random() * 4 - 2)),
        satisfactionRate: Math.max(4.0, Math.min(5.0, prev.satisfactionRate + (Math.random() * 0.2 - 0.1))).toFixed(1),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sessionData = [
    {
      id: "SES001",
      studentId: "Student #4729",
      counselorName: "Dr. Sarah Chen",
      date: "2024-09-11",
      time: "2:30 PM - 3:15 PM",
      duration: 45,
      type: "Individual Counseling",
      category: "Anxiety Management",
      status: "completed",
      rating: 5,
      notes: "Student showed significant improvement in coping strategies",
      emergencyLevel: "low",
    },
    {
      id: "SES002",
      studentId: "Student #3891",
      counselorName: "Dr. Michael Rodriguez",
      date: "2024-09-11", 
      time: "1:00 PM - 1:50 PM",
      duration: 50,
      type: "Crisis Intervention",
      category: "Academic Stress",
      status: "completed",
      rating: 4,
      notes: "Crisis successfully de-escalated, follow-up scheduled",
      emergencyLevel: "high",
    },
    {
      id: "SES003",
      studentId: "Student #5672",
      counselorName: "Dr. Aisha Patel",
      date: "2024-09-11",
      time: "3:30 PM - 4:15 PM",
      duration: 45,
      type: "Follow-up Session",
      category: "Depression Support",
      status: "in-progress",
      rating: null,
      notes: "Ongoing session",
      emergencyLevel: "medium",
    },
    {
      id: "SES004",
      studentId: "Student #2847",
      counselorName: "Dr. James Wilson",
      date: "2024-09-11",
      time: "12:00 PM - 12:45 PM",
      duration: 45,
      type: "Group Therapy",
      category: "Substance Abuse",
      status: "completed",
      rating: 5,
      notes: "Group session with 4 participants, positive engagement",
      emergencyLevel: "medium",
    },
    {
      id: "SES005",
      studentId: "Student #8934",
      counselorName: "Dr. Sarah Chen",
      date: "2024-09-10",
      time: "4:00 PM - 4:30 PM",
      duration: 30,
      type: "Check-in Session",
      category: "General Wellness",
      status: "completed",
      rating: 4,
      notes: "Brief wellness check, student doing well",
      emergencyLevel: "low",
    },
  ];

  const weeklyTrends = [
    { day: "Mon", sessions: 45, satisfaction: 4.6, avgDuration: 43 },
    { day: "Tue", sessions: 52, satisfaction: 4.8, avgDuration: 41 },
    { day: "Wed", sessions: 38, satisfaction: 4.5, avgDuration: 46 },
    { day: "Thu", sessions: 61, satisfaction: 4.7, avgDuration: 44 },
    { day: "Fri", sessions: 55, satisfaction: 4.9, avgDuration: 42 },
    { day: "Sat", sessions: 23, satisfaction: 4.4, avgDuration: 48 },
    { day: "Sun", sessions: 18, satisfaction: 4.3, avgDuration: 50 },
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
        case "completed": return "var(--color-success)";
        case "in-progress": return "var(--color-warning)";
        case "cancelled": return "var(--color-error)";
        case "scheduled": return "var(--color-info)";
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

  const EmergencyBadge = ({ level }) => {
    const getColor = (level) => {
      switch (level) {
        case "low": return "var(--color-success)";
        case "medium": return "var(--color-warning)";
        case "high": return "var(--color-error)";
        default: return "var(--color-info)";
      }
    };

    const getIcon = (level) => {
      switch (level) {
        case "low": return "🟢";
        case "medium": return "🟡";
        case "high": return "🔴";
        default: return "⚪";
      }
    };

    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.25rem 0.75rem",
          backgroundColor: `${getColor(level)}20`,
          color: getColor(level),
          borderRadius: "var(--radius-full)",
          fontSize: "0.8rem",
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {getIcon(level)} {level}
      </span>
    );
  };

  const RatingStars = ({ rating }) => {
    if (!rating) return <span style={{ color: "var(--color-text-secondary)" }}>Not rated</span>;
    
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? "var(--color-warning)" : "var(--color-border)" }}>
            ⭐
          </span>
        ))}
        <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginLeft: "0.25rem" }}>
          ({rating})
        </span>
      </div>
    );
  };

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
            Session Analytics
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Monitor counseling session performance and outcomes
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text-primary)",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          
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
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Active Now</span>
            <div style={{ 
              width: "8px", 
              height: "8px", 
              backgroundColor: "var(--color-success)", 
              borderRadius: "50%",
              animation: "pulse 2s infinite" 
            }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-success)" }}>
            {liveMetrics.activeSessions}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Live sessions
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Today</span>
            <span style={{ fontSize: "0.8rem" }}>✅</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary)" }}>
            {liveMetrics.completedToday}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Completed sessions
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Avg Duration</span>
            <span style={{ fontSize: "0.8rem" }}>⏱️</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-info)" }}>
            {liveMetrics.averageDuration}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            minutes
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Satisfaction</span>
            <span style={{ fontSize: "0.8rem" }}>⭐</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-warning)" }}>
            {liveMetrics.satisfactionRate}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            out of 5.0
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Trends */}
        <Card>
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
              Weekly Trends
            </h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setSelectedMetric("sessions")}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: selectedMetric === "sessions" ? "var(--color-primary)" : "var(--color-background)",
                  color: selectedMetric === "sessions" ? "white" : "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Sessions
              </button>
              <button
                onClick={() => setSelectedMetric("satisfaction")}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: selectedMetric === "satisfaction" ? "var(--color-primary)" : "var(--color-background)",
                  color: selectedMetric === "satisfaction" ? "white" : "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Satisfaction
              </button>
              <button
                onClick={() => setSelectedMetric("duration")}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: selectedMetric === "duration" ? "var(--color-primary)" : "var(--color-background)",
                  color: selectedMetric === "duration" ? "white" : "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Duration
              </button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", height: "200px", marginBottom: "1rem" }}>
            {weeklyTrends.map((day, index) => {
              let value, maxValue, unit;
              if (selectedMetric === "sessions") {
                value = day.sessions;
                maxValue = 70;
                unit = "";
              } else if (selectedMetric === "satisfaction") {
                value = day.satisfaction;
                maxValue = 5;
                unit = "";
              } else {
                value = day.avgDuration;
                maxValue = 60;
                unit = "min";
              }
              
              const height = (value / maxValue) * 180;
              
              return (
                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "32px",
                      height: `${height}px`,
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        color: "var(--color-text-primary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {value}{unit}
                    </div>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: "500" }}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Session Categories */}
        <Card>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
            Session Categories
          </h3>
          
          <div className="space-y-4">
            {[
              { category: "Anxiety Management", count: 145, percentage: 32, color: "var(--color-primary)" },
              { category: "Depression Support", count: 98, percentage: 22, color: "var(--color-secondary)" },
              { category: "Academic Stress", count: 87, percentage: 19, color: "var(--color-accent)" },
              { category: "Substance Abuse", count: 54, percentage: 12, color: "var(--color-warning)" },
              { category: "Crisis Intervention", count: 43, percentage: 10, color: "var(--color-error)" },
              { category: "General Wellness", count: 23, percentage: 5, color: "var(--color-success)" },
            ].map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {item.count} sessions ({item.percentage}%)
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
                      width: `${item.percentage}%`, 
                      height: "100%", 
                      backgroundColor: item.color,
                      borderRadius: "4px"
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Sessions Table */}
      <Card>
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
            Recent Sessions
          </h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="search"
              placeholder="Search sessions..."
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                color: "var(--color-text-primary)",
              }}
            />
            <select
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="group">Group Therapy</option>
              <option value="crisis">Crisis Intervention</option>
              <option value="followup">Follow-up</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Session Details
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Student
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Counselor
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Category
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Emergency
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Status
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Rating
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sessionData.map((session) => (
                <tr key={session.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                        {session.type}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                        {session.date} • {session.time}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                        Duration: {session.duration} minutes
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {session.studentId}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                      {session.counselorName}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                      {session.category}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <EmergencyBadge level={session.emergencyLevel} />
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <StatusBadge status={session.status} />
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <RatingStars rating={session.rating} />
                  </td>
                  <td style={{ padding: "1rem" }}>
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
                      📋 View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
