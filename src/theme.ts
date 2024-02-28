import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/montserrat";

const customTheme = extendTheme({
  components: {
    Box: {
      baseStyle: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    Input: {
      variants: {
        focusBorderColor: "none",
      }
    },
  },
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
});

export const theme = extendTheme(customTheme);
