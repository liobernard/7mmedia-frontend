import React, { Component } from "react";
import { connect } from "react-redux";

import { signUpForm } from "../actions";

class SignUpButton extends Component {
  render() {
    const { className, showSignUpForm } = this.props;
    let classNames = ["SignUpButton", className].join(" ");

    return (
      <h6 className={classNames}>
        <span onClick={showSignUpForm} onKeyPress={showSignUpForm}>
          Sign up now
        </span>
      </h6>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showSignUpForm: () => {
    dispatch(signUpForm.showSignUpForm());
  }
});

export default connect(null, mapDispatchToProps)(SignUpButton);
