import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/authentication/AuthSocial";
import RegistrationForm from "../../sections/authentication/RegsitrationForm";
import { useSelector } from "react-redux";
import { CloseSnackBar } from "../../redux/slices/app";
import SnackBarIntegration from "../../components/SnackBarIntegration";

const RegisterPage = () => {
  const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
    (state) => state.app
  );
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h4">Welcome to ChitChat</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Already have an account?</Typography>
        <Link to="/auth/login" component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
      {/*Registartion Form */}
      <RegistrationForm />
      <Typography
        component={"div"}
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up,I agree to "}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
      </Typography>

      {/* Auth Social */}
      <AuthSocial />
      {openSnackBar && (
        <SnackBarIntegration
          open={openSnackBar}
          severity={snackBarSeverity}
          message={snackBarMessage}
          CloseSnackBar={CloseSnackBar}
        />
      )}
    </Stack>
  );
};

export default RegisterPage;
