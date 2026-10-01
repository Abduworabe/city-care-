import React, { useState } from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import ThreeDBackground from "../components/ThreeBackground";
import { useSettings } from "../context/SettingsContext";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    if (data.email) data.email = String(data.email).trim().toLowerCase();
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Welcome back!");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed. Please try again.");
      return error;
    }
  };

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { t } = useSettings();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const loginAsDemo = async (role) => {
    setIsDemoLoading(true);
    try {
      const demoEmail = role === "admin" ? "abdu@gmail.com" : "keli@gmail.com";
      await customFetch.post("/auth/login", { email: demoEmail, password: "12345678" });
      toast.success(`Welcome! Logged in as ${role === "admin" ? "Admin" : "Citizen"}`);
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Demo login failed");
    } finally {
      setIsDemoLoading(false);
    }
  };

  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    toast.info(`Filled credentials for ${demoEmail}`);
  };

  return (
    <>
      <ThreeDBackground />
      <Wrapper>
        <Form method="post" className="form">
          <Logo />
          <h4>{t.sign_in_title}</h4>
          <p className="form-subtitle">{t.sign_in_subtitle}</p>

          <FormRow
            type="email"
            name="email"
            labelText={t.email}
            placeholder={t.email_placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormRow
            type="password"
            name="password"
            labelText={t.password}
            placeholder={t.password_placeholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-block" disabled={isSubmitting || isDemoLoading}>
            {isSubmitting ? t.saving : t.sign_in_title}
          </button>

          <div className="demo-divider">
            <span>Or 1-Click Demo Login</span>
          </div>

          <div className="demo-buttons">
            <button
              type="button"
              className="btn-demo"
              onClick={() => loginAsDemo("admin")}
              disabled={isSubmitting || isDemoLoading}
            >
              <span>👑</span> Demo Admin
            </button>
            <button
              type="button"
              className="btn-demo"
              onClick={() => loginAsDemo("citizen")}
              disabled={isSubmitting || isDemoLoading}
            >
              <span>👤</span> Demo Citizen
            </button>
          </div>

          <div className="demo-credentials-card">
            <div className="card-title">
              <span>💡</span> Available Test Accounts
            </div>
            <div className="credential-row">
              <span><strong>Admin:</strong> abdu@gmail.com / 12345678</span>
              <button
                type="button"
                className="fill-btn"
                onClick={() => fillCredentials("abdu@gmail.com", "12345678")}
              >
                Fill
              </button>
            </div>
            <div className="credential-row">
              <span><strong>Citizen:</strong> keli@gmail.com / 12345678</span>
              <button
                type="button"
                className="fill-btn"
                onClick={() => fillCredentials("keli@gmail.com", "12345678")}
              >
                Fill
              </button>
            </div>
          </div>

          <p>
            {t.no_account}{" "}
            <Link to="/register" className="member-btn">{t.register}</Link>
          </p>
        </Form>
      </Wrapper>
    </>
  );
};

export default Login;
