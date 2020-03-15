const INITIAL_STATE = {
  error: null,
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTHENTICATION_ERROR":
    case "LOGIN_FAILED":
    case "LOGOUT_SUCCESSFUL":
    case "SERVER_ERROR":
    case "USER_FAILED":
      return { error: action.error };

    case "RESET_AUTH":
    case "RESET_ERROR":
      return { error: null };

    default:
      return state;
  }
};

export default errorReducer;
