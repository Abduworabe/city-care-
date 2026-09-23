import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useSettings } from "../context/SettingsContext";
import { useDashboardContext } from "../pages/DashboardLayout";
day.extend(advancedFormat);

const Job = ({ _id, position, company, jobLocation, jobType, createdAt, jobStatus, createdBy }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const { t } = useSettings();
  const { user } = useDashboardContext();
  const isAdmin = user?.role === "admin";

  // submitted by name (populated for admin)
  const submittedBy = createdBy?.name
    ? `${createdBy.name} ${createdBy.lastName || ""}`.trim()
    : null;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{position?.charAt(0)?.toUpperCase() || "W"}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaMapMarkerAlt />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />}  text={date} />
          <JobInfo icon={<FaBuilding />}     text={jobType} />
          {isAdmin && submittedBy && (
            <JobInfo icon={<FaUser />} text={submittedBy} />
          )}
          <div className={`status ${jobStatus?.replace(" ", "-")}`}>{jobStatus}</div>
        </div>
      </div>

      {/* Admin: can update status + delete | Citizen: can edit/delete own */}
      <footer className="actions">
        <Link to={`../edit-job/${_id}`} className="btn edit-btn">
          {isAdmin ? "✏️ Manage" : t.update}
        </Link>
        <Form method="post" action={`../delete-job/${_id}`}>
          <button type="submit" className="btn delete-btn">{t.delete_btn}</button>
        </Form>
      </footer>
    </Wrapper>
  );
};

export default Job;
