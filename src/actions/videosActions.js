import request from "superagent";

import { showAlert, hideAlert } from "../actions/alertActions";


const REACT_APP_API_DOMAIN = process.env.REACT_APP_API_DOMAIN;


export const resetVideo = () => {
  return dispatch => {
    dispatch({ type: "RESET_VIDEO" });
  };
};

export const resetVideos = () => {
  return dispatch => {
    dispatch({ type: "RESET_VIDEOS" });
  };
};

export const fetchVideo = slug => {
  return (dispatch, getState) => {
    dispatch({ type: "VIDEO_LOADING" });

    let headers = { "Content-Type": "application/json" };

    const token = getState().auth.token;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const url = `http://${REACT_APP_API_DOMAIN}/videos/${slug}/`;

    return request
      .get(url)
      .set(headers)
      .then(res => {
        return dispatch({ type: "VIDEO_LOADED", video: res.body });
      })
      .catch(err => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        if (err.status === 403 || err.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", error });
        }
        return dispatch({ type: "VIDEO_ERROR", error });
      });
  };
};

export const fetchVideos = (offset = 0, drafts = false) => {
  return (dispatch, getState) => {
    dispatch({ type: "VIDEOS_LOADING" });

    let headers = { "Content-Type": "application/json" };
    let url = `http://${REACT_APP_API_DOMAIN}/videos/?limit=4&offset=${offset}`;

    if (drafts) {
      headers["Authorization"] = `Token ${getState().auth.token}`;
      url = `${url}&published=False`;
    }

    return request
      .get(url)
      .set(headers)
      .then(res => {
        return dispatch({
          type: "VIDEOS_LOADED",
          hasMore: offset + 4 >= res.body.count ? false : true,
          videos: res.body.results
        });
      })
      .catch(err => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        if (err.status === 403 || err.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", error });
        }
        return dispatch({ type: "VIDEOS_ERROR", error });
      });
  };
};

export const createVideo = () => {
  return (dispatch, getState) => {
    dispatch({ type: "VIDEO_CREATING" });

    let headers = { "Content-Type": "application/json" };

    const token = getState().auth.token;
    const data  = getState().videoDetail.form;


    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const url = `http://${REACT_APP_API_DOMAIN}/videos/`;

    return request
      .post(url)
      .set(headers)
      .send(data)
      .then(res => {
        const message = "Created page successfully.";
        dispatch(showAlert({ message }));
        return dispatch({ type: "VIDEO_CREATED" });
      })
      .catch(err => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        const message = `Error: ${error}. Page create was unsuccessful.`;
        dispatch(showAlert({ message }));

        if (err.status === 403 || err.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", error });
        }
        return dispatch({ type: "VIDEO_ERROR", error });
      });
  };
};

export const updateVideo = () => {
  return (dispatch, getState) => {
    dispatch({ type: "VIDEO_UPDATING" });

    let headers = { "Content-Type": "application/json" };

    const token = getState().auth.token;
    const slug  = getState().videoDetail.video.slug;
    const data  = getState().videoDetail.form;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const url = `http://${REACT_APP_API_DOMAIN}/videos/${slug}/`;

    return request
      .put(url)
      .set(headers)
      .send(data)
      .then(res => {
        const message = "Updated page successfully.";
        dispatch(showAlert({ message }));
        dispatch(editOff());
        return dispatch({ type: "VIDEO_UPDATED", video: res.body });
      })
      .catch(err => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        const message = `Error: ${error}. Page update was unsuccessful.`;
        dispatch(showAlert({ message }));

        if (err.status === 403 || err.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", error });
        }
        return dispatch({ type: "VIDEO_ERROR", error });
      });
  };
};

export const deleteVideo = () => {
  return (dispatch, getState) => {
    dispatch({ type: "VIDEO_DELETING" });

    let headers = { "Content-Type": "application/json" };

    const token = getState().auth.token;
    const slug  = getState().videoDetail.video.slug;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const url = `http://${REACT_APP_API_DOMAIN}/videos/${slug}/`;

    return request
      .del(url)
      .set(headers)
      .then(res => {
        const message = "Deleted page successfully.";
        dispatch(showAlert({ message }));
        dispatch(editOff());
        return dispatch({ type: "VIDEO_DELETED" });
      })
      .catch(err => {
        console.error(err);

        let error = err.message;
        if (err && err.response && err.response.text) {
          error = err.response.text;
        }

        if (err.status === 403 || err.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", error });
        }
        return dispatch({ type: "VIDEO_ERROR", error });
      });
  };
};

export const videoError = error => {
  return dispatch => {
    return dispatch({ type: "VIDEO_ERROR", error });
  };
};

export const resetForm = () => {
  return (dispatch, getState) => {
    dispatch(hideAlert());

    const data = getState().videoDetail.video;
    if (!data) {
      return dispatch({ type: "RESET_VIDEO" });
    }
    return dispatch({ type: "RESET_FORM", data });
  };
};

export const editOn = () => {
  return (dispatch, getState) => {
    const video = getState().videoDetail.video;
    dispatch(resetForm(video));
    dispatch({ type: "EDIT_ON" });
  }
};

export const editOff = () => {
  return dispatch => {
    dispatch({ type: "EDIT_OFF" });
  }
};

export const editDetail = (name, value, create=false) => {
  return dispatch => {
    if (create) {
      return dispatch({ type: "EDIT_DETAIL_CREATE", name, value });
    } else {
      return dispatch({ type: "EDIT_DETAIL", name, value });
    }
  }
}

export const editDate = (date, create=false) => {
  return dispatch => {
    if (create) {
      return dispatch({ type: "EDIT_DATE_CREATE", date });
    } else {
      return dispatch({ type: "EDIT_DATE", date });
    }
  }
}
