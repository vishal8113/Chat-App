import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MessageOptions from "../MessageOptions";

const TextMsg = ({ ele }) => {
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
        <Typography
          variant="body2"
          color={ele.incoming ? theme.palette.txt : "#fff"}
        >
          {ele.message}
        </Typography>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

export default TextMsg;
