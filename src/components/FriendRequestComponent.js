import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { socket } from "../utils/socket";

const FriendRequestComponent = ({ _id, name, imageUrl, id }) => {
  const theme = useTheme();

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
          <Avatar alt={name} src={imageUrl} />
        </Stack>
        <Stack spacing={0.3}>
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              socket.emit("accept_request", { request_id: id });
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FriendRequestComponent;
