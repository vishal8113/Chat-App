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

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      const name = data.name;
      const about = data.about;
      console.log(email);
      dispatch(saveUserProfile({ name, about, image: selectedImage, email }));
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState("");
  const [file, setFile] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
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
            type="file"
            style={{ display: "none" }}
            id="image-input"
            onChange={handleChange}
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
