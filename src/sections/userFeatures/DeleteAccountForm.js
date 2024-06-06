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
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/auth";
import React from "react";

import ProgressBarIntegration from "../../components/ProgressBarIntegration";

const DeleteAccountForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const { isLoading, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required"),
  });

  const defaultValues = {
    password: "",
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
    const password = data.password;
    try {
      dispatch(removeUser({ email, password }));
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
          label={"Your Password"}
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

      <Box sx={{ m: 1, position: "relative", my: 2 }}>
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
          {isLoading ? "Please wait..." : "Delete Account"}
        </Button>
        {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
      </Box>
    </FormProvider>
  );
};

export default DeleteAccountForm;
