import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
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
import { ToggleSidebar } from "../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this User</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are You sure you want to block this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const ClearDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Clear the Chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are You sure you want to Clear Messages?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openClearDialog, setOpenClearDialog] = useState(false);

  const handleCloseBlockDialog = () => {
    setOpenBlockDialog(false);
  };

  const handleCloseClearDialog = () => {
    setOpenClearDialog(false);
  };

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
            <Button endIcon={<CaretRight />}>121</Button>
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
            <IconButton>
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
            <Button
              onClick={() => {
                setOpenBlockDialog(true);
              }}
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
            >
              Block
            </Button>
            <Button
              onClick={() => {
                setOpenClearDialog(true);
              }}
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlockDialog && (
        <BlockDialog
          open={openBlockDialog}
          handleClose={handleCloseBlockDialog}
        />
      )}
      {openClearDialog && (
        <ClearDialog
          open={openClearDialog}
          handleClose={handleCloseClearDialog}
        />
      )}
    </Box>
  );
};

export default Contact;
