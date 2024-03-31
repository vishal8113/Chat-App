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
const Chats = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 300,
        backgroundColor: "#F8FAFF",
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
      </Stack>
    </Box>
  );
};

export default Chats;
