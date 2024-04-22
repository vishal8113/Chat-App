import React from "react";
import { Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { CloseSnackBar } from "../../redux/slices/app";
import SnackBarIntegration from "../../components/SnackBarIntegration";
import CreateProfileForm from "../../sections/authentication/CreateProfileForm";

const CreateProfilePage = () => {
  const { openSnackBar, snackBarMessage, snackBarSeverity } = useSelector(
    (state) => state.app
  );
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Create Profile</Typography>
        <CreateProfileForm />
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

export default CreateProfilePage;
