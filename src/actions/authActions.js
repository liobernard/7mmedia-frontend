import request from "superagent";

import { showAlert } from "../actions/alertActions";

const API_URL = process.env.API_URL;

export const login = (username, password) => {
  return (dispatch) => {
    dispatch({ type: "LOGGING_IN" });

    let headers = { "Content-Type": "application/json" };
    const url = `${API_URL}/auth/login/`;

    return request
      .post(url)
      .set(headers)
      .send({ username, password })
      .then((res) => {
        return dispatch({ type: "LOGIN_SUCCESSFUL", data: res.body });
      })
      .catch((err) => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        if (err.status > 500) {
          dispatch({ type: "SERVER_ERROR", error });
        } else if (err.status === 403 || err.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", error });
        } else {
          dispatch({ type: "LOGIN_FAILED", error });
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({ type: "LOGGING_OUT" });

    let headers = { "Content-Type": "application/json" };

    const token = getState().auth.token;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const url = `${API_URL}/auth/logout/`;

    return request
      .post(url)
      .set(headers)
      .send("")
      .then((res) => {
        const message = "You have been logged out successfully.";
        dispatch(showAlert({ message }));
        dispatch({ type: "EDIT_OFF" });
        return dispatch({ type: "LOGOUT_SUCCESSFUL" });
      })
      .catch((err) => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        const message = `Error: ${error}. You have been logged out.`;
        dispatch(showAlert({ message }));
        return dispatch({ type: "LOGOUT_SUCCESSFUL", error });
      });
  };
};

export const resetAuth = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_AUTH" });
  };
};

export const resetError = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_ERROR" });
  };
};
