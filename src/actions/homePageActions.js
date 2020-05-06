import request from "superagent";

const REACT_APP_API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

export const fetchHomePage = () => {
  return (dispatch) => {
    dispatch({ type: "FEATURED_LOADING" });

    let headers = { "Content-Type": "application/json" };

    const featuredUrl = `${REACT_APP_API_DOMAIN}/videos/?featured=True&published=True&limit=1`;
    const noFeaturedUrl = `${REACT_APP_API_DOMAIN}/videos/?limit=1&published=True`;
    let latestUrl = `${REACT_APP_API_DOMAIN}/videos/?limit=2&published=True&exclude=`;

    let fetchFeatured = new Promise((resolve) => {
      request
        .get(featuredUrl)
        .set(headers)
        .then((res) => {
          const featured = res.body.results[0];

          if (!featured || !featured.slug) {
            request
              .get(noFeaturedUrl)
              .set(headers)
              .then((res) => {
                const noFeatured = res.body.results[0];
                dispatch({ type: "FEATURED_LOADED", featured: noFeatured });
                resolve(noFeatured);
              })
              .catch((err) => {
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
              });
          } else {
            dispatch({ type: "FEATURED_LOADED", featured });
            resolve(featured);
          }
        })
        .catch((err) => {
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
        });
    });

    fetchFeatured.then((featured) => {
      dispatch({ type: "LATEST_LOADING" });
      latestUrl = `${latestUrl}${featured.slug}`;

      return request
        .get(latestUrl)
        .set(headers)
        .then((res) => {
          return dispatch({
            type: "LATEST_LOADED",
            latest: res.body.results,
          });
        })
        .catch((err) => {
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
        });
    });
  };
};

export const closeHomePage = () => {
  return (dispatch) => {
    dispatch({ type: "CLOSE_HOME" });
  };
};
