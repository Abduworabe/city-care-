import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSettings } from "../context/SettingsContext";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  const { t } = useSettings();
  const chartData = Array.isArray(data) ? data : [];
  const totalComplaints = chartData.reduce((sum, m) => sum + (m.count || 0), 0);
  const avgPerMonth = Math.round(totalComplaints / (chartData.length || 1));

  return (
    <Wrapper>
      <div className="charts-header">
        <div className="header-content">
          <h4>{t.monthly_trends}</h4>
          <p className="chart-subtitle">{t.chart_subtitle}</p>
        </div>
        <button type="button" className="chart-toggle-btn" onClick={() => setBarChart(!barChart)}>
          <span className="btn-icon">{barChart ? "📊" : "📈"}</span>
          {barChart ? t.switch_area : t.switch_bar}
        </button>
      </div>

      {chartData.length > 0 ? (
        <>
          <div className="chart-stats-overview">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content"><h3>{totalComplaints}</h3><p>{t.total_label}</p></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content"><h3>{chartData.length}</h3><p>{t.months_tracked}</p></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content"><h3>{avgPerMonth}</h3><p>{t.avg_per_month}</p></div>
            </div>
          </div>

          <div className="chart-container">
            {barChart ? <BarChart data={chartData} /> : <AreaChart data={chartData} />}
          </div>

          <div className="chart-footer">
            <div className="chart-legend">
              <div className="legend-item"><div className="legend-color bar"></div><span>{t.monthly_label}</span></div>
              <div className="legend-item"><div className="legend-color area"></div><span>{t.trend_line}</span></div>
            </div>
            <div className="data-info"><span className="info-icon">ℹ️</span><span>{t.data_updated}</span></div>
          </div>
        </>
      ) : (
        <div className="empty-chart">
          <div className="empty-icon">📊</div>
          <h5>{t.no_chart_data}</h5>
          <p>{t.no_chart_desc}</p>
        </div>
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
