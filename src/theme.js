import { createTheme } from "@mui/material/styles";

const Colors = {
  primary: "#57A06C",
  secondary: "#818181",
  hover: "black",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    action: {
      hover: Colors.hover,
    },
  },
});

export default theme;
