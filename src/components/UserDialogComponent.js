import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { socket } from "../utils/socket";

const UserDialogComponent = ({ id, name, imageUrl }) => {
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
          <Avatar alt={name} src={imageUrl} />
        </Stack>
        <Stack spacing={0.3}>
          <Typography variant="subtitle2">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              socket.emit("friend_request", { to: id, from: user_id });
              alert("Friend Request sent!");
            }}
          >
            Send Request
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserDialogComponent;
