import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";

import {
  HomeLayout, Landing, Register, Login, DashboardLayout,
  Error, AddJob, EditJob, Stats, AllJobs, Profile, Admin,
} from "./pages";
import Notifications from "./pages/Notifications";

// Actions and Loaders
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLayoutLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import ErrorElement from "./components/ErrorElement";
import Settings from "./pages/Settings";

function App() {
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkTheme") === "true";
    setIsDarkThemeEnabled(storedTheme);
    document.body.classList.toggle("dark-theme", storedTheme);
  }, []);

  const toggleDarkTheme = () => {
    const newTheme = !isDarkThemeEnabled;
    setIsDarkThemeEnabled(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("darkTheme", newTheme);
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Landing /> },
        { path: "register", element: <Register />, action: registerAction },
        { path: "login", element: <Login />, action: loginAction(queryClient) },
        {
          path: "dashboard",
          element: (
            <DashboardLayout
              isDarkThemeEnabled={isDarkThemeEnabled}
              toggleDarkTheme={toggleDarkTheme}
              queryClient={queryClient}
            />
          ),
          loader: dashboardLayoutLoader(queryClient),
          children: [
            // ✅ Dashboard index shows Stats by default
            {
              index: true,
              element: <Stats />,
              loader: statsLoader(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "add-job",
              element: <AddJob />,
              action: addJobAction(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "settings",
              element: <Settings />,
              errorElement: <ErrorElement />,
            },
            {
              path: "stats",
              element: <Stats />,
              loader: statsLoader(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "all-jobs",
              element: <AllJobs />,
              loader: allJobsLoader(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              loader: editJobLoader(queryClient),
              action: editJobAction(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "delete-job/:id",
              action: deleteJobAction(queryClient),
            },
            {
              path: "profile",
              element: <Profile />,
              action: profileAction(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "notifications",
              element: <Notifications />,
              errorElement: <ErrorElement />,
            },
            {
              path: "admin",
              element: <Admin />,
              loader: adminLoader,
              errorElement: <ErrorElement />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider onThemeChange={toggleDarkTheme} currentDark={isDarkThemeEnabled}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
