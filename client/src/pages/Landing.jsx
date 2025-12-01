import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import ThreeDBackground from "../components/ThreeBackground";

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: "construction",
      icon: "🏗️",
      title: "Construction & Infrastructure",
      description:
        "Monitor and report construction projects and public infrastructure improvements in real-time 3D visualization.",
      stats: "50+ Active Projects",
      color: "#ff6000",
    },
    {
      id: "water",
      icon: "💧",
      title: "Water & Sanitation",
      description:
        "Track water supply systems and sanitation facility development with interactive maps and real-time monitoring.",
      stats: "15 Systems Monitored",
      color: "#1e90ff",
    },
    {
      id: "waste",
      icon: "🚛",
      title: "Waste Management",
      description:
        "Coordinate waste collection and environmental cleanup programs with optimized routes and schedules.",
      stats: "95% Coverage",
      color: "#2ecc71",
    },
  ];

  return (
    <>
      {/* Enhanced 3D Canvas Background */}
      <ThreeDBackground />

      <Wrapper>
        {/* Navigation Bar */}
        <nav className="nav">
          <div className="nav-center">
            <Logo />
            <div className="nav-links">
              <Link to="/login" className="btn nav-btn">
                Login
              </Link>
              <Link to="/register" className="btn nav-btn">
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-center">
            <div className="hero-content">
              <h1>
                Welcome to <span className="brand">CityCare</span>
              </h1>
              <h2>Smart Municipal Development Management System</h2>
              <p className="hero-text">
                Experience the future of urban management with our interactive
                3D city visualization. Monitor infrastructure, track
                development, and engage with your community in real-time.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">
                  🚀 Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  📊 View Dashboard
                </Link>
              </div>

              {/* Interactive Feature Highlights */}
              <div className="feature-highlights">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`feature-highlight ${
                      activeFeature === feature.id ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveFeature(feature.id)}
                    onMouseLeave={() => setActiveFeature(null)}
                    style={{ borderColor: feature.color }}
                  >
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-info">
                      <h4>{feature.title}</h4>
                      <p>{feature.stats}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="features">
          <div className="section-center">
            <h2>Smart City Features</h2>
            <p className="section-subtitle">
              Explore our comprehensive suite of tools designed for modern urban
              management
            </p>
            <div className="features-grid">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`feature-card ${
                    activeFeature === feature.id ? "active" : ""
                  }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div
                    className="feature-icon"
                    style={{ color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-stats">
                    <span
                      className="stat-badge"
                      style={{ background: feature.color }}
                    >
                      {feature.stats}
                    </span>
                  </div>
                  <div className="feature-actions">
                    <button
                      className="btn-feature"
                      style={{
                        borderColor: feature.color,
                        color: feature.color,
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Statistics Section */}
        <section className="stats">
          <div className="section-center">
            <h2>Real-time City Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card live">
                <div className="stat-icon">🚦</div>
                <h3>1,247</h3>
                <p>Active Traffic Signals</p>
                <div className="live-indicator"></div>
              </div>
              <div className="stat-card live">
                <div className="stat-icon">💡</div>
                <h3>8,956</h3>
                <p>Street Lights Online</p>
                <div className="live-indicator"></div>
              </div>
              <div className="stat-card live">
                <div className="stat-icon">🚰</div>
                <h3>98.2%</h3>
                <p>Water Supply Coverage</p>
                <div className="live-indicator"></div>
              </div>
              <div className="stat-card live">
                <div className="stat-icon">🌳</div>
                <h3>156</h3>
                <p>Parks & Green Spaces</p>
                <div className="live-indicator"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Preview */}
        <section className="map-preview">
          <div className="section-center">
            <h2>Explore Our Interactive City Map</h2>
            <div className="map-features">
              <div className="map-feature">
                <div
                  className="feature-marker"
                  style={{ background: "#ff6000" }}
                ></div>
                <span>Construction Sites</span>
              </div>
              <div className="map-feature">
                <div
                  className="feature-marker"
                  style={{ background: "#1e90ff" }}
                ></div>
                <span>Water Systems</span>
              </div>
              <div className="map-feature">
                <div
                  className="feature-marker"
                  style={{ background: "#2ecc71" }}
                ></div>
                <span>Parks & Green Zones</span>
              </div>
              <div className="map-feature">
                <div
                  className="feature-marker"
                  style={{ background: "#9b59b6" }}
                ></div>
                <span>Public Transport</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="cta enhanced">
          <div className="section-center">
            <div className="cta-content">
              <h2>Ready to Transform Your City?</h2>
              <p>
                Join thousands of municipal authorities who are already using
                CityCare to build smarter, more sustainable urban environments.
              </p>
              <div className="cta-features">
                <div className="cta-feature">
                  <span className="check">✅</span>
                  Real-time 3D Monitoring
                </div>
                <div className="cta-feature">
                  <span className="check">✅</span>
                  Smart Analytics & Reports
                </div>
                <div className="cta-feature">
                  <span className="check">✅</span>
                  Citizen Engagement Tools
                </div>
              </div>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary btn-large">
                  Start Your Free Trial
                </Link>
                <Link to="/demo" className="btn btn-secondary btn-large">
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="footer enhanced">
          <div className="section-center">
            <div className="footer-content">
              <div className="footer-section">
                <Logo />
                <p>Smart Municipal Development Management System</p>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">
                    📘
                  </a>
                  <a href="#" aria-label="Twitter">
                    🐦
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    💼
                  </a>
                  <a href="#" aria-label="Instagram">
                    📸
                  </a>
                </div>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/map">Interactive Map</Link>
                <Link to="/reports">Reports</Link>
              </div>
              <div className="footer-section">
                <h4>Departments</h4>
                <Link to="/construction">Construction</Link>
                <Link to="/water">Water & Sanitation</Link>
                <Link to="/waste">Waste Management</Link>
                <Link to="/transport">Public Transport</Link>
                <Link to="/environment">Environment</Link>
              </div>
              <div className="footer-section">
                <h4>Contact & Support</h4>
                <p>📞 (555) 123-CITY</p>
                <p>📧 support@citycare.gov</p>
                <p>📍 123 Municipal Plaza, City Center</p>
                <p>🕒 24/7 Support Available</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                &copy; 2024 CityCare Municipal System. All rights reserved. |
                <a href="/privacy"> Privacy Policy</a> |
                <a href="/terms"> Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

export default Landing;
