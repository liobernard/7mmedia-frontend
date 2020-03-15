import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MyLink extends Component {
  render() {
    const {
      active,
      basic,
      children,
      hash,
      pathname,
      search,
      state
    } = this.props;
    let classNames = ["Link", this.props.className].join(" ");

    if (active) {
      if (basic) {
        return <a className={classNames} href={pathname}>{children}</a>;
      } else {
        return (
          <Link
            className={classNames}
            to={{
              pathname: pathname,
              hash: hash,
              search: search,
              state: state
            }}
          >
            {children}
          </Link>
        );
      }
    }
    return children;
  }
}
