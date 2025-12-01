// Styled component defined in the same file
import styled from "styled-components";
const Wrapper = styled.aside`
  /* Mobile First - Show hamburger menu */
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;

  /* Hamburger Menu Button */
  .hamburger-btn {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background: linear-gradient(135deg, #ff6000, #ff8c00);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 96, 0, 0.4);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &:hover {
      transform: scale(1.1) rotate(90deg);
      box-shadow: 0 6px 20px rgba(255, 96, 0, 0.6);
    }

    .hamburger-icon {
      color: white;
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }

    &.open {
      background: linear-gradient(135deg, #ff8c00, #ff6000);
      transform: rotate(180deg);

      .hamburger-icon {
        transform: rotate(45deg);
      }
    }
  }

  .sidebar-container {
    background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    min-height: 100vh;
    height: 100%;
    width: 280px;
    margin-left: -280px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-right: 1px solid rgba(255, 96, 0, 0.3);
    backdrop-filter: blur(10px);

    /* Animated border glow */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 96, 0, 0.1),
        transparent
      );
      opacity: 0;
      transition: opacity 0.6s ease;
      pointer-events: none;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  .content {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 96, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #ff6000, #ff8c00);
      border-radius: 2px;
    }
  }

  .show-sidebar {
    margin-left: 0;
    transform: translateX(0);
    animation: slideInLeft 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* Slide in animation */
  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  header {
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
    color: #fff;
    border-bottom: 1px solid rgba(255, 96, 0, 0.2);
    background: linear-gradient(90deg, rgba(255, 96, 0, 0.1), transparent);
    position: relative;
    overflow: hidden;

    /* Animated background effect */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 96, 0, 0.2),
        transparent
      );
      transition: left 0.8s ease;
    }

    &:hover::before {
      left: 100%;
    }
  }

  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: #b0b0b0;
    padding: 1.2rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    font-weight: 500;
    letter-spacing: 0.5px;

    /* Hover glow effect */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 96, 0, 0.15),
        transparent
      );
      transition: left 0.6s ease;
    }

    &:hover {
      padding-left: 3rem;
      color: #ffffff;
      background: linear-gradient(90deg, rgba(255, 96, 0, 0.1), transparent);
      transform: translateX(8px);

      &::before {
        left: 100%;
      }

      .icon {
        transform: scale(1.2) rotate(5deg);
        color: #ff6000;
        filter: drop-shadow(0 0 8px rgba(255, 96, 0, 0.6));
      }
    }
  }

  .icon {
    font-size: 1.4rem;
    margin-right: 1.2rem;
    display: grid;
    place-items: center;
    color: #b0b0b0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 24px;
  }

  .active {
    color: #ffffff !important;
    background: linear-gradient(
      90deg,
      rgba(255, 96, 0, 0.2),
      transparent
    ) !important;
    border-right: 3px solid #ff6000;

    .icon {
      color: #ff6000 !important;
      filter: drop-shadow(0 0 12px rgba(255, 96, 0, 0.8));
      animation: iconPulse 2s infinite;
    }

    /* Active state glow */
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, rgba(255, 96, 0, 0.1), transparent);
      animation: activeGlow 3s infinite;
    }
  }

  /* Icon pulse animation for active state */
  @keyframes iconPulse {
    0%,
    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 12px rgba(255, 96, 0, 0.8));
    }
    50% {
      transform: scale(1.1);
      filter: drop-shadow(0 0 16px rgba(255, 96, 0, 1));
    }
  }

  /* Active state background glow */
  @keyframes activeGlow {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
  }

  .pending {
    background: rgba(40, 40, 40, 0.6);
    position: relative;

    /* Loading animation for pending state */
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 1.5rem;
      width: 8px;
      height: 8px;
      background: #ff6000;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
      transform: translateY(-50%);
    }
  }

  /* General pulse animation */
  @keyframes pulse {
    0%,
    100% {
      transform: translateY(-50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateY(-50%) scale(1.2);
      opacity: 0.7;
    }
  }

  /* Staggered animation for nav links */
  .nav-link:nth-child(1) {
    transition-delay: 0.1s;
  }
  .nav-link:nth-child(2) {
    transition-delay: 0.15s;
  }
  .nav-link:nth-child(3) {
    transition-delay: 0.2s;
  }
  .nav-link:nth-child(4) {
    transition-delay: 0.25s;
  }
  .nav-link:nth-child(5) {
    transition-delay: 0.3s;
  }
  .nav-link:nth-child(6) {
    transition-delay: 0.35s;
  }

  /* Floating animation for the entire sidebar */
  .sidebar-container.show-sidebar {
    animation: floatSidebar 6s ease-in-out infinite;
  }

  @keyframes floatSidebar {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(2px);
    }
  }

  /* Enhanced hover effects for the entire sidebar */
  .sidebar-container:hover {
    box-shadow: 4px 0px 25px rgba(255, 96, 0, 0.3),
      inset -1px 0px 0px rgba(255, 255, 255, 0.1);
    transform: translateX(2px);
  }

  /* Desktop Styles */
  @media (min-width: 992px) {
    position: static;
    display: block;

    .hamburger-btn {
      display: none; /* Hide hamburger on desktop */
    }

    .sidebar-container {
      position: sticky;
      margin-left: 0;
      width: 280px;
      animation: none;

      /* Desktop-specific animations */
      transition: all 0.3s ease;

      /* IMPORTANT: If showSidebar is true on desktop, it must override margin-left */
      /* This rule will keep the sidebar hidden when showSidebar is false */
      &:not(.show-sidebar) {
        margin-left: -280px;
      }
    }

    .show-sidebar {
      margin-left: 0;
    }
  }

  /* Tablet Styles */
  @media (min-width: 768px) and (max-width: 991px) {
    .sidebar-container {
      width: 250px;
    }

    .hamburger-btn {
      top: 1.5rem;
      left: 1.5rem;
      width: 55px;
      height: 55px;

      .hamburger-icon {
        font-size: 1.6rem;
      }
    }
  }

  /* Mobile Styles */
  @media (max-width: 767px) {
    .sidebar-container {
      width: 100%;
      margin-left: -100%;
    }

    .show-sidebar {
      margin-left: 0;
      animation: slideInLeftMobile 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes slideInLeftMobile {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0);
      }
    }

    /* Overlay background when sidebar is open */
    .sidebar-container.show-sidebar::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }
  }

  /* Small Mobile Styles */
  @media (max-width: 480px) {
    .nav-link {
      padding: 1rem 0;
      padding-left: 2rem;

      &:hover {
        padding-left: 2.5rem;
      }
    }

    header {
      padding-left: 2rem;
      height: 5rem;
    }

    .hamburger-btn {
      top: 1rem;
      left: 1rem;
      width: 45px;
      height: 45px;

      .hamburger-icon {
        font-size: 1.3rem;
      }
    }
  }

  /* Reduced motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .sidebar-container,
    .nav-link,
    .icon,
    .hamburger-btn {
      transition: none;
      animation: none;
    }

    .nav-link:hover {
      transform: none;
    }

    .hamburger-btn:hover {
      transform: none;
    }
  }
`;

export default Wrapper;
