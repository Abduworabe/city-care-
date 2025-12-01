import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.95) 100%
  );
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 5;
  overflow: hidden;

  /* Futuristic background effect */
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
      rgba(59, 130, 246, 0.1),
      transparent
    );
    transition: left 0.6s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    border-color: rgba(59, 130, 246, 0.3);

    &::before {
      left: 100%;
    }

    .job-icon {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
  }

  .job-icon {
    font-size: 1.25rem;
    margin-right: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    position: relative;
    z-index: 10;
    transition: all 0.3s ease;

    /* Ensure icon visibility */
    color: white !important;
    fill: white !important;
    stroke: white !important;

    svg {
      color: white !important;
      fill: white !important;
      stroke: white !important;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      width: 20px;
      height: 20px;
    }

    /* Pulse animation on hover */
    &::after {
      content: "";
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
      border-radius: 14px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }

  .job-text {
    text-transform: capitalize;
    letter-spacing: 0.5px;
    font-weight: 600;
    font-size: 1rem;
    color: #1f2937;
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    z-index: 10;
    margin: 0;
  }

  /* Different icon colors for different types */
  &.location .job-icon {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  &.calendar .job-icon {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }

  &.department .job-icon {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  }

  &.status .job-icon {
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  }

  /* Enhanced responsive design */
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;

    .job-icon {
      width: 42px;
      height: 42px;
      font-size: 1.1rem;
      margin-right: 1rem;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .job-text {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    flex-direction: row;
    text-align: left;
    gap: 0;

    .job-icon {
      margin-right: 0.875rem;
      width: 40px;
      height: 40px;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .job-text {
      font-size: 0.9rem;
    }
  }

  /* Pulse animation for important items */
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  &.priority {
    .job-icon {
      animation: pulse 2s infinite;
    }
  }

  /* Loading state */
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  &.loading {
    .job-icon {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .job-text {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
      color: transparent;
    }
  }

  /* Ensure high contrast for accessibility */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;

    &:hover {
      transform: none;
    }

    .job-icon {
      transition: none;
    }
  }
`;

export default Wrapper;
