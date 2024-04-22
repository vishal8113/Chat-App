import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Button,
  Box,
} from "@mui/material";

import FormProvider from "../../components/hook-form/FormProvider";
import CustomTextField from "../../components/hook-form/CustomTextField";

import { Link as RouterLink } from "react-router-dom";

import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { LogInUser } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarIntegration from "../../components/ProgressBarIntegration";

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to server
      dispatch(LogInUser(data));
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <CustomTextField name="email" label="Email address" />

        <CustomTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
        <Link
          variant="body2"
          color="inherit"
          underline="always"
          component={RouterLink}
          to="/auth/reset-password"
        >
          Forgot Your Password?
        </Link>
      </Stack>

      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: isLoading ? "grey.400" : "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: isLoading ? "grey.400" : "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          {isLoading ? "Please wait..." : "Login"}
        </Button>
        {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
      </Box>
    </FormProvider>
  );
}
