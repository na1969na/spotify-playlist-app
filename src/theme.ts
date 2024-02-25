import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/montserrat';

const customTheme = extendTheme({
  fonts:{
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif"
  }
});

export const theme = extendTheme(customTheme);