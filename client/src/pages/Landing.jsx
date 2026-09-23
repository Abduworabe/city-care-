import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import ThreeDBackground from "../components/ThreeBackground";
import { useSettings } from "../context/SettingsContext";

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const { t } = useSettings();

  const features = [
    { id: "construction", icon: "🏗️", titleKey: "feat_construction", descKey: "feat_construction_desc", statKey: "feat_construction_stat", color: "#ff6000" },
    { id: "water",        icon: "💧", titleKey: "feat_water",         descKey: "feat_water_desc",         statKey: "feat_water_stat",         color: "#1e90ff" },
    { id: "waste",        icon: "🚛", titleKey: "feat_waste",         descKey: "feat_waste_desc",         statKey: "feat_waste_stat",         color: "#2ecc71" },
  ];

  return (
    <>
      <ThreeDBackground />
      <Wrapper>
        {/* Nav */}
        <nav className="nav">
          <div className="nav-center">
            <Logo />
            <div className="nav-links">
              <Link to="/login"    className="btn nav-btn">{t.login}</Link>
              <Link to="/register" className="btn nav-btn">{t.register}</Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-center">
            <div className="hero-content">
              <h1>{t.welcome} <span className="brand">{t.app_name}</span></h1>
              <h2>{t.hero_subtitle}</h2>
              <p className="hero-text">{t.hero_text}</p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">{t.get_started}</Link>
                <Link to="/login"    className="btn btn-secondary">{t.view_dashboard}</Link>
              </div>
              <div className="feature-highlights">
                {features.map((f) => (
                  <div key={f.id}
                    className={`feature-highlight ${activeFeature === f.id ? "active" : ""}`}
                    onMouseEnter={() => setActiveFeature(f.id)}
                    onMouseLeave={() => setActiveFeature(null)}
                    style={{ borderColor: f.color }}>
                    <div className="feature-icon">{f.icon}</div>
                    <div className="feature-info">
                      <h4>{t[f.titleKey]}</h4>
                      <p>{t[f.statKey]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="section-center">
            <h2>{t.features_title}</h2>
            <p className="section-subtitle">{t.features_subtitle}</p>
            <div className="features-grid">
              {features.map((f) => (
                <div key={f.id}
                  className={`feature-card ${activeFeature === f.id ? "active" : ""}`}
                  onMouseEnter={() => setActiveFeature(f.id)}
                  onMouseLeave={() => setActiveFeature(null)}>
                  <div className="feature-icon" style={{ color: f.color }}>{f.icon}</div>
                  <h3>{t[f.titleKey]}</h3>
                  <p>{t[f.descKey]}</p>
                  <div className="feature-stats">
                    <span className="stat-badge" style={{ background: f.color }}>{t[f.statKey]}</span>
                  </div>
                  <div className="feature-actions">
                    <Link to="/register" className="btn-feature" style={{ borderColor: f.color, color: f.color }}>
                      {t.get_started}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="section-center">
            <h2>{t.stats_section_title}</h2>
            <div className="stats-grid">
              {[
                { icon:"🚦", num:"1,247", label:"Active Traffic Signals" },
                { icon:"💡", num:"8,956", label:"Street Lights Online" },
                { icon:"🚰", num:"98.2%", label:"Water Supply Coverage" },
                { icon:"🌳", num:"156",   label:"Parks & Green Spaces" },
              ].map(({ icon, num, label }) => (
                <div key={label} className="stat-card live">
                  <div className="stat-icon">{icon}</div>
                  <h3>{num}</h3>
                  <p>{label}</p>
                  <div className="live-indicator"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta enhanced">
          <div className="section-center">
            <div className="cta-content">
              <h2>{t.cta_title}</h2>
              <p>{t.cta_text}</p>
              <div className="cta-features">
                <div className="cta-feature"><span>✅</span> {t.cta_feature1}</div>
                <div className="cta-feature"><span>✅</span> {t.cta_feature2}</div>
                <div className="cta-feature"><span>✅</span> {t.cta_feature3}</div>
              </div>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary btn-large">{t.create_account}</Link>
                <Link to="/login"    className="btn btn-secondary btn-large">{t.sign_in}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer enhanced">
          <div className="section-center">
            <div className="footer-content">
              <div className="footer-section">
                <Logo />
                <p>{t.app_tagline}</p>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">📘</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="LinkedIn">💼</a>
                </div>
              </div>
              <div className="footer-section">
                <h4>{t.quick_links}</h4>
                <Link to="/login">{t.login}</Link>
                <Link to="/register">{t.register}</Link>
                <Link to="/dashboard">{t.dashboard}</Link>
              </div>
              <div className="footer-section">
                <h4>{t.departments}</h4>
                <a href="#">{t.feat_construction}</a>
                <a href="#">{t.feat_water}</a>
                <a href="#">{t.feat_waste}</a>
              </div>
              <div className="footer-section">
                <h4>{t.contact_support}</h4>
                <p>📞 +251 (0) 46 111 0000</p>
                <p>📧 support@worabe.gov.et</p>
                <p>📍 Worabe, Silti Zone, Ethiopia</p>
                <p>🕒 Mon–Fri: 8am – 5pm</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} {t.footer_copy}</p>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

export default Landing;
