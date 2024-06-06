import { useState } from "react";
import { Stack, Box, IconButton, Avatar, Divider } from "@mui/material";
import { NavButtons_Above_Divider, NavButtons_Below_Divider } from "../../data";
import Users from "../../sections/Dialogs/UserDialog";

import { useTheme } from "@mui/material/styles";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openNotificationsDialog, setOpenNotificationsDialog] = useState(false);
  const navigate = useNavigate();

  const closeUserDialog = () => {
    setOpenUserDialog(false);
    setSelected(1);
  };

  const closeNotificationsDialog = () => {
    setOpenNotificationsDialog(false);
    setSelected(1);
  };
  const theme = useTheme();
  const { onToggleMode } = useSettings();
  const [selected, setSelected] = useState(1);

  const { profileImageUrl } = useSelector((state) => state.auth);
  const getPath = (index) => {
    switch (index) {
      case 1:
        return "/app";

      case 2:
        return "/groups";

      case 3:
        return "/calls";

      case 4:
        return "/settings";

      default:
        return "/app";
    }
  };
  return (
    <>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          justifyContent="space-between"
          sx={{ height: "100%" }}
          spacing={3}
        >
          <Stack alignItems="center" spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5,
              }}
            ></Box>
            <Stack
              sx={{ width: "max-content" }}
              direction="column"
              alignItems="center"
              spacing={3}
            >
              {NavButtons_Above_Divider.map((ele) =>
                ele.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={ele.index}
                    >
                      {ele.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => {
                      setSelected(ele.index);
                      navigate(getPath(ele.index));
                    }}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                    key={ele.index}
                  >
                    {ele.icon}
                  </IconButton>
                )
              )}

              <Divider sx={{ width: "48px" }} />
              {NavButtons_Below_Divider.map((ele) =>
                ele.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={ele.index}
                    >
                      {ele.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => {
                      setSelected(ele.index);
                      switch (ele.index) {
                        case 5:
                          setOpenUserDialog(true);
                          break;

                        case 6:
                          setOpenNotificationsDialog(true);
                          break;

                        default:
                          navigate(getPath(ele.index));
                      }
                    }}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                    key={ele.index}
                  >
                    {ele.icon}
                  </IconButton>
                )
              )}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <AntSwitch
              onChange={() => {
                onToggleMode();
              }}
            />
            <Avatar
              src={profileImageUrl}
              id="basic-button"
              onClick={() => {
                navigate("/profile");
                setSelected(0);
              }}
              sx={{ cursor: "pointer" }}
            />
          </Stack>
        </Stack>
      </Box>
      {openUserDialog && (
        <Users open={openUserDialog} handleClose={closeUserDialog} />
      )}
    </>
  );
};

export default SideBar;
