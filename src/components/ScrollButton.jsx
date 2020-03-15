import React, { Component } from "react";

import { MyLink } from "./";

export default class ScrollButton extends Component {
  render() {
    return (
      <MyLink active className="ScrollButton">
        SCROLL
        <span className="ScrollButton-animate"><span>|</span></span>
      </MyLink>
    );
  }
}
