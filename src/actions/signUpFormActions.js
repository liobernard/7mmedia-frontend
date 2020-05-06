import request from "superagent";
import validate from "validator/lib/escape";
import trim from "validator/lib/trim";

import { disableBodyScroll, enableBodyScroll } from "../js/myBodyScrollLock";

import { isEmailValid } from "../js/utils";

const REACT_APP_API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

export const showSignUpForm = () => {
  return (dispatch) => {
    enableBodyScroll(document.querySelector(".ToggleMenu"));
    dispatch({ type: "HIDE_MENU" });
    disableBodyScroll(document.querySelector(".SignUpForm"));
    dispatch({ type: "SHOW_SIGNUP" });
  };
};

export const hideSignUpForm = () => {
  return (dispatch) => {
    enableBodyScroll(document.querySelector(".SignUpForm"));
    dispatch({ type: "HIDE_SIGNUP" });
  };
};

export const inputValue = (name, value) => {
  return (dispatch) => {
    dispatch({ type: "INPUT_VALUE", name, value });
  };
};

export const submitForm = () => {
  return (dispatch, getState) => {
    if (getState().signUpForm.formSending) return;

    dispatch({ type: "RESET_SIGNUP_ERROR" });

    const clientData = getState().signUpForm.newClient;
    const cleanedData = {
      name: validate(trim(clientData.name)),
      email: validate(trim(clientData.email)),
      project: validate(trim(clientData.project)),
      message: validate(trim(clientData.message)),
    };

    if (
      !isEmailValid(cleanedData.email) ||
      !cleanedData.name ||
      !cleanedData.project ||
      !cleanedData.message
    ) {
      return dispatch({
        type: "FORM_ERROR",
        error: "Make sure all fields are entered and valid.",
      });
    }

    dispatch({ type: "FORM_SENDING" });

    return request
      .post(`${REACT_APP_API_DOMAIN}/email/signup_form/`)
      .type("application/json")
      .send(cleanedData)
      .then((res) => {
        return dispatch({ type: "FORM_SUCCESSFUL" });
      })
      .catch((err) => {
        console.error(err);
        let error = err.message;
        return dispatch({ type: "FORM_ERROR", error });
      });
  };
};
