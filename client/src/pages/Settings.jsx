import React, { useState } from "react";
import "./settings.css";

const Settings = () => {
  // States for settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    theme: "light",
    language: "en",
    autoSave: true,
    twoFactorAuth: false,
    privacyMode: false,
    fontSize: "medium",
    dataSaving: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleChange = (setting, value) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      theme: "light",
      language: "en",
      autoSave: true,
      twoFactorAuth: false,
      privacyMode: false,
      fontSize: "medium",
      dataSaving: false,
    });
    setShowResetConfirm(false);
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "am", label: "Amharic" },
    { value: "or", label: "Afaan Oromo" },
    { value: "ti", label: "Tigrinya" },
    { value: "so", label: "Somali" },
  ];

  const themeOptions = [
    { value: "light", label: "Light Mode", icon: "☀️" },
    { value: "dark", label: "Dark Mode", icon: "🌙" },
    { value: "system", label: "System Default", icon: "🖥️" },
    { value: "auto", label: "Auto (Sunset)", icon: "🌆" },
  ];

  const fontSizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "xlarge", label: "Extra Large" },
  ];

  return (
    <div className="settings-page" data-theme={settings.theme}>
      {/* Header */}
      <div className="settings-header">
        <h1 className="settings-title">⚙️ Settings</h1>
        <p className="settings-subtitle">
          Customize your application experience
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-message">
          <span>✅</span>
          Settings saved successfully!
        </div>
      )}

      <div className="settings-container">
        {/* Left Navigation */}
        <div className="settings-sidebar">
          <div className="sidebar-item active">
            <span className="sidebar-icon">👤</span>
            Account
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🎨</span>
            Appearance
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🔔</span>
            Notifications
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🔒</span>
            Privacy & Security
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🌐</span>
            Language & Region
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">💾</span>
            Data & Storage
          </div>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {/* ========== ACCOUNT SETTINGS ========== */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">👤 Account Settings</h2>
              <div className="section-description">
                Manage your account preferences and security
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Email Notifications</h3>
                  <p className="setting-description">
                    Receive updates and announcements via email
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleChange("emailNotifications", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Two-Factor Authentication</h3>
                  <p className="setting-description">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) =>
                      handleChange("twoFactorAuth", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Privacy Mode</h3>
                  <p className="setting-description">
                    Hide sensitive information in screenshots
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.privacyMode}
                    onChange={(e) =>
                      handleChange("privacyMode", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* ========== APPEARANCE ========== */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">🎨 Appearance</h2>
              <div className="section-description">
                Customize how the application looks
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Theme</h3>
                  <p className="setting-description">
                    Choose your preferred color theme
                  </p>
                </div>
                <div className="theme-selector">
                  {themeOptions.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      className={`theme-option ${
                        settings.theme === themeOption.value ? "active" : ""
                      }`}
                      onClick={() => handleChange("theme", themeOption.value)}
                    >
                      <span className="theme-icon">{themeOption.icon}</span>
                      <span className="theme-label">{themeOption.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Font Size</h3>
                  <p className="setting-description">
                    Adjust the text size for better readability
                  </p>
                </div>
                <div className="font-size-selector">
                  {fontSizeOptions.map((size) => (
                    <button
                      key={size.value}
                      className={`font-size-option ${
                        settings.fontSize === size.value ? "active" : ""
                      }`}
                      onClick={() => handleChange("fontSize", size.value)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========== NOTIFICATIONS ========== */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">🔔 Notifications</h2>
              <div className="section-description">
                Configure how you receive notifications
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Push Notifications</h3>
                  <p className="setting-description">
                    Receive notifications even when the app is closed
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      handleChange("pushNotifications", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">SMS Notifications</h3>
                  <p className="setting-description">
                    Receive important alerts via SMS
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) =>
                      handleChange("smsNotifications", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* ========== LANGUAGE & REGION ========== */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">🌐 Language & Region</h2>
              <div className="section-description">
                Set your preferred language and regional settings
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Language</h3>
                  <p className="setting-description">
                    Choose your preferred language
                  </p>
                </div>
                <div className="custom-select">
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== DATA & STORAGE ========== */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">💾 Data & Storage</h2>
              <div className="section-description">
                Manage your data and storage preferences
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Auto-Save Complaints</h3>
                  <p className="setting-description">
                    Automatically save drafts of complaints
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleChange("autoSave", e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">Data Saving Mode</h3>
                  <p className="setting-description">
                    Reduce data usage by loading lower quality images
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.dataSaving}
                    onChange={(e) =>
                      handleChange("dataSaving", e.target.checked)
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="btn btn-secondary"
              onClick={() => setShowResetConfirm(true)}
            >
              ↺ Reset to Default
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Reset Settings?</h3>
            <p className="modal-text">
              This will reset all settings to their default values. This action
              cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-outline"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleReset}>
                Reset All Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
