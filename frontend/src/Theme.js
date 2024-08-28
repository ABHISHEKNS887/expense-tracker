import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#EE6F73",
      contrastText: "#FFF",
      dark: "#ed4d52",
      light: "#f7e4e4",
    },
    secondary: {
      main: "#2C3D4F",
      light: "#f5f7ff", //blueGrey[50]
    },
    error: {
      main: red[700],
    },
  },
  typography: {
    fontFamily: [
      '"sofia-pro"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

theme.palette.text = {
  ...theme.palette.text,
  ...{ primary: "#222", secondary: "#999999" },
};

theme.components.MuiButton = {
  ...theme.components.MuiButton,
  styleOverrides: {
    root: {
      fontWeight: 700,
    },
    contained: {
      backgroundColor: "#EE6F73",
      color: "#FFF",
      "&:hover": {
        backgroundColor: `${theme.palette.primary.dark}`,
      },
    },
    outlined: {
      border: `1px solid #EE6F73`,
    },
  },
};

theme.components.MuiTooltip = {
  ...theme.components.MuiTooltip,
  styleOverrides: {
    tooltip: {
      backgroundColor: "#2c3e50",
      color: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: theme.typography.body2.fontSize,
      fontFamily: "sofia-pro",
      fontWeight: 600,
      padding: theme.spacing(0.5, 1.2),
      opacity: 0.5,
    },
    arrow: {
      color: "#2c3e50",
    },
  },
};

export default theme;
