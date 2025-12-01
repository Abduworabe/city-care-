import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg, description, trend }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
      {/* Conditionally render description if provided */}
      {description && <p className="description">{description}</p>}
      {/* Conditionally render trend indicator if provided */}
      {trend && (
        <div className="trend-indicator">
          <span className={`trend-dot ${trend}`}></span>
          <span className="trend-text">{trend}</span>
        </div>
      )}
    </Wrapper>
  );
};

export default StatItem;
