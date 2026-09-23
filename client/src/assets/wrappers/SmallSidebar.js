import styled from "styled-components";

const Wrapper = styled.aside`
  /* Only show on mobile/tablet */
  @media (min-width: 992px) {
    display: none;
  }

  /* The full-screen container (hidden by default) */
  .sidebar-container {
    position: fixed;
    inset: 0;
    z-index: 9999;
    visibility: hidden;
    pointer-events: none;
  }

  .sidebar-container.show-sidebar {
    visibility: visible;
    pointer-events: all;
  }

  /* Dark overlay behind the panel */
  .sidebar-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.35s ease;
    cursor: pointer;
  }

  .show-sidebar .sidebar-overlay {
    opacity: 1;
  }

  /* The sliding panel */
  .content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    max-width: 85vw;
    background: linear-gradient(180deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
    padding: 1.5rem 1.25rem;
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 1.25rem;
  }

  .show-sidebar .content {
    transform: translateX(0);
  }

  /* ---- Header ---- */
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(255, 96, 0, 0.25);
    gap: 0.75rem;
  }

  .user-quick-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  .user-avatar-small {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .avatar-img-small {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ff6000;
    box-shadow: 0 0 12px rgba(255, 96, 0, 0.4);
  }

  .avatar-icon-small {
    font-size: 2.75rem;
    color: #ff9a3c;
  }

  .user-details {
    flex: 1;
    min-width: 0;
  }

  .user-greeting {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.78rem;
    margin: 0 0 0.15rem;
    line-height: 1.3;
  }

  .user-name-small {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: linear-gradient(90deg, #ff9a3c, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .close-btn {
    background: rgba(255, 56, 96, 0.15);
    border: 1px solid rgba(255, 56, 96, 0.4);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ff6b6b;
    font-size: 1.1rem;
    transition: all 0.25s ease;
    flex-shrink: 0;

    &:hover {
      background: rgba(255, 56, 96, 0.3);
      transform: rotate(90deg);
    }

    &:active {
      transform: rotate(90deg) scale(0.9);
    }
  }

  /* ---- Logo ---- */
  .logo-section-small {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 96, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ---- Nav Section ---- */
  .nav-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-title {
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0 0 0.5rem 0.5rem;
  }

  /* ---- Footer ---- */
  .mobile-footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 96, 0, 0.15);
  }

  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.82rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .connected {
    background: #00cc66;
    box-shadow: 0 0 8px rgba(0, 204, 102, 0.5);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Scrollbar */
  .content::-webkit-scrollbar { width: 4px; }
  .content::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb {
    background: rgba(255, 96, 0, 0.4);
    border-radius: 4px;
  }
`;

export default Wrapper;
