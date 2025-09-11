"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState } from "react";

export default function ReportsAndTrends() {
  const { theme } = useTheme();
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("mental-health");

  // Mock comprehensive data
  const mentalHealthTrends = [
    { month: "Jan", anxiety: 67, depression: 45, stress: 89, wellness: 34 },
    { month: "Feb", anxiety: 72, depression: 52, stress: 94, wellness: 41 },
    { month: "Mar", anxiety: 85, depression: 61, stress: 112, wellness: 38 },
    { month: "Apr", anxiety: 94, depression: 58, stress: 98, wellness: 45 },
    { month: "May", anxiety: 78, depression: 49, stress: 87, wellness: 52 },
    { month: "Jun", anxiety: 71, depression: 43, stress: 76, wellness: 48 },
    { month: "Jul", anxiety: 65, depression: 38, stress: 68, wellness: 44 },
    { month: "Aug", anxiety: 73, depression: 47, stress: 82, wellness: 49 },
    { month: "Sep", anxiety: 81, depression: 54, stress: 91, wellness: 46 },
  ];

  const departmentStats = [
    { 
      department: "Computer Science", 
      totalStudents: 1247, 
      activeUsers: 892, 
      sessionsThisMonth: 234, 
      avgSessionsPerStudent: 2.8,
      topConcerns: ["Academic Stress", "Social Anxiety", "Career Pressure"],
      riskLevel: "medium",
      improvementRate: 12.5
    },
    { 
      department: "Engineering", 
      totalStudents: 1089, 
      activeUsers: 723, 
      sessionsThisMonth: 187, 
      avgSessionsPerStudent: 2.2,
      topConcerns: ["Workload Stress", "Impostor Syndrome", "Time Management"],
      riskLevel: "high",
      improvementRate: 8.7
    },
    { 
      department: "Medicine", 
      totalStudents: 856, 
      activeUsers: 634, 
      sessionsThisMonth: 298, 
      avgSessionsPerStudent: 3.4,
      topConcerns: ["Burnout", "Performance Anxiety", "Ethical Dilemmas"],
      riskLevel: "high",
      improvementRate: 15.3
    },
    { 
      department: "Psychology", 
      totalStudents: 567, 
      activeUsers: 423, 
      sessionsThisMonth: 156, 
      avgSessionsPerStudent: 2.1,
      topConcerns: ["Self-Analysis", "Emotional Overwhelm", "Academic Identity"],
      riskLevel: "low",
      improvementRate: 18.9
    },
    { 
      department: "Business", 
      totalStudents: 734, 
      activeUsers: 498, 
      sessionsThisMonth: 143, 
      avgSessionsPerStudent: 1.9,
      topConcerns: ["Competition Stress", "Networking Anxiety", "Future Uncertainty"],
      riskLevel: "medium",
      improvementRate: 10.2
    },
  ];

  const crisisInterventions = [
    {
      date: "2024-09-11",
      time: "14:30",
      studentId: "Student #4729",
      triggerType: "Academic Failure",
      severity: "High",
      responseTime: "3 minutes",
      outcome: "Successfully De-escalated",
      followUpScheduled: true,
      counselor: "Dr. Sarah Chen"
    },
    {
      date: "2024-09-10",
      time: "22:15",
      studentId: "Student #3891",
      triggerType: "Social Isolation",
      severity: "Medium",
      responseTime: "7 minutes",
      outcome: "Referred to Support Group",
      followUpScheduled: true,
      counselor: "Dr. Michael Rodriguez"
    },
    {
      date: "2024-09-09",
      time: "16:45",
      studentId: "Student #5672",
      triggerType: "Family Issues",
      severity: "High",
      responseTime: "2 minutes",
      outcome: "Emergency Session Completed",
      followUpScheduled: true,
      counselor: "Dr. James Wilson"
    },
  ];

  const platformUsage = {
    chatInteractions: {
      total: 15672,
      thisMonth: 2834,
      avgPerDay: 94,
      peakHours: ["2-4 PM", "8-10 PM"],
      satisfactionRate: 4.6
    },
    resourceAccess: {
      totalViews: 23456,
      downloadCount: 3421,
      mostPopular: "Anxiety Management Guide",
      engagementRate: 67,
      completionRate: 43
    },
    peerSupport: {
      totalPosts: 1892,
      activeDiscussions: 234,
      resolutionRate: 78,
      moderationNeeded: 12,
      communityHealth: 87
    },
    bookingSystem: {
      totalBookings: 2341,
      completionRate: 91,
      noShowRate: 6,
      avgWaitTime: "2.3 days",
      satisfaction: 4.8
    }
  };

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

  const RiskLevelBadge = ({ level }) => {
    const getRiskColor = (level) => {
      switch (level) {
        case "low": return "var(--color-success)";
        case "medium": return "var(--color-warning)";
        case "high": return "var(--color-error)";
        default: return "var(--color-info)";
      }
    };

    return (
      <span
        style={{
          padding: "0.25rem 0.75rem",
          backgroundColor: `${getRiskColor(level)}20`,
          color: getRiskColor(level),
          borderRadius: "var(--radius-full)",
          fontSize: "0.8rem",
          fontWeight: "500",
          textTransform: "uppercase",
        }}
      >
        {level} Risk
      </span>
    );
  };

  const TrendChart = ({ data, selectedMetric }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.anxiety, d.depression, d.stress, d.wellness)));
    
    return (
      <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", height: "300px", marginBottom: "1rem" }}>
        {data.map((item, index) => {
          const values = {
            anxiety: item.anxiety,
            depression: item.depression,
            stress: item.stress,
            wellness: item.wellness
          };
          
          return (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "260px", justifyContent: "end" }}>
                {Object.entries(values).map(([key, value], i) => {
                  const height = (value / maxValue) * 240;
                  const colors = {
                    anxiety: "var(--color-warning)",
                    depression: "var(--color-info)",
                    stress: "var(--color-error)",
                    wellness: "var(--color-success)"
                  };
                  
                  return (
                    <div
                      key={key}
                      style={{
                        width: "12px",
                        height: `${height}px`,
                        backgroundColor: colors[key],
                        marginBottom: "2px",
                        borderRadius: "2px",
                        opacity: selectedMetric === "all" || selectedMetric === key ? 1 : 0.3,
                      }}
                    />
                  );
                })}
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: "500" }}>
                {item.month}
              </span>
            </div>
          );
        })}
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
            Reports & Trends
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Comprehensive analytics and mental health trends across the platform
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
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
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
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
            📊 Export Full Report
          </button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "var(--color-error)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🚨</span>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-error)" }}>
                45
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                Crisis Interventions
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-success)" }}>
                ↓ 15% from last month
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "var(--color-warning)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>📈</span>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-warning)" }}>
                78%
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                Help-Seeking Rate
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-success)" }}>
                ↑ 23% increase
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "var(--color-success)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>✅</span>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-success)" }}>
                91%
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                Treatment Completion
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-success)" }}>
                ↑ 8% improvement
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "var(--color-info)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>⭐</span>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-info)" }}>
                4.7
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                Avg Satisfaction
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-success)" }}>
                ↑ 0.2 points
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mental Health Trends Chart */}
      <Card>
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
            Mental Health Trends Over Time
          </h3>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            {[
              { id: "all", label: "All Metrics", color: "var(--color-text-primary)" },
              { id: "anxiety", label: "Anxiety", color: "var(--color-warning)" },
              { id: "depression", label: "Depression", color: "var(--color-info)" },
              { id: "stress", label: "Academic Stress", color: "var(--color-error)" },
              { id: "wellness", label: "General Wellness", color: "var(--color-success)" },
            ].map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedReport(metric.id)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: selectedReport === metric.id ? metric.color : "var(--color-background)",
                  color: selectedReport === metric.id ? "white" : metric.color,
                  border: `1px solid ${metric.color}`,
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <TrendChart data={mentalHealthTrends} selectedMetric={selectedReport} />

        {/* Legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
          {[
            { label: "Anxiety Cases", color: "var(--color-warning)" },
            { label: "Depression Cases", color: "var(--color-info)" },
            { label: "Stress Reports", color: "var(--color-error)" },
            { label: "Wellness Checks", color: "var(--color-success)" },
          ].map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: item.color,
                  borderRadius: "2px",
                }}
              />
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Department Analysis */}
      <Card>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
          Department-wise Mental Health Analysis
        </h3>
        
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Department
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Student Metrics
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Usage Stats
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Top Concerns
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Risk Assessment
                </th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-secondary)" }}>
                  Improvement
                </th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {dept.department}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                      📊 {dept.totalStudents.toLocaleString()} total
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      🟢 {dept.activeUsers.toLocaleString()} active ({Math.round(dept.activeUsers/dept.totalStudents*100)}%)
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                      💬 {dept.sessionsThisMonth} sessions
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      📈 {dept.avgSessionsPerStudent} avg/student
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div className="space-y-1">
                      {dept.topConcerns.map((concern, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "var(--color-background)",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.7rem",
                            color: "var(--color-text-secondary)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          {concern}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <RiskLevelBadge level={dept.riskLevel} />
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ 
                      fontSize: "1rem", 
                      fontWeight: "600", 
                      color: dept.improvementRate > 10 ? "var(--color-success)" : "var(--color-warning)" 
                    }}>
                      +{dept.improvementRate}%
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      vs last quarter
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Crisis Interventions & Platform Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Crisis Interventions */}
        <Card>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
            Recent Crisis Interventions
          </h3>
          
          <div className="space-y-4">
            {crisisInterventions.map((crisis, index) => (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderLeft: `4px solid ${crisis.severity === "High" ? "var(--color-error)" : "var(--color-warning)"}`,
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {crisis.studentId}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {crisis.date} at {crisis.time}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: crisis.severity === "High" ? "var(--color-error-light)" : "var(--color-warning-light)",
                      color: crisis.severity === "High" ? "var(--color-error)" : "var(--color-warning)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                    }}
                  >
                    {crisis.severity}
                  </span>
                </div>
                
                <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
                  <strong>Trigger:</strong> {crisis.triggerType}
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                  <span>⏱️ Response: {crisis.responseTime}</span>
                  <span>👩‍⚕️ {crisis.counselor}</span>
                </div>
                
                <div style={{ 
                  marginTop: "0.5rem", 
                  padding: "0.5rem", 
                  backgroundColor: "var(--color-success-light)", 
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.8rem",
                  color: "var(--color-success)"
                }}>
                  ✅ {crisis.outcome}
                  {crisis.followUpScheduled && " • Follow-up scheduled"}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Platform Usage Metrics */}
        <Card>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
            Platform Usage Analytics
          </h3>
          
          <div className="space-y-6">
            {/* Chat System */}
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                💬 AI Chat System
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)" }}>
                    {platformUsage.chatInteractions.thisMonth.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Interactions this month
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-success)" }}>
                    {platformUsage.chatInteractions.satisfactionRate}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Satisfaction rating
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
                Peak hours: {platformUsage.chatInteractions.peakHours.join(", ")}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                📚 Educational Resources
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-info)" }}>
                    {platformUsage.resourceAccess.totalViews.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Total views
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-accent)" }}>
                    {platformUsage.resourceAccess.engagementRate}%
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Engagement rate
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
                Most popular: {platformUsage.resourceAccess.mostPopular}
              </div>
            </div>

            {/* Peer Support */}
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                🤝 Peer Support Platform
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-secondary)" }}>
                    {platformUsage.peerSupport.activeDiscussions}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Active discussions
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "var(--color-background)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-success)" }}>
                    {platformUsage.peerSupport.resolutionRate}%
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Resolution rate
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
                Community health score: {platformUsage.peerSupport.communityHealth}/100
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
