const INITIAL_STATE = {
  homeInfo: {},
  homeInfoFetching: false,
  latest: [],
  latestFetching: false,
  fetchError: null,
};

const homePageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "HOME_INFO_FETCHING":
      return {
        ...state,
        homeInfoFetching: true,
      };

    case "LATEST_FETCHING":
      return {
        ...state,
        latestFetching: true,
      };

    case "HOME_INFO_FETCHED":
      return {
        ...state,
        homeInfoFetching: false,
        homeInfo: action.homeInfo,
      };

    case "LATEST_FETCHED":
      return {
        ...state,
        latestFetching: false,
        latest: action.latest,
      };

    case "HOMEPAGE_ERROR":
      return {
        ...state,
        homeInfoFetching: false,
        latestFetching: false,
        fetchError: action.error,
      };

    case "CLOSE_HOME":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default homePageReducer;
