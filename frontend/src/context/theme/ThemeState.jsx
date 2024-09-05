/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";
import ThemeContext from "./ThemeContext";
import { themeReducer } from "./ThemeReducer";

const initState = {
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
  onMenu: false,
  auth: JSON.parse(localStorage.getItem("auth")) || null,
  channel: null,
};

export const ThemeState = (props) => {
  const [state, dispatch] = useReducer(themeReducer, initState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state.theme]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  return (
    <ThemeContext.Provider
      value={{
        state,
        toggleMenu,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
