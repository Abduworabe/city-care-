import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { COMPLAINT_STATUS, COMPLAINT_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Complaint submitted successfully");
      // Fixed redirect path - use absolute path from root
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

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Report New Issue</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="Issue Title"
            placeholder="e.g., Pothole on Main Street"
          />
          <FormRow
            type="text"
            name="company"
            labelText="Concerned Department"
            placeholder="e.g., Roads Department"
          />
          <FormRow
            type="text"
            labelText="Issue Location"
            name="jobLocation"
            defaultValue={user.location}
            placeholder="Enter exact location"
          />
          <FormRowSelect
            labelText="Current Status"
            name="jobStatus"
            defaultValue={COMPLAINT_STATUS.REPORTED}
            list={Object.values(COMPLAINT_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Issue Type"
            defaultValue={COMPLAINT_TYPE.WATER}
            list={Object.values(COMPLAINT_TYPE)}
          />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "Submit Complaint"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
