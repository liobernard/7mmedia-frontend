const INITIAL_STATE = {
  browserHistory: []
};

const browserHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_HISTORY":
      return {
        browserHistory: [
          ...state.browserHistory,
          action.location
        ]
      };

    default:
      return state;
  }
};

export default browserHistoryReducer;
