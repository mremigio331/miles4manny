// index.js
import * as React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AWS from "aws-sdk";
import { ChakraProvider } from "@chakra-ui/react";

import Miles4Manny from "./miles4manny";
import ApiProvider from "./providers/ApiProvider";

import { Miles4MannyWorkoutsProvider } from "./providers/Miles4MannyWorkoutsProvider";

const queryClient = new QueryClient();

AWS.config.update({
  region: "us-west-2",
});

// Optional minimal reset if you don't have a CSS file
const style = document.createElement("style");
style.innerHTML = `
  html, body, #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <ApiProvider>
        <Miles4MannyWorkoutsProvider>
          <Miles4Manny />
        </Miles4MannyWorkoutsProvider>
      </ApiProvider>
    </ChakraProvider>
  </QueryClientProvider>,
);
