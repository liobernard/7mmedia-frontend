import request from "superagent";
import trim from "validator/lib/trim";

import { disableBodyScroll, enableBodyScroll } from "../js/myBodyScrollLock";

import { validate, isEmailValid } from "../js/utils";
import { projectOptions } from "../components/SignUpForm.jsx";

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
    const testData = {
      name: validate(clientData.name),
      email: validate(clientData.email, true),
      project: validate(clientData.project, true),
      message: trim(clientData.message),
    };

    if (testData.name !== clientData.name) {
      return dispatch({
        type: "FORM_ERROR",
        error: "Invalid name provided.",
      });
    } else if (
      testData.email !== clientData.email ||
      !isEmailValid(clientData.email)
    ) {
      return dispatch({
        type: "FORM_ERROR",
        error: "Invalid email provided.",
      });
    } else if (
      testData.project !== clientData.project ||
      !projectOptions.includes(clientData.project)
    ) {
      return dispatch({
        type: "FORM_ERROR",
        error: "Invalid project selected.",
      });
    } else if (!testData.message) {
      return dispatch({
        type: "FORM_ERROR",
        error: "Invalid message",
      });
    }

    const validatedData = {
      name: trim(testData.name),
      email: trim(testData.email),
      project: trim(testData.project),
      message: validate(testData.message),
    };

    dispatch({ type: "FORM_SENDING" });

    return request
      .post(`${REACT_APP_API_DOMAIN}/email/signup_form/`)
      .type("application/json")
      .send(validatedData)
      .then((res) => {
        return dispatch({ type: "FORM_SUCCESSFUL" });
      })
      .catch((err) => {
        console.error(err);
        let error = err.response.text;
        return dispatch({ type: "FORM_ERROR", error });
      });
  };
};
