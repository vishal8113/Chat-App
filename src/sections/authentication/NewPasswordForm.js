import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import CustomTextField from "../../components/hook-form/CustomTextField";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { NewPassword } from "../../redux/slices/auth";
import ProgressBarIntegration from "../../components/ProgressBarIntegration";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
  const { isLoading } = useSelector((state) => state.auth);

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password must be same."
      ),
  });

  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
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
      // submit data to forgot-password
      const password = data.password;
      dispatch(NewPassword({ password, token: queryParameters.get("token") }));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.messasge,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} direction={"column"}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <CustomTextField
          name={"password"}
          label={"New Password"}
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
          name={"passwordConfirm"}
          label={"Confirm Password"}
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

      <Stack
        alignItems={"flex-end"}
        sx={{
          my: 2,
        }}
      ></Stack>

      <Stack direction={"row"} alignItems={"center"} width={"100%"}>
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
            {isLoading ? "Please wait..." : "Submit"}
          </Button>
          {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
