import { createTheme } from "@mui/material/styles";
import projectColor from "./project.color.json";

const muiTheme = createTheme({
  palette: {
    primary: Object.assign({}, projectColor.primary),
    textColor: Object.assign({}, projectColor.text),
    backgroundColor: Object.assign({}, projectColor.background),
    boxShadowColor: Object.assign({}, projectColor.boxShadow),
  },
});

export default muiTheme;
