import styled from "styled-components";

const Wrapper = styled.article`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.95) 100%
  );
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%; /* Crucial for grid alignment */
  min-height: 300px;

  /* Futuristic background pattern */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 0% 0%,
        rgba(59, 130, 246, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 100% 100%,
        rgba(16, 185, 129, 0.03) 0%,
        transparent 50%
      );
    border-radius: 20px;
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
      0 8px 24px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);

    .main-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
    }
  }

  /* Header Section */
  header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid;
    border-image: linear-gradient(
        90deg,
        rgba(59, 130, 246, 0.2),
        rgba(16, 185, 129, 0.2)
      )
      1;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 1rem;
    background: linear-gradient(
      135deg,
      rgba(248, 250, 252, 0.8) 0%,
      rgba(241, 245, 249, 0.8) 100%
    );
    flex-shrink: 0;
  }

  .main-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: linear-gradient(
      135deg,
      var(--primary-500) 0%,
      var(--secondary-400) 100%
    );
    border-radius: 12px;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: left 0.6s ease;
    }

    &:hover::before {
      left: 100%;
    }
  }

  .info {
    flex: 1;

    h5 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 700;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: 0.5px;
      color: #6b7280;
      font-weight: 500;
      font-size: 0.9rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  /* Content Section - Takes remaining space */
  .content {
    padding: 1.5rem 1.5rem 1rem;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(248, 250, 252, 0.6) 100%
    );
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Distribute space evenly */
  }

  .content-center {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  /* Status Badge */
  .status {
    border-radius: 10px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    text-align: center;
    width: 100%;
    height: 32px;
    display: grid;
    align-items: center;
    font-weight: 700;
    font-size: 0.8rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    margin-top: auto;

    &.pending,
    &.reported {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    &.interview,
    &.in-progress {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
    }

    &.declined,
    &.resolved {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    &.closed {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: white;
    }
  }

  /* Actions - Fixed at bottom */
  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: linear-gradient(
      135deg,
      rgba(248, 250, 252, 0.9) 0%,
      rgba(241, 245, 249, 0.9) 100%
    );
    flex-shrink: 0;
  }

  .edit-btn,
  .delete-btn {
    height: 36px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    padding: 0 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
    justify-content: center;
    min-width: 0;
  }

  .edit-btn {
    background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
    }
  }

  .delete-btn {
    background: linear-gradient(135deg, #ff6000 0%, #ff6000 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 96, 0, 0.4);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    min-height: 320px;

    header {
      padding: 1.25rem 1.25rem 0.75rem;
    }

    .content {
      padding: 1.25rem 1.25rem 0.75rem;
    }
  }

  @media (max-width: 768px) {
    min-height: 300px;

    header {
      padding: 1rem 1rem 0.5rem;
    }

    .content {
      padding: 1rem 1rem 0.5rem;
    }

    .actions {
      padding: 0.75rem 1rem;
    }
  }
`;

export default Wrapper;
