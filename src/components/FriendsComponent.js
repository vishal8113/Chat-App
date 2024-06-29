import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chat } from "phosphor-react";
import Header from "./Conversation.js/Header";
import { socket } from "../utils/socket";

const FriendsComponent = ({ id, name, image }) => {
  const theme = useTheme();
  const user_id = window.localStorage.getItem("user_id");

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Avatar alt={name} src={image} />
        </Stack>
        <Stack spacing={0.3}>
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <IconButton
            onClick={() => {
              // start chat
              socket.emit("start_conversation", { to: id, from: user_id });
            }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FriendsComponent;
