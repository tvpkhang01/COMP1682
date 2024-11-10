import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppContext from "./context/AppContext";
import { checkToken, getChannel } from "./api/Api";

import Home from "./pages/home/Home";
// import Video from "./pages/video/Video";
// import Channel from "./pages/channel/Channel";
// import Upload from "./pages/upload/Upload";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Channel from "./pages/channel/Channel";
import Settings from "./pages/channel/settings/Settings";
import Video from "./pages/video/Video";
// import Settings from "./pages/channel/settings/Settings";
// import Uplist from "./pages/uplist/Uplist";
// import Playlist from "./pages/channel/playlist/Playlist";

const Stack = createStackNavigator();

function App() {
  const { state, loadChannelInfos, logoutAuth } = useContext(AppContext);
  useEffect(() => {
    async function checkTokenData() {
      try {
        const res = await checkToken();
        if (res.status === 200) {
          logoutAuth();
        }
      } catch (error) {
        if (error.status === 404 && state?.auth) {
          console.log("User still authenticated, nothing to do here");
        } else if (error.status === 404) {
          console.log("User is not logged in and token is missing");
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

  const renderScreenWithHeader = (ScreenComponent) => (props) =>
    (
      <>
        <Header />
        <ScreenComponent {...props} />
      </>
    );

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Home" component={renderScreenWithHeader(Home)} />
      <Stack.Screen name="Search" component={renderScreenWithHeader(Search)} />
      <Stack.Screen name="Login" component={renderScreenWithHeader(Login)} />
      <Stack.Screen
        name="Register"
        component={renderScreenWithHeader(Register)}
      />
      <Stack.Screen
        name="Channel"
        component={renderScreenWithHeader(Channel)}
      />
      <Stack.Screen
        name="Settings"
        component={renderScreenWithHeader(Settings)}
      />
      <Stack.Screen name="Video" component={renderScreenWithHeader(Video)} />
    </Stack.Navigator>
  );
}

export default App;
