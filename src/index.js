import React from "react";
import { render, hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import "./scss/_index";

if (module.hot) {
  module.hot.accept();
}

const root = document.getElementById("root");

if (root.hasChildNodes() === true) {
  loadableReady(() => {
    hydrate(<App />, root);
  });
} else {
  render(<App />, root);
}

serviceWorker.register();
