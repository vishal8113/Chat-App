import { Stack, Box, Typography, IconButton } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import DeleteAccountForm from "../../sections/userFeatures/DeleteAccountForm";
import React from "react";

const DeleteAccountPage = () => {
  const navigate = useNavigate();

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
          }}
        >
          <Stack p={4} spacing={5}>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton
                onClick={() => {
                  navigate("/app");
                }}
              >
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h5">Delete Account</Typography>
            </Stack>
            <DeleteAccountForm />
            <Stack />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default DeleteAccountPage;
