const INITIAL_STATE = {
  homePage: {
    banner: false,
    logo: false,
    featuredThumbnail: false,
    featuredVideo: false,
    latest1: false,
    latest2: false,
  },
  aboutPage: {
    image: false,
    showreel: false,
  },
};

const mediaLoadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOAD_HOME_MEDIA":
      return {
        ...state,
        homePage: {
          ...state.homePage,
          [action.media]: true,
        },
      };

    case "LOAD_ABOUT_MEDIA":
      return {
        ...state,
        aboutPage: {
          ...state.aboutPage,
          [action.media]: true,
        },
      };

    case "RESET_MEDIA":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default mediaLoadReducer;
