import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import StyledBadge from "../StyledBadge";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { pc_current_conversation } = useSelector((state) => state.chat);

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          onClick={() => {
            dispatch(ToggleSidebar());
          }}
          direction={"row"}
          spacing={2}
          sx={{ cursor: "pointer" }}
        >
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={pc_current_conversation?.img}
                alt={pc_current_conversation?.name}
              />
            </StyledBadge>
          </Box>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">
              {pc_current_conversation?.name}
            </Typography>
            <Typography variant="caption">
              {pc_current_conversation?.status}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
          >
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
