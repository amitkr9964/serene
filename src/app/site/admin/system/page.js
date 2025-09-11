"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState, useEffect } from "react";

export default function SystemHealth() {
  const { theme } = useTheme();
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [systemMetrics, setSystemMetrics] = useState({
    serverLoad: 67,
    memoryUsage: 73,
    diskUsage: 45,
    networkLatency: 23,
    activeConnections: 1247,
    errorRate: 0.02,
  });

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        serverLoad: Math.max(30, Math.min(95, prev.serverLoad + Math.floor(Math.random() * 10 - 5))),
        memoryUsage: Math.max(40, Math.min(90, prev.memoryUsage + Math.floor(Math.random() * 8 - 4))),
        diskUsage: Math.max(20, Math.min(80, prev.diskUsage + Math.floor(Math.random() * 4 - 2))),
        networkLatency: Math.max(10, Math.min(100, prev.networkLatency + Math.floor(Math.random() * 6 - 3))),
        activeConnections: Math.max(800, prev.activeConnections + Math.floor(Math.random() * 100 - 50)),
        errorRate: Math.max(0, Math.min(2, prev.errorRate + (Math.random() * 0.1 - 0.05))),
      }));
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const serverStatus = [
    {
      name: "Web Server (Primary)",
      status: "healthy",
      uptime: "99.97%",
      load: systemMetrics.serverLoad,
      location: "US-East-1",
      lastCheck: "30s ago",
      connections: Math.floor(systemMetrics.activeConnections * 0.6),
    },
    {
      name: "Database Server",
      status: "healthy", 
      uptime: "99.94%",
      load: 34,
      location: "US-East-1",
      lastCheck: "45s ago",
      connections: Math.floor(systemMetrics.activeConnections * 0.2),
    },
    {
      name: "AI Chat Service",
      status: "warning",
      uptime: "99.89%",
      load: 82,
      location: "US-West-1",
      lastCheck: "1m ago",
      connections: Math.floor(systemMetrics.activeConnections * 0.15),
    },
    {
      name: "File Storage",
      status: "healthy",
      uptime: "99.99%",
      load: 23,
      location: "Global CDN",
      lastCheck: "20s ago",
      connections: Math.floor(systemMetrics.activeConnections * 0.05),
    },
  ];

  const systemLogs = [
    {
      timestamp: "2024-09-11 15:23:45",
      level: "INFO",
      service: "WebServer",
      message: "Session cleanup completed - 234 expired sessions removed",
      details: "Routine maintenance task completed successfully"
    },
    {
      timestamp: "2024-09-11 15:20:12",
      level: "WARNING", 
      service: "AI-Chat",
      message: "High response time detected - avg 2.3s (threshold: 2.0s)",
      details: "Investigating potential performance bottleneck in ML inference"
    },
    {
      timestamp: "2024-09-11 15:18:33",
      level: "ERROR",
      service: "Database",
      message: "Connection timeout to backup database",
      details: "Primary database operational, backup connection restored automatically"
    },
    {
      timestamp: "2024-09-11 15:15:07",
      level: "INFO",
      service: "Security",
      message: "Failed login attempt blocked - IP: 192.168.1.xxx",
      details: "Automated security system prevented unauthorized access attempt"
    },
    {
      timestamp: "2024-09-11 15:12:44",
      level: "SUCCESS",
      service: "Backup",
      message: "Daily backup completed successfully",
      details: "Database backup (2.3GB) stored to secure cloud storage"
    },
  ];

  const alertsNotifications = [
    {
      id: "ALERT001",
      severity: "high",
      title: "AI Service Response Time Alert",
      description: "Average response time exceeded 2 seconds for the past 10 minutes",
      service: "AI Chat Service",
      timestamp: "5 minutes ago",
      status: "active",
      autoResolve: false,
    },
    {
      id: "ALERT002", 
      severity: "medium",
      title: "Database Connection Pool Warning",
      description: "Connection pool utilization at 85% of maximum capacity",
      service: "Database Server",
      timestamp: "12 minutes ago",
      status: "acknowledged",
      autoResolve: true,
    },
    {
      id: "ALERT003",
      severity: "low",
      title: "Scheduled Maintenance Reminder",
      description: "Planned maintenance window starts in 2 hours",
      service: "All Services",
      timestamp: "1 hour ago",
      status: "scheduled",
      autoResolve: false,
    },
  ];

  const performanceMetrics = {
    responseTime: {
      current: 245,
      target: 200,
      trend: "increasing",
      history: [220, 235, 245, 250, 245, 240, 245]
    },
    throughput: {
      current: 1247,
      target: 1500,
      trend: "stable", 
      history: [1200, 1250, 1247, 1260, 1245, 1250, 1247]
    },
    errorRate: {
      current: systemMetrics.errorRate,
      target: 0.1,
      trend: "decreasing",
      history: [0.08, 0.06, 0.04, 0.03, 0.02, 0.02, 0.02]
    },
    availability: {
      current: 99.97,
      target: 99.95,
      trend: "stable",
      history: [99.96, 99.97, 99.98, 99.97, 99.97, 99.96, 99.97]
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

  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
      switch (status) {
        case "healthy": return { color: "var(--color-success)", icon: "🟢", label: "Healthy" };
        case "warning": return { color: "var(--color-warning)", icon: "🟡", label: "Warning" };
        case "critical": return { color: "var(--color-error)", icon: "🔴", label: "Critical" };
        case "maintenance": return { color: "var(--color-info)", icon: "🔵", label: "Maintenance" };
        default: return { color: "var(--color-text-secondary)", icon: "⚪", label: "Unknown" };
      }
    };

    const config = getStatusConfig(status);
    
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.25rem 0.75rem",
          backgroundColor: `${config.color}20`,
          color: config.color,
          borderRadius: "var(--radius-full)",
          fontSize: "0.8rem",
          fontWeight: "500",
        }}
      >
        {config.icon} {config.label}
      </span>
    );
  };

  const ProgressBar = ({ value, max = 100, color, showPercentage = true }) => (
    <div style={{ width: "100%" }}>
      <div style={{ 
        width: "100%", 
        height: "8px", 
        backgroundColor: "var(--color-background)", 
        borderRadius: "4px",
        overflow: "hidden",
        marginBottom: showPercentage ? "0.25rem" : 0
      }}>
        <div style={{ 
          width: `${Math.min((value / max) * 100, 100)}%`, 
          height: "100%", 
          backgroundColor: color || (value > 80 ? "var(--color-error)" : value > 60 ? "var(--color-warning)" : "var(--color-success)"),
          borderRadius: "4px",
          transition: "width 0.3s ease"
        }} />
      </div>
      {showPercentage && (
        <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", textAlign: "right" }}>
          {typeof value === 'number' ? value.toFixed(1) : value}%
        </div>
      )}
    </div>
  );

  const LogLevelBadge = ({ level }) => {
    const getLevelConfig = (level) => {
      switch (level) {
        case "SUCCESS": return { color: "var(--color-success)", bg: "var(--color-success-light)" };
        case "INFO": return { color: "var(--color-info)", bg: "var(--color-info-light)" };
        case "WARNING": return { color: "var(--color-warning)", bg: "var(--color-warning-light)" };
        case "ERROR": return { color: "var(--color-error)", bg: "var(--color-error-light)" };
        default: return { color: "var(--color-text-secondary)", bg: "var(--color-background)" };
      }
    };

    const config = getLevelConfig(level);
    
    return (
      <span
        style={{
          padding: "0.25rem 0.5rem",
          backgroundColor: config.bg,
          color: config.color,
          borderRadius: "var(--radius-sm)",
          fontSize: "0.7rem",
          fontWeight: "600",
          fontFamily: "monospace",
        }}
      >
        {level}
      </span>
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
            System Health Monitor
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Real-time system performance and infrastructure monitoring
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              Auto-refresh:
            </span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
              style={{
                padding: "0.5rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-primary)",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <option value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={30}>30s</option>
              <option value={60}>1m</option>
            </select>
          </div>
          
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
            📊 Generate Health Report
          </button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Server Load</span>
            <div style={{ 
              width: "8px", 
              height: "8px", 
              backgroundColor: systemMetrics.serverLoad > 80 ? "var(--color-error)" : systemMetrics.serverLoad > 60 ? "var(--color-warning)" : "var(--color-success)", 
              borderRadius: "50%",
              animation: "pulse 2s infinite" 
            }} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: systemMetrics.serverLoad > 80 ? "var(--color-error)" : systemMetrics.serverLoad > 60 ? "var(--color-warning)" : "var(--color-success)" }}>
            {systemMetrics.serverLoad}%
          </div>
          <ProgressBar value={systemMetrics.serverLoad} showPercentage={false} />
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Memory Usage</span>
            <span style={{ fontSize: "0.8rem" }}>🧠</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: systemMetrics.memoryUsage > 85 ? "var(--color-error)" : systemMetrics.memoryUsage > 70 ? "var(--color-warning)" : "var(--color-success)" }}>
            {systemMetrics.memoryUsage}%
          </div>
          <ProgressBar value={systemMetrics.memoryUsage} showPercentage={false} />
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Active Users</span>
            <span style={{ fontSize: "0.8rem" }}>👥</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-info)" }}>
            {systemMetrics.activeConnections.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Connected sessions
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>Error Rate</span>
            <span style={{ fontSize: "0.8rem" }}>⚠️</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: systemMetrics.errorRate > 1 ? "var(--color-error)" : systemMetrics.errorRate > 0.1 ? "var(--color-warning)" : "var(--color-success)" }}>
            {systemMetrics.errorRate.toFixed(2)}%
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
            Last 24 hours
          </div>
        </Card>
      </div>

      {/* Server Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Server Status */}
        <div className="lg:col-span-2">
          <Card>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
              Server Infrastructure
            </h3>
            
            <div className="space-y-4">
              {serverStatus.map((server, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    borderLeft: `4px solid ${server.status === 'healthy' ? 'var(--color-success)' : server.status === 'warning' ? 'var(--color-warning)' : 'var(--color-error)'}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                        {server.name}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                        📍 {server.location} • Last check: {server.lastCheck}
                      </div>
                    </div>
                    <StatusBadge status={server.status} />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                        Uptime
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--color-success)" }}>
                        {server.uptime}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                        Load
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ProgressBar value={server.load} showPercentage={false} />
                        <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                          {server.load}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                        Connections
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--color-info)" }}>
                        {server.connections.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <Card>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
            Active Alerts
          </h3>
          
          <div className="space-y-4">
            {alertsNotifications.map((alert) => (
              <div
                key={alert.id}
                style={{
                  padding: "1rem",
                  backgroundColor: alert.severity === 'high' ? 'var(--color-error-light)' : alert.severity === 'medium' ? 'var(--color-warning-light)' : 'var(--color-info-light)',
                  border: `1px solid ${alert.severity === 'high' ? 'var(--color-error)' : alert.severity === 'medium' ? 'var(--color-warning)' : 'var(--color-info)'}`,
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                    {alert.title}
                  </div>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      backgroundColor: alert.severity === 'high' ? 'var(--color-error)' : alert.severity === 'medium' ? 'var(--color-warning)' : 'var(--color-info)',
                      color: "white",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    {alert.severity}
                  </span>
                </div>
                
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                  {alert.description}
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.7rem", color: "var(--color-text-secondary)" }}>
                  <span>🖥️ {alert.service}</span>
                  <span>⏰ {alert.timestamp}</span>
                </div>

                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                  <button
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                    }}
                  >
                    Acknowledge
                  </button>
                  {alert.status === 'active' && (
                    <button
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: "var(--color-secondary)",
                        color: "white",
                        border: "none",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.7rem",
                        cursor: "pointer",
                      }}
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Metrics & System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Metrics */}
        <Card>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
            Performance Metrics
          </h3>
          
          <div className="space-y-6">
            {Object.entries(performanceMetrics).map(([metric, data]) => (
              <div key={metric}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)", textTransform: "capitalize" }}>
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ 
                      fontSize: "0.8rem", 
                      color: data.trend === 'increasing' ? 'var(--color-warning)' : data.trend === 'decreasing' ? 'var(--color-success)' : 'var(--color-info)'
                    }}>
                      {data.trend === 'increasing' ? '↗️' : data.trend === 'decreasing' ? '↘️' : '➡️'} {data.trend}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-text-primary)" }}>
                    {typeof data.current === 'number' ? 
                      (metric === 'errorRate' ? `${data.current.toFixed(2)}%` : 
                       metric === 'responseTime' ? `${data.current}ms` :
                       metric === 'availability' ? `${data.current}%` :
                       data.current.toLocaleString()) : 
                      data.current}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Target: {typeof data.target === 'number' ? 
                      (metric === 'errorRate' ? `${data.target}%` : 
                       metric === 'responseTime' ? `${data.target}ms` :
                       metric === 'availability' ? `${data.target}%` :
                       data.target.toLocaleString()) : 
                      data.target}
                  </span>
                </div>
                
                {/* Mini trend chart */}
                <div style={{ display: "flex", alignItems: "end", height: "40px", gap: "2px" }}>
                  {data.history.map((value, index) => {
                    const maxValue = Math.max(...data.history);
                    const height = (value / maxValue) * 35;
                    return (
                      <div
                        key={index}
                        style={{
                          width: "8px",
                          height: `${height}px`,
                          backgroundColor: index === data.history.length - 1 ? "var(--color-primary)" : "var(--color-background)",
                          borderRadius: "2px 2px 0 0",
                          border: index === data.history.length - 1 ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Logs */}
        <Card>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
            Recent System Logs
          </h3>
          
          <div className="space-y-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
            {systemLogs.map((log, index) => (
              <div
                key={index}
                style={{
                  padding: "0.75rem",
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: `3px solid ${log.level === 'ERROR' ? 'var(--color-error)' : log.level === 'WARNING' ? 'var(--color-warning)' : log.level === 'SUCCESS' ? 'var(--color-success)' : 'var(--color-info)'}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <LogLevelBadge level={log.level} />
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      {log.service}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", fontFamily: "monospace" }}>
                    {log.timestamp}
                  </span>
                </div>
                
                <div style={{ fontSize: "0.9rem", color: "var(--color-text-primary)", marginBottom: "0.25rem", fontFamily: "monospace" }}>
                  {log.message}
                </div>
                
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontStyle: "italic" }}>
                  {log.details}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", textAlign: "center" }}>
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
              📄 View Full Logs
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
