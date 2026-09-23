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

  return (
    <>
      <ThreeDBackground />
      <Wrapper>
        <Form method="post" className="form">
          <Logo />
          <h4>{t.sign_in_title}</h4>
          <p className="form-subtitle">{t.sign_in_subtitle}</p>
          <FormRow type="email" name="email" labelText={t.email} placeholder={t.email_placeholder} />
          <FormRow type="password" name="password" labelText={t.password} placeholder={t.password_placeholder} />
          <button type="submit" className="btn btn-block" disabled={isSubmitting}>
            {isSubmitting ? t.saving : t.sign_in_title}
          </button>
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
