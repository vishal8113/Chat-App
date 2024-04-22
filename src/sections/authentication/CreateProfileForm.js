import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Alert, Button, Box, Avatar } from "@mui/material";

import FormProvider from "../../components/hook-form/FormProvider";
import CustomTextField from "../../components/hook-form/CustomTextField";

import { useDispatch, useSelector } from "react-redux";
import ProgressBarIntegration from "../../components/ProgressBarIntegration";
import { useState } from "react";
import { saveUserProfile } from "../../redux/slices/auth";

export default function AuthLoginForm() {
  const { isLoading, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const CreateProfileSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    about: Yup.string().required("About is required"),
  });

  const defaultValues = {
    name: "",
    about: "",
  };

  const methods = useForm({
    resolver: yupResolver(CreateProfileSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();
      render.onload = () => {
        setSelectedImage(render.result);
      };
      render.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      // submit data to server
      dispatch(
        saveUserProfile({
          data,
          selectedImage,
          email,
        })
      );
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            accept="image/*"
            id="image-input"
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-input">
            <Avatar
              sx={{ width: 120, height: 120, cursor: "pointer" }}
              src={selectedImage}
              alt="Selected Image"
            />
          </label>
        </Box>
        <CustomTextField name="name" label="Name" />
        <CustomTextField name="about" label="About" />
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
            mt: 3,
          }}
        >
          {isLoading ? "Please wait..." : "Update"}
        </Button>
        {isLoading && <ProgressBarIntegration isLoading={isLoading} />}
      </Box>
    </FormProvider>
  );
}
