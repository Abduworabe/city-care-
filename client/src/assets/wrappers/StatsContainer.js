import styled from "styled-components";

const Wrapper = styled.section`
  margin: 2rem 0;

  .stats-header {
    text-align: center;
    margin-bottom: 3rem;

    h3 {
      color: #101010;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #ff6000, #ff8c00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stats-subtitle {
      color: #64748b;
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .stats-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .summary-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(255, 96, 0, 0.15);
    }
  }

  .summary-icon {
    font-size: 2.5rem;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ff6000, #ff8c00);
    border-radius: 20px;
    color: white;
  }

  .summary-content {
    flex: 1;

    h4 {
      color: #374151;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .summary-count {
      font-size: 2rem;
      font-weight: 800;
      color: #ff6000;
      margin: 0.5rem 0;
    }

    .summary-trend {
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;

      &.positive {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
      }

      &.negative {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
    }
  }

  /* Animation for stats appearance */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .stats-grid > * {
    animation: fadeInUp 0.6s ease-out;
  }

  .stats-grid > *:nth-child(1) {
    animation-delay: 0.1s;
  }
  .stats-grid > *:nth-child(2) {
    animation-delay: 0.2s;
  }
  .stats-grid > *:nth-child(3) {
    animation-delay: 0.3s;
  }
  .stats-grid > *:nth-child(4) {
    animation-delay: 0.4s;
  }
  .stats-grid > *:nth-child(5) {
    animation-delay: 0.5s;
  }
  .stats-grid > *:nth-child(6) {
    animation-delay: 0.6s;
  }
`;

export default Wrapper;
