import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { COMPLAINT_STATUS, COMPLAINT_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "../context/SettingsContext";

const singleJobQuery = (id) => ({
  queryKey: ["job", id],
  queryFn: async () => {
    const { data } = await customFetch.get(`/jobs/${id}`);
    return data;
  },
});

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["job", params.id]);
      toast.success("Issue updated successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { data: { job } } = useQuery(singleJobQuery(id));
  const { t } = useSettings();
  const { user } = useOutletContext();
  const isAdmin = user?.role === "admin";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">
          {isAdmin ? "⚙️ Manage Complaint" : t.edit_job_title}
        </h4>

        {isAdmin ? (
          /* ── Admin view: only status matters, show all fields read-only except status */
          <div className="form-center">
            <div className="form-row" style={{ gridColumn: "1/-1" }}>
              <label className="form-label">{t.issue_title}</label>
              <p style={{ padding: "0.65rem 0.9rem", background: "var(--background-color)",
                border: "1.5px solid var(--border-color)", borderRadius: "var(--border-radius)",
                color: "var(--text-color)", fontSize: "0.95rem" }}>{job.position}</p>
            </div>
            <div className="form-row">
              <label className="form-label">{t.concerned_dept}</label>
              <p style={{ padding: "0.65rem 0.9rem", background: "var(--background-color)",
                border: "1.5px solid var(--border-color)", borderRadius: "var(--border-radius)",
                color: "var(--text-color)", fontSize: "0.95rem" }}>{job.company}</p>
            </div>
            <div className="form-row">
              <label className="form-label">{t.issue_location}</label>
              <p style={{ padding: "0.65rem 0.9rem", background: "var(--background-color)",
                border: "1.5px solid var(--border-color)", borderRadius: "var(--border-radius)",
                color: "var(--text-color)", fontSize: "0.95rem" }}>{job.jobLocation}</p>
            </div>
            <FormRow  type="text" name="position"    defaultValue={job.position}    style={{ display:"none" }} />
            <FormRow  type="text" name="company"     defaultValue={job.company}     style={{ display:"none" }} />
            <FormRow  type="text" name="jobLocation" defaultValue={job.jobLocation} style={{ display:"none" }} />
            {/* Admin primary action: change status */}
            <FormRowSelect
              name="jobStatus" labelText="🔄 Update Status"
              defaultValue={job.jobStatus} list={Object.values(COMPLAINT_STATUS)}
            />
            <FormRowSelect name="jobType" labelText={t.job_type} defaultValue={job.jobType} list={Object.values(COMPLAINT_TYPE)} />
            <SubmitBtn formBtn text="✅ Update Status" />
          </div>
        ) : (
          /* ── Citizen view: can edit their own complaint details */
          <div className="form-center">
            <FormRow type="text" name="position"    labelText={t.issue_title}    defaultValue={job.position} />
            <FormRow type="text" name="company"     labelText={t.concerned_dept} defaultValue={job.company} />
            <FormRow type="text" name="jobLocation" labelText={t.job_location}   defaultValue={job.jobLocation} />
            <FormRowSelect name="jobStatus" labelText={t.job_status} defaultValue={job.jobStatus} list={Object.values(COMPLAINT_STATUS)} />
            <FormRowSelect name="jobType"   labelText={t.job_type}   defaultValue={job.jobType}   list={Object.values(COMPLAINT_TYPE)} />
            <SubmitBtn formBtn text={t.save} />
          </div>
        )}
      </Form>
    </Wrapper>
  );
};

export default EditJob;
