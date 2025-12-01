import styled from "styled-components";

const Wrapper = styled.section`
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .charts-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .header-content {
    flex: 1;

    h4 {
      color: #101010;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #ff6000, #ff8c00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .chart-subtitle {
      color: #64748b;
      font-size: 0.95rem;
      margin: 0;
    }
  }

  .chart-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 96, 0, 0.1);
    border: 2px solid #ff6000;
    border-radius: 12px;
    color: #ff6000;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      background: #ff6000;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 96, 0, 0.3);
    }

    .btn-icon {
      font-size: 1.2rem;
    }
  }

  .chart-stats-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }
  }

  .stat-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 96, 0, 0.1);
    border-radius: 12px;
  }

  .stat-content {
    h3 {
      font-size: 2rem;
      font-weight: 800;
      margin: 0;
      background: linear-gradient(135deg, #ff6000, #ff8c00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      color: #64748b;
      margin: 0.25rem 0 0 0;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  .chart-container {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-bottom: 1.5rem;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      min-height: 300px;
      padding: 1rem;
    }
  }

  .chart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .chart-legend {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
  }

  .legend-color {
    width: 20px;
    height: 4px;
    border-radius: 2px;

    &.bar {
      background: linear-gradient(90deg, #ff6000, #ff8c00);
    }

    &.area {
      background: linear-gradient(90deg, #1e90ff, #00bfff);
    }
  }

  .data-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.85rem;

    .info-icon {
      font-size: 1rem;
    }
  }

  /* Loading state */
  .loading-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #64748b;
    gap: 1rem;

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f4f6;
      border-top: 3px solid #ff6000;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  /* Empty state */
  .empty-chart {
    text-align: center;
    color: #64748b;
    padding: 3rem;

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h5 {
      margin: 0 0 0.5rem 0;
      color: #374151;
    }
  }
`;

export default Wrapper;
