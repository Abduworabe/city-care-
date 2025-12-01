import {
  FaExclamationTriangle,
  FaTools,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaCity,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({
  defaultStats,
  totalComplaints,
  avgResolutionTime,
}) => {
  const stats = [
    {
      title: "Reported Complaints",
      count: defaultStats?.reported || 0,
      icon: <FaExclamationTriangle />,
      color: "#ff6000",
      bcg: "#fff0e6",
      description: "New complaints awaiting action",
    },
    {
      title: "In Progress",
      count: defaultStats?.in_progress || 0,
      icon: <FaTools />,
      color: "#f59e0b",
      bcg: "#fef3c7",
      description: "Complaints being addressed",
    },
    {
      title: "Resolved Issues",
      count: defaultStats?.resolved || 0,
      icon: <FaCheckCircle />,
      color: "#10b981",
      bcg: "#d1fae5",
      description: "Successfully resolved cases",
    },
    {
      title: "Closed Complaints",
      count: defaultStats?.closed || 0,
      icon: <FaClock />,
      color: "#ef4444",
      bcg: "#fee2e2",
      description: "Completed and closed cases",
    },
  ];

  return (
    <Wrapper>
      <div className="stats-header">
        <h3>Complaint Management Dashboard</h3>
        <p className="stats-subtitle">
          Real-time overview of municipal complaint status and performance
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((item) => {
          return <StatItem key={item.title} {...item} />;
        })}
      </div>

      {/* Summary Cards */}
      <div className="stats-summary">
        {/* Total Complaints */}
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <h4>Total Complaints Tracked</h4>
            <p className="summary-count">{totalComplaints}</p>
            <span className="summary-trend">All Time</span>
          </div>
        </div>

        {/* Average Resolution Time */}
        <div className="summary-card">
          <div className="summary-icon">⚡</div>
          <div className="summary-content">
            <h4>Avg. Resolution Time</h4>
            <p className="summary-count">
              {avgResolutionTime ? avgResolutionTime.toFixed(1) : 0} days
            </p>
            <span className="summary-trend positive">↓ 12% this month</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StatsContainer;
