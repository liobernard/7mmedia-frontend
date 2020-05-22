import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../actions/authActions";
import { hideAlert, showAlert } from "../actions/alertActions";

class AutoLogout extends Component {
  constructor(props) {
    super(props);

    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);
  }

  componentDidMount() {
    this.events.forEach((event) => {
      window.addEventListener(event, this.resetTimeout);
    });

    this.setTimeout();
  }

  setTimeout() {
    this.warnTimeout = setTimeout(this.warn, (60 * 15 - 30) * 1000);
    this.logoutTimeout = setTimeout(this.logout, 60 * 15 * 1000);
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    const message =
      "You will be logged out automatically after 30 seconds of inactivity.";
    this.props.showAlert({ message, willLogout: true });
  }

  logout() {
    this.destroy();
    this.props.logout();
  }

  destroy() {
    this.clearTimeout();

    this.events.forEach((event) => {
      window.removeEventListener(event, this.resetTimeout);
    });
  }

  componentWillUnmount() {
    this.destroy();
  }

  render() {
    return (
      <>
        <></>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    return dispatch(logout());
  },
  hideAlert: () => {
    return dispatch(hideAlert());
  },
  showAlert: ({ message, willLogout = false }) => {
    return dispatch(showAlert({ message, willLogout }));
  },
});

export default connect(null, mapDispatchToProps)(AutoLogout);
