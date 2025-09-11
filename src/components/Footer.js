"use client";

import AnimatedIcon from './AnimatedIcon';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        marginTop: "auto",
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ padding: "2rem 1rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-3">
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "0.6rem",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                >
                  S
                </span>
              </div>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "var(--color-text-primary)",
                }}
              >
                Serene
              </span>
            </div>
            <p
              style={{
                color: "var(--color-text-secondary)",
                maxWidth: "350px",
                lineHeight: "1.5",
                fontSize: "0.9rem",
              }}
            >
              Your AI-powered mental health companion. Providing 24/7 support,
              resources, and guidance for college students&#39; mental wellness
              journey.
            </p>
 </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "600",
                marginBottom: "0.75rem",
                fontSize: "1rem",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Home",
                "Features",
                "About Us",
                "Contact",
                "Privacy Policy",
              ].map((item) => (
                <li key={item} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    style={{
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "600",
                marginBottom: "0.75rem",
                fontSize: "1rem",
              }}
            >
              Support
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Help Center",
                "Crisis Support",
                "Resources",
                "Community Guidelines",
                "Feedback",
              ].map((item) => (
                <li key={item} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    style={{
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            marginTop: "3rem",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              © 2025 Serene. All rights reserved. Built for mental wellness.
            </p>
            <div className="flex space-x-6">
              <a
                href="#terms"
                style={{
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
              >
                Terms of Service
              </a>
              <a
                href="#privacy"
                style={{
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
              >
                Privacy Policy
              </a>
              <a
                href="#cookies"
                style={{
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s ease",
                }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="text-center">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.75rem",
                margin: 0,
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <AnimatedIcon type="alert" size={12} color="var(--color-error)" />
              Emergency? Contact your local crisis helpline or emergency
              services immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
