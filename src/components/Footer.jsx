import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    let classNames = ["Footer", this.props.className].join(" ");
    const site = (
      <a
        href="https://liobr.dev"
        rel="noopener noreferrer"
        target="_blank"
      >
        © 2020
      </a>
    );

    return (
      <footer className={classNames}>
        <h3 className="u-sf">{site}</h3>
      </footer>
    );
  }
}
