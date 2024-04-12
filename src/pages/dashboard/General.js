import { Stack, Box } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation.js";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((state) => state.app);
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
          <Conversation />
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
      </Stack>
    </>
  );
};

export default GeneralApp;
