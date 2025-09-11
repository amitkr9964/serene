"use client";

import { useState, useContext } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";
import EmergencyButton from "./EmergencyButton";
import AnimatedIcon from './AnimatedIcon';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        backgroundColor: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
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
                <span
                  style={{
                    color: "white",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                >
                  S
                </span>
              </div>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "var(--color-text-primary)",
                }}
              >
                <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Serene</Link>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/home"
                style={{
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-primary)")
                }
              >
                Home
              </a>
              <a
                href="#features"
                style={{
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-primary)")
                }
              >
                Features
              </a>
              <a
                href="/safe-space"
                style={{
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-primary)")
                }
              >
                Safe Space
              </a>
              <a
                href="/about"
                style={{
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-primary)")
                }
              >
                About
              </a>
              <a
                href="/contact"
                style={{
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-primary)")
                }
              >
                Contact
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "0.4rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <AnimatedIcon 
                type={isDarkMode ? "sun" : "moon"} 
                size={16} 
                animate={true}
              />
            </button>
            <Link href="/auth/signin">
              <button
                className="btn-outline"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                Sign In
              </button>
            </Link>
            <Link href="/chat">
              <button
                className="btn-primary"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                Try Chatbot
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--color-text-primary)" }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "1rem",
                borderTop: "1px solid var(--color-border)",
                marginTop: "1rem",
              }}
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#home"
                  style={{
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "0.5rem 0",
                  }}
                >
                  Home
                </a>
                <a
                  href="#features"
                  style={{
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "0.5rem 0",
                  }}
                >
                  Features
                </a>
                <a
                  href="#about"
                  style={{
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "0.5rem 0",
                  }}
                >
                  About
                </a>
                <a
                  href="#contact"
                  style={{
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "0.5rem 0",
                  }}
                >
                  Contact
                </a>
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={toggleTheme}
                    style={{
                      background: "none",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <AnimatedIcon 
                      type={isDarkMode ? "sun" : "moon"} 
                      size={18} 
                      animate={true}
                    />
                  </button>
                  <div className="flex space-x-2">
                    <Link href="/auth/signin">
                      <button
                        className="btn-outline"
                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link href="/chat">
                      <button
                        className="btn-primary"
                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                      >
                        Try Chatbot
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
