"use client";

import Navbar from "../../components/Navbar";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";

export default function CulturalContextPage() {
  const { theme } = useTheme();
  const [selectedReligion, setSelectedReligion] = useState('all');

  const religions = [
    { id: 'all', name: 'All Faiths', icon: '🌍', color: 'var(--color-primary)' },
    { id: 'christianity', name: 'Christianity', icon: '✝️', color: 'var(--color-secondary)' },
    { id: 'islam', name: 'Islam', icon: '☪️', color: 'var(--color-accent)' },
    { id: 'hinduism', name: 'Hinduism', icon: '🕉️', color: 'var(--color-warning)' },
    { id: 'buddhism', name: 'Buddhism', icon: '☸️', color: 'var(--color-success)' },
    { id: 'judaism', name: 'Judaism', icon: '✡️', color: 'var(--color-error)' },
    { id: 'sikhism', name: 'Sikhism', icon: '🪯', color: 'var(--color-primary)' },
    { id: 'secular', name: 'Secular/Non-religious', icon: '🧠', color: 'var(--color-secondary)' },
  ];

  const resources = {
    all: [
      {
        title: "Interfaith Meditation Practices",
        type: "Video Series",
        duration: "45 mins",
        description: "Meditation techniques adapted for various spiritual traditions",
        thumbnail: "🧘‍♀️",
        category: "Mindfulness",
        languages: ["English", "Hindi", "Arabic", "Spanish"],
      },
      {
        title: "Cultural Sensitivity in Mental Health",
        type: "Research Paper",
        duration: "15 min read",
        description: "Understanding how cultural background affects mental health approaches",
        thumbnail: "📚",
        category: "Education",
        languages: ["English", "Mandarin", "French"],
      },
    ],
    christianity: [
      {
        title: "Prayer and Mental Wellness",
        type: "Audio Guide",
        duration: "30 mins",
        description: "Integrating Christian prayer practices with mental health care",
        thumbnail: "🙏",
        category: "Spiritual Wellness",
        languages: ["English", "Spanish", "Portuguese"],
      },
      {
        title: "Biblical Perspectives on Anxiety",
        type: "Article",
        duration: "8 min read",
        description: "Finding comfort in scripture during times of stress and worry",
        thumbnail: "📖",
        category: "Faith-Based Support",
        languages: ["English", "Korean"],
      },
      {
        title: "Community Support in Christian Context",
        type: "Video",
        duration: "20 mins",
        description: "Building supportive relationships within faith communities",
        thumbnail: "⛪",
        category: "Community",
        languages: ["English", "Spanish"],
      },
    ],
    islam: [
      {
        title: "Dhikr for Mental Peace",
        type: "Audio Guide",
        duration: "25 mins",
        description: "Using remembrance of Allah for emotional regulation and peace",
        thumbnail: "📿",
        category: "Spiritual Practice",
        languages: ["Arabic", "English", "Urdu"],
      },
      {
        title: "Islamic Perspectives on Mental Health",
        type: "Article",
        duration: "12 min read",
        description: "Understanding mental wellness through Islamic teachings",
        thumbnail: "🌙",
        category: "Faith-Based Support",
        languages: ["Arabic", "English", "Bengali"],
      },
      {
        title: "Salah and Mindfulness",
        type: "Video",
        duration: "18 mins",
        description: "The meditative aspects of Islamic prayer for mental clarity",
        thumbnail: "🕌",
        category: "Mindfulness",
        languages: ["Arabic", "English", "Malay"],
      },
    ],
    hinduism: [
      {
        title: "Yoga and Mental Wellness",
        type: "Video Series",
        duration: "60 mins",
        description: "Traditional yoga practices for emotional balance and mental health",
        thumbnail: "🧘‍♂️",
        category: "Physical Wellness",
        languages: ["Hindi", "Sanskrit", "English"],
      },
      {
        title: "Ayurvedic Approach to Mental Health",
        type: "Article",
        duration: "10 min read",
        description: "Ancient wisdom on balancing mind, body, and spirit",
        thumbnail: "🌿",
        category: "Holistic Health",
        languages: ["Hindi", "English", "Tamil"],
      },
      {
        title: "Mantras for Stress Relief",
        type: "Audio Guide",
        duration: "35 mins",
        description: "Sacred chants and their therapeutic effects on the mind",
        thumbnail: "🕉️",
        category: "Spiritual Practice",
        languages: ["Sanskrit", "Hindi", "English"],
      },
    ],
    buddhism: [
      {
        title: "Buddhist Mindfulness Meditation",
        type: "Video Guide",
        duration: "40 mins",
        description: "Traditional Vipassana meditation for mental clarity and peace",
        thumbnail: "🧘‍♀️",
        category: "Meditation",
        languages: ["English", "Thai", "Tibetan"],
      },
      {
        title: "Four Noble Truths and Suffering",
        type: "Article",
        duration: "15 min read",
        description: "Understanding and overcoming mental suffering through Buddhist wisdom",
        thumbnail: "☸️",
        category: "Philosophy",
        languages: ["English", "Chinese", "Japanese"],
      },
      {
        title: "Loving-Kindness for Self-Compassion",
        type: "Audio Meditation",
        duration: "22 mins",
        description: "Metta meditation for developing self-love and reducing self-criticism",
        thumbnail: "💝",
        category: "Self-Compassion",
        languages: ["English", "Pali", "Burmese"],
      },
    ],
    judaism: [
      {
        title: "Jewish Meditation Traditions",
        type: "Video",
        duration: "28 mins",
        description: "Kabbalistic and traditional Jewish approaches to meditation",
        thumbnail: "🕯️",
        category: "Spiritual Practice",
        languages: ["Hebrew", "English", "Yiddish"],
      },
      {
        title: "Tikkun Olam and Mental Health",
        type: "Article",
        duration: "12 min read",
        description: "Finding purpose through repairing the world and community service",
        thumbnail: "🌟",
        category: "Purpose & Meaning",
        languages: ["Hebrew", "English"],
      },
      {
        title: "Shabbat as Mental Rest",
        type: "Guide",
        duration: "10 min read",
        description: "Using weekly rest practices for mental rejuvenation",
        thumbnail: "🕯️",
        category: "Rest & Recovery",
        languages: ["Hebrew", "English", "Ladino"],
      },
    ],
    sikhism: [
      {
        title: "Simran and Mental Peace",
        type: "Audio Guide",
        duration: "30 mins",
        description: "Continuous remembrance practice for emotional stability",
        thumbnail: "🪯",
        category: "Spiritual Practice",
        languages: ["Punjabi", "English", "Hindi"],
      },
      {
        title: "Guru Granth Sahib on Mental Wellness",
        type: "Article",
        duration: "14 min read",
        description: "Wisdom from Sikh scripture on overcoming mental challenges",
        thumbnail: "📜",
        category: "Scripture Study",
        languages: ["Punjabi", "English"],
      },
      {
        title: "Seva and Community Mental Health",
        type: "Video",
        duration: "25 mins",
        description: "How selfless service contributes to personal and community wellness",
        thumbnail: "🤝",
        category: "Community Service",
        languages: ["Punjabi", "English", "Hindi"],
      },
    ],
    secular: [
      {
        title: "Secular Mindfulness Practices",
        type: "Video Course",
        duration: "50 mins",
        description: "Evidence-based mindfulness without religious context",
        thumbnail: "🧠",
        category: "Mindfulness",
        languages: ["English", "German", "French"],
      },
      {
        title: "Humanism and Mental Health",
        type: "Article",
        duration: "11 min read",
        description: "Finding meaning and purpose without religious framework",
        thumbnail: "🌱",
        category: "Philosophy",
        languages: ["English", "Swedish", "Dutch"],
      },
      {
        title: "Scientific Meditation Techniques",
        type: "Audio Guide",
        duration: "35 mins",
        description: "Meditation practices backed by neuroscience research",
        thumbnail: "🔬",
        category: "Science-Based",
        languages: ["English", "Japanese", "Korean"],
      },
    ],
  };

  const getCurrentResources = () => {
    return selectedReligion === 'all' 
      ? resources.all
      : resources[selectedReligion] || [];
  };

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                display: "inline-block",
              }}
            >
              🌍 Cultural Context
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              Faith & Culture-Informed Resources
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Access mental health resources that respect and integrate your religious, 
              spiritual, and cultural background. Find support that aligns with your beliefs and values.
            </p>
          </div>

          {/* Religion/Culture Filter */}
          <div style={{ marginBottom: "3rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Choose Your Faith or Cultural Context
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {religions.map((religion) => (
                <button
                  key={religion.id}
                  onClick={() => setSelectedReligion(religion.id)}
                  style={{
                    padding: "1rem",
                    backgroundColor: selectedReligion === religion.id ? religion.color : "var(--color-surface)",
                    color: selectedReligion === religion.id ? "white" : "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                  onMouseOver={(e) => {
                    if (selectedReligion !== religion.id) {
                      e.target.style.backgroundColor = "var(--color-border)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedReligion !== religion.id) {
                      e.target.style.backgroundColor = "var(--color-surface)";
                    }
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    {religion.icon}
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                    {religion.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Faith Info */}
          {selectedReligion !== 'all' && (
            <div
              style={{
                marginBottom: "3rem",
                padding: "2rem",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                {religions.find(r => r.id === selectedReligion)?.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                {religions.find(r => r.id === selectedReligion)?.name} Resources
              </h3>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: "1.6",
                }}
              >
                Discover mental health resources that honor your faith tradition and 
                cultural values, offering support that feels authentic and meaningful to your beliefs.
              </p>
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentResources().map((resource, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
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
                {/* Thumbnail */}
                <div
                  style={{
                    height: "140px",
                    backgroundColor: selectedReligion !== 'all' 
                      ? religions.find(r => r.id === selectedReligion)?.color 
                      : "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3.5rem",
                    position: "relative",
                  }}
                >
                  {resource.thumbnail}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "var(--color-text-primary)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {resource.type}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {resource.duration}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.7rem",
                        fontWeight: "500",
                      }}
                    >
                      {resource.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      marginBottom: "0.75rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {resource.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      marginBottom: "1rem",
                    }}
                  >
                    {resource.description}
                  </p>

                  {/* Languages */}
                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-secondary)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Available in:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                      {resource.languages.map((lang, langIndex) => (
                        <span
                          key={langIndex}
                          style={{
                            fontSize: "0.7rem",
                            backgroundColor: "var(--color-border)",
                            color: "var(--color-text-secondary)",
                            padding: "0.2rem 0.4rem",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: selectedReligion !== 'all' 
                        ? religions.find(r => r.id === selectedReligion)?.color 
                        : "var(--color-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Access Resource
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Community Guidelines */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2rem",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Our Commitment to Cultural Sensitivity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤝</div>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Respectful Integration
                </h4>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  We integrate cultural and religious wisdom with evidence-based mental health practices.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌍</div>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Inclusive Approach
                </h4>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  Resources are available for all faiths, beliefs, and cultural backgrounds.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💫</div>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Authentic Resources
                </h4>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  Content is developed with input from religious leaders and cultural experts.
                </p>
              </div>
            </div>
          </div>

          {/* Request Custom Resources */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              backgroundColor: "var(--color-primary)",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Don't see your faith or culture represented?
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "2rem",
                maxWidth: "500px",
                margin: "0 auto 2rem auto",
              }}
            >
              We're continuously expanding our cultural resources. Request specific content 
              for your faith tradition or cultural background.
            </p>
            <button
              style={{
                padding: "0.875rem 2rem",
                backgroundColor: "white",
                color: "var(--color-primary)",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            >
              Request Cultural Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
