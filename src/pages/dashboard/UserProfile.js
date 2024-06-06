import {
  Stack,
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { CaretLeft, Trash, User } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "../../sections/userFeatures/EditProfileForm";
import React from "react";
import { LogOutUser } from "../../redux/slices/auth";

import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogOutDialog = ({ open, handleClose, handleYes }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Log out</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are You sure you want to Log Out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose, handleYes }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are You sure you want to delete your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const UserProfile = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseLogOutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogOutYes = () => {
    dispatch(LogOutUser());
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogYes = () => {
    navigate("/deleteAccount");
  };
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack p={4} spacing={5} sx={{ flexGrow: 1 }}>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton
                onClick={() => {
                  navigate("/app");
                }}
              >
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h5">Profile</Typography>
            </Stack>
            <EditProfileForm />
          </Stack>
          <Stack direction="row" spacing={2} alignItems={"center"} p={4}>
            <Button
              onClick={() => {
                setOpenLogoutDialog(true);
              }}
              startIcon={<User />}
              fullWidth
              variant="outlined"
              sx={{ fontSize: "0.8rem" }}
            >
              Log Out
            </Button>
            <Button
              onClick={() => {
                setOpenDeleteDialog(true);
              }}
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
              sx={{ fontSize: "0.8rem" }}
            >
              Delete
            </Button>
          </Stack>
          {openLogoutDialog && (
            <LogOutDialog
              open={openLogoutDialog}
              handleClose={handleCloseLogOutDialog}
              handleYes={handleLogOutYes}
            />
          )}
          {openDeleteDialog && (
            <DeleteDialog
              open={openDeleteDialog}
              handleClose={handleCloseDeleteDialog}
              handleYes={handleDeleteDialogYes}
            />
          )}
        </Box>
      </Stack>
    </>
  );
};

export default UserProfile;
