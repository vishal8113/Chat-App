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
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <General /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

const General = Loadable(lazy(() => import("../pages/dashboard/General")));
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

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

export default Router;
