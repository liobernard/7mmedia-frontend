const INITIAL_STATE = {
  homeInfo: {},
  homeInfoLoading: false,
  latest: [],
  latestLoading: false,
  fetchError: null,
};

const homePageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "HOME_INFO_LOADING":
      return {
        ...state,
        homeInfoLoading: true,
      };

    case "LATEST_LOADING":
      return {
        ...state,
        latestLoading: true,
      };

    case "HOME_INFO_LOADED":
      return {
        ...state,
        homeInfoLoading: false,
        homeInfo: action.homeInfo,
      };

    case "LATEST_LOADED":
      return {
        ...state,
        latestLoading: false,
        latest: action.latest,
      };

    case "HOMEPAGE_ERROR":
      return {
        ...state,
        homeInfoLoading: false,
        latestLoading: false,
        fetchError: action.error,
      };

    case "CLOSE_HOME":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default homePageReducer;
