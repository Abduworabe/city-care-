import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { COMPLAINT_STATUS, COMPLAINT_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useSettings } from "../context/SettingsContext";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Complaint submitted successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { t } = useSettings();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">{t.add_job_title}</h4>
        <div className="form-center">
          <FormRow type="text" name="position"    labelText={t.issue_title}    placeholder={t.issue_title_placeholder} />
          <FormRow type="text" name="company"     labelText={t.concerned_dept} placeholder={t.dept_placeholder} />
          <FormRow type="text" name="jobLocation" labelText={t.issue_location} placeholder={t.location_field_placeholder} defaultValue={user.location} />
          <FormRowSelect name="jobStatus" labelText={t.current_status} defaultValue={COMPLAINT_STATUS.REPORTED} list={Object.values(COMPLAINT_STATUS)} />
          <FormRowSelect name="jobType"   labelText={t.issue_type}     defaultValue={COMPLAINT_TYPE.WATER}     list={Object.values(COMPLAINT_TYPE)} />
          <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? t.submitting : t.submit_complaint}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
