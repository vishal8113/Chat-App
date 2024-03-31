import { Suspense, lazy } from "react";

import { useRoutes, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";

import LoadingScreen from "../components/LoadingScreen";
import { DEFAULT_PATH } from "../config";

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

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

export default Router;
