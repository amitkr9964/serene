"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function AppointmentManagement() {
  const { theme } = useTheme();
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const appointments = [
    {
      id: 1,
      studentId: "Student #1023",
      date: "2025-09-11",
      time: "4:00 PM",
      duration: 30,
      status: "confirmed",
      type: "regular",
      sessionNotes: "",
      completed: false,
      joinable: false,
    },
    {
      id: 2,
      studentId: "Student #1847",
      date: "2025-09-11",
      time: "5:30 PM", 
      duration: 30,
      status: "confirmed",
      type: "regular",
      sessionNotes: "",
      completed: false,
      joinable: true,
    },
    {
      id: 3,
      studentId: "Student #2156",
      date: "2025-09-11",
      time: "7:00 PM",
      duration: 30,
      status: "confirmed", 
      type: "regular",
      sessionNotes: "",
      completed: false,
      joinable: false,
    },
    {
      id: 4,
      studentId: "Student #3421",
      date: "2025-09-12",
      time: "10:00 AM",
      duration: 30,
      status: "pending",
      type: "priority",
      sessionNotes: "",
      completed: false,
      joinable: false,
    },
    {
      id: 5,
      studentId: "Student #5678",
      date: "2025-09-10",
      time: "6:30 PM",
      duration: 30,
      status: "completed",
      type: "regular",
      sessionNotes: "Student discussed anxiety around exams. Provided breathing techniques.",
      completed: true,
      joinable: false,
    },
    {
      id: 6,
      studentId: "Student #9876",
      date: "2025-09-10",
      time: "8:00 PM",
      duration: 30,
      status: "cancelled",
      type: "regular",
      sessionNotes: "",
      completed: false,
      joinable: false,
    },
  ];

  const filteredAppointments = appointments.filter(apt => {
    const matchesDate = apt.date === selectedDate;
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'var(--color-success)';
      case 'pending': return 'var(--color-warning)';
      case 'completed': return 'var(--color-primary)';
      case 'cancelled': return 'var(--color-error)';
      default: return 'var(--color-secondary)';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'priority' ? '🚨' : '📅';
  };

  const markAsCompleted = (appointmentId) => {
    // In a real app, this would update the backend
    console.log(`Marking appointment ${appointmentId} as completed`);
  };

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
          📅 Appointment Management
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1.1rem",
          }}
        >
          Manage your scheduled sessions and track completed appointments
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
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
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: "0.5rem",
                backgroundColor: "var(--color-background)",
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
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-primary)",
              }}
            >
              <option value="all">All Appointments</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              📊 Export Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto auto auto",
            gap: "1rem",
            alignItems: "center",
            fontSize: "0.9rem",
            fontWeight: "600",
            color: "var(--color-text-secondary)",
          }}
        >
          <div>Type</div>
          <div>Student ID</div>
          <div>Time</div>
          <div>Status</div>
          <div>Duration</div>
          <div>Actions</div>
        </div>

        {/* Appointments */}
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--color-border)",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto auto auto",
                gap: "1rem",
                alignItems: "center",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-background)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {/* Type Icon */}
              <div style={{ fontSize: "1.2rem" }}>
                {getTypeIcon(appointment.type)}
              </div>

              {/* Student ID */}
              <div>
                <div
                  style={{
                    fontWeight: "500",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {appointment.studentId}
                </div>
                {appointment.type === 'priority' && (
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-error)",
                      fontWeight: "500",
                    }}
                  >
                    Priority Session
                  </div>
                )}
              </div>

              {/* Time */}
              <div
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: "500",
                }}
              >
                {appointment.time}
              </div>

              {/* Status */}
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: getStatusColor(appointment.status),
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  {appointment.status}
                </span>
              </div>

              {/* Duration */}
              <div
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9rem",
                }}
              >
                {appointment.duration} min
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {appointment.joinable && (
                  <button
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "var(--color-success)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    🎥 Join
                  </button>
                )}
                
                {appointment.status === 'confirmed' && !appointment.completed && !appointment.joinable && (
                  <button
                    onClick={() => markAsCompleted(appointment.id)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    ✅ Complete
                  </button>
                )}

                {appointment.status === 'completed' && (
                  <button
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "var(--color-secondary)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    📝 Notes
                  </button>
                )}

                <button
                  style={{
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  📋 Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              color: "var(--color-text-secondary)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
            <h3 style={{ marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>
              No appointments for this date
            </h3>
            <p>Select a different date or change the filter to view appointments.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--color-primary)",
              marginBottom: "0.5rem",
            }}
          >
            {appointments.filter(a => a.date === selectedDate && a.status === 'confirmed').length}
          </div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
            Confirmed Today
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--color-success)",
              marginBottom: "0.5rem",
            }}
          >
            {appointments.filter(a => a.status === 'completed').length}
          </div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
            Total Completed
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--color-warning)",
              marginBottom: "0.5rem",
            }}
          >
            {appointments.filter(a => a.status === 'pending').length}
          </div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
            Pending Approval
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--color-accent)",
              marginBottom: "0.5rem",
            }}
          >
            {appointments.filter(a => a.type === 'priority').length}
          </div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
            Priority Sessions
          </div>
        </div>
      </div>
    </div>
  );
}
