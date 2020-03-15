const INITIAL_STATE = {
  signUpFormOn: false,
  newClient: {
    name: "",
    email: "",
    project: "",
    message: ""
  },
  formError: null,
  formSending: false,
  formSent: false,
};

const signUpFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_SIGNUP":
      return {
        ...state,
        signUpFormOn: true
      };

    case "HIDE_SIGNUP":
      return INITIAL_STATE;

    case "INPUT_VALUE":
      return {
        ...state,
        newClient: {
          ...state.newClient,
          [action.name]: action.value
        }
      };

    case "FORM_SENDING":
      return {
        ...state,
        formSending: true
      };

    case "FORM_SUCCESSFUL":
      return {
        ...state,
        formSending: false,
        formSent: true
      };

    case "FORM_ERROR":
      return {
        ...state,
        formError: action.error,
        formSending: false,
        formSent: false
      };

    case "RESET_SIGNUP_ERROR":
      return {
        ...state,
        formError: null
      }

    default:
      return state;
  }
};

export default signUpFormReducer;
