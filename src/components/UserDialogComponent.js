import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const UserDialogComponent = ({ _id, name, imageUrl }) => {
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
            variant="outlined"
            onClick={() => {
              alert("Request Sent");
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
