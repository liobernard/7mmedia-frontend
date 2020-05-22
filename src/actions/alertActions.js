import { disableBodyScroll, enableBodyScroll } from "../js/myBodyScrollLock";

export const showAlert = ({
  message,
  willCreate = false,
  willDelete = false,
  willLogout = false,
  willUndo = false,
  willUpdate = false,
}) => {
  return (dispatch) => {
    dispatch(hideAlert());
    disableBodyScroll(document.querySelector(".Alert"));
    dispatch({
      type: "SHOW_ALERT",
      message,
      willCreate,
      willDelete,
      willLogout,
      willUndo,
      willUpdate,
    });
  };
};

export const hideAlert = () => {
  return (dispatch) => {
    enableBodyScroll(document.querySelector(".Alert"));
    dispatch({ type: "HIDE_ALERT" });
  };
};
