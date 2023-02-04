import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material";

// this used to take in mode and invert everything for each mode but I see no point. Colors from the palette change during the mode, these are for custom coloring
export const tokens = {
  grey: {
    100: "#303030",
    200: "#444444",
    300: "#8f8f8f",
    400: "#bebebe",
    500: "#eeeeee",
    600: "#f1f1f1",
    700: "#f5f5f5",
    800: "#f8f8f8",
    900: "#ffffff",
  },
  blue: {
    100: "#00111e",
    200: "#00223c",
    300: "#00335a",
    400: "#004478",
    500: "#005596",
    600: "#3377ab",
    700: "#6699c0",
    800: "#99bbd5",
    900: "#ccddea",
  },
  success: {
    100: "#001a0f",
    200: "#00331f",
    300: "#004d2e",
    400: "#00663e",
    500: "#00804d",
    600: "#339971",
    700: "#66b394",
    800: "#99ccb8",
    900: "#cce6db",
  },
  warning: {
    100: "#302808",
    200: "#605010",
    300: "#8f7718",
    400: "#bf9f20",
    500: "#efc728",
    600: "#f2d253",
    700: "#f5dd7e",
    800: "#f9e9a9",
    900: "#fcf4d4",
  },
  danger: {
    100: "#2a0808",
    200: "#551010",
    300: "#7f1818",
    400: "#aa2020",
    500: "#d42828",
    600: "#dd5353",
    700: "#e57e7e",
    800: "#eea9a9",
    900: "#f6d4d4",
  },
};

export const themeSettings = (mode) => {
  const colors = tokens;
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              light: colors.blue[200],
              main: colors.blue[500],
              dark: colors.blue[800],
            },
            info: {
              main: colors.blue[600],
              light: colors.blue[900],
            },
            success: {
              main: colors.success[400],
              light: colors.success[900],
            },
            warning: {
              main: colors.warning[500],
              light: colors.warning[800],
            },
            danger: {
              main: colors.danger[500],
              light: colors.danger[900],
            },
            background: {
              default: colors.blue[200],
              lightPaper: colors.blue[300],
              darkPaper: colors.blue[400],
            },
            text: {
              default: colors.grey[900],
              inverse: colors.grey[100],
            },
          }
        : {
            primary: {
              light: colors.blue[800],
              main: colors.blue[500],
              dark: colors.blue[200],
            },
            info: {
              main: colors.blue[600],
              light: colors.blue[900],
            },
            success: {
              main: colors.success[400],
              light: colors.success[900],
            },
            warning: {
              main: colors.warning[500],
              light: colors.warning[800],
            },
            danger: {
              main: colors.danger[500],
              light: colors.danger[900],
            },
            background: {
              default: colors.grey[900],
              lightPaper: colors.grey[500],
              darkPaper: colors.grey[400],
            },
            text: {
              default: colors.grey[100],
              inverse: colors.grey[900],
            },
          }),
    },
    typography: {
      fontFamily: ["Open Sans", "Helvetica", "Arial", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            height: "fit-content",
          },
        },
      },
    },
  };
};

// context for color mode. ToggleColorMode is empty by default in case the context is consumed outside a provider. The provider is set to colorMode later in app.js, which defines it.
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");

  // in app.js this is set as the provider for the colorModeContext we define above, making this function available to all child components by calling useContext(ColorModeContext).toggleColorMode()
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("mode", newMode);
      },
    }),
    [mode]
  );

  // in app.js, this is set as the provider for the ThemeProvider context provider from mui, which makes our theme settings available throughout the app with the hook useTheme() which has attributes of pallet and mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
