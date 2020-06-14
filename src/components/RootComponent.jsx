import React, { Component } from "react";
import { connect } from "react-redux";

import { alert, browserHistory, menu, showreel, signUpForm } from "../actions";

import routes from "../routes";

import {
  Alert,
  AutoLogout,
  Footer,
  Routes,
  ScreenOverlay,
  ScrollToTop,
  Showreel,
  SignUpForm,
  ToggleMenu,
} from "./";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(e) {
    if (e.keyCode === 27) {
      if (this.props.alertOn) this.props.hideAlert();
      if (this.props.menuOn) this.props.hideMenu();
      if (this.props.showreelOn) this.props.hideShowreel();
      if (this.props.signUpFormOn) this.props.hideSignUpForm();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    this.props.updateHistory(this.props.location);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <ScrollToTop>
        <div className="SiteContainer">
          {isAuthenticated && <AutoLogout />}
          <ToggleMenu isAuthenticated={isAuthenticated} routes={routes} />
          <ScreenOverlay />
          <Alert />
          <Showreel />
          <SignUpForm />
          <Routes isAuthenticated={isAuthenticated} />
          <Footer />
        </div>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = (state) => ({
  alertOn: state.alert.alertOn,
  isAuthenticated: state.auth.isAuthenticated,
  location: state.router.location,
  menuOn: state.menu.menuOn,
  showreelOn: state.showreel.showreelOn,
  signUpFormOn: state.signUpForm.signUpFormOn,
});

const mapDispatchToProps = (dispatch) => ({
  updateHistory: (location) => {
    dispatch(browserHistory.updateHistory(location));
  },
  hideAlert: () => {
    dispatch(alert.hideAlert());
  },
  hideMenu: () => {
    dispatch(menu.hideMenu());
  },
  hideShowreel: () => {
    dispatch(showreel.hideShowreel());
  },
  hideSignUpForm: () => {
    dispatch(signUpForm.hideSignUpForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
