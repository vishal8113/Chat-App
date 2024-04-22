import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import ResetPasswordForm from "../../sections/authentication/ResetPasswordForm";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import { useSelector } from "react-redux";
import { CloseSnackBar } from "../../redux/slices/app";
import SnackBarIntegration from "../../components/SnackBarIntegration";

const ResetPasswordPage = () => {
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
          Forgot your Password
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            mb: 5,
          }}
        >
          Please enter the email address associated with your account and we
          will email you a link to reset your password
        </Typography>
        {/* Reset Password Form */}
        <ResetPasswordForm />
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
        </Stack>
        {openSnackBar && (
          <SnackBarIntegration
            open={openSnackBar}
            severity={snackBarSeverity}
            message={snackBarMessage}
            CloseSnackBar={CloseSnackBar}
          />
        )}
      </Stack>
    </>
  );
};

export default ResetPasswordPage;
