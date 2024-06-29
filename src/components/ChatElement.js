import { Avatar, Box, Stack, Badge, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import StyledBadge from "./StyledBadge";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../redux/slices/app";

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box
      onClick={() => {
        dispatch(SelectConversation({ room_id: id }));
      }}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
        borderRadius: 2,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img}></Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={img}></Avatar>
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle" sx={{ fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography variant="caption" sx={{ fontWeight: 200 }}>
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
