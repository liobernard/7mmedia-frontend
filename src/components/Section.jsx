import React, { Component } from "react";

export default class Section extends Component {
  render() {
    let classNames = ["Section", this.props.className].join(" ");
    return <section className={classNames}>{this.props.children}</section>;
  }
}
