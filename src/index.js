import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Your main App component

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create a root using createRoot
const root = createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
