import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import BiologyExam from "./BiologyExam.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BiologyExam />
  </StrictMode>,
);
