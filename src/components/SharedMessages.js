import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import { X } from "phosphor-react";
const SharedMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant="article">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
