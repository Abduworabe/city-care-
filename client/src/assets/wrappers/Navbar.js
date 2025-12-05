import styled from "styled-components";

const Wrapper = styled.nav`
  /* Base Styles - Mobile First */
  z-index: 1000;
  height: var(--nav-height, 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
  position: sticky;
  top: 0;
  padding: 0 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 96, 0, 0.3);

  @media (min-width: 768px) {
    height: 70px;
    padding: 0 1rem;
  }

  .nav-center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    @media (min-width: 768px) {
      gap: 1rem;
    }
  }

  /* Left Section */
  .nav-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 0 0 auto;
    min-width: 40px;

    @media (min-width: 768px) {
      gap: 1rem;
      flex: 1;
    }
  }

  .toggle-btn {
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(255, 96, 0, 0.1),
      rgba(255, 154, 60, 0.05)
    );
    border: 1px solid rgba(255, 96, 0, 0.3);
    font-size: 1.2rem;
    color: #ffcc00;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;

    @media (min-width: 768px) {
      font-size: 1.3rem;
      padding: 0.6rem;
      border-radius: 12px;
      min-width: 45px;
      min-height: 45px;
    }

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
      width: 60px;
      height: 60px;

      @media (min-width: 768px) {
        width: 80px;
        height: 80px;
      }
    }
  }

  /* Center Section - Dashboard Title */
  .center-dashboard-title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    overflow: hidden;
  }

  .dashboard-title {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;

    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }

  /* Center Search Section - Hidden by default */
  .nav-center-section {
    display: none;

    @media (min-width: 992px) {
      display: block;
      flex: 2;
      max-width: 500px;
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
    gap: 0.4rem;
    flex: 0 0 auto;
    justify-content: flex-end;
    min-width: 0;

    @media (min-width: 480px) {
      gap: 0.5rem;
    }

    @media (min-width: 768px) {
      gap: 0.75rem;
      flex: 1;
    }
  }

  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 20px;
    padding: 0.4rem 0.6rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    font-weight: 500;

    @media (min-width: 768px) {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    &:hover {
      background: rgba(255, 96, 0, 0.15);
      border-color: rgba(255, 96, 0, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 96, 0, 0.2);
    }

    .theme-icon {
      color: #ffcc00;
      font-size: 0.9rem;

      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }

    .theme-label {
      display: none;

      @media (min-width: 768px) {
        display: inline;
      }
    }
  }

  .settings-btn {
    display: none;

    @media (min-width: 768px) {
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
  }

  /* Notifications */
  .notifications-container {
    display: none;

    @media (min-width: 768px) {
      display: block;
      position: relative;
    }
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
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.3rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 50px;
    transition: all 0.3s ease;
    position: relative;

    @media (min-width: 768px) {
      gap: 0.75rem;
      padding: 0.4rem 0.8rem 0.4rem 0.4rem;
    }

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
    width: 35px;
    height: 35px;

    @media (min-width: 768px) {
      width: 40px;
      height: 40px;
    }
  }

  .user-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ff6000;
    box-shadow: 0 0 15px rgba(255, 96, 0, 0.3);
    transition: transform 0.3s ease;

    @media (min-width: 768px) {
      box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    }
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
    box-shadow: 0 0 15px rgba(255, 96, 0, 0.3);
    transition: transform 0.3s ease;

    @media (min-width: 768px) {
      box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
    }

    .user-icon {
      font-size: 1.5rem;
      color: white;

      @media (min-width: 768px) {
        font-size: 1.8rem;
      }
    }
  }

  .status-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1.5px solid #1a1a2e;

    @media (min-width: 768px) {
      width: 10px;
      height: 10px;
      border: 2px solid #1a1a2e;
    }

    &.online {
      background: linear-gradient(135deg, #00ff88, #00cc66);
      box-shadow: 0 0 8px #00ff88;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;

    .user-name {
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80px;

      @media (min-width: 480px) {
        font-size: 0.9rem;
        max-width: 100px;
      }

      @media (min-width: 768px) {
        max-width: none;
      }
    }

    .user-role {
      display: none;

      @media (min-width: 768px) {
        display: block;
        color: #ffcc00;
        font-size: 0.75rem;
        font-weight: 500;
        background: rgba(255, 96, 0, 0.15);
        padding: 0.1rem 0.5rem;
        border-radius: 10px;
        margin-top: 0.1rem;
      }
    }
  }

  .down-icon {
    color: #ff9a3c;
    font-size: 0.7rem;
    transition: transform 0.3s ease;

    @media (min-width: 768px) {
      font-size: 0.8rem;
    }

    &.rotate {
      transform: rotate(180deg);
    }
  }

  /* Dropdown Menu */
  .dropdown-menu {
    position: fixed;
    top: 60px;
    right: 10px;
    left: 10px;
    width: auto;
    background: rgba(26, 26, 46, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 96, 0, 0.3);
    border-radius: 15px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    z-index: 1001;
    overflow: hidden;
    animation: slideDown 0.3s ease;

    @media (min-width: 480px) {
      left: auto;
      width: 250px;
      right: 0;
      position: absolute;
    }

    @media (min-width: 768px) {
      width: 280px;
      margin-top: 1rem;
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: linear-gradient(
        135deg,
        rgba(255, 96, 0, 0.1),
        rgba(255, 154, 60, 0.05)
      );
      border-bottom: 1px solid rgba(255, 96, 0, 0.2);

      @media (min-width: 768px) {
        padding: 1.5rem;
      }

      .dropdown-avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6000, #ffcc00);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        border: 2px solid #ff6000;
        box-shadow: 0 0 15px rgba(255, 96, 0, 0.3);

        @media (min-width: 768px) {
          width: 50px;
          height: 50px;
          font-size: 1.8rem;
          box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .dropdown-user-info {
        flex: 1;
        min-width: 0;

        h4 {
          color: white;
          margin: 0 0 0.25rem;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          @media (min-width: 768px) {
            font-size: 1rem;
          }
        }

        p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.8rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          @media (min-width: 768px) {
            font-size: 0.85rem;
          }
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
      padding: 0.8rem 1rem;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      transition: all 0.3s ease;
      border-left: 3px solid transparent;

      @media (min-width: 768px) {
        padding: 0.9rem 1.5rem;
      }

      &:hover {
        background: rgba(255, 96, 0, 0.1);
        border-left-color: #ff6000;
        color: white;
        padding-left: 1.25rem;

        @media (min-width: 768px) {
          padding-left: 1.75rem;
        }
      }

      &.logout {
        color: #ff6b6b;

        &:hover {
          background: rgba(255, 107, 107, 0.1);
          border-left-color: #ff6b6b;
        }
      }

      .item-icon {
        font-size: 1rem;
        min-width: 20px;

        @media (min-width: 768px) {
          font-size: 1.1rem;
          min-width: 24px;
        }
      }

      .item-text {
        flex: 1;
        font-size: 0.85rem;

        @media (min-width: 768px) {
          font-size: 0.9rem;
        }
      }

      .theme-switch {
        width: 35px;
        height: 18px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 9px;
        position: relative;
        cursor: pointer;

        @media (min-width: 768px) {
          width: 40px;
          height: 20px;
          border-radius: 10px;
        }

        .switch-knob {
          position: absolute;
          top: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          transition: transform 0.3s ease;

          @media (min-width: 768px) {
            width: 16px;
            height: 16px;
          }

          &.light {
            background: linear-gradient(135deg, #ffcc00, #ff9a3c);
            transform: translateX(2px);
          }

          &.dark {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            transform: translateX(19px);

            @media (min-width: 768px) {
              transform: translateX(22px);
            }
          }
        }
      }
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

  /* Responsive Adjustments */
  @media (min-width: 480px) {
    .theme-toggle-btn .theme-label {
      display: inline;
    }
  }

  @media (min-width: 768px) {
    .theme-toggle-btn .theme-label {
      display: inline;
    }

    .user-info .user-name {
      display: block;
    }

    .notifications-dropdown {
      position: absolute;
    }
  }

  /* Hide hamburger on desktop */
  .hamburger-only {
    display: block;

    @media (min-width: 992px) {
      display: none;
    }
  }
`;

export default Wrapper;
