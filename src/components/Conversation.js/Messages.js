import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data";
import TimeLine from "./MsgTypes/TimeLine";
import TextMsg from "./MsgTypes/TextMsg";
import ImageMsg from "./MsgTypes/ImageMsg";
import ReplyMsg from "./MsgTypes/ReplyMsg";
import DocMsg from "./MsgTypes/DocMsg";
import LinkMsg from "./MsgTypes/LinkMsg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/chat";
import { socket } from "../../utils/socket";

const Message = () => {
  const dispatch = useDispatch();
  const { pc_conversations, pc_current_messages } = useSelector(
    (state) => state.chat
  );

  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current_conversation = pc_conversations.find(
      (ele) => ele?.id === room_id.room_id
    );

    console.log("***************************************");
    console.log(room_id);

    socket.emit(
      "get_messages",
      { conversation_id: current_conversation.id },
      (data) => {
        dispatch(FetchCurrentMessages({ messages: data }));
      }
    );

    dispatch(SetCurrentConversation(current_conversation));
  }, [pc_conversations, pc_current_messages]);
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {pc_current_messages.map((ele, idx) => {
          switch (ele.type) {
            case "divider":
              return <TimeLine ele={ele} />;

            case "msg":
              switch (ele.subtype) {
                case "img":
                  return <ImageMsg ele={ele} />;

                case "doc":
                  return <DocMsg ele={ele} />;

                case "link":
                  return <LinkMsg ele={ele} />;

                case "reply":
                  return <ReplyMsg ele={ele} />;

                default:
                  return <TextMsg ele={ele} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
