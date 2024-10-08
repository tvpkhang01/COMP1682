/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";
import Channel from "./pages/channel/Channel";
import Upload from "./pages/upload/Upload";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import AppContext from "./context/AppContext";
import { useContext, useEffect } from "react";
import { getChannel } from "./api/Api";
import Search from "./pages/search/Search";
import Settings from "./pages/channel/settings/Settings";
import Admin from "./pages/admin/Admin";

function App() {
  const { state, loadChannelInfos } = useContext(AppContext);

  useEffect(() => {
    getChannelInfos();
  }, [state?.auth]);

  const getChannelInfos = async () => {
    if (!state?.auth) return;
    try {
      const res = await getChannel(state.auth.id);
      if (res.status === 200) {
        loadChannelInfos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(state);
  return (
    <div className={`app ${state?.theme}`}>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/admin">
            <Route index element={<Admin />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/video">
            <Route path=":id" element={<Video />} />
          </Route>
          <Route path="/channel">
            <Route path=":id">
              <Route index element={<Channel />} />
              <Route path="settings" element={<Settings />} />
            </Route>
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
