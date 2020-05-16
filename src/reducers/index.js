import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import aboutPageReducer from "./aboutPageReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import browserHistoryReducer from "./browserHistoryReducer";
import errorReducer from "./errorReducer";
import homePageReducer from "./homePageReducer";
import menuReducer from "./menuReducer";
import showreelReducer from "./showreelReducer";
import signUpFormReducer from "./signUpFormReducer";
import videoDetailReducer from "./videoDetailReducer";
import videoListReducer from "./videoListReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    aboutPage: aboutPageReducer,
    alert: alertReducer,
    auth: authReducer,
    browserHistory: browserHistoryReducer,
    error: errorReducer,
    homePage: homePageReducer,
    menu: menuReducer,
    showreel: showreelReducer,
    signUpForm: signUpFormReducer,
    videoDetail: videoDetailReducer,
    videoList: videoListReducer,
  });
