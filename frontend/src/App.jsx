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
import { checkToken, getChannel } from "./api/Api";
import Search from "./pages/search/Search";
import Settings from "./pages/channel/settings/Settings";
import Admin from "./pages/admin/Admin";
import Uplist from "./pages/uplist/Uplist";
import Playlist from "./pages/channel/playlist/Playlist";

function App() {
  const { state, loadChannelInfos, logoutAuth } = useContext(AppContext);

  console.log(state);

  useEffect(() => {
    async function checkTokenData() {
      try {
        const res = await checkToken();
        if (res.status === 200) {
          logoutAuth();
        }
      } catch (error) {
        if (error.status == 404 && state?.auth) {
          console.log("User still authenticated, nothing to do here");
        } else if (error.status == 404) {
          console.log(
            "User is not logging and token is not here, nothing to do here"
          );
        } else {
          console.log("Other error: " + error);
        }
      }
    }
    checkTokenData();
  }, []);

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
              <Route path="playlist/:playlistId" element={<Playlist />} />
            </Route>
          </Route>
          <Route path="/upload" element={<Upload />} />
          <Route path="/uplist" element={<Uplist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
