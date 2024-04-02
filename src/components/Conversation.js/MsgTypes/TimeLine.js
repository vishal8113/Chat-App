import { Divider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const TimeLine = ({ ele }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {ele.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

export default TimeLine;
