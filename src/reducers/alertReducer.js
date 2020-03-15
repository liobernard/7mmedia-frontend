const INITIAL_STATE = {
  alertOn: false,
  isCreate: false,
  isDelete: false,
  isLogout: false,
  isUpdate: false,
  isUndo: false,
  message: ""
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        alertOn: true,
        message: action.message,
        isCreate: action.isCreate,
        isDelete: action.isDelete,
        isLogout: action.isLogout,
        isUpdate: action.isUpdate,
        isUndo: action.isUndo
      };

    case "HIDE_ALERT":
      return INITIAL_STATE;

    default:
      return state;
  }}

export default alertReducer;
