import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data";
import TimeLine from "./MsgTypes/TimeLine";
import TextMsg from "./MsgTypes/TextMsg";
import ImageMsg from "./MsgTypes/ImageMsg";
import ReplyMsg from "./MsgTypes/ReplyMsg";
import DocMsg from "./MsgTypes/DocMsg";
import LinkMsg from "./MsgTypes/LinkMsg";
const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((ele) => {
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
