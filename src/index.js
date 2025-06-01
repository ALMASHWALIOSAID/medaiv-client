import React from "react";
import ReactDOM from "react-dom/client";
import process from "process"; // ✅ polyfill for process
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Attach polyfill to globalThis so process is available
window.process = process;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
