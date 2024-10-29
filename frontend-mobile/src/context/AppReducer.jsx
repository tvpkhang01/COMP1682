export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        onMenu: !state.onMenu,
      };
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: null,
        channel: null,
      };
    case "LOAD_CHANNEL_INFOS":
      return {
        ...state,
        channel: action.payload,
      };
    default:
      return state;
  }
};
