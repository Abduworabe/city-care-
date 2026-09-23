import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
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

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">{t.edit_job_title}</h4>
        <div className="form-center">
          <FormRow type="text" name="position"    labelText={t.issue_title}    defaultValue={job.position} />
          <FormRow type="text" name="company"     labelText={t.concerned_dept} defaultValue={job.company} />
          <FormRow type="text" name="jobLocation" labelText={t.job_location}   defaultValue={job.jobLocation} />
          <FormRowSelect name="jobStatus" labelText={t.job_status} defaultValue={job.jobStatus} list={Object.values(COMPLAINT_STATUS)} />
          <FormRowSelect name="jobType"   labelText={t.job_type}   defaultValue={job.jobType}   list={Object.values(COMPLAINT_TYPE)} />
          <SubmitBtn formBtn text={t.save} />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
