import React from "react";
import { render, hydrate } from "react-dom";
import Loadable from "react-loadable";

import App from "./App";
import "./App.scss";

const root = document.getElementById("root");

if (root.hasChildNodes() === true) {
  Loadable.preloadReady().then(() => {
    hydrate(<App />, root);
  });
} else {
  render(<App />, root);
}
