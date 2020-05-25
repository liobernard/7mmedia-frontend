import React, { Component } from "react";
import { connect } from "react-redux";

import { signUpForm } from "../actions";

import { CloseButton, ErrorMessage } from "./";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleCloseForm(e) {
    e.preventDefault();
    this.props.hideSignUpForm();
  }

  handleInput(e) {
    e.preventDefault();
    this.props.inputValue(e.target.name, e.target.value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.submitForm();
  }

  render() {
    const {
      signUpForm: {
        signUpFormOn,
        newClient: { name, email, project, message },
        formSending,
        formSent,
        formError,
      },
    } = this.props;

    let buttonText = "Send message";
    if (formSending) {
      buttonText = "Sending...";
    } else if (formSent) {
      buttonText = "Sent!";
    }

    const address = (
      <a
        href="mailto:contact@7mmedia.online"
        style={{ borderBottom: "solid 1px", color: "#ffffff" }}
      >
        contact@7mmedia.online
      </a>
    );

    return (
      <div className={`SignUpForm${signUpFormOn ? " is-active" : ""}`}>
        <div className="CloseButton-container">
          <CloseButton action={this.handleCloseForm} />
        </div>
        {signUpFormOn && formSent && (
          <div className="u-mt">
            <h3 className="u-sf">Message sent!</h3>
            <h4 className="u-sf">We'll reach out to you soon.</h4>
          </div>
        )}
        {signUpFormOn && !formSent && (
          <div className="u-mt">
            <h3 className="u-sf">Send us a message!</h3>
          </div>
        )}
        {signUpFormOn && !formSent && (
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.handleInput}
              placeholder="Enter your name"
              disabled={formSending || formSent ? true : false}
              minLength={1}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={this.handleInput}
              placeholder="Enter your email address"
              disabled={formSending || formSent ? true : false}
              minLength={1}
              required
            />
            <div className="Select">
              <label htmlFor="project">Project</label>
              <select
                name="project"
                value={project}
                onChange={this.handleInput}
                disabled={formSending || formSent ? true : false}
              >
                <option value="">Select a category</option>
                {projectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              rows={5}
              value={message}
              onChange={this.handleInput}
              placeholder={`Provide a few details about yourself, your event/project, services needed, etc.`}
              disabled={formSending || formSent ? true : false}
            />
            <button
              onClick={this.handleFormSubmit}
              disabled={formSending || formSent ? true : false}
              type="submit"
            >
              {buttonText}
            </button>
            {formError && (
              <ErrorMessage>
                Error! Please try again. If the problem persists, please reach
                out to us at {address}.
                <br />
                {formError}
              </ErrorMessage>
            )}
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signUpForm: state.signUpForm,
});

const mapDispatchToProps = (dispatch) => ({
  hideSignUpForm: () => {
    return dispatch(signUpForm.hideSignUpForm());
  },
  inputValue: (name, value) => {
    return dispatch(signUpForm.inputValue(name, value));
  },
  submitForm: () => {
    return dispatch(signUpForm.submitForm());
  },
});

export const projectOptions = [
  "Wedding, entertainment, or special event",
  "Commercial or promotional work",
  "Documentary or artistic project",
  "Other",
];

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
