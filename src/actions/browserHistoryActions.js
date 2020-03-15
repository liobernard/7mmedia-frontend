export const updateHistory = location => {
  return dispatch => {
    dispatch({ type: "UPDATE_HISTORY", location });
  }
};