const INITIAL_STATE = {
  showreelOn: false
};

const showreelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_SHOWREEL":
      return { showreelOn: true };

    case "HIDE_SHOWREEL":
      return { showreelOn: false };

    default:
      return state;
  }
};

export default showreelReducer;
