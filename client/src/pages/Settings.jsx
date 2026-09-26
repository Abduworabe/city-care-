import React, { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { toast } from "react-toastify";
import styled from "styled-components";

const LANGUAGES = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "am", label: "አማርኛ (Amharic)", flag: "🇪🇹" },
  { value: "or", label: "Afaan Oromo", flag: "🇪🇹" },
  { value: "ti", label: "ትግርኛ (Tigrinya)", flag: "🇪🇹" },
  { value: "so", label: "Somali", flag: "🇸🇴" },
];

const Settings = () => {
  const { settings, updateSetting, saveSettings, resetSettings, t } = useSettings();
  const [local, setLocal] = useState({ ...settings });
  const [activeSection, setActiveSection] = useState("appearance");
  const [showResetModal, setShowResetModal] = useState(false);

  const change = (key, value) => setLocal((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    saveSettings(local);
    toast.success(t.saved_msg);
  };

  const handleReset = () => {
    resetSettings();
    setLocal({ language: "en", theme: "light", fontSize: "medium",
      emailNotifications: true, smsNotifications: false, pushNotifications: true,
      twoFactorAuth: false, privacyMode: false, autoSave: true, dataSaving: false });
    setShowResetModal(false);
    toast.success(t.saved_msg);
  };

  const navItems = [
    { id: "appearance",    icon: "🎨", label: t.set_nav_appearance },
    { id: "language",      icon: "🌐", label: t.set_nav_language },
    { id: "notifications", icon: "🔔", label: t.set_nav_notifications },
    { id: "privacy",       icon: "🔒", label: t.set_nav_privacy },
    { id: "data",          icon: "💾", label: t.set_nav_data },
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <header className="s-header">
        <div>
          <h1 className="s-title">⚙️ {t.settings_title}</h1>
          <p className="s-subtitle">{t.settings_subtitle}</p>
        </div>
        <div className="header-actions">
          <button className="btn-reset" onClick={() => setShowResetModal(true)}>↺ {t.reset}</button>
          <button className="btn-save"  onClick={handleSave}>💾 {t.save}</button>
        </div>
      </header>

      <div className="s-body">
        {/* Sidebar */}
        <nav className="s-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`s-nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="s-nav-icon">{item.icon}</span>
              <span className="s-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="s-content">

          {/* ── APPEARANCE */}
          {activeSection === "appearance" && (
            <Section title={t.appearance_title} desc={t.appearance_desc}>
              <SettingRow label={t.theme_label} desc={t.theme_desc}>
                <div className="choice-group">
                  <button className={`choice-btn ${local.theme === "light" ? "active" : ""}`}
                    onClick={() => change("theme", "light")}>☀️ {t.theme_light}</button>
                  <button className={`choice-btn ${local.theme === "dark" ? "active" : ""}`}
                    onClick={() => change("theme", "dark")}>🌙 {t.theme_dark}</button>
                </div>
              </SettingRow>
              <SettingRow label={t.font_label} desc={t.font_desc}>
                <div className="choice-group">
                  {["small","medium","large","xlarge"].map((s) => (
                    <button key={s}
                      className={`choice-btn ${local.fontSize === s ? "active" : ""}`}
                      onClick={() => change("fontSize", s)}>
                      {t[`font_${s}`]}
                    </button>
                  ))}
                </div>
              </SettingRow>
            </Section>
          )}

          {/* ── LANGUAGE */}
          {activeSection === "language" && (
            <Section title={t.language_title} desc={t.language_desc}>
              <div className="lang-grid">
                {LANGUAGES.map((lang) => (
                  <button key={lang.value}
                    className={`lang-card ${local.language === lang.value ? "active" : ""}`}
                    onClick={() => change("language", lang.value)}>
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-name">{lang.label}</span>
                    {local.language === lang.value && <span className="lang-check">✓</span>}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* ── NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <Section title={t.notif_title} desc={t.notif_desc}>
              <SettingRow label={t.email_notif} desc={t.email_notif_desc}>
                <Toggle checked={local.emailNotifications}
                  onChange={(v) => change("emailNotifications", v)} />
              </SettingRow>
              <SettingRow label={t.sms_notif} desc={t.sms_notif_desc}>
                <Toggle checked={local.smsNotifications}
                  onChange={(v) => change("smsNotifications", v)} />
              </SettingRow>
              <SettingRow label={t.push_notif} desc={t.push_notif_desc}>
                <Toggle checked={local.pushNotifications}
                  onChange={(v) => change("pushNotifications", v)} />
              </SettingRow>
            </Section>
          )}

          {/* ── PRIVACY */}
          {activeSection === "privacy" && (
            <Section title={t.privacy_title} desc={t.privacy_desc}>
              <SettingRow label={t.two_factor} desc={t.two_factor_desc}>
                <Toggle checked={local.twoFactorAuth}
                  onChange={(v) => change("twoFactorAuth", v)} />
              </SettingRow>
              <SettingRow label={t.privacy_mode} desc={t.privacy_mode_desc}>
                <Toggle checked={local.privacyMode}
                  onChange={(v) => change("privacyMode", v)} />
              </SettingRow>
            </Section>
          )}

          {/* ── DATA */}
          {activeSection === "data" && (
            <Section title={t.data_title} desc={t.data_desc}>
              <SettingRow label={t.auto_save} desc={t.auto_save_desc}>
                <Toggle checked={local.autoSave}
                  onChange={(v) => change("autoSave", v)} />
              </SettingRow>
              <SettingRow label={t.data_saving} desc={t.data_saving_desc}>
                <Toggle checked={local.dataSaving}
                  onChange={(v) => change("dataSaving", v)} />
              </SettingRow>
            </Section>
          )}

          <div className="bottom-actions">
            <button className="btn-save" onClick={handleSave}>💾 {t.save}</button>
          </div>
        </main>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ {t.reset_confirm_title}</h3>
            <p>{t.reset_confirm_msg}</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowResetModal(false)}>{t.cancel}</button>
              <button className="btn-danger" onClick={handleReset}>{t.reset_confirm_btn}</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

// ── Sub-components
const Section = ({ title, desc, children }) => (
  <div className="s-section">
    <div className="s-section-head">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
    <div className="s-section-body">{children}</div>
  </div>
);

const SettingRow = ({ label, desc, children }) => (
  <div className="setting-row">
    <div className="setting-info">
      <p className="setting-label">{label}</p>
      <p className="setting-desc">{desc}</p>
    </div>
    <div className="setting-control">{children}</div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <label className="toggle">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className="toggle-track"><span className="toggle-thumb" /></span>
  </label>
);

// ── Styles
const PageWrapper = styled.div`
  min-height: calc(100vh - var(--nav-height));
  background: var(--background-color);
  color: var(--text-color);
  padding: 1.5rem;

  .s-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #0f0c29, #1a1a2e);
    border-radius: 16px; border: 1px solid rgba(255,96,0,0.2);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
  .s-title { color: white; font-size: clamp(1.3rem,3vw,1.9rem); font-weight: 800; margin: 0 0 0.3rem; }
  .s-subtitle { color: rgba(255,255,255,0.6); font-size: 0.88rem; margin: 0; }
  .header-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  .s-body {
    display: grid; grid-template-columns: 210px 1fr; gap: 1.5rem; align-items: start;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  .s-nav {
    background: var(--background-secondary-color); border-radius: 14px;
    padding: 0.5rem; border: 1px solid var(--border-color);
    box-shadow: var(--shadow-1); position: sticky; top: 1rem;
    display: flex; flex-direction: column; gap: 0.25rem;
    @media (max-width: 768px) { position: static; flex-direction: row; flex-wrap: wrap; gap: 0.35rem; }
  }

  .s-nav-item {
    display: flex; align-items: center; gap: 0.7rem; padding: 0.75rem 1rem;
    border-radius: 10px; border: none; background: transparent;
    color: var(--text-secondary-color); font-size: 0.88rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s ease; text-align: left; width: 100%;
    &:hover { background: rgba(255,96,0,0.08); color: var(--primary-accent); }
    &.active { background: var(--primary-accent); color: white; font-weight: 600; }
    .s-nav-icon { font-size: 1.05rem; flex-shrink: 0; }
    @media (max-width: 768px) { width: auto; flex: 1; min-width: 80px; justify-content: center; font-size: 0.8rem; padding: 0.6rem 0.5rem; }
    @media (max-width: 480px) { .s-nav-label { display: none; } .s-nav-icon { font-size: 1.3rem; } min-width: 44px; }
  }

  .s-content { display: flex; flex-direction: column; gap: 1.25rem; }

  .s-section {
    background: var(--background-secondary-color); border-radius: 16px;
    padding: 1.5rem; border: 1px solid var(--border-color);
    box-shadow: var(--shadow-1); animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  .s-section-head { margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);
    h2 { font-size: 1.05rem; font-weight: 700; color: var(--text-color); margin: 0 0 0.3rem; }
    p  { font-size: 0.82rem; color: var(--text-secondary-color); margin: 0; }
  }
  .s-section-body { display: flex; flex-direction: column; gap: 0.85rem; }

  .setting-row {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 1rem 1.25rem; background: var(--background-color);
    border-radius: 10px; border: 1px solid var(--border-color); transition: border-color 0.2s;
    &:hover { border-color: var(--primary-accent); }
    @media (max-width: 540px) { flex-direction: column; align-items: flex-start; }
  }
  .setting-info { flex: 1; min-width: 0;
    .setting-label { font-size: 0.93rem; font-weight: 600; color: var(--text-color); margin: 0 0 0.2rem; }
    .setting-desc  { font-size: 0.8rem; color: var(--text-secondary-color); margin: 0; line-height: 1.5; }
  }
  .setting-control { flex-shrink: 0; }

  /* Toggle */
  .toggle { position: relative; display: inline-block; cursor: pointer; }
  .toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
  .toggle-track { display: block; width: 50px; height: 26px; background: var(--grey-300); border-radius: 13px; transition: background 0.25s; position: relative; }
  .toggle input:checked ~ .toggle-track { background: var(--primary-accent); }
  .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: transform 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
  .toggle input:checked ~ .toggle-track .toggle-thumb { transform: translateX(24px); }
  .toggle:focus-within .toggle-track { outline: 2px solid var(--primary-accent); outline-offset: 2px; }

  /* Choice group */
  .choice-group { display: flex; gap: 0.45rem; flex-wrap: wrap; }
  .choice-btn {
    padding: 0.5rem 1rem; border: 1.5px solid var(--border-color); border-radius: 8px;
    background: var(--background-secondary-color); color: var(--text-secondary-color);
    font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
    &:hover { border-color: var(--primary-accent); color: var(--primary-accent); }
    &.active { background: var(--primary-accent); border-color: var(--primary-accent); color: white; font-weight: 600; }
  }

  /* Language grid */
  .lang-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem; }
  .lang-card {
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    padding: 1rem 0.75rem; border: 1.5px solid var(--border-color); border-radius: 12px;
    background: var(--background-color); color: var(--text-color); cursor: pointer;
    transition: all 0.2s; position: relative;
    &:hover { border-color: var(--primary-accent); transform: translateY(-2px); box-shadow: var(--shadow-2); }
    &.active { border-color: var(--primary-accent); background: rgba(255,96,0,0.08); }
    .lang-flag { font-size: 1.8rem; }
    .lang-name { font-size: 0.82rem; font-weight: 500; text-align: center; }
    .lang-check { position: absolute; top: 0.4rem; right: 0.6rem; color: var(--primary-accent); font-weight: 700; font-size: 0.9rem; }
  }

  .bottom-actions { display: flex; justify-content: flex-end; padding-top: 0.5rem; }

  /* Buttons */
  .btn-save {
    padding: 0.65rem 1.5rem; background: var(--primary-accent); color: white;
    border: none; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem;
    &:hover { background: #e05500; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(255,96,0,0.35); }
  }
  .btn-reset {
    padding: 0.65rem 1.25rem; background: transparent; color: rgba(255,255,255,0.75);
    border: 1.5px solid rgba(255,255,255,0.25); border-radius: 10px; font-size: 0.85rem;
    cursor: pointer; transition: all 0.2s;
    &:hover { border-color: rgba(255,255,255,0.6); color: white; }
  }
  .btn-cancel {
    padding: 0.6rem 1.25rem; background: var(--grey-100); color: var(--text-color);
    border: 1.5px solid var(--border-color); border-radius: 8px; font-weight: 500; cursor: pointer;
    &:hover { background: var(--grey-200); }
  }
  .btn-danger {
    padding: 0.6rem 1.25rem; background: #dc2626; color: white; border: none;
    border-radius: 8px; font-weight: 600; cursor: pointer;
    &:hover { background: #b91c1c; }
  }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;
  }
  .modal {
    background: var(--background-secondary-color); border-radius: 16px; padding: 2rem;
    max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    border: 1px solid var(--border-color); animation: popIn 0.22s ease;
    h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-color); margin: 0 0 0.75rem; }
    p  { color: var(--text-secondary-color); font-size: 0.88rem; line-height: 1.6; margin: 0 0 1.5rem; }
  }
  @keyframes popIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
  .modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; }
`;

export default Settings;
