import { Suspense, lazy } from "react";

import { useRoutes, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";

import LoadingScreen from "../components/LoadingScreen";
import { DEFAULT_PATH } from "../config";
import AuthLayout from "../layouts/auth";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const Router = () => {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
        { path: "verify", element: <VerifyOTPPage /> },
        { path: "create-profile", element: <CreateProfilePage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <General /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "deleteAccount", element: <DeleteAccountPage /> },
        { path: "groups", element: <GroupPage /> },
        { path: "calls", element: <CallPage /> },
        { path: "settings", element: <SettingsPage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

const General = Loadable(lazy(() => import("../pages/dashboard/General")));
const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/UserProfile"))
);

const DeleteAccountPage = Loadable(
  lazy(() => import("../pages/dashboard/DeleteAccountPage"))
);

const GroupPage = Loadable(lazy(() => import("../pages/dashboard/GroupPage")));

const CallPage = Loadable(lazy(() => import("../pages/dashboard/CallPage")));

const SettingsPage = Loadable(
  lazy(() => import("../pages/dashboard/SettingsPage"))
);

const LoginPage = Loadable(
  lazy(() => import("../pages/authenticationPages/LoginPage"))
);

const RegisterPage = Loadable(
  lazy(() => import("../pages/authenticationPages/RegisterPage"))
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/authenticationPages/ResetPasswordPage"))
);

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/authenticationPages/NewPasswordPage"))
);

const VerifyOTPPage = Loadable(
  lazy(() => import("../pages/authenticationPages/VerifyOTPPage"))
);

const CreateProfilePage = Loadable(
  lazy(() => import("../pages/authenticationPages/CreateProfilePage"))
);

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

export default Router;
