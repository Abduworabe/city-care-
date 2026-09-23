import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";
import { useSettings } from "../context/SettingsContext";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  const { t } = useSettings();

  return (
    <Wrapper>
      <div className="stats-grid">
        <StatItem title={t.current_users} count={users}
          color="#e9b949" bcg="#fcefc7" icon={<FaSuitcaseRolling />} />
        <StatItem title={t.total_jobs}    count={jobs}
          color="#647acb" bcg="#e0e8f9" icon={<FaCalendarCheck />} />
      </div>
    </Wrapper>
  );
};

export default Admin;
