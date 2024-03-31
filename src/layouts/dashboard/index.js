import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import NoChat from "../../Assets/Illustrations/NoChat";
const DashboardLayout = () => {
  return (
    <Stack direction="row">
      {/* Side Bar */}
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
