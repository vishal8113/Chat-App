import "./index.css";
import { Stack, Box, IconButton, Divider, Switch, Avatar } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { NavButton } from "../../data";
import { useState } from "react";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";

import useSettings from "../../hooks/useSettings";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const DashboardLayout = () => {
  const [selected, setSelected] = useState(0);

  const theme = useTheme();

  const { onToggleMode } = useSettings();

  return (
    <Stack direction="row">
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
          <Stack alignItems="center" spacing={3}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 2,
              }}
            ></Box>
            <Stack
              sx={{ width: "max-content" }}
              direction="column"
              alignItems="center"
              spacing={3}
            >
              {NavButton.map((ele) =>
                ele.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 2,
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

              <Divider sx={{ width: "60px" }} />
              {selected === 3 ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 2,
                  }}
                >
                  <IconButton
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                  >
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(3);
                  }}
                  sx={{
                    width: "max-content",
                  }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <AntSwitch
              onChange={() => {
                onToggleMode();
              }}
              defaultChecked
            />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default DashboardLayout;
