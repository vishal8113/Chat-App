import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const ImageMsg = ({ ele }) => {
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
        <Stack spacing={1}>
          <img
            src={ele.img}
            alt={ele.message}
            style={{ maxHeight: 210, borderRadius: 10 }}
          />
          <Typography
            variant="body2"
            color={ele.incoming ? theme.palette.text : "#fff"}
          >
            {ele.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ImageMsg;
