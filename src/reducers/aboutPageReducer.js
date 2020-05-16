const INITIAL_STATE = {
  aboutInfo: {},
  aboutInfoLoading: false,
  fetchError: null,
};

const aboutPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ABOUT_INFO_LOADING":
      return {
        ...state,
        aboutInfoLoading: true,
      };

    case "ABOUT_INFO_LOADED":
      return {
        ...state,
        aboutInfoLoading: false,
        aboutInfo: action.aboutInfo,
      };

    case "ABOUTPAGE_ERROR":
      return {
        ...state,
        aboutInfoLoading: false,
        fetchError: action.error,
      };

    default:
      return state;
  }
};

export default aboutPageReducer;
