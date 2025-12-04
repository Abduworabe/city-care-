import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .show-sidebar {
    visibility: visible;
    opacity: 1;
  }

  .sidebar-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(15, 12, 41, 0.98),
      rgba(26, 26, 46, 0.95)
    );
    backdrop-filter: blur(8px);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .show-sidebar .sidebar-overlay {
    opacity: 1;
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    background: linear-gradient(180deg, #0f0c29 0%, #1a1a2e 40%, #16213e 100%);
    padding: 1.5rem;
    transform: translateX(-100%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 5px 0 30px rgba(255, 96, 0, 0.3),
      inset 1px 0 0 rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .show-sidebar .content {
    transform: translateX(0);
  }

  /* Header */
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 96, 0, 0.3);
  }

  .user-quick-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .user-avatar-small {
    position: relative;
    width: 50px;
    height: 50px;
  }

  .avatar-img-small {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ff6000;
    box-shadow: 0 0 15px rgba(255, 96, 0, 0.4);
  }

  .avatar-icon-small {
    font-size: 3rem;
    color: #ff9a3c;
    filter: drop-shadow(0 0 10px rgba(255, 96, 0, 0.3));
  }

  .user-details {
    flex: 1;
  }

  .user-greeting {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
  }

  .user-name-small {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    background: linear-gradient(45deg, #ff9a3c, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .close-btn {
    background: linear-gradient(135deg, #ff3860, #ff6000);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 56, 96, 0.4);
    flex-shrink: 0;

    &:hover {
      transform: rotate(90deg) scale(1.1);
      box-shadow: 0 6px 20px rgba(255, 56, 96, 0.6);
    }
  }

  /* Logo Section */
  .logo-section-small {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 96, 0, 0.2);
  }

  .logo-text-small {
    display: flex;
    flex-direction: column;
  }

  .logo-main {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    background: linear-gradient(45deg, #ff9a3c, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo-sub {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    font-weight: 400;
  }

  /* Navigation Section */
  .nav-section {
    flex: 1;
    margin-bottom: 1.5rem;
  }

  .nav-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 96, 0, 0.2);
  }

  .bolt-icon {
    color: #ffcc00;
    font-size: 1.2rem;
    filter: drop-shadow(0 0 8px rgba(255, 204, 0, 0.4));
  }

  .nav-title {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Nav Links */
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    padding: 1rem 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-weight: 500;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(to bottom, #ff6000, #ffcc00);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 96, 0, 0.15),
        rgba(255, 154, 60, 0.1)
      );
      color: white;
      transform: translateX(10px);

      &::before {
        transform: scaleY(1);
      }

      .icon {
        transform: scale(1.1);
        color: #ffcc00;
      }
    }

    .icon {
      font-size: 1.4rem;
      transition: all 0.3s ease;
      min-width: 24px;
    }
  }

  .active {
    background: linear-gradient(
      90deg,
      rgba(255, 96, 0, 0.2),
      rgba(255, 154, 60, 0.15)
    );
    color: white;
    border-left: 3px solid #ff6000;

    .icon {
      color: #ffcc00;
    }

    &::before {
      transform: scaleY(1);
    }
  }

  /* Quick Actions */
  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .action-btn {
    padding: 1rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    span {
      position: relative;
      z-index: 1;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  .action-btn.primary {
    background: linear-gradient(135deg, #ff6000, #ff9a3c);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 96, 0, 0.3);

    &::before {
      background: linear-gradient(135deg, #ff9a3c, #ffcc00);
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 96, 0, 0.4);
    }
  }

  .action-btn.secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 96, 0, 0.5);
    position: relative;
    overflow: hidden;

    &::before {
      background: linear-gradient(
        135deg,
        rgba(255, 96, 0, 0.2),
        rgba(255, 154, 60, 0.1)
      );
    }

    &:hover {
      border-color: #ff6000;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 96, 0, 0.2);
    }
  }

  /* Mobile Footer */
  .mobile-footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 96, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.85rem;
    font-weight: 500;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .connected {
    background: linear-gradient(135deg, #00ff88, #00cc66);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
    animation: pulse 2s infinite;
  }

  .version-info {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 96, 0, 0.1);
  }

  /* Animations */
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
    }
    50% {
      opacity: 0.7;
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
    }
  }

  /* Enhanced Scrollbar */
  .content::-webkit-scrollbar {
    width: 5px;
  }

  .content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  .content::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #ff6000, #ff9a3c);
    border-radius: 10px;
  }

  /* Responsive Adjustments */
  @media (max-width: 480px) {
    .content {
      width: 260px;
      padding: 1.25rem;
    }

    .user-avatar-small {
      width: 45px;
      height: 45px;
    }

    .avatar-icon-small {
      font-size: 2.5rem;
    }

    .user-name-small {
      font-size: 1rem;
    }

    .logo-main {
      font-size: 1.2rem;
    }

    .action-btn {
      padding: 0.875rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 360px) {
    .content {
      width: 240px;
      padding: 1rem;
    }

    .user-avatar-small {
      width: 40px;
      height: 40px;
    }

    .avatar-icon-small {
      font-size: 2.2rem;
    }

    .user-greeting {
      font-size: 0.8rem;
    }

    .user-name-small {
      font-size: 0.9rem;
    }
  }

  /* Landscape Mode */
  @media (max-height: 500px) and (orientation: landscape) {
    .content {
      padding: 1rem;
    }

    .sidebar-header {
      margin-bottom: 1.5rem;
    }

    .nav-section {
      margin-bottom: 1rem;
    }

    .quick-actions {
      margin-bottom: 1rem;
    }
  }
`;

export default Wrapper;
