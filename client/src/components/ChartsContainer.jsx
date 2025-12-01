import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  // Ensure data is properly formatted for charts
  const chartData = Array.isArray(data) ? data : [];

  // Calculate statistics safely
  const totalComplaints = chartData.reduce(
    (total, month) => total + (month.count || 0),
    0
  );
  const avgPerMonth = Math.round(totalComplaints / (chartData.length || 1));

  return (
    <Wrapper>
      <div className="charts-header">
        <div className="header-content">
          <h4>Monthly Complaint Trends</h4>
          <p className="chart-subtitle">
            Track complaint patterns and resolution rates over time
          </p>
        </div>
        <button
          type="button"
          className="chart-toggle-btn"
          onClick={() => setBarChart(!barChart)}
        >
          <span className="btn-icon">{barChart ? "📊" : "📈"}</span>
          {barChart ? "Switch to Area Chart" : "Switch to Bar Chart"}
        </button>
      </div>

      {chartData.length > 0 ? (
        <>
          <div className="chart-stats-overview">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>{totalComplaints}</h3>
                <p>Total Complaints</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>{chartData.length}</h3>
                <p>Months Tracked</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <h3>{avgPerMonth}</h3>
                <p>Avg. per Month</p>
              </div>
            </div>
          </div>

          <div className="chart-container">
            {barChart ? (
              <BarChart data={chartData} />
            ) : (
              <AreaChart data={chartData} />
            )}
          </div>

          <div className="chart-footer">
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color bar"></div>
                <span>Monthly Complaints</span>
              </div>
              <div className="legend-item">
                <div className="legend-color area"></div>
                <span>Trend Line</span>
              </div>
            </div>
            <div className="data-info">
              <span className="info-icon">ℹ️</span>
              <span>Data updated daily</span>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-chart">
          <div className="empty-icon">📊</div>
          <h5>No complaint data available</h5>
          <p>Complaint statistics will appear here as data is collected</p>
        </div>
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
