"use client";

import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CounsellorDashboard() {
  const { theme } = useTheme();
  const params = useParams();
  const counsellorId = params?.userid || 'demo-counsellor';
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for demonstration
  const upcomingAppointments = [
    {
      id: 1,
      studentId: "Student #1023",
      time: "4:00 PM",
      date: "Today",
      status: "confirmed",
      canJoin: false,
      duration: "30 min",
    },
    {
      id: 2,
      studentId: "Student #1847",
      time: "5:30 PM",
      date: "Today", 
      status: "confirmed",
      canJoin: true, // Available to join now
      duration: "30 min",
    },
    {
      id: 3,
      studentId: "Student #2156",
      time: "7:00 PM",
      date: "Today",
      status: "confirmed",
      canJoin: false,
      duration: "30 min",
    },
    {
      id: 4,
      studentId: "Student #3421",
      time: "10:00 AM",
      date: "Tomorrow",
      status: "pending",
      canJoin: false,
      duration: "30 min",
    },
  ];

  const todaySchedule = [
    { time: "4:00 PM", booked: true, student: "Student #1023" },
    { time: "4:30 PM", booked: false },
    { time: "5:00 PM", booked: false },
    { time: "5:30 PM", booked: true, student: "Student #1847", current: true },
    { time: "6:00 PM", booked: false },
    { time: "6:30 PM", booked: false },
    { time: "7:00 PM", booked: true, student: "Student #2156" },
    { time: "7:30 PM", booked: false },
    { time: "8:00 PM", booked: false },
    { time: "8:30 PM", booked: false },
    { time: "9:00 PM", booked: false },
    { time: "9:30 PM", booked: false },
    { time: "10:00 PM", booked: false },
    { time: "10:30 PM", booked: false },
    { time: "11:00 PM", booked: false },
    { time: "11:30 PM", booked: false },
  ];

  const notifications = [
    {
      id: 1,
      type: "new_booking",
      message: "New appointment booked for 10:00 AM tomorrow",
      time: "5 minutes ago",
      icon: "📅",
    },
    {
      id: 2,
      type: "cancellation", 
      message: "Student #9876 cancelled 8:30 PM appointment",
      time: "1 hour ago",
      icon: "❌",
    },
    {
      id: 3,
      type: "reschedule",
      message: "Student #4567 rescheduled from 6:00 PM to 7:30 PM",
      time: "2 hours ago",
      icon: "🔄",
    },
  ];

  const stats = [
    { label: "Today&#39;s Sessions", value: "4", icon: "📅", color: "var(--color-primary)" },
    { label: "This Week", value: "18", icon: "📊", color: "var(--color-success)" },
    { label: "Completion Rate", value: "96%", icon: "✅", color: "var(--color-accent)" },
    { label: "Avg Rating", value: "4.8", icon: "⭐", color: "var(--color-warning)" },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Welcome back, Dr. Counsellor
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1.1rem",
          }}
        >
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} • {currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              padding: "1.5rem",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "var(--color-text-primary)",
                    margin: 0,
                  }}
                >
                  {stat.value}
                </p>
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  backgroundColor: stat.color,
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  margin: 0,
                }}
              >
                📅 Upcoming Appointments
              </h2>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "var(--color-text-primary)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {appointment.studentId}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {appointment.date} • {appointment.time} • {appointment.duration}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: appointment.status === 'confirmed' 
                          ? "var(--color-success)" 
                          : "var(--color-warning)",
                        color: "white",
                      }}
                    >
                      {appointment.status}
                    </span>
                    {appointment.canJoin && (
                      <button
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "var(--color-success)",
                          color: "white",
                          border: "none",
                          borderRadius: "var(--radius-md)",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          animation: "pulse 2s infinite",
                        }}
                      >
                        🎥 Join Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today&#39;s Schedule */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              🕒 Today&#39;s Schedule (4PM - 12AM)
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {todaySchedule.map((slot, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                    backgroundColor: slot.booked 
                      ? (slot.current ? "var(--color-primary)" : "var(--color-accent)")
                      : "var(--color-background)",
                    border: `1px solid ${slot.booked ? 'transparent' : 'var(--color-border)'}`,
                    color: slot.booked ? "white" : "var(--color-text-primary)",
                  }}
                >
                  <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                    {slot.time}
                  </div>
                  {slot.booked && (
                    <div style={{ fontSize: "0.7rem", marginTop: "0.25rem", opacity: 0.9 }}>
                      {slot.student}
                    </div>
                  )}
                  {slot.current && (
                    <div style={{ fontSize: "0.7rem", marginTop: "0.25rem" }}>
                      Current
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              <span style={{ color: "var(--color-primary)" }}>■</span> Current Session •{" "}
              <span style={{ color: "var(--color-accent)" }}>■</span> Booked •{" "}
              <span style={{ color: "var(--color-background)", border: "1px solid var(--color-border)", padding: "0 0.25rem" }}>□</span> Available
            </div>
          </div>
        </div>

        {/* Right Column - Notifications */}
        <div className="lg:col-span-1">
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              🔔 Notifications
            </h2>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.2rem" }}>{notification.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "var(--color-text-primary)",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {notification.message}
                      </p>
                      <p
                        style={{
                          color: "var(--color-text-secondary)",
                          fontSize: "0.8rem",
                          margin: 0,
                        }}
                      >
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "1rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              View All Notifications
            </button>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              padding: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Quick Actions
            </h3>
            
            <div className="space-y-2">
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                📅 View All Appointments
              </button>
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                🎥 Start Emergency Session
              </button>
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "var(--color-success)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                📊 View Session Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
