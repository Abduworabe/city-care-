import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import ThreeDBackground from "../components/ThreeBackground";
import { useSettings } from "../context/SettingsContext";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Account created! Please sign in.");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Registration failed.");
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { t } = useSettings();

  return (
    <>
      <ThreeDBackground />
      <Wrapper>
        <Form method="post" className="form">
          <Logo />
          <h4>{t.create_account_title}</h4>
          <p className="form-subtitle">{t.create_account_subtitle}</p>
          <FormRow type="text"     name="name"     labelText={t.first_name} placeholder={t.first_name_placeholder} />
          <FormRow type="text"     name="lastName" labelText={t.last_name}  placeholder={t.last_name_placeholder} />
          <FormRow type="text"     name="location" labelText={t.location}   placeholder={t.location_placeholder} />
          <FormRow type="email"    name="email"    labelText={t.email}      placeholder={t.email_placeholder} />
          <FormRow type="password" name="password" labelText={t.password}   placeholder={t.password_placeholder_reg} />
          <button type="submit" className="btn btn-block" disabled={isSubmitting}>
            {isSubmitting ? t.saving : t.create_account_title}
          </button>
          <div className="form-footer">
            <p>
              {t.already_member}{" "}
              <Link to="/login" className="member-btn">{t.sign_in_title}</Link>
            </p>
            <div className="security-notice">
              <span className="security-icon">🔒</span>
              <span>{t.data_protected}</span>
            </div>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default Register;
