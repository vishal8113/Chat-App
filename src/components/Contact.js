import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
import AntSwitch from "./AntSwitch";
import { UpdateSidebarType, ToggleSidebar } from "../redux/slices/app";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant="article">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Avatar src={faker.image.avatar()} sx={{ width: 64, height: 64 }} />
            <Stack direction={"column"} spacing={0.5} alignItems={"center"}>
              <Typography variant="article" fontWeight={200}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant="article" fontWeight={200}>
                +91 96902 51009
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">Sab Moh Maya hai!!</Typography>
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Media,Links & Docs</Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebarType("MEDIA"));
              }}
              endIcon={<CaretRight />}
            >
              121
            </Button>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {[1, 2, 3].map((ele) => (
              <Box>
                <Avatar
                  src={faker.image.avatar()}
                  alt={faker.name.firstName()}
                />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("STARRED"));
              }}
            >
              <CaretRight size={21} />
            </IconButton>
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Bell size={21} />
              <Typography variant="subtitle2">Mute Notifications</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />
          <Typography>1 groups in common</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.nature()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Friends ❣️</Typography>
              <Typography variant="caption">
                Rajan,Taniya,Rishika,Tanu,Amna,You
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Button startIcon={<Prohibit />} fullWidth variant="outlined">
              Block
            </Button>
            <Button startIcon={<Trash />} fullWidth variant="outlined">
              Clear
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
