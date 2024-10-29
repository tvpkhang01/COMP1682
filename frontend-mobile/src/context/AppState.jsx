import { useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "./AppContext";
import { appReducer } from "./AppReducer";

const initState = {
  theme: "dark",
  onMenu: false,
  auth: null,
  channel: null,
};

const loadInitialState = async () => {
  try {
    const theme = await AsyncStorage.getItem("theme");
    const auth = await AsyncStorage.getItem("auth");

    return {
      theme: theme ? JSON.parse(theme) : "dark",
      auth: auth ? JSON.parse(auth) : null,
      onMenu: false,
      channel: null,
    };
  } catch (error) {
    console.error("Error loading initial state:", error);
    return initState;
  }
};

const AppState = (props) => {
  const [state, dispatch] = useReducer(appReducer, initState);

  useEffect(() => {
    const initializeState = async () => {
      const initialState = await loadInitialState();
      dispatch({ type: "SET_INITIAL_STATE", payload: initialState });
    };

    initializeState();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state.theme]);

  useEffect(() => {
    AsyncStorage.setItem("auth", JSON.stringify(state.auth));
  }, [state.auth]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const loginAuth = (auth) => {
    dispatch({ type: "LOGIN", payload: auth });
  };

  const logoutAuth = () => {
    dispatch({ type: "LOGOUT" });
  };

  const loadChannelInfos = (channel) => {
    dispatch({ type: "LOAD_CHANNEL_INFOS", payload: channel });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        toggleMenu,
        toggleTheme,
        loginAuth,
        logoutAuth,
        loadChannelInfos,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
