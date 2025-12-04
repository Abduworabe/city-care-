import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    position: sticky;
    top: 0;
    height: 100vh;
    z-index: 100;
  }

  .sidebar-container {
    width: 280px;
    height: 100%;
    background: linear-gradient(180deg, #0f0c29 0%, #1a1a2e 30%, #16213e 100%);
    position: relative;
    overflow: hidden;
    box-shadow: 5px 0 25px rgba(255, 96, 0, 0.15),
      inset 1px 0 0 rgba(255, 255, 255, 0.1);
  }

  .sidebar-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .gradient-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.4;
  }

  .circle-1 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #ff6000 0%, transparent 70%);
    top: -50px;
    right: -100px;
  }

  .circle-2 {
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, #ff9a3c 0%, transparent 70%);
    bottom: 100px;
    left: -50px;
  }

  .circle-3 {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, #ffcc00 0%, transparent 70%);
    bottom: 200px;
    right: -30px;
  }

  .content {
    padding: 2rem 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  /* Logo Section */
  header {
    margin-bottom: 2.5rem;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 96, 0, 0.3);
    box-shadow: 0 4px 20px rgba(255, 96, 0, 0.1);
  }

  .brand-text {
    flex: 1;
  }

  .brand-name {
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(45deg, #ff9a3c, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .brand-tagline {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    margin: 0.25rem 0 0;
    font-weight: 400;
  }

  /* User Card */
  .user-card {
    background: linear-gradient(
      135deg,
      rgba(255, 107, 107, 0.1),
      rgba(255, 154, 60, 0.1)
    );
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    border: 1px solid rgba(255, 96, 0, 0.2);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(255, 96, 0, 0.2);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #ff6000, #ffcc00);
    }
  }

  .user-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
  }

  .avatar-fallback {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6000, #ffcc00);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    border: 3px solid #ff6000;
    box-shadow: 0 0 20px rgba(255, 96, 0, 0.4);
  }

  .status-indicator {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #00ff88, #00cc66);
    border-radius: 50%;
    border: 2px solid #0f0c29;
    box-shadow: 0 0 10px #00ff88;
  }

  .user-info {
    margin-bottom: 1rem;
  }

  .user-name {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }

  .user-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .user-role {
    background: rgba(255, 96, 0, 0.2);
    color: #ffcc00;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid rgba(255, 96, 0, 0.3);
  }

  .badge.admin-badge {
    background: linear-gradient(135deg, #ffcc00, #ff9a3c);
    color: #0f0c29;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .user-stats {
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 0.75rem;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stat-icon {
    color: #ff9a3c;
    font-size: 1rem;
  }

  .stat-value {
    color: white;
    font-weight: 600;
    font-size: 1rem;
  }

  /* Navigation Section */
  .navigation-section {
    flex: 1;
    margin-bottom: 1.5rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 96, 0, 0.2);
  }

  .section-title {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .notification-bell {
    position: relative;
    color: #ff9a3c;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .notification-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff3860;
    color: white;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(255, 56, 96, 0.3);
  }

  /* Nav Links */
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    padding: 1rem 1.2rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    font-weight: 500;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: linear-gradient(to bottom, #ff6000, #ffcc00);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 96, 0, 0.1),
        rgba(255, 154, 60, 0.05)
      );
      color: white;
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(255, 96, 0, 0.15);

      &::before {
        transform: scaleY(1);
      }

      .icon {
        transform: scale(1.1);
        color: #ffcc00;
      }
    }

    .icon {
      font-size: 1.3rem;
      transition: all 0.3s ease;
      min-width: 24px;
    }
  }

  .active {
    background: linear-gradient(
      90deg,
      rgba(255, 96, 0, 0.15),
      rgba(255, 154, 60, 0.1)
    );
    color: white;
    border-left: 4px solid #ff6000;
    box-shadow: 0 4px 15px rgba(255, 96, 0, 0.2);

    .icon {
      color: #ffcc00;
    }

    &::before {
      transform: scaleY(1);
    }
  }

  /* Stats Card */
  .stats-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 96, 0, 0.1);
  }

  .stat-progress {
    margin-bottom: 1.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .progress-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff6000, #ffcc00);
    border-radius: 3px;
    transition: width 1s ease;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 96, 0, 0.2);
  }

  .theme-toggle-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .toggle-switch {
    width: 50px;
    height: 24px;
    background: rgba(255, 96, 0, 0.2);
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(255, 96, 0, 0.3);

    .toggle-knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #ff6000, #ffcc00);
      border-radius: 50%;
      transition: transform 0.3s ease;
    }
  }

  .current-time {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;

    .time {
      display: block;
      font-size: 1.1rem;
      font-weight: 600;
      color: #ffcc00;
      margin-bottom: 0.25rem;
    }

    .date {
      font-size: 0.8rem;
    }
  }

  /* Animation */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Responsive Adjustments */
  @media (min-width: 1200px) {
    .sidebar-container {
      width: 300px;
    }
  }

  @media (max-width: 1024px) {
    .sidebar-container {
      width: 260px;
    }
  }
`;

export default Wrapper;
