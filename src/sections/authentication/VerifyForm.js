import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Stack, Button } from "@mui/material";

import FormProvider from "../../components/hook-form/FormProvider";
import CustomCodeTextField from "../../components/hook-form/CustomCodeTextField";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmail } from "../../redux/slices/auth";

export default function VerifyForm() {
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Input is required"),
    code2: Yup.string().required("Input is required"),
    code3: Yup.string().required("Input is required"),
    code4: Yup.string().required("Input is required"),
    code5: Yup.string().required("Input is required"),
    code6: Yup.string().required("Input is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      //   For Backend
      dispatch(
        VerifyEmail({
          email,
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <CustomCodeTextField
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
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
          Verify
        </Button>
      </Stack>
    </FormProvider>
  );
}
