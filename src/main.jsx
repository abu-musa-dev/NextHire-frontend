import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; 
import router from "./routes/Routes"; 
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from "./context/DarkModeContext"



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
    <AuthProvider>
      <DarkModeProvider>
      <RouterProvider router={router} />
      </DarkModeProvider>
    </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
