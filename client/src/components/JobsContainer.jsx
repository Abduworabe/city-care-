import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { useSettings } from "../context/SettingsContext";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;
  const { t } = useSettings();

  if (!jobs || jobs.length === 0) {
    return (
      <Wrapper>
        <h2>{t.no_complaints}</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} {t.nav_all_complaints}
      </h5>
      <div className="jobs">
        {jobs.map((job) => <Job key={job._id} {...job} />)}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
