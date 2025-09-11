"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState } from "react";

export default function UserManagement() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: "all",
    department: "all",
    joinDate: "all",
  });

  // Mock data
  const students = [
    {
      id: "STU001",
      anonymousId: "Student #4729",
      department: "Computer Science",
      year: "3rd Year",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      sessionsCount: 8,
      status: "active",
      riskLevel: "low",
      engagement: 85,
    },
    {
      id: "STU002",
      anonymousId: "Student #3891",
      department: "Psychology", 
      year: "2nd Year",
      joinDate: "2024-02-03",
      lastActive: "1 day ago",
      sessionsCount: 15,
      status: "active",
      riskLevel: "medium",
      engagement: 92,
    },
    {
      id: "STU003",
      anonymousId: "Student #5672",
      department: "Engineering",
      year: "4th Year", 
      joinDate: "2023-09-12",
      lastActive: "5 days ago",
      sessionsCount: 3,
      status: "inactive",
      riskLevel: "high",
      engagement: 34,
    },
    {
      id: "STU004",
      anonymousId: "Student #2847",
      department: "Medicine",
      year: "1st Year",
      joinDate: "2024-03-20",
      lastActive: "30 minutes ago", 
      sessionsCount: 12,
      status: "active",
      riskLevel: "low",
      engagement: 78,
    },
    {
      id: "STU005",
      anonymousId: "Student #8934",
      department: "Business",
      year: "2nd Year",
      joinDate: "2024-01-28",
      lastActive: "3 hours ago",
      sessionsCount: 6,
      status: "active",
      riskLevel: "medium",
      engagement: 67,
    },
  ];

  const counselors = [
    {
      id: "COU001",
      name: "Dr. Sarah Chen",
      email: "sarah.chen@university.edu",
      specialization: "Anxiety & Depression",
      license: "LP12345",
      joinDate: "2023-08-15",
      status: "online",
      sessionsToday: 6,
      totalSessions: 234,
      rating: 4.9,
      languages: ["English", "Mandarin"],
      availability: "Full-time",
      nextAvailable: "2:30 PM",
    },
    {
      id: "COU002", 
      name: "Dr. Michael Rodriguez",
      email: "m.rodriguez@university.edu",
      specialization: "Trauma & PTSD",
      license: "LP67890",
      joinDate: "2023-06-20",
      status: "busy",
      sessionsToday: 4,
      totalSessions: 189,
      rating: 4.8,
      languages: ["English", "Spanish"],
      availability: "Part-time",
      nextAvailable: "Tomorrow 9:00 AM",
    },
    {
      id: "COU003",
      name: "Dr. Aisha Patel", 
      email: "aisha.patel@university.edu",
      specialization: "Academic Stress",
      license: "LP54321",
      joinDate: "2024-01-10",
      status: "offline",
      sessionsToday: 0,
      totalSessions: 67,
      rating: 4.7,
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Full-time",
      nextAvailable: "Offline until Monday",
    },
    {
      id: "COU004",
      name: "Dr. James Wilson",
      email: "james.wilson@university.edu", 
      specialization: "Substance Abuse",
      license: "LP98765",
      joinDate: "2023-03-15",
      status: "online",
      sessionsToday: 8,
      totalSessions: 312,
      rating: 4.9,
      languages: ["English"],
      availability: "Full-time",
      nextAvailable: "Available Now",
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

  const StatusBadge = ({ status, type = "default" }) => {
    const getStatusColor = (status, type) => {
      if (type === "risk") {
        switch (status) {
          case "low": return "var(--color-success)";
          case "medium": return "var(--color-warning)";
          case "high": return "var(--color-error)";
          default: return "var(--color-info)";
        }
      }
      
      switch (status) {
        case "active":
        case "online": return "var(--color-success)";
        case "busy": return "var(--color-warning)";
        case "inactive":
        case "offline": return "var(--color-error)";
        default: return "var(--color-info)";
      }
    };

    return (
      <span
        style={{
          padding: "0.25rem 0.75rem",
          backgroundColor: `${getStatusColor(status, type)}20`,
          color: getStatusColor(status, type),
          borderRadius: "var(--radius-full)",
          fontSize: "0.8rem",
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  };

  const EngagementBar = ({ value }) => (
    <div style={{ width: "100px", height: "8px", backgroundColor: "var(--color-background)", borderRadius: "4px", overflow: "hidden" }}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          backgroundColor: value > 70 ? "var(--color-success)" : value > 40 ? "var(--color-warning)" : "var(--color-error)",
          borderRadius: "4px",
        }}
      />
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
            User Management
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Manage students and counselors on the platform
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
            👩‍⚕️ Add Counselor
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { id: "students", label: "Students", count: students.length, icon: "🎓" },
            { id: "counselors", label: "Counselors", count: counselors.length, icon: "🩺" },
            { id: "analytics", label: "User Analytics", count: null, icon: "📊" },
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

      {/* Filters & Search */}
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Search
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
              Status
            </label>
            <select
              value={selectedFilters.status}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Department
            </label>
            <select
              value={selectedFilters.department}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, department: e.target.value }))}
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
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Psychology">Psychology</option>
              <option value="Business">Business</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", display: "block" }}>
              Join Date
            </label>
            <select
              value={selectedFilters.joinDate}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, joinDate: e.target.value }))}
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
              <option value="all">All Time</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="last3Months">Last 3 Months</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "students" && (
        <Card>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
              Student Accounts ({students.length})
            </h2>
            <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              ℹ️ Student identities remain anonymous for privacy
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Anonymous ID
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Department
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Sessions
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Engagement
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Risk Level
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Status
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Last Active
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                          {student.anonymousId}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          {student.year}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                      {student.department}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                        {student.sessionsCount}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                        sessions
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <EngagementBar value={student.engagement} />
                        <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          {student.engagement}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={student.riskLevel} type="risk" />
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={student.status} />
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                      {student.lastActive}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          style={{
                            padding: "0.5rem",
                            backgroundColor: "var(--color-primary)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          📊 View Analytics
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

      {activeTab === "counselors" && (
        <Card>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
              Counselor Accounts ({counselors.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Counselor
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Specialization
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Sessions Today
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Total Sessions
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Rating
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Status
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Next Available
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {counselors.map((counselor) => (
                  <tr key={counselor.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                          {counselor.name}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                          {counselor.email}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                          License: {counselor.license}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                        {counselor.specialization}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                        {counselor.languages.join(", ")}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--color-primary)" }}>
                        {counselor.sessionsToday}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                        {counselor.totalSessions}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <span style={{ fontSize: "1rem", color: "var(--color-warning)" }}>⭐</span>
                        <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                          {counselor.rating}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge status={counselor.status} />
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                      {counselor.nextAvailable}
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
                          👁️ View Profile
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

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              User Growth Trends
            </h3>
            <div className="space-y-4">
              {[
                { period: "This Week", students: "+47", counselors: "+2", percentage: 12.5 },
                { period: "This Month", students: "+189", counselors: "+5", percentage: 8.7 },
                { period: "Last 3 Months", students: "+892", counselors: "+15", percentage: 25.3 },
              ].map((trend, index) => (
                <div key={index} style={{ 
                  padding: "1rem", 
                  backgroundColor: "var(--color-background)", 
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                        {trend.period}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                        Students: {trend.students} | Counselors: {trend.counselors}
                      </div>
                    </div>
                    <div style={{ 
                      padding: "0.5rem 1rem", 
                      backgroundColor: "var(--color-success-light)", 
                      color: "var(--color-success)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.9rem",
                      fontWeight: "600"
                    }}>
                      +{trend.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              Department Distribution
            </h3>
            <div className="space-y-3">
              {[
                { dept: "Computer Science", count: 567, percentage: 28.4 },
                { dept: "Engineering", count: 432, percentage: 21.6 },
                { dept: "Medicine", count: 389, percentage: 19.5 },
                { dept: "Psychology", count: 298, percentage: 14.9 },
                { dept: "Business", count: 234, percentage: 11.7 },
                { dept: "Others", count: 80, percentage: 4.0 },
              ].map((dept, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {dept.dept}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {dept.count} students
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ 
                      width: "60px", 
                      height: "8px", 
                      backgroundColor: "var(--color-background)", 
                      borderRadius: "4px",
                      overflow: "hidden"
                    }}>
                      <div style={{ 
                        width: `${dept.percentage * 2}px`, 
                        height: "100%", 
                        backgroundColor: "var(--color-primary)",
                        borderRadius: "4px"
                      }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {dept.percentage}%
                    </span>
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
