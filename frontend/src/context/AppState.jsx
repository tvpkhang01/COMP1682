/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";
import AppContext from "./AppContext";
import { appReducer } from "./AppReducer";

const initState = {
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
  onMenu: false,
  auth: JSON.parse(localStorage.getItem("auth")) || null,
  channel: null,
};

const AppState = (props) => {
  const [state, dispatch] = useReducer(appReducer, initState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state.auth));
  }, [state?.auth]);

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

  const logoutAuth = (auth) => {
    dispatch({ type: "LOGOUT", payload: auth });
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
