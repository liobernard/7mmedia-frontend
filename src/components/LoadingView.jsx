import React, { Component } from "react";

export default class LoadingView extends Component {
  render() {
    const { className, loaded, spinnerOn } = this.props;
    let classNames = ["LoadingView", className].join(" ");

    return (
      <div className={`${classNames}${loaded ? " is-loaded" : ""}`}>
        <div className={`LoadingView-loader${spinnerOn ? " is-spinning" : ""}`} />
      </div>
    );
  }
}
