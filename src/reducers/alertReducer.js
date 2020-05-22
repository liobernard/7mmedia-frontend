const INITIAL_STATE = {
  alertOn: false,
  willCreate: false,
  willDelete: false,
  willLogout: false,
  willUpdate: false,
  willUndo: false,
  message: "",
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        alertOn: true,
        message: action.message,
        willCreate: action.willCreate,
        willDelete: action.willDelete,
        willLogout: action.willLogout,
        willUpdate: action.willUpdate,
        willUndo: action.willUndo,
      };

    case "HIDE_ALERT":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default alertReducer;
