import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
// import { withAuth } from "./sections/auth/auth.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query-client.ts";
import { AuthProvider } from "./utils/auth/providers.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// const AppWithAuth = withAuth(App);

root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
