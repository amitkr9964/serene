"use client";

import Navbar from "../../components/Navbar";
import { useTheme } from "../../contexts/ThemeContext";

export default function AboutPage() {
  const { theme } = useTheme();

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Clinical Director",
      image: "👩‍⚕️",
      bio: "Licensed clinical psychologist with 15+ years experience in student mental health services.",
    },
    {
      name: "Michael Chen",
      role: "Lead Developer", 
      image: "👨‍💻",
      bio: "Full-stack developer passionate about creating accessible mental health technology.",
    },
    {
      name: "Dr. Priya Patel",
      role: "Research Coordinator",
      image: "👩‍🔬",
      bio: "PhD in Psychology specializing in digital mental health interventions and student wellbeing.",
    },
    {
      name: "James Wilson",
      role: "Student Advocate",
      image: "👨‍🎓",
      bio: "Graduate student and peer counselor dedicated to breaking mental health stigma on campus.",
    },
  ];

  const values = [
    {
      icon: "🔒",
      title: "Privacy First",
      description: "We prioritize confidentiality and ensure all interactions remain completely private and secure.",
    },
    {
      icon: "🌍",
      title: "Cultural Sensitivity",
      description: "Our services are designed to respect diverse cultural backgrounds and provide inclusive support.",
    },
    {
      icon: "📚",
      title: "Evidence-Based",
      description: "All our resources and interventions are grounded in scientific research and best practices.",
    },
    {
      icon: "🤝",
      title: "Collaborative Care",
      description: "We work together with students, counselors, and institutions to provide comprehensive support.",
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      <Navbar />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              🌟 About Us
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Empowering Student Mental Wellness
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--color-text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Serene is dedicated to revolutionizing mental health support in higher education through 
              innovative technology, compassionate care, and evidence-based interventions.
            </p>
          </div>

          {/* Mission Section */}
          <div
            style={{
              marginBottom: "4rem",
              padding: "3rem",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "var(--color-text-primary)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Our Mission
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: "1.7",
                    marginBottom: "1.5rem",
                  }}
                >
                  To create a comprehensive, culturally-sensitive platform that makes mental health 
                  support accessible, private, and effective for every student. We believe that 
                  mental wellness is fundamental to academic success and personal growth.
                </p>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: "1.7",
                  }}
                >
                  Our platform combines cutting-edge AI technology with human expertise to provide 
                  24/7 support, crisis intervention, and personalized resources tailored to each 
                  student's unique needs and cultural background.
                </p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎯</div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "var(--color-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Impact Goal
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Reaching 100,000+ students across 500+ institutions by 2026, 
                  reducing mental health barriers and improving campus wellness outcomes.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div style={{ marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  style={{
                    padding: "2rem",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{value.icon}</div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div style={{ marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  style={{
                    padding: "2rem",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      fontSize: "4rem",
                      marginBottom: "1rem",
                      width: "80px",
                      height: "80px",
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem auto",
                    }}
                  >
                    {member.image}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-primary)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.85rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div
            style={{
              padding: "3rem",
              backgroundColor: "var(--color-primary)",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "2rem",
              }}
            >
              Our Impact So Far
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "15,000+", label: "Students Helped" },
                { number: "50+", label: "Partner Universities" },
                { number: "24/7", label: "Support Available" },
                { number: "98%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <div key={index}>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      color: "white",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Want to Learn More?
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "1rem",
                marginBottom: "2rem",
                maxWidth: "500px",
                margin: "0 auto 2rem auto",
              }}
            >
              We're always happy to discuss partnerships, answer questions, or 
              provide more information about our services.
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "0.875rem 2rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                textDecoration: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--color-primary-dark)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--color-primary)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
