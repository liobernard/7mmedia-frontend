const INITIAL_STATE = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGGING_IN":
    case "LOGGING_OUT":
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true
      };

    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.user
      };

    case "LOGIN_SUCCESSFUL":
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        isLoading: false
      };

    case "SERVER_ERROR":
      return {
        ...state,
        isLoading: false
      };

    case "AUTHENTICATION_ERROR":
    case "LOGIN_FAILED":
    case "USER_FAILED":
    case "LOGOUT_SUCCESSFUL":
    case "RESET_AUTH":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default authReducer;
