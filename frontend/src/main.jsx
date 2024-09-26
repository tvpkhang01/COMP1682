import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AppState from "./context/AppState";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppState>
      <App />
    </AppState>
  </BrowserRouter>
);

