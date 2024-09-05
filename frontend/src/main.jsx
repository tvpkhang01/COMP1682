import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ThemeState } from "./context/theme/ThemeState.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeState>
      <App />
    </ThemeState>
  </BrowserRouter>
);

