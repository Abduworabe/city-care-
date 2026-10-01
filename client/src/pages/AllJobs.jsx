import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const AllJobsContext = createContext();

const AllJobsWrapper = styled.div`
  width: 100%;

  .all-jobs-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .all-jobs-content {
      gap: 1.75rem;
    }
  }
`;

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsWrapper>
      <div className="all-jobs-content">
        <AllJobsContext.Provider value={{ data, searchValues }}>
          <SearchContainer />
          <JobsContainer />
        </AllJobsContext.Provider>
      </div>
    </AllJobsWrapper>
  );
};

export default AllJobs;

export const useAllJobsContext = () => useContext(AllJobsContext);
