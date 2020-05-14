import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import { login, resetError } from "../actions/authActions";

import { Main, Page, Section } from "./";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.props.isLoading) return;
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    const { error, isAuthenticated, isLoading, location } = this.props;

    let referrer = this.props.referrer && this.props.referrer.pathname;

    if (isAuthenticated) {
      if (location && location.search) {
        const search = queryString.parse(location.search);

        if (
          search &&
          search["from"] &&
          ["drafts", "add_film", "upload"].includes(search["from"])
        ) {
          referrer = `/${search["from"]}`;
        }
      }

      return <Redirect exact to={referrer !== "/login" ? referrer : "/"} />;
    }

    const buttonText = isLoading ? "Logging in..." : "Login";

    return (
      <Page id="loginPage" title="Login" noCrawl>
        <Main>
          <Section className="Section--login">
            <form onSubmit={this.handleFormSubmit}>
              <div className="FormMessage">
                <h3 className="u-sf u-red">Login</h3>
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={this.handleInput}
                  disabled={isLoading || isAuthenticated ? true : false}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.handleInput}
                  disabled={isLoading || isAuthenticated ? true : false}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={this.handleFormSubmit}
                disabled={isLoading || isAuthenticated ? true : false}
              >
                {buttonText}
              </button>
            </form>
          </Section>
          {!!error && (
            <Section className="Section--error u-sf u-red">
              <p className="u-nm">Error!</p>
              <p>{error}</p>
            </Section>
          )}
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error.error,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  location: state.router.location,
  referrer:
    state.browserHistory.browserHistory[
      state.browserHistory.browserHistory.length - 2
    ],
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    return dispatch(login(username, password));
  },
  resetError: () => {
    return dispatch(resetError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
