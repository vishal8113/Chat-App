import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CircleDashed, MagnifyingGlass, ArchiveBox } from "phosphor-react";
import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
} from "../../components/search";
import ChatElement from "../../components/ChatElement";
import { ChatList } from "../../data";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { socket } from "../../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchPersonalConversations } from "../../redux/slices/chat";
const Chats = () => {
  const theme = useTheme();
  const user_id = window.localStorage.getItem("user_id");

  const dispatch = useDispatch();

  const { pc_conversations } = useSelector((state) => state.chat);

  useEffect(() => {
    socket.emit("getAllPersonalConversations", { user_id }, (data) => {
      // data => list of conversations

      dispatch(FetchPersonalConversations({ conversations: data }));
    });
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack sx={{ maxHeight: "100vh" }} spacing={2} p={3}>
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Typography variant="h5">Chats</Typography>
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <IconButton sx={{ width: "max-content" }}>
              <CircleDashed />
            </IconButton>
          </Stack>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
            <ArchiveBox size={24} />
            <Button variant="text">Archived</Button>
          </Stack>
          <Divider />
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            flexGrow: 1,
            overflow: "scroll",
            height: "100%",
            overflowX: "hidden",
          }}
        >
          {/* <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              Pinned
            </Typography>
            {ChatList.filter((ele) => ele.pinned).map((ele) => {
              return <ChatElement {...ele} />;
            })}
          </Stack> */}
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              All Chats
            </Typography>
            {pc_conversations
              .filter((ele) => !ele.pinned)
              .map((ele) => {
                return <ChatElement {...ele} />;
              })}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
