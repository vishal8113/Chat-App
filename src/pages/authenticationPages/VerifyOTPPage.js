import { Stack, Typography } from "@mui/material";
import VerifyForm from "../../sections/authentication/VerifyForm";

export default function VerifyOTPPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            Sent to email (vishalch822@gmail.com)
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}
