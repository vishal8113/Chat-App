import { Outlet, Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../utils/socket";
import { OpenSnackBar } from "../../redux/slices/app";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user_id = window.localStorage.getItem("user_id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = () => {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      if (!socket) {
        connectSocket(user_id);
      }

      // Event listeners
      const handleNewFriendRequest = (data) => {
        dispatch(OpenSnackBar({ severity: "success", message: data.message }));
      };

      const handleRequestAccepted = (data) => {
        dispatch(OpenSnackBar({ severity: "success", message: data.message }));
      };

      const handleRequestSent = (data) => {
        dispatch(OpenSnackBar({ severity: "success", message: data.message }));
      };

      socket.on("new_friend_request", handleNewFriendRequest);
      socket.on("request_accepted", handleRequestAccepted);
      socket.on("request_sent", handleRequestSent);

      return () => {
        socket.off("new_friend_request", handleNewFriendRequest);
        socket.off("request_accepted", handleRequestAccepted);
        socket.off("request_sent", handleRequestSent);
      };
    }
  }, [isLoggedIn, user_id]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
