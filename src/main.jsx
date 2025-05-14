import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider এখানে সঠিকভাবে আমদানি করুন
import router from "./routes/Routes"; // আপনার রাউটার ফাইল

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
