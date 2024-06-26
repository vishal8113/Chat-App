import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Stack, Alert, Button, Box } from "@mui/material";
import CustomTextField from "../../components/hook-form/CustomTextField";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../redux/slices/auth";
import ProgressBarIntegration from "../../components/ProgressBarIntegration";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid email address."),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
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
      // submit data to backend
      dispatch(ResetPassword(data));
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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <CustomTextField name={"email"} label="Email" />
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
            {isLoading ? "Please wait" : "Send Reset Email"}
          </Button>
          {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
