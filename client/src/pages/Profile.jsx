import { useState } from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { redirect, useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useSettings } from "../context/SettingsContext";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get("avatar");
    if (file && file.size > 5000000) {
      toast.error("Image size too large (max 5MB)");
      return null;
    }

    try {
      await customFetch.patch("/users/update-user", formData);
      // Invalidate and immediately refetch user data
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.refetchQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
      return redirect("/dashboard/profile");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to update profile");
      return error;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location, avatar } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { t } = useSettings();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">{t.profile_title}</h4>
        <div className="form-center">
          <div className="form-row" style={{ gridColumn: "1 / -1" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem",
              padding:"1.5rem", background:"var(--background-color)", borderRadius:"var(--border-radius)",
              border:"1.5px dashed var(--border-color)" }}>
              {preview || avatar ? (
                <img src={preview || avatar} alt="profile"
                  style={{ width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover",
                    border:"3px solid var(--primary-accent)", boxShadow:"0 4px 15px rgba(255,96,0,0.3)" }} />
              ) : (
                <FaUserCircle style={{ fontSize:"6rem", color:"var(--grey-400)" }} />
              )}
              <label htmlFor="avatar" className="form-label" style={{ margin:0 }}>
                {t.profile_photo}
              </label>
              <input type="file" id="avatar" name="avatar" className="form-input"
                accept="image/*" onChange={handleFileChange} style={{ maxWidth:"280px" }} />
            </div>
          </div>
          <FormRow type="text"  name="name"     labelText={t.first_name} defaultValue={name} />
          <FormRow type="text"  name="lastName" labelText={t.last_name}  defaultValue={lastName} />
          <FormRow type="email" name="email"    labelText={t.email}      defaultValue={email} />
          <FormRow type="text"  name="location" labelText={t.location}   defaultValue={location} />
          <button className="btn btn-block form-btn" type="submit"
            disabled={isSubmitting} style={{ gridColumn:"1 / -1" }}>
            {isSubmitting ? t.saving : t.save_changes}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
