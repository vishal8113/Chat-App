import { Outlet, Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../utils/socket";
import { OpenSnackBar, SelectConversation } from "../../redux/slices/app";
import { useEffect } from "react";
import {
  AddPersonalConversation,
  AddPersonalMessage,
  UpdatePersonalConversation,
} from "../../redux/slices/chat";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pc_conversations, pc_current_conversation } = useSelector(
    (state) => state.chat
  );
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

      const handleChat = (data) => {
        const existing_conversation = pc_conversations.find(
          (ele) => ele?.id === data._id
        );

        if (existing_conversation) {
          dispatch(UpdatePersonalConversation({ conversation: data }));
        } else {
          dispatch(AddPersonalConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      };

      const handleNewMessage = (data) => {
        const message = data.message;

        if (pc_current_conversation?.id === data.conversation_id) {
          dispatch(
            AddPersonalMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      };

      socket.on("new_friend_request", handleNewFriendRequest);
      socket.on("request_accepted", handleRequestAccepted);
      socket.on("request_sent", handleRequestSent);
      socket.on("start_chat", handleChat);
      socket.on("new_message", handleNewMessage);

      return () => {
        // cleanup func
        socket?.off("new_friend_request");
        socket?.off("request_accepted");
        socket?.off("request_sent");
        socket?.off("start_chat");
        socket?.off("new_message");
      };
    }
  }, [isLoggedIn, socket]);

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
