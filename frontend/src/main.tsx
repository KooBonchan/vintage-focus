import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CssBaseline } from "@mui/material";
import AppTheme from "./theme/AppTheme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <AppTheme>
        <CssBaseline enableColorScheme />
        <App />
      </AppTheme>
    </BrowserRouter>
  </StrictMode>
);
