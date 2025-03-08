import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient, persister } from "./providers/queryClient.js";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { UserProvider } from "./context/UserProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistQueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
