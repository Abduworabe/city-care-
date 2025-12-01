import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyleSheetManager
      shouldForwardProp={(prop) => prop !== "as" && prop !== "forwardedAs"}
    >
      <App />
      <ToastContainer position="top-center" />
    </StyleSheetManager>
  </StrictMode>
);
