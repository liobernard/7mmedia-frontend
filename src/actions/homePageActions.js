import request from "superagent";

const API_URL = process.env.API_URL;

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
    dispatch({ type: "HOMEPAGE_ERROR", error });
    throw err;
  };
};

export const fetchHomeInfo = () => {
  return (dispatch) => {
    dispatch({ type: "HOME_INFO_FETCHING" });

    const headers = { "Content-Type": "application/json" };

    const homeInfoUrl = `${API_URL}/info/home/`;
    let latestUrl = `${API_URL}/videos/?limit=2&published=True&exclude=`;

    let fetchInfoResolveFeatured = new Promise((resolve) => {
      request
        .get(homeInfoUrl)
        .set(headers)
        .then((res) => {
          dispatch({ type: "HOME_INFO_FETCHED", homeInfo: res.body });
          const featured = res.body.featured_video;
          resolve(featured);
        })
        .catch((err) => {
          dispatch(handleError(err));
        });
    });

    fetchInfoResolveFeatured.then((featured) => {
      dispatch({ type: "LATEST_FETCHING" });
      latestUrl = `${latestUrl}${featured.slug}`;

      return request
        .get(latestUrl)
        .set(headers)
        .then((res) => {
          return dispatch({
            type: "LATEST_FETCHED",
            latest: res.body.results,
          });
        })
        .catch((err) => {
          dispatch(handleError(err));
        });
    });
  };
};
