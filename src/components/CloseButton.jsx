import React, { Component } from "react";

export default class CloseButton extends Component {
  render() {
    const { action, className } = this.props;
    let classNames = ["CloseButton", className].join(" ");

    return (
      <div className={classNames} onClick={action} onKeyPress={action}>
        <div className="CloseButton-line CloseButton-line--line1"></div>
        <div className="CloseButton-line CloseButton-line--line2"></div>
      </div>
    );
  }
}
