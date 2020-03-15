const INITIAL_STATE = {
  menuOn: false
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_MENU":
      return { menuOn: true };

    case "HIDE_MENU":
      return { menuOn: false };

    default:
      return state;
  }
};

export default menuReducer;
