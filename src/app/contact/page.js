"use client";

import Navbar from "../../components/Navbar";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";
import AnimatedIcon from "../../components/AnimatedIcon";

export default function ContactPage() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
                padding: "0.4rem 0.8rem",
                borderRadius: "var(--radius-lg)",
                fontSize: "0.8rem",
                fontWeight: "500",
                marginBottom: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <AnimatedIcon name="phone" size={14} color="white" /> Contact Us
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Get in Touch
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-secondary)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              We&#39;re here to help. Reach out to us for support, questions, or feedback about our mental health services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "2rem",
                }}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Office Location",
                    details: ["123 University Campus", "Mental Health Center", "Building A, Room 205"],
                  },
                  {
                    icon: "phone",
                    title: "Phone Numbers",
                    details: ["+1 (555) 123-4567", "Emergency: +1 (555) 911-HELP"],
                  },
                  {
                    icon: "mail",
                    title: "Email Addresses",
                    details: ["support@serene.edu", "emergency@serene.edu"],
                  },
                  {
                    icon: "🕒",
                    title: "Office Hours",
                    details: ["Monday - Friday: 8:00 AM - 8:00 PM", "Weekend: 10:00 AM - 4:00 PM", "Emergency Support: 24/7"],
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      padding: "1.5rem",
                      backgroundColor: "var(--color-surface)",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "1rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      <AnimatedIcon name={item.icon} size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "var(--color-text-primary)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p
                          key={idx}
                          style={{
                            color: "var(--color-text-secondary)",
                            margin: "0.2rem 0",
                            fontSize: "0.95rem",
                          }}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "2rem",
                }}
              >
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--color-text-primary)",
                      fontSize: "0.95rem",
                    }}
                    placeholder="Enter your full name"
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--color-text-primary)",
                      fontSize: "0.95rem",
                    }}
                    placeholder="Enter your email address"
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
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--color-text-primary)",
                      fontSize: "0.95rem",
                    }}
                    placeholder="What is this regarding?"
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
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--color-text-primary)",
                      fontSize: "0.95rem",
                      resize: "vertical",
                    }}
                    placeholder="Please describe how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "var(--color-primary-dark)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "var(--color-primary)";
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Emergency Notice */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              backgroundColor: "var(--color-error-light)",
              border: "1px solid var(--color-error)",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "var(--color-error)",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <AnimatedIcon type="alert" size={20} color="var(--color-error)" />
              Crisis Support
            </h3>
            <p
              style={{
                color: "var(--color-text-primary)",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              If you&#39;re experiencing a mental health crisis or having thoughts of self-harm, 
              please contact emergency services immediately at <strong>911</strong> or call our 
              crisis hotline at <strong>+1 (555) 911-HELP</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
