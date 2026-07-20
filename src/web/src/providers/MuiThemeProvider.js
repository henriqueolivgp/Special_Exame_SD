import { useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeMode } from "../hooks/ThemeHook";

export const MuiThemeProvider = ({ children }) => {
  const { mode } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#6E5BFF" },
          secondary: { main: "#E7A73E" },
          background: {
            default: mode === "dark" ? "#0C0E14" : "#EFEDE6",
            paper: mode === "dark" ? "#161A24" : "#FBFAF6",
          },
        },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily: '"Inter", sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
