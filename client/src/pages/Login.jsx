import React from "react";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import ThreeDBackground from "../components/ThreeBackground";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };

const Login = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const loginDemoUser = async () => {
    const data = {
      email: "nimu@gmail.com",
      password: "nimu1234",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <>
      {/* ThreeDBackground as the background */}
      <ThreeDBackground />

      <Wrapper>
        <Form method="post" className="form">
          <Logo />
          <h4>login</h4>
          <FormRow type="email" name="email" />
          <FormRow type="password" name="password" />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
          <button
            type="button"
            className="btn btn-block"
            onClick={loginDemoUser}
            disabled={isSubmitting}
          >
            explore the app
          </button>
          <p>
            Not a member yet?
            <Link to="/register" className="member-btn">
              Register
            </Link>
          </p>
        </Form>
      </Wrapper>
    </>
  );
};

export default Login;
