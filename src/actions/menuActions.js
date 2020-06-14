import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export const showMenu = () => {
  return dispatch => {
    enableBodyScroll(document.querySelector(".SignUpForm"));
    dispatch({ type: "HIDE_SIGNUP" });
    disableBodyScroll(document.querySelector(".ToggleMenu"));
    dispatch({ type: "SHOW_MENU" });
  };
};

export const hideMenu = () => {
  return dispatch => {
    enableBodyScroll(document.querySelector(".ToggleMenu"));
    dispatch({ type: "HIDE_MENU" });
  };
};
