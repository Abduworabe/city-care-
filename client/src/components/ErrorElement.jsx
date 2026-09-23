import { useRouteError, Link } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  const message =
    error?.response?.data?.msg || error?.message || "Something went wrong.";

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        color: "var(--text-color)",
      }}
    >
      <h4 style={{ marginBottom: "0.75rem", color: "var(--red-dark)" }}>
        ⚠️ Error
      </h4>
      <p style={{ color: "var(--text-secondary-color)", marginBottom: "1rem" }}>
        {message}
      </p>
      <Link
        to="/dashboard"
        className="btn"
        style={{ display: "inline-flex", width: "auto" }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default ErrorElement;
