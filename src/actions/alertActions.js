import { disableBodyScroll, enableBodyScroll } from "../js/myBodyScrollLock";

export const showAlert = ({
  message,
  isCreate=false,
  isDelete=false,
  isLogout=false,
  isUndo=false,
  isUpdate=false
}) => {
  return dispatch => {
    dispatch(hideAlert());
    disableBodyScroll(document.querySelector(".Alert"));
    dispatch({
      type: "SHOW_ALERT",
      message,
      isCreate,
      isDelete,
      isLogout,
      isUndo,
      isUpdate
    });
  };
};

export const hideAlert = () => {
  return dispatch => {
    enableBodyScroll(document.querySelector(".Alert"));
    dispatch({ type: "HIDE_ALERT" });
  };
};
