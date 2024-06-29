import { Stack, Box, Typography } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation.js";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";

import logo from "../../Assets/Images/talkingBirds.png";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chat_type, room_id } = useSelector((state) => state.app);
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
          }}
        >
          {room_id !== null && chat_type === "individual" ? (
            <Conversation />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img src={logo} alt="logo" width={280} height={250} />
              <Typography variant="body">Welcome to Chit Chat</Typography>
            </Stack>
          )}
        </Box>
        {/* {sidebar.open &&
          // (() => {
          //   switch (sidebar.sectionType) {
          //     case "CONTACT":
          //       return <Contact />;
          //     case "STARRED":
          //       break;
          //     case "SHARED":
          //       return <SharedMessages />;

          //     default:
          //       break;
          //   }
          // })()} */}

        {sidebar.open && <Contact />}

        {/* {sidebar.open &&
          (() => {
            switch (sidebar.sectionType) {
              case "CONTACT":
                return <Contact />;
              case "MEDIA":
                return <SharedMessages />;

              default:
                break;
            }
          })()} */}
      </Stack>
    </>
  );
};

export default GeneralApp;
