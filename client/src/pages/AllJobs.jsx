import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const AllJobsContext = createContext();

// Responsive Wrapper for AllJobs
const AllJobsWrapper = styled.div`
  padding: 1rem;
  min-height: calc(100vh - var(--nav-height));

  /* Mobile First Layout */
  .all-jobs-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Tablet Styles */
  @media (min-width: 768px) {
    padding: 1.5rem;
    .all-jobs-content {
      gap: 2rem;
    }
  }

  /* Desktop Styles */
  @media (min-width: 992px) {
    padding: 2rem;
    .all-jobs-content {
      gap: 2.5rem;
    }
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    .all-jobs-content {
      gap: 3rem;
    }
  }

  /* Extra Small Mobile */
  @media (max-width: 480px) {
    padding: 0.75rem;
    .all-jobs-content {
      gap: 1rem;
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
