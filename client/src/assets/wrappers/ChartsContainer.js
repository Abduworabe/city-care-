import styled from "styled-components";

const Wrapper = styled.section`
  margin: 2rem 0;
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  padding: 1.75rem;
  box-shadow: var(--shadow-2);
  border: 1px solid var(--border-color);

  .charts-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.75rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .header-content {
    flex: 1;
    min-width: 0;

    h4 {
      color: var(--text-color);
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      background: linear-gradient(135deg, #ff6000, #ff8c00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .chart-subtitle {
      color: var(--text-secondary-color);
      font-size: 0.88rem;
      margin: 0;
    }
  }

  .chart-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.1rem;
    background: rgba(255, 96, 0, 0.08);
    border: 1.5px solid var(--primary-accent);
    border-radius: var(--border-radius);
    color: var(--primary-accent);
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;

    &:hover {
      background: var(--primary-accent);
      color: white;
      transform: translateY(-1px);
      box-shadow: var(--shadow-orange);
    }

    .btn-icon { font-size: 1rem; }
  }

  .chart-stats-overview {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.1rem 1rem;
    background: var(--background-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-2);
    }
  }

  .stat-icon {
    font-size: 1.5rem;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 96, 0, 0.08);
    border-radius: var(--border-radius);
    border: 1px solid rgba(255, 96, 0, 0.12);
  }

  .stat-content {
    min-width: 0;

    h3 {
      font-size: 1.6rem;
      font-weight: 800;
      margin: 0 0 0.15rem;
      color: var(--primary-accent);
      line-height: 1;
    }

    p {
      color: var(--text-secondary-color);
      margin: 0;
      font-size: 0.82rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .chart-container {
    background: var(--background-color);
    border-radius: var(--border-radius);
    padding: 1.25rem 0.5rem;
    border: 1px solid var(--border-color);
    margin-bottom: 1.25rem;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.1rem;
    border-top: 1px solid var(--border-color);
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .chart-legend {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.85rem;
    color: var(--text-secondary-color);
  }

  .legend-color {
    width: 18px;
    height: 3px;
    border-radius: 2px;

    &.bar { background: linear-gradient(90deg, #ff6000, #ff8c00); }
    &.area { background: linear-gradient(90deg, #1e90ff, #00bfff); }
  }

  .data-info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--grey-400);
    font-size: 0.82rem;
  }

  .empty-chart {
    text-align: center;
    color: var(--text-secondary-color);
    padding: 3rem 1rem;

    .empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
    h5 { color: var(--text-color); margin: 0 0 0.4rem; }
    p { font-size: 0.88rem; }
  }

  /* Tablet */
  @media (max-width: 768px) {
    padding: 1.25rem;

    .charts-header { flex-direction: column; align-items: stretch; }

    .chart-toggle-btn { align-self: flex-start; }

    .chart-stats-overview {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.75rem;
    }

    .stat-content h3 { font-size: 1.3rem; }

    .chart-container { min-height: 280px; padding: 1rem 0; }
  }

  /* Mobile */
  @media (max-width: 480px) {
    padding: 1rem;

    .chart-stats-overview {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }

    .stat-card { padding: 0.85rem; }
    .chart-footer { flex-direction: column; align-items: flex-start; }
    .chart-container { min-height: 240px; }
    .header-content h4 { font-size: 1.05rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .stat-card { transition: none; }
    .stat-card:hover { transform: none; }
    .chart-toggle-btn:hover { transform: none; }
  }
`;

export default Wrapper;
