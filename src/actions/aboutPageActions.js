import request from "superagent";

const REACT_APP_API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const handleError = (err) => {
  return (dispatch) => {
    console.error(err);

    let error = err.message;
    if (err && err.response && err.response.text) {
      error = err.response.text;
    }

    if (err.status === 403 || err.status === 401) {
      dispatch({ type: "AUTHENTICATION_ERROR", error });
    }
    dispatch({ type: "ABOUTPAGE_ERROR", error });
    throw err;
  };
};

export const fetchAboutInfo = () => {
  return (dispatch) => {
    dispatch({ type: "ABOUT_INFO_LOADING" });

    const headers = { "Content-Type": "application/json" };
    const aboutInfoUrl = `${REACT_APP_API_DOMAIN}/info/about/`;

    return request
      .get(aboutInfoUrl)
      .set(headers)
      .then((res) => {
        dispatch({ type: "ABOUT_INFO_LOADED", aboutInfo: res.body });
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};
