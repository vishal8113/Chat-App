import { Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const ReplyMsg = ({ ele }) => {
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
            p={2}
            spacing={3}
            direction={"column"}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {ele.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={ele.incoming ? theme.palette.text : "#fff"}
          >
            {ele.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ReplyMsg;
