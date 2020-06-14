import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, createMemoryHistory } from "history";

import createRootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["auth", "browserHistory"]
};

export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default (url = "/") => {
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory();

  const reducer = isServer
    ? createRootReducer(history)
    : persistReducer(persistConfig, createRootReducer(history));

  const enhancers = [];

  if (process.env.NODE_ENV === "development" && !isServer) {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    ...enhancers
  );

  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  if (!isServer) { delete window.__PRELOADED_STATE__; }

  const store = createStore(reducer, initialState, composedEnhancers);

  const persistor = persistStore(store);

  if (isServer) {
    return { store, history };
  } else {
    return { store, history, persistor };
  }
};
