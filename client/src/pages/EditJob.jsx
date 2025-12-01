import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { COMPLAINT_STATUS, COMPLAINT_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

// 1. Define the Query Configuration Function
const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

// 2. The Loader function (Populates the cache)
// It takes queryClient as an argument from the router setup in App.jsx
export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      // Use ensureQueryData to fetch the job and place it in the cache
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      // Return the ID needed by the component to access the query
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      // Redirect on error (e.g., job not found or unauthorized)
      return redirect("/dashboard/all-jobs");
    }
  };

// 3. The Action function (Updates the job)
// It invalidates the 'jobs' list query and the specific 'job' query.
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);

      // Invalidate the list of jobs to show the update on the AllJobs page
      queryClient.invalidateQueries(["jobs"]);
      // Invalidate the specific job's cache (optional, but good practice)
      queryClient.invalidateQueries(["job", params.id]);

      toast.success("Job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

// 4. The Component (Reads from the cache)
const EditJob = () => {
  // Get the ID that the loader returned
  const id = useLoaderData();

  // Read the job data from the cache populated by the loader
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));

  // The SubmitBtn component handles navigation state automatically,
  // so we no longer need useNavigation and isSubmitting here if using SubmitBtn.

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(COMPLAINT_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(COMPLAINT_TYPE)}
          />
          {/* SubmitBtn handles the loading state (submitting...) */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
