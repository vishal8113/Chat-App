const path = (root, link) => {
  return `${root}${link}`;
};

const ROOTS_DASHBOARD = "/";
const AUTH_DASHBOARD = "/auth";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
    login: path(AUTH_DASHBOARD, "/login"),
  },
};
