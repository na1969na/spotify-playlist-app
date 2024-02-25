import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataStoreContextProvider } from "./utils/DataStoreContext";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DataStoreContextProvider>
        <App />
      </DataStoreContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
