"use client";

import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import AnimatedIcon from "../../../components/AnimatedIcon";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7days");
  const [liveData, setLiveData] = useState({
    activeSessions: 12,
    queuedStudents: 8,
    onlineCounselors: 15,
    systemLoad: 67,
  });

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activeSessions: Math.max(5, prev.activeSessions + Math.floor(Math.random() * 5 - 2)),
        queuedStudents: Math.max(0, prev.queuedStudents + Math.floor(Math.random() * 3 - 1)),
        onlineCounselors: Math.max(10, prev.onlineCounselors + Math.floor(Math.random() * 3 - 1)),
        systemLoad: Math.max(30, Math.min(90, prev.systemLoad + Math.floor(Math.random() * 10 - 5))),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    {
      title: "Total Students Served",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: "users",
      description: "Anonymous student accounts",
      color: "var(--color-primary)",
    },
    {
      title: "Active Counselors",
      value: "23",
      change: "+2",
      changeType: "increase",
      icon: "user-check",
      description: "Licensed professionals",
      color: "var(--color-secondary)",
    },
    {
      title: "Sessions This Month",
      value: "1,234",
      change: "+8.7%",
      changeType: "increase",
      icon: "message",
      description: "Completed counseling sessions",
      color: "var(--color-accent)",
    },
    {
      title: "Crisis Interventions",
      value: "45",
      change: "-15.2%",
      changeType: "decrease",
      icon: "alert",
      description: "Emergency responses handled",
      color: "var(--color-warning)",
    },
    {
      title: "Peer Support Posts",
      value: "892",
      change: "+23.4%",
      changeType: "increase",
      icon: "users",
      description: "Community interactions",
      color: "var(--color-success)",
    },
    {
      title: "Resource Access",
      value: "3,567",
      change: "+18.9%",
      changeType: "increase",
      icon: "book",
      description: "Educational content views",
      color: "var(--color-info)",
    },
  ];

  const recentActivity = [
    {
      type: "session_completed",
      icon: "check",
      title: "Counseling Session Completed",
      description: "Student #4728 completed 45-min session with Dr. Sarah Chen",
      time: "2 minutes ago",
      color: "var(--color-success)",
    },
    {
      type: "crisis_alert",
      icon: "alert",
      title: "Crisis Alert Resolved",
      description: "Emergency intervention completed for Student #3912",
      time: "8 minutes ago",
      color: "var(--color-error)",
    },
    {
      type: "new_counselor",
      icon: "user-check",
      title: "New Counselor Onboarded",
      description: "Dr. Michael Rodriguez joined the platform",
      time: "1 hour ago",
      color: "var(--color-primary)",
    },
    {
      type: "peer_milestone",
      icon: "target",
      title: "Peer Support Milestone",
      description: "100+ students engaged in Computer Science community",
      time: "3 hours ago",
      color: "var(--color-accent)",
    },
    {
      type: "system_update",
      icon: "settings",
      title: "System Maintenance Completed",
      description: "Scheduled update deployed successfully",
      time: "6 hours ago",
      color: "var(--color-info)",
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
            Dashboard Overview
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Monitor platform performance and student wellbeing metrics
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
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Live Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Live Sessions</span>
            <div style={{ 
              width: "8px", 
              height: "8px", 
              backgroundColor: "var(--color-success)", 
              borderRadius: "50%",
              animation: "pulse 2s infinite" 
            }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-success)" }}>
            {liveData.activeSessions}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Active counseling sessions
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Queue</span>
            <AnimatedIcon name="clock-3" size={16} color="var(--color-warning)" />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-warning)" }}>
            {liveData.queuedStudents}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Students waiting
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Online Staff</span>
            <AnimatedIcon name="user-check" size={16} color="var(--color-info)" />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-info)" }}>
            {liveData.onlineCounselors}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Available counselors
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>System Load</span>
            <span style={{ fontSize: "0.8rem" }}>⚡</span>
          </div>
          <div style={{ 
            fontSize: "2rem", 
            fontWeight: "700", 
            color: liveData.systemLoad > 80 ? "var(--color-error)" : 
                   liveData.systemLoad > 60 ? "var(--color-warning)" : "var(--color-success)"
          }}>
            {liveData.systemLoad}%
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Server capacity
          </div>
        </Card>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: stat.color,
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimatedIcon name={stat.icon} size={24} color="white" />
              </div>
              <div
                style={{
                  padding: "0.25rem 0.75rem",
                  backgroundColor: stat.changeType === "increase" ? "var(--color-success-light)" : "var(--color-error-light)",
                  color: stat.changeType === "increase" ? "var(--color-success)" : "var(--color-error)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <AnimatedIcon 
                  name={stat.changeType === "increase" ? "arrow-up" : "arrow-down"} 
                  size={12} 
                  color={stat.changeType === "increase" ? "var(--color-success)" : "var(--color-error)"} 
                />
                {stat.change}
              </div>
            </div>
            
            <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
              {stat.value}
            </div>
            
            <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
              {stat.title}
            </div>
            
            <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              {stat.description}
            </div>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>
                Recent Activity
              </h2>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                }}
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1rem",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: activity.color,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AnimatedIcon name={activity.icon} size={20} color="white" />
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                      {activity.title}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem", lineHeight: "1.4" }}>
                      {activity.description}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)" }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              {[
                { icon: "users", label: "Add New Counselor", color: "var(--color-primary)" },
                { icon: "megaphone", label: "Send Platform Alert", color: "var(--color-warning)" },
                { icon: "chart", label: "Generate Report", color: "var(--color-info)" },
                { icon: "settings", label: "System Maintenance", color: "var(--color-secondary)" },
              ].map((action, index) => (
                <button
                  key={index}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = action.color;
                    e.target.style.color = "white";
                    e.target.style.borderColor = action.color;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "var(--color-background)";
                    e.target.style.color = "var(--color-text-primary)";
                    e.target.style.borderColor = "var(--color-border)";
                  }}
                >
                  <AnimatedIcon name={action.icon} size={20} />
                  <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>{action.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* System Alerts */}
          <Card>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              System Alerts
            </h3>
            
            <div className="space-y-3">
              {[
                { 
                  type: "warning", 
                  icon: "warning", 
                  title: "High Queue Times", 
                  message: "Average wait time: 12 minutes",
                  color: "var(--color-warning)" 
                },
                { 
                  type: "info", 
                  icon: "info", 
                  title: "Scheduled Maintenance", 
                  message: "Sunday 2:00 AM - 4:00 AM",
                  color: "var(--color-info)" 
                },
                { 
                  type: "success", 
                  icon: "check", 
                  title: "Backup Complete", 
                  message: "Daily backup successful",
                  color: "var(--color-success)" 
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--color-background)",
                    border: `1px solid ${alert.color}`,
                    borderRadius: "var(--radius-md)",
                    borderLeft: `4px solid ${alert.color}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <AnimatedIcon name={alert.icon} size={16} color={alert.color} />
                    <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                      {alert.title}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    {alert.message}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
