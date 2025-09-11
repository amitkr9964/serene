"use client";

import { useTheme } from "../../../../contexts/ThemeContext";
import { useState } from "react";

export default function Settings() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "Serene Mental Health Platform",
    platformDescription: "Comprehensive mental health support for higher education institutions",
    maintenanceMode: false,
    registrationEnabled: true,
    
    // Security Settings
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    twoFactorRequired: false,
    ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    crisisAlerts: true,
    systemAlerts: true,
    reportNotifications: true,
    
    // AI Chat Settings
    aiResponseTime: 2.0,
    aiPersonality: "empathetic",
    aiSafetyMode: true,
    fallbackToCounselor: true,
    contextRetention: 24,
    
    // Booking System
    maxAdvanceBooking: 14,
    defaultSessionDuration: 45,
    allowCancellation: true,
    cancellationDeadline: 24,
    autoReminders: true,
    
    // Content Moderation
    autoModeration: true,
    sensitivityLevel: "medium",
    manualReview: true,
    communityGuidelines: true,
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [`${category}${key.charAt(0).toUpperCase() + key.slice(1)}`]: value
    }));
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

  const SettingItem = ({ title, description, children, type = "input" }) => (
    <div style={{ 
      padding: "1.5rem", 
      backgroundColor: "var(--color-background)", 
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--color-border)",
      marginBottom: "1rem"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
            {title}
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
            {description}
          </div>
        </div>
        <div style={{ minWidth: "200px", textAlign: "right" }}>
          {children}
        </div>
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      style={{
        width: "48px",
        height: "24px",
        backgroundColor: checked ? "var(--color-success)" : "var(--color-border)",
        borderRadius: "12px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 0.2s ease",
      }}
      disabled={disabled}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
          position: "absolute",
          top: "2px",
          left: checked ? "26px" : "2px",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );

  const sidebarSections = [
    { id: "general", label: "General Settings", icon: "⚙️" },
    { id: "security", label: "Security & Privacy", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "ai-chat", label: "AI Chat System", icon: "🤖" },
    { id: "booking", label: "Booking System", icon: "📅" },
    { id: "moderation", label: "Content Moderation", icon: "🛡️" },
    { id: "integrations", label: "Integrations", icon: "🔗" },
    { id: "backup", label: "Backup & Recovery", icon: "💾" },
  ];

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
            Platform Settings
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "var(--color-text-secondary)",
            margin: 0 
          }}>
            Configure platform behavior, security, and integrations
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
            🔄 Reset to Defaults
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
            💾 Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Sidebar */}
        <div>
          <Card>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--color-text-primary)" }}>
                Settings Categories
              </h3>
            </div>
            
            <div className="space-y-2">
              {sidebarSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: activeSection === section.id ? "var(--color-primary)" : "transparent",
                    color: activeSection === section.id ? "white" : "var(--color-text-primary)",
                    border: "1px solid transparent",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    if (activeSection !== section.id) {
                      e.target.style.backgroundColor = "var(--color-background)";
                      e.target.style.borderColor = "var(--color-border)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeSection !== section.id) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderColor = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card>
            {activeSection === "general" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  General Settings
                </h3>
                
                <SettingItem 
                  title="Platform Name"
                  description="The display name for your mental health platform"
                >
                  <input
                    type="text"
                    value={settings.platformName}
                    onChange={(e) => setSettings(prev => ({...prev, platformName: e.target.value}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="Platform Description"
                  description="Brief description shown on login and about pages"
                >
                  <textarea
                    value={settings.platformDescription}
                    onChange={(e) => setSettings(prev => ({...prev, platformDescription: e.target.value}))}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      resize: "vertical",
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="Maintenance Mode"
                  description="Enable to temporarily disable access for maintenance"
                >
                  <Toggle 
                    checked={settings.maintenanceMode}
                    onChange={(value) => setSettings(prev => ({...prev, maintenanceMode: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Student Registration"
                  description="Allow new students to register for the platform"
                >
                  <Toggle 
                    checked={settings.registrationEnabled}
                    onChange={(value) => setSettings(prev => ({...prev, registrationEnabled: value}))}
                  />
                </SettingItem>
              </div>
            )}

            {activeSection === "security" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  Security & Privacy Settings
                </h3>
                
                <SettingItem 
                  title="Session Timeout"
                  description="Automatic logout after inactivity (minutes)"
                >
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({...prev, sessionTimeout: parseInt(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                  </select>
                </SettingItem>

                <SettingItem 
                  title="Maximum Login Attempts"
                  description="Lock account after this many failed login attempts"
                >
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings(prev => ({...prev, maxLoginAttempts: parseInt(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="Password Minimum Length"
                  description="Minimum characters required for passwords"
                >
                  <input
                    type="number"
                    min="6"
                    max="20"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings(prev => ({...prev, passwordMinLength: parseInt(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="Two-Factor Authentication"
                  description="Require 2FA for all admin and counselor accounts"
                >
                  <Toggle 
                    checked={settings.twoFactorRequired}
                    onChange={(value) => setSettings(prev => ({...prev, twoFactorRequired: value}))}
                  />
                </SettingItem>
              </div>
            )}

            {activeSection === "notifications" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  Notification Settings
                </h3>
                
                <SettingItem 
                  title="Email Notifications"
                  description="Send email notifications for important events"
                >
                  <Toggle 
                    checked={settings.emailNotifications}
                    onChange={(value) => setSettings(prev => ({...prev, emailNotifications: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="SMS Notifications"
                  description="Send SMS for critical alerts and reminders"
                >
                  <Toggle 
                    checked={settings.smsNotifications}
                    onChange={(value) => setSettings(prev => ({...prev, smsNotifications: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Push Notifications"
                  description="Browser push notifications for real-time updates"
                >
                  <Toggle 
                    checked={settings.pushNotifications}
                    onChange={(value) => setSettings(prev => ({...prev, pushNotifications: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Crisis Alerts"
                  description="Immediate notifications for crisis situations"
                >
                  <Toggle 
                    checked={settings.crisisAlerts}
                    onChange={(value) => setSettings(prev => ({...prev, crisisAlerts: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="System Alerts"
                  description="Notifications for system maintenance and issues"
                >
                  <Toggle 
                    checked={settings.systemAlerts}
                    onChange={(value) => setSettings(prev => ({...prev, systemAlerts: value}))}
                  />
                </SettingItem>
              </div>
            )}

            {activeSection === "ai-chat" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  AI Chat System Configuration
                </h3>
                
                <SettingItem 
                  title="AI Response Time Limit"
                  description="Maximum seconds before fallback to human counselor"
                >
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="0.5"
                    value={settings.aiResponseTime}
                    onChange={(e) => setSettings(prev => ({...prev, aiResponseTime: parseFloat(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="AI Personality Mode"
                  description="Choose the default personality for AI interactions"
                >
                  <select
                    value={settings.aiPersonality}
                    onChange={(e) => setSettings(prev => ({...prev, aiPersonality: e.target.value}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <option value="empathetic">Empathetic & Supportive</option>
                    <option value="clinical">Clinical & Professional</option>
                    <option value="friendly">Friendly & Casual</option>
                    <option value="adaptive">Adaptive to User Preference</option>
                  </select>
                </SettingItem>

                <SettingItem 
                  title="AI Safety Mode"
                  description="Enhanced safety filters for crisis detection"
                >
                  <Toggle 
                    checked={settings.aiSafetyMode}
                    onChange={(value) => setSettings(prev => ({...prev, aiSafetyMode: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Fallback to Counselor"
                  description="Automatically connect to human counselor when needed"
                >
                  <Toggle 
                    checked={settings.fallbackToCounselor}
                    onChange={(value) => setSettings(prev => ({...prev, fallbackToCounselor: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Context Retention"
                  description="Hours to retain conversation context for continuity"
                >
                  <select
                    value={settings.contextRetention}
                    onChange={(e) => setSettings(prev => ({...prev, contextRetention: parseInt(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <option value={1}>1 hour</option>
                    <option value={6}>6 hours</option>
                    <option value={24}>24 hours</option>
                    <option value={72}>72 hours</option>
                  </select>
                </SettingItem>
              </div>
            )}

            {activeSection === "booking" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  Booking System Configuration
                </h3>
                
                <SettingItem 
                  title="Maximum Advance Booking"
                  description="Days in advance students can book appointments"
                >
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.maxAdvanceBooking}
                    onChange={(e) => setSettings(prev => ({...prev, maxAdvanceBooking: parseInt(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="Default Session Duration"
                  description="Standard session length in minutes"
                >
                  <select
                    value={settings.defaultSessionDuration}
                    onChange={(e) => setSettings(prev => ({...prev, defaultSessionDuration: parseInt(e.target.value)}))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                </SettingItem>

                <SettingItem 
                  title="Allow Cancellations"
                  description="Students can cancel their own appointments"
                >
                  <Toggle 
                    checked={settings.allowCancellation}
                    onChange={(value) => setSettings(prev => ({...prev, allowCancellation: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Cancellation Deadline"
                  description="Hours before appointment that cancellation is allowed"
                >
                  <input
                    type="number"
                    min="1"
                    max="72"
                    value={settings.cancellationDeadline}
                    onChange={(e) => setSettings(prev => ({...prev, cancellationDeadline: parseInt(e.target.value)}))}
                    disabled={!settings.allowCancellation}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      opacity: settings.allowCancellation ? 1 : 0.5,
                    }}
                  />
                </SettingItem>

                <SettingItem 
                  title="Automatic Reminders"
                  description="Send reminder notifications before appointments"
                >
                  <Toggle 
                    checked={settings.autoReminders}
                    onChange={(value) => setSettings(prev => ({...prev, autoReminders: value}))}
                  />
                </SettingItem>
              </div>
            )}

            {activeSection === "moderation" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  Content Moderation Settings
                </h3>
                
                <SettingItem 
                  title="Automatic Moderation"
                  description="Enable AI-powered content filtering for peer posts"
                >
                  <Toggle 
                    checked={settings.autoModeration}
                    onChange={(value) => setSettings(prev => ({...prev, autoModeration: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Sensitivity Level"
                  description="How strict the automatic moderation should be"
                >
                  <select
                    value={settings.sensitivityLevel}
                    onChange={(e) => setSettings(prev => ({...prev, sensitivityLevel: e.target.value}))}
                    disabled={!settings.autoModeration}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                      opacity: settings.autoModeration ? 1 : 0.5,
                    }}
                  >
                    <option value="low">Low - Minimal filtering</option>
                    <option value="medium">Medium - Balanced approach</option>
                    <option value="high">High - Strict filtering</option>
                  </select>
                </SettingItem>

                <SettingItem 
                  title="Manual Review Queue"
                  description="Flag questionable content for manual review"
                >
                  <Toggle 
                    checked={settings.manualReview}
                    onChange={(value) => setSettings(prev => ({...prev, manualReview: value}))}
                  />
                </SettingItem>

                <SettingItem 
                  title="Community Guidelines"
                  description="Display community guidelines on posting interface"
                >
                  <Toggle 
                    checked={settings.communityGuidelines}
                    onChange={(value) => setSettings(prev => ({...prev, communityGuidelines: value}))}
                  />
                </SettingItem>
              </div>
            )}

            {activeSection === "integrations" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  External Integrations
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      name: "Google Workspace",
                      description: "Single Sign-On and Calendar integration",
                      status: "connected",
                      icon: "🔗"
                    },
                    {
                      name: "Microsoft Teams",
                      description: "Video calling and collaboration",
                      status: "disconnected",
                      icon: "📹"
                    },
                    {
                      name: "Slack",
                      description: "Team notifications and alerts",
                      status: "connected",
                      icon: "💬"
                    },
                    {
                      name: "Twilio",
                      description: "SMS notifications and reminders",
                      status: "disconnected",
                      icon: "📱"
                    },
                    {
                      name: "SendGrid",
                      description: "Email delivery service",
                      status: "connected",
                      icon: "📧"
                    },
                  ].map((integration, index) => (
                    <SettingItem
                      key={index}
                      title={integration.name}
                      description={integration.description}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            backgroundColor: integration.status === "connected" ? "var(--color-success-light)" : "var(--color-error-light)",
                            color: integration.status === "connected" ? "var(--color-success)" : "var(--color-error)",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {integration.status}
                        </span>
                        <button
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: integration.status === "connected" ? "var(--color-error)" : "var(--color-primary)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          {integration.status === "connected" ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    </SettingItem>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "backup" && (
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                  Backup & Recovery
                </h3>
                
                <SettingItem 
                  title="Automatic Backups"
                  description="Daily automated backups of all platform data"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: "var(--color-success-light)",
                        color: "var(--color-success)",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      ✅ Enabled
                    </span>
                    <button
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Configure Schedule
                    </button>
                  </div>
                </SettingItem>

                <SettingItem 
                  title="Last Backup"
                  description="Status and timestamp of most recent backup"
                >
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-success)", marginBottom: "0.25rem" }}>
                      ✅ Success
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      September 11, 2024 at 3:00 AM
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                      Size: 2.3 GB
                    </div>
                  </div>
                </SettingItem>

                <SettingItem 
                  title="Backup Retention"
                  description="How long to keep backup files"
                >
                  <select
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <option value={30}>30 days</option>
                    <option value={60}>60 days</option>
                    <option value={90}>90 days</option>
                    <option value={365}>1 year</option>
                  </select>
                </SettingItem>

                <SettingItem 
                  title="Manual Backup"
                  description="Create an immediate backup of current data"
                >
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
                    💾 Create Backup Now
                  </button>
                </SettingItem>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
