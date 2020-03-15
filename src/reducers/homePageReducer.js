const INITIAL_STATE = {
  featured: {},
  latest: [],
  featuredLoading: false,
  latestLoading: false,
  fetchError: null,
  bannerLoaded: false,
  bannerError: false,
};

const homePageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FEATURED_LOADING":
      return {
        ...state,
        featuredLoading: true
      };

    case "LATEST_LOADING":
      return {
        ...state,
        latestLoading: true
      };

    case "FEATURED_LOADED":
      return {
        ...state,
        featuredLoading: false,
        featured: action.featured
      }

    case "LATEST_LOADED":
      return {
        ...state,
        latestLoading: false,
        latest: action.latest
      }

    case "HOMEPAGE_ERROR":
      return {
        ...state,
        featuredLoading: false,
        latestLoading: false,
        fetchError: action.err
      }

    case "LOAD_BANNER":
      return {
        ...state,
        bannerLoaded: true
      };

    case "ERROR_BANNER":
      return {
        ...state,
        bannerLoaded: false,
        bannerError: true
      };

    case "CLOSE_HOME":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default homePageReducer;
