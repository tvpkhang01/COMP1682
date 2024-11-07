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

const getTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem("theme");
    return theme ? JSON.parse(theme) : "dark";
  } catch (error) {
    console.error("Error getting theme:", error);
    return "dark";
  }
};

const getAuth = async () => {
  try {
    const auth = await AsyncStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  } catch (error) {
    console.error("Error getting auth:", error);
    return null;
  }
};

const storeTheme = async (value) => {
  try {
    await AsyncStorage.setItem("theme", JSON.stringify(value));
  } catch (error) {
    console.error("Error storing theme:", error);
  }
};

const storeAuth = async (value) => {
  try {
    await AsyncStorage.setItem("auth", JSON.stringify(value));
  } catch (error) {
    console.error("Error storing auth:", error);
  }
};

const AppState = (props) => {
  const [state, dispatch] = useReducer(appReducer, initState);

  useEffect(() => {
    const loadInitialData = async () => {
      const theme = await getTheme();
      const auth = await getAuth();
      dispatch({ type: "SET_THEME", payload: theme });
      dispatch({ type: "LOGIN", payload: auth });
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    storeTheme(state.theme);
  }, [state.theme]);

  useEffect(() => {
    storeAuth(state.auth);
  }, [state.auth]);

  const toggleTheme = () => {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    dispatch({
      type: "SET_THEME",
      payload: newTheme,
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
