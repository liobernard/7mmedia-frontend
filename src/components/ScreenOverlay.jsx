import React, { Component } from "react";
import { connect } from "react-redux";

import { menu, signUpForm } from "../actions";

class ScreenOverlay extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.menuOn) this.props.hideMenu();
    if (this.props.signUpFormOn) this.props.hideSignUpForm();
  }

  render() {
    const {
      className,
      menuOn,
      signUpFormOn,
      alertOn
    } = this.props;
    let classNames = ["ScreenOverlay", className].join(" ");

    return (
      <div 
        className={
          `${classNames}
          ${menuOn || signUpFormOn || alertOn ? "is-active" : ""}
          ${alertOn ? "is-alert" : ""}`
        }
        onClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  alertOn: state.alert.alertOn,
  menuOn: state.menu.menuOn,
  signUpFormOn: state.signUpForm.signUpFormOn,
});

const mapDispatchToProps = dispatch => ({
  hideMenu: () => {
    dispatch(menu.hideMenu());
  },
  hideSignUpForm: () => {
    dispatch(signUpForm.hideSignUpForm());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOverlay);
