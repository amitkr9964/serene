"use client";

import AnimatedIcon from './AnimatedIcon';

export default function FeaturesSection() {
  const features = [
    {
      icon: "zap",
      title: "AI-Guided First-Aid Support",
      description:
        "Interactive chatbot offering immediate coping strategies and professional referrals when needed.",
      color: "var(--color-primary)",
    },
    {
      icon: "calendar",
      title: "Confidential Booking System",
      description:
        "Private appointment scheduling with on-campus counselors and mental health helplines.",
      color: "var(--color-secondary)",
    },
    {
      icon: "book",
      title: "Psychoeducational Resources",
      description:
        "Videos, relaxation audio, and wellness guides in regional languages.",
      color: "var(--color-accent)",
    },
    {
      icon: "users",
      title: "Peer Support Platform",
      description:
        "Moderated peer-to-peer support forum with trained student volunteers.",
      color: "var(--color-success)",
    },
    {
      icon: "chart",
      title: "Admin Dashboard",
      description:
        "Anonymous data analytics for institutions to recognize trends and plan interventions.",
      color: "var(--color-warning)",
    },
    {
      icon: "heart",
      title: "Cultural Context",
      description:
        "Region-specific customization with cultural awareness and local language support.",
      color: "var(--color-error)",
    },
  ];

  return (
    <section
      id="features"
      className="section-padding"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              padding: "0.4rem 0.8rem",
              borderRadius: "var(--radius-lg)",
              fontSize: "0.8rem",
              fontWeight: "500",
              marginBottom: "0.75rem",
              display: "inline-block",
            }}
          >
            ✨ Features
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: "600",
              color: "var(--color-text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            Comprehensive Mental Health Support
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: "1.5",
            }}
          >
            Our platform provides a complete ecosystem for student mental
            wellness, designed specifically for higher education institutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            // Define links for each feature
            const getFeatureLink = (title) => {
              switch(title) {
                case "AI-Guided First-Aid Support": return "/chat";
                case "Confidential Booking System": return "/booking";
                case "Psychoeducational Resources": return "/resources";
                case "Peer Support Platform": return "/peer-support";
                case "Admin Dashboard": return "/site/admin";
                case "Cultural Context": return "/cultural-context";
                default: return "/";
              }
            };

            return (
              <a
                href={getFeatureLink(feature.title)}
                key={index}
                className="card"
                style={{
                  background: "var(--color-background)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: feature.color,
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <AnimatedIcon 
                  type={feature.icon} 
                  size={24} 
                  color="white" 
                  animate={true}
                />
              </div>

              <h3
                style={{
                  color: "var(--color-text-primary)",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: "1.5",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                {feature.description}
              </p>
            </a>
          );
        })}
        </div>

        {/* Stats Section */}
        <div style={{ marginTop: "3rem" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: "24/7", label: "AI Support Available", icon: "clock" },
              { number: "100%", label: "Confidential & Private", icon: "lock" },
              { number: "5+", label: "Regional Languages", icon: "heart" },
              { number: "∞", label: "Unlimited Resources", icon: "book" },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>
                  <AnimatedIcon 
                    type={stat.icon} 
                    size={24} 
                    color="var(--color-primary)" 
                    animate={true}
                  />
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "var(--color-primary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
