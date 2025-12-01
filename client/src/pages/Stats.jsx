import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data; // contains defaultStats + monthlyApplications
  },
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);

  const totalComplaints = data?.totalComplaints || 0;
  const avgResolutionTime = data?.avgResolutionTime || 0;

  const defaultStats = data?.defaultStats || {};
  const monthlyApplications = data?.monthlyApplications || [];

  return (
    <>
      {/* Pass REAL backend data */}
      <StatsContainer
        defaultStats={defaultStats}
        totalComplaints={totalComplaints}
        avgResolutionTime={avgResolutionTime}
      />

      {/* Charts also get real data */}
      {monthlyApplications.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
