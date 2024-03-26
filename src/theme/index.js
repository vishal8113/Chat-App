import PropTypes from "prop-types";
import { useMemo } from "react";
import useSettings from "../hooks/useSettings";
import palette from "./palette";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { CssBaseline } from "@mui/material";

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { themeMode } = useSettings();

  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
