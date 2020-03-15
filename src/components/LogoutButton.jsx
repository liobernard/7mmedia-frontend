import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../actions/authActions";

class LogoutButton extends Component {
  render() {
    const { className, isLoading, logout } = this.props;
    let classNames = ["LogoutButton", className].join(" ");

    return (
      <div className={classNames} onClick={logout}>
        <span className="u-sf">{isLoading ? "Logging out" : "Logout"}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    return dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
