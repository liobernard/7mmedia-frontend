import React, { Component } from "react";

export default class ErrorMessage extends Component {
  render() {
    const { className, children } = this.props;
    let classNames = ["ErrorMessage", className].join(" ");

    return (
      <span className={classNames}>{children}</span>
    );
  }
};
