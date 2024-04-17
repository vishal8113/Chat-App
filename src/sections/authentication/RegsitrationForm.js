import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/hook-form/FormProvider";
import CustomTextField from "../../components/hook-form/CustomTextField";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Field can't be empty!")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password must be Same"
      ),
  });

  const methods = useForm({
    resolver: yupResolver(RegistrationSchema),
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

        <CustomTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Register
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegistrationForm;
