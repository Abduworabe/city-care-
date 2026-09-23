import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar, Loading } from "../components";
import { createContext, useContext, useState, useEffect } from "react";
import {
  Outlet, redirect, useLoaderData, useNavigate, useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { NotificationProvider } from "../context/NotificationContext";

// --- React Query User Fetch ---
const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    return data;
  },
};

// --- React Router Loader ---
export const loader = (queryClient) => async () => {
  try {
    // Loader fetches the data and puts it into the cache
    return await queryClient.fetchQuery(userQuery);
  } catch (error) {
    // Redirect on first load failure (e.g., initial session expired)
    return redirect("/");
  }
};

// --- Context Setup ---
const DashboardContext = createContext();

// --- Dashboard Component (Renamed) ---
const DashboardLayout = ({
  isDarkThemeEnabled,
  toggleDarkTheme,
  queryClient,
}) => {
  // ✅ useLoaderData gives initial data, but useQuery keeps it live/fresh
  const initialData = useLoaderData();

  // ✅ useQuery re-fetches whenever cache is invalidated (e.g. after profile update)
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch("/users/current-user");
      return data;
    },
    initialData,
  });

  const user = data?.user || initialData?.user;

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  // ⭐️ New state for tracking global authentication errors ⭐️
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleToggleDarkTheme = () => {
    toggleDarkTheme();
    setIsDarkTheme(!isDarkTheme);
  };

  // ⭐️ Refactored Logout Function ⭐️
  const logoutUser = async () => {
    // Perform logout API call
    await customFetch.get("/auth/logout");

    // Clear the user cache
    queryClient.invalidateQueries();

    toast.success("Logging out...");
    navigate("/");
  };

  // ⭐️ useEffect to setup and cleanup the interceptor ⭐️
  useEffect(() => {
    // Register the response interceptor
    const interceptor = customFetch.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Check for 401 status
        if (error?.response?.status === 401) {
          // Set the error flag, which triggers the logout useEffect below
          setIsAuthError(true);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function: eject the interceptor when the component unmounts
    return () => {
      customFetch.interceptors.response.eject(interceptor);
    };
  }, []); // Run only once on mount

  // ⭐️ useEffect to handle logout on authentication error ⭐️
  useEffect(() => {
    // Only run if an authentication error has been flagged
    if (isAuthError) {
      logoutUser();
    }
  }, [isAuthError]); // Re-run whenever isAuthError changes

  return (
    <DashboardContext.Provider
      value={{
        user, showSidebar, isDarkTheme,
        toggleDarkTheme: handleToggleDarkTheme,
        toggleSidebar, logoutUser,
      }}
    >
      <NotificationProvider>
        <Wrapper>
          <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />
            <div>
              <Navbar />
              <div className="dashboard-page">
                {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
              </div>
            </div>
          </main>
        </Wrapper>
      </NotificationProvider>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout; // ⭐️ Export the new name ⭐️
