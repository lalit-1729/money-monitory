import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { grey, blue } from "@mui/material/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { fontFamily, typography } from "@mui/system";

const AppThemeProvider = (props) => {
  const [mode, setMode] = React.useState("light");

  const lightMode = {
    primary: {
      main: "#3c1454"
    },
    secondary: {
      main: "#FFFFFF",
      dark: '#FF0000'
    },
    
    divider: grey[300],
    background: {
      home:"#3c1454",
      footer:"#3c1454",
      default: "#DAE0E6",
      primary: grey[50],
      paper: grey[100],
      lightPaper: grey[100],
      lightPaper2: grey[200],
      secondary: blue[700],
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
      sideBorder: grey[300],
      btnText: "#000",
    },

  };

  const darkMode = {
    primary: grey,
    secondary: {
      main: "#FFFFFF"
    },
    divider: grey[300],
    background: {
      home:grey[900],
      footer:grey[700],
      default: grey[900],
      paper: grey[900],
      lightPaper: grey[800],
      lightPaper2: grey[700],
      secondary: blue[700],
    },
    text: {
      primary: grey[50],
      secondary: grey[500],
      sideBorder: grey[800],
      btnText: "#000",
    },
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightMode : darkMode),
    }
  });

  const newtheme = createTheme({
    typography: {
      fontFamily: [
        'Cursive'
      ]
    }
  })

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;
