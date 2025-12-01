import React from "react";
import { LoginLogo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import ThreeDBackground from "../components/ThreeBackground";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      {/* ThreeDBackground as the background */}
      <ThreeDBackground />

      <Wrapper>
        <Form method="post" className="form">
          <LoginLogo />
          <h4>Join CityCare</h4>
          <p className="form-subtitle">
            Create your municipal management account
          </p>

          <FormRow
            type="text"
            name="name"
            label="First Name"
            placeholder="Enter your first name"
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            placeholder="Enter your last name"
          />
          <FormRow
            type="text"
            name="location"
            label="Location"
            placeholder="Enter your city or region"
          />
          <FormRow
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email"
          />
          <FormRow
            type="password"
            name="password"
            label="Password"
            placeholder="Create a strong password"
          />

          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="form-footer">
            <p>
              Already a member?
              <Link to="/login" className="member-btn">
                Login
              </Link>
            </p>

            <div className="security-notice">
              <span className="security-icon">🔒</span>
              <span>Your data is securely protected</span>
            </div>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default Register;
