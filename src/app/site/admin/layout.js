"use client";

import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedIcon from '../../../components/AnimatedIcon';

export default function AdminLayout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set current date on client side only
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: 'Overview', 
      icon: 'chart', 
      path: '/site/admin',
      description: 'Main analytics dashboard'
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: 'users', 
      path: '/site/admin/users',
      description: 'Student & counsellor accounts'
    },
    { 
      id: 'sessions', 
      label: 'Session Analytics', 
      icon: 'video', 
      path: '/site/admin/sessions',
      description: 'Counselling session insights'
    },
    { 
      id: 'content', 
      label: 'Content Management', 
      icon: 'book', 
      path: '/site/admin/content',
      description: 'Resources & peer support'
    },
    { 
      id: 'reports', 
      label: 'Reports & Trends', 
      icon: 'trending', 
      path: '/site/admin/reports',
      description: 'Mental health analytics'
    },
    { 
      id: 'system', 
      label: 'System Health', 
      icon: 'settings', 
      path: '/site/admin/system',
      description: 'Performance & monitoring'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: 'wrench', 
      path: '/site/admin/settings',
      description: 'Platform configuration'
    },
  ];

  const isCurrentPage = (path) => {
    if (path === '/site/admin') {
      return router.pathname === '/site/admin';
    }
    return router.pathname?.startsWith(path);
  };

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      {/* Mobile menu button */}
      <div className="lg:hidden" style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 50 }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: "0.75rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <AnimatedIcon name="menu" size={20} />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 transition-transform duration-300 ease-in-out`}
          style={{
            backgroundColor: "var(--color-surface)",
            borderRight: "1px solid var(--color-border)",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center p-6" 
            style={{ 
              borderBottom: "1px solid var(--color-border)",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))"
            }}
          >
            <div className="flex items-center">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1rem",
                }}
              >
                <AnimatedIcon name="zap" size={24} style={{ color: "white" }} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  Admin Console
                </div>
                <div className="text-sm text-white opacity-80">
                  Serene Platform
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                style={{
                  display: "block",
                  padding: "1rem",
                  borderRadius: "var(--radius-lg)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  backgroundColor: isCurrentPage(item.path) 
                    ? "var(--color-primary)" 
                    : "transparent",
                  color: isCurrentPage(item.path)
                    ? "white"
                    : "var(--color-text-primary)",
                  border: isCurrentPage(item.path)
                    ? "none"
                    : "1px solid transparent",
                }}
                onMouseOver={(e) => {
                  if (!isCurrentPage(item.path)) {
                    e.target.style.backgroundColor = "var(--color-background)";
                    e.target.style.borderColor = "var(--color-border)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isCurrentPage(item.path)) {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "transparent";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                  <AnimatedIcon name={item.icon} size={20} className="mr-3" />
                  <span style={{ fontSize: "1rem", fontWeight: "600" }}>{item.label}</span>
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: "0.85rem", 
                  opacity: isCurrentPage(item.path) ? 0.9 : 0.7,
                  color: "inherit",
                  lineHeight: "1.3"
                }}>
                  {item.description}
                </p>
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 space-y-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                textDecoration: "none",
                color: "var(--color-text-secondary)",
                fontSize: "0.9rem",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-background)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <AnimatedIcon name="home" size={16} className="mr-2" />
              Back to Main Site
            </Link>
            
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--color-error)",
                cursor: "pointer",
                width: "100%",
                fontSize: "0.9rem",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-error-light)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <AnimatedIcon name="logout" size={16} className="mr-2" />
              Sign Out
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                width: "100%",
                fontSize: "0.9rem",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-background)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <AnimatedIcon 
                type={isDarkMode ? "sun" : "moon"} 
                size={16} 
                className="mr-2"
                animate={true}
              />
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Admin Info */}
            <div
              style={{
                padding: "1rem",
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-md)",
                marginTop: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "var(--color-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "0.75rem",
                  }}
                >
                  <AnimatedIcon name="user" size={16} style={{ color: "white" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                    Admin User
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    Super Administrator
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1" style={{ minHeight: "100vh" }}>
          {/* Top Bar */}
          <div
            style={{
              padding: "1rem 2rem",
              backgroundColor: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                {currentDate}
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <AnimatedIcon name="bell" size={16} /> 3 Alerts
              </div>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: "var(--color-success)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                    animation: "pulse 2s infinite",
                  }}
                />
                System Healthy
              </div>
            </div>
          </div>

          <main className="p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
