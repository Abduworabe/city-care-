import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "../context/SettingsContext";
import { useDashboardContext } from "./DashboardLayout";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { user } = useDashboardContext();
  const { t } = useSettings();
  const isAdmin = user?.role === "admin";

  const totalComplaints     = data?.totalComplaints     || 0;
  const avgResolutionTime   = data?.avgResolutionTime   || 0;
  const defaultStats        = data?.defaultStats        || {};
  const monthlyApplications = data?.monthlyApplications || [];

  return (
    <>
      {/* Admin banner */}
      {isAdmin && (
        <div style={{
          background: "linear-gradient(135deg, rgba(255,96,0,0.12), rgba(255,154,60,0.08))",
          border: "1px solid rgba(255,96,0,0.25)", borderRadius: "12px",
          padding: "0.85rem 1.25rem", marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: "0.75rem",
          color: "var(--text-color)", fontSize: "0.92rem",
        }}>
          <span style={{ fontSize: "1.3rem" }}>⚙️</span>
          <div>
            <strong>Admin View</strong> — showing system-wide statistics for all citizens
          </div>
        </div>
      )}

      <StatsContainer
        defaultStats={defaultStats}
        totalComplaints={totalComplaints}
        avgResolutionTime={avgResolutionTime}
      />

      {monthlyApplications.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
