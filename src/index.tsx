import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataStoreContextProvider } from "./utils/DataStoreContext";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <DataStoreContextProvider>
        <App />
      </DataStoreContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
