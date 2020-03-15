import React, { Component } from "react";

export default class Button extends Component {
  render() {
    const { action, className, disabled, title, type } = this.props;
    let classNames = ["Button", className].join(" ");

    return (
      <button
        className={classNames}
        onClick={action}
        disabled={disabled}
        type={type}
      >
        {title}
      </button>
    );
  }
};

