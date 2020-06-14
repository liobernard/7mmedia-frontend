import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";

import configureStore from "./store";
import { RootComponent } from "./components";

const { store, history, persistor } = configureStore();

export default () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <RootComponent />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
