import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company?.charAt(0) || "D"}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaMapMarkerAlt />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBuilding />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
      </div>
      <footer className="actions">
        <Link to={`../edit-job/${_id}`} className="btn edit-btn">
          Update
        </Link>
        <Form method="post" action={`../delete-job/${_id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  );
};

export default Job;
