import { styled } from "@mui/material/styles";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.background.paper
      : theme.palette.background.default,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

export default Search;
