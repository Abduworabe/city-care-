import {
  FaExclamationTriangle, FaTools, FaCheckCircle, FaClock,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import { useSettings } from "../context/SettingsContext";

const StatsContainer = ({ defaultStats, totalComplaints, avgResolutionTime }) => {
  const { t } = useSettings();

  const stats = [
    { title: t.reported_complaints, count: defaultStats?.reported || 0,    icon: <FaExclamationTriangle />, color: "#ff6000", bcg: "#fff0e6", description: t.reported_desc },
    { title: t.in_progress,         count: defaultStats?.in_progress || 0, icon: <FaTools />,               color: "#f59e0b", bcg: "#fef3c7", description: t.in_progress_desc },
    { title: t.resolved_issues,     count: defaultStats?.resolved || 0,    icon: <FaCheckCircle />,         color: "#10b981", bcg: "#d1fae5", description: t.resolved_desc },
    { title: t.closed_complaints,   count: defaultStats?.closed || 0,      icon: <FaClock />,               color: "#ef4444", bcg: "#fee2e2", description: t.closed_desc },
  ];

  return (
    <Wrapper>
      <div className="stats-header">
        <h3>{t.stats_title}</h3>
        <p className="stats-subtitle">{t.stats_subtitle}</p>
      </div>

      <div className="stats-grid">
        {stats.map((item) => <StatItem key={item.title} {...item} />)}
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <h4>{t.total_complaints}</h4>
            <p className="summary-count">{totalComplaints}</p>
            <span className="summary-trend">{t.all_time}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">⚡</div>
          <div className="summary-content">
            <h4>{t.avg_resolution}</h4>
            <p className="summary-count">
              {avgResolutionTime ? avgResolutionTime.toFixed(1) : 0} {t.avg_unit}
            </p>
            <span className="summary-trend positive">{t.this_month}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StatsContainer;
