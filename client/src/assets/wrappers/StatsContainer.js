import styled from "styled-components";

const Wrapper = styled.section`
  margin: 1.5rem 0 2.5rem;

  .stats-header {
    text-align: center;
    margin-bottom: 2rem;

    h3 {
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 800;
      background: linear-gradient(135deg, #ff6000, #ff8c00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .stats-subtitle {
      color: var(--text-secondary-color);
      font-size: 0.95rem;
      max-width: 520px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stats-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1.5rem;
  }

  .summary-card {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-2);
    display: flex;
    align-items: center;
    gap: 1.25rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-orange);
    }
  }

  .summary-icon {
    font-size: 2rem;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(255, 96, 0, 0.12), rgba(255, 140, 0, 0.08));
    border-radius: var(--border-radius-lg);
    border: 1px solid rgba(255, 96, 0, 0.15);
  }

  .summary-content {
    flex: 1;
    min-width: 0;

    h4 {
      color: var(--text-color);
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 0.35rem;
    }

    .summary-count {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--primary-accent);
      display: block;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .summary-trend {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.2rem 0.65rem;
      border-radius: 2rem;
      display: inline-block;
      background: rgba(16, 185, 129, 0.1);
      color: #059669;

      &.positive {
        background: rgba(16, 185, 129, 0.1);
        color: #059669;
      }

      &.negative {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
      }
    }
  }

  /* Animation */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stats-grid > *:nth-child(1) { animation: fadeInUp 0.5s ease-out 0.05s both; }
  .stats-grid > *:nth-child(2) { animation: fadeInUp 0.5s ease-out 0.15s both; }
  .stats-grid > *:nth-child(3) { animation: fadeInUp 0.5s ease-out 0.25s both; }
  .stats-grid > *:nth-child(4) { animation: fadeInUp 0.5s ease-out 0.35s both; }

  @media (min-width: 640px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
  }

  @media (min-width: 992px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }

    .summary-card {
      padding: 1.25rem;
    }

    .summary-icon {
      width: 52px;
      height: 52px;
      font-size: 1.6rem;
    }

    .summary-content .summary-count {
      font-size: 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stats-grid > * {
      animation: none;
    }
  }
`;

export default Wrapper;
