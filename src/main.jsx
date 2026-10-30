import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { useAppStore } from "./store.js"; // Импортируем созданный стор

// Проброс в window только для режима разработки
if (import.meta.env.DEV) {
  Object.assign(window, { useAppStore });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

