"use client";

import { useTheme } from "../../../contexts/ThemeContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedIcon from '../../../components/AnimatedIcon';

export default function CounsellorLayout({ children, params }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const counsellorId = params?.userid || 'demo-counsellor';

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '🏠', path: '' },
    { id: 'appointments', label: 'Appointment Management', icon: 'calendar', path: '/appointments' },
    { id: 'sessions', label: 'Video Sessions', icon: '🎥', path: '/sessions' },
    { id: 'profile', label: 'Profile Settings', icon: '⚙️', path: '/profile' },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      {/* Mobile menu button */}
      <div className="md:hidden" style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 50 }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: "0.75rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>☰</span>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 transition-transform duration-200 ease-in-out`}
          style={{
            backgroundColor: "var(--color-surface)",
            borderRight: "1px solid var(--color-border)"
          }}
        >
          {/* Logo */}
          <div className="flex items-center p-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div className="flex items-center">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "0.75rem",
                }}
              >
                <span className="text-white text-lg font-bold">👨‍⚕️</span>
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                  Counsellor Portal
                </div>
                <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  ID: {counsellorId}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={`/counsellor/${counsellorId}${item.path}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  backgroundColor: router.pathname === `/counsellor/${counsellorId}${item.path}` 
                    ? "var(--color-primary)" 
                    : "transparent",
                  color: router.pathname === `/counsellor/${counsellorId}${item.path}`
                    ? "white"
                    : "var(--color-text-primary)",
                }}
                onMouseOver={(e) => {
                  if (router.pathname !== `/counsellor/${counsellorId}${item.path}`) {
                    e.target.style.backgroundColor = "var(--color-border)";
                  }
                }}
                onMouseOut={(e) => {
                  if (router.pathname !== `/counsellor/${counsellorId}${item.path}`) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <AnimatedIcon 
                  type={item.icon} 
                  size={18} 
                  className="mr-3"
                  animate={true}
                  color={router.pathname === `/counsellor/${counsellorId}${item.path}` ? "white" : "currentColor"}
                />
                <span style={{ fontSize: "0.95rem", fontWeight: "500" }}>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                textDecoration: "none",
                color: "var(--color-text-secondary)",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-border)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ marginRight: "0.75rem", fontSize: "1.1rem" }}>🏠</span>
              <span style={{ fontSize: "0.95rem" }}>Back to Main Site</span>
            </Link>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--color-error)",
                cursor: "pointer",
                width: "100%",
                marginTop: "0.5rem",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-error-light)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ marginRight: "0.75rem", fontSize: "1.1rem" }}>🚪</span>
              <span style={{ fontSize: "0.95rem" }}>Sign Out</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                width: "100%",
                marginTop: "0.5rem",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-border)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <AnimatedIcon 
                type={isDarkMode ? "sun" : "moon"} 
                size={18} 
                className="mr-3"
                animate={true}
              />
              <span style={{ fontSize: "0.95rem" }}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1" style={{ minHeight: "100vh" }}>
          <main className="p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
