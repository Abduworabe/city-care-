import styled from "styled-components";

const Wrapper = styled.nav`
  /* Base Styles - Mobile First */
  z-index: 1000;
  height: var(--nav-height, 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
  position: sticky;
  top: 0;
  padding: 0 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 96, 0, 0.3);

  .nav-center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  /* Left Section */
  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .toggle-btn {
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(255, 96, 0, 0.1),
      rgba(255, 154, 60, 0.05)
    );
    border: 1px solid rgba(255, 96, 0, 0.3);
    font-size: 1.3rem;
    color: #ffcc00;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.6rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 45px;
    min-height: 45px;

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(255, 96, 0, 0.2),
        rgba(255, 154, 60, 0.1)
      );
      color: #ff9a3c;
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(255, 96, 0, 0.3), 0 0 40px rgba(255, 96, 0, 0.2);
      border-color: rgba(255, 96, 0, 0.5);
    }

    .toggle-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 96, 0, 0.4), transparent);
      transition: width 0.3s ease, height 0.3s ease;
    }

    &:hover .toggle-glow {
      width: 80px;
      height: 80px;
    }
  }

  .logo-section {
    display: flex;
    align-items: center;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
  }

  .logo-text {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(45deg, #ff9a3c, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 10px rgba(255, 96, 0, 0.2);
  }

  .version-tag {
    background: linear-gradient(
      135deg,
      rgba(255, 96, 0, 0.2),
      rgba(255, 154, 60, 0.1)
    );
    color: #ffcc00;
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
    font-size: 0.7rem;
    font-weight: 600;
    border: 1px solid rgba(255, 96, 0, 0.3);
    align-self: flex-start;
    margin-top: 0.2rem;
  }

  /* Center Section */
  .nav-center-section {
    flex: 2;
    max-width: 500px;
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }

  .search-container {
    position: relative;
    transition: all 0.3s ease;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #ff9a3c;
    font-size: 1rem;
    cursor: pointer;
    z-index: 2;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 25px;
    color: white;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: rgba(255, 96, 0, 0.5);
      background: rgba(255, 255, 255, 0.12);
      box-shadow: 0 0 20px rgba(255, 96, 0, 0.2);
    }
  }

  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 96, 0, 0.3);
    border-radius: 15px;
    padding: 1rem;
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
  }

  /* Right Section */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    justify-content: flex-end;
  }

  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
      background: rgba(255, 96, 0, 0.15);
      border-color: rgba(255, 96, 0, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 96, 0, 0.2);
    }

    .theme-icon {
      color: #ffcc00;
      font-size: 1rem;
    }
  }

  .settings-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 50%;
    color: #ff9a3c;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1.2rem;

    &:hover {
      background: rgba(255, 96, 0, 0.15);
      border-color: rgba(255, 96, 0, 0.4);
      transform: rotate(30deg);
      color: #ffcc00;
    }
  }

  /* Notifications */
  .notifications-container {
    position: relative;
  }

  .notifications-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 50%;
    color: #ff9a3c;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;

    &:hover {
      background: rgba(255, 96, 0, 0.15);
      border-color: rgba(255, 96, 0, 0.4);
      transform: translateY(-2px);
      color: #ffcc00;
    }

    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: linear-gradient(135deg, #ff3860, #ff6000);
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(255, 56, 96, 0.4);
      animation: pulse 2s infinite;
    }
  }

  .notifications-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 320px;
    background: rgba(26, 26, 46, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 96, 0, 0.3);
    border-radius: 15px;
    margin-top: 1rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    z-index: 1001;
    overflow: hidden;
    animation: slideDown 0.3s ease;

    .notifications-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgba(255, 96, 0, 0.2);

      h3 {
        color: white;
        font-size: 1.1rem;
        margin: 0;
      }

      .clear-all {
        color: #ff9a3c;
        font-size: 0.85rem;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: #ffcc00;
        }
      }
    }

    .notifications-list {
      max-height: 300px;
      overflow-y: auto;
      padding: 0.5rem 0;
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem 1.5rem;
      transition: background 0.3s ease;
      border-left: 3px solid transparent;

      &.new {
        background: rgba(255, 96, 0, 0.05);
        border-left-color: #ff6000;
      }

      &:hover {
        background: rgba(255, 96, 0, 0.1);
      }

      .notification-icon {
        .icon-bg {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 0.9rem;

          &.success {
            background: linear-gradient(135deg, #00d2ff, #3a7bd5);
          }

          &.warning {
            background: linear-gradient(135deg, #ff9a3c, #ffcc00);
          }

          &.info {
            background: linear-gradient(135deg, #8a2be2, #4b0082);
          }
        }
      }

      .notification-content {
        flex: 1;

        .notification-text {
          color: white;
          margin: 0 0 0.25rem;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .notification-time {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }
      }
    }

    .notifications-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255, 96, 0, 0.2);
      text-align: center;

      a {
        color: #ff9a3c;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;

        &:hover {
          color: #ffcc00;
          text-decoration: underline;
        }
      }
    }
  }

  /* User Profile */
  .user-profile-container {
    position: relative;
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.4rem 0.8rem 0.4rem 0.4rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 50px;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      background: rgba(255, 96, 0, 0.15);
      border-color: rgba(255, 96, 0, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(255, 96, 0, 0.2);

      .user-avatar-img,
      .avatar-fallback {
        transform: scale(1.05);
      }
    }
  }

  .user-avatar-wrapper {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .user-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    transition: transform 0.3s ease;
  }

  .avatar-fallback {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6000, #ffcc00);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    transition: transform 0.3s ease;

    .user-icon {
      font-size: 1.8rem;
      color: white;
    }
  }

  .status-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #1a1a2e;

    &.online {
      background: linear-gradient(135deg, #00ff88, #00cc66);
      box-shadow: 0 0 10px #00ff88;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .user-name {
      color: white;
      font-size: 0.9rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .user-role {
      color: #ffcc00;
      font-size: 0.75rem;
      font-weight: 500;
      background: rgba(255, 96, 0, 0.15);
      padding: 0.1rem 0.5rem;
      border-radius: 10px;
      margin-top: 0.1rem;
    }
  }

  .down-icon {
    color: #ff9a3c;
    font-size: 0.8rem;
    transition: transform 0.3s ease;

    &.rotate {
      transform: rotate(180deg);
    }
  }

  /* Dropdown Menu */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 280px;
    background: rgba(26, 26, 46, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 96, 0, 0.3);
    border-radius: 15px;
    margin-top: 1rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    z-index: 1001;
    overflow: hidden;
    animation: slideDown 0.3s ease;

    .dropdown-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: linear-gradient(
        135deg,
        rgba(255, 96, 0, 0.1),
        rgba(255, 154, 60, 0.05)
      );
      border-bottom: 1px solid rgba(255, 96, 0, 0.2);

      .dropdown-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6000, #ffcc00);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.8rem;
        border: 2px solid #ff6000;
        box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .dropdown-user-info {
        flex: 1;

        h4 {
          color: white;
          margin: 0 0 0.25rem;
          font-size: 1rem;
        }

        p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.85rem;
        }
      }
    }

    .dropdown-divider {
      height: 1px;
      background: rgba(255, 96, 0, 0.2);
      margin: 0.5rem 0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.9rem 1.5rem;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      transition: all 0.3s ease;
      border-left: 3px solid transparent;

      &:hover {
        background: rgba(255, 96, 0, 0.1);
        border-left-color: #ff6000;
        color: white;
        padding-left: 1.75rem;
      }

      &.logout {
        color: #ff6b6b;

        &:hover {
          background: rgba(255, 107, 107, 0.1);
          border-left-color: #ff6b6b;
        }
      }

      .item-icon {
        font-size: 1.1rem;
        min-width: 24px;
      }

      .item-text {
        flex: 1;
        font-size: 0.9rem;
      }

      .theme-switch {
        width: 40px;
        height: 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        position: relative;
        cursor: pointer;

        .switch-knob {
          position: absolute;
          top: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          transition: transform 0.3s ease;

          &.light {
            background: linear-gradient(135deg, #ffcc00, #ff9a3c);
            transform: translateX(2px);
          }

          &.dark {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            transform: translateX(22px);
          }
        }
      }
    }
  }
  // In your styled component, update the following styles:

  .user-avatar-wrapper {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex; // Add this
    align-items: center; // Add this
    justify-content: center; // Add this
  }

  .user-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover; // This should already be there
    border: 2px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    transition: transform 0.3s ease;
    display: block; // Add this to ensure proper display
  }

  .avatar-fallback {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6000, #ffcc00);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    transition: transform 0.3s ease;
    overflow: hidden; // Add this
  }

  // Also update the dropdown avatar:
  .dropdown-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6000, #ffcc00);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8rem;
    border: 2px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    overflow: hidden; // Add this

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block; // Add this
    }
  }
  /* Animations */
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    height: 60px;
    padding: 0 0.75rem;

    .nav-left {
      gap: 0.5rem;
    }

    .toggle-btn {
      min-width: 40px;
      min-height: 40px;
      font-size: 1.2rem;
    }

    .logo-text {
      font-size: 1.1rem;
    }

    .version-tag {
      display: none;
    }

    .theme-toggle-btn .theme-label,
    .user-info .user-name {
      display: none;
    }

    .user-profile {
      padding: 0.3rem;
    }

    .dropdown-menu {
      width: 250px;
    }
  }

  @media (max-width: 480px) {
    .nav-right {
      gap: 0.5rem;
    }

    .theme-toggle-btn,
    .settings-btn {
      width: 35px;
      height: 35px;
      padding: 0;
      justify-content: center;

      .theme-label {
        display: none;
      }
    }

    .notifications-dropdown,
    .dropdown-menu {
      position: fixed;
      top: 60px;
      right: 10px;
      left: 10px;
      width: auto;
    }
  }

  .hamburger-only {
    display: block; /* default display for mobile */
  }
  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (min-width: 992px) {
    .hamburger-only {
      display: none; /* hide on desktop/tablet */
    }
  }
`;

export default Wrapper;
