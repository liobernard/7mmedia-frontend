const INITIAL_STATE = {
  error: null,
  hasMore: true,
  isLoading: true,
  isAdding: false,
  videos: [],
};

const videoListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "VIDEOS_LOADING":
      return {
        ...state,
        isLoading: true
      };

    case "VIDEO_ADDING":
      return {
        ...state,
        isAdding: true
      };

    case "VIDEOS_LOADED":
      return {
        ...state,
        hasMore: action.hasMore,
        isLoading: false,
        videos: [...state.videos, ...action.videos]
      };

    case "VIDEO_ADDED":
      return {
        ...state,
        isAdding: false
      };

    case "VIDEOS_ERROR":
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    case "RESET_VIDEOS":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default videoListReducer;
