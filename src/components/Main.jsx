import React, { Component } from "react";

export default class Main extends Component {
  render() {
    let classNames = ["Main", this.props.className].join(" ");
    return <main className={classNames}>{this.props.children}</main>;
  }
}
