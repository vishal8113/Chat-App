import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../../sections/authentication/NewPasswordForm";
import { useSelector } from "react-redux";
import { CloseSnackBar } from "../../redux/slices/app";
import SnackBarIntegration from "../../components/SnackBarIntegration";

const NewPassword = () => {
  const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
    (state) => state.app
  );
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          mb: 5,
          position: "relative",
        }}
      >
        <Typography variant="h3" paragraph>
          Reset Password
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 5,
          }}
        >
          Please set your new password.
        </Typography>

        <NewPasswordForm />

        <Stack direction={"row"} alignItems={"center"}>
          <CaretLeft />
          <Link
            to="/auth/login"
            component={RouterLink}
            variant="subtitle2"
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              color: "inherit",
            }}
          >
            Return to Sign In
          </Link>
          {openSnackBar && (
            <SnackBarIntegration
              open={openSnackBar}
              severity={snackBarSeverity}
              message={snackBarMessage}
              CloseSnackBar={CloseSnackBar}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default NewPassword;
