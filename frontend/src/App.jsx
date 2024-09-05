import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";
import Channel from "./pages/channel/Channel";
import Upload from "./pages/upload/Upload";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import ThemeContext from "./context/theme/ThemeContext";
import { useContext } from "react";

function App() {
  const { state } = useContext(ThemeContext);
  console.log(state);
  return (
    <div className={`app ${state?.theme}`}>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/video">
            <Route path=":id" element={<Video />} />
          </Route>
          <Route path="/channel">
            <Route path=":id" element={<Channel />} />
          </Route>
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

