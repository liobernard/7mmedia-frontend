export const loadHomeMedia = (media) => {
  return (dispatch) => {
    dispatch({ type: "LOAD_HOME_MEDIA", media });
  };
};

export const loadAboutMedia = (media) => {
  return (dispatch) => {
    dispatch({ type: "LOAD_ABOUT_MEDIA", media });
  };
};

export const resetMedia = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_MEDIA" });
  };
};
