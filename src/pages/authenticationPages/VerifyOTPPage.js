import { Stack, Typography } from "@mui/material";
import VerifyForm from "../../sections/authentication/VerifyForm";
import { useSelector } from "react-redux";

export default function VerifyOTPPage() {
  const { email } = useSelector((state) => state.auth);
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Sent email to {email}</Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}
