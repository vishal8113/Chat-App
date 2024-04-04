import { Stack, Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DownloadSimple, Image } from "phosphor-react";
import MessageOptions from "../MessageOptions";
const DocMsg = ({ ele }) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: ele.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            p={2}
            spacing={3}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: ele.incoming ? theme.palette.text : "#fff" }}
          >
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

export default DocMsg;
