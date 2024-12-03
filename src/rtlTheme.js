import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create an RTL cache
export const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
export const rtlTheme = createTheme({
  direction: "rtl",
});

// Define LTR theme
export const ltrTheme = createTheme({
  direction: "ltr",
});
