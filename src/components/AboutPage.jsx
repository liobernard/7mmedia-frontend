import React, { Component } from "react";
import { connect } from "react-redux";

import { aboutPage, showreel, signUpForm } from "../actions";
import { addClass, removeClass, recursiveCheck } from "../js/utils";

import { LoadingView, Main, MyLink, Page, ResponsiveImage, Section } from "./";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageError: false,
      loadingDelay: false,
    };
  }

  componentDidMount() {
    this.props.fetchAboutInfo();

    addClass(document.body, "is-loading");
    this.checkImageLoading();

    setTimeout(() => {
      if (!this.state.imageLoaded) {
        this.setState({ loadingDelay: true });
      }
    }, 200);
  }

  checkImageLoading() {
    const imageReady = () => {
      const image = document.getElementById("aboutImg");
      return !!image && !!image.style.backgroundImage ? true : false;
    };

    const loadImage = () => {
      removeClass(document.body, "is-loading");
      this.setState({ imageLoaded: true });
    };

    const errorImage = () => {
      removeClass(document.body, "is-loading");
      this.setState({ imageLoaded: false, imageError: true });
      console.error("AboutPage image did not load properly!");
    };

    recursiveCheck(imageReady, loadImage, errorImage);
  }

  render() {
    const {
      showShowreel,
      showSignUpForm,
      aboutPage: { aboutInfo },
    } = this.props;
    const { imageLoaded, imageError, loadingDelay } = this.state;

    const signUp = (
      <span
        className="u-pt u-red"
        onClick={showSignUpForm}
        onKeyPress={showSignUpForm}
      >
        Talk to us
      </span>
    );

    return (
      <Page id="aboutPage" noCrawl>
        <LoadingView
          className="LoadingView--fullscreen"
          loaded={imageLoaded || imageError ? true : false}
          spinnerOn={loadingDelay}
        />
        <Main>
          <Section className="Section--navLinks">
            <MyLink className="Link--home" active pathname="/">
              <span className="u-sf">⟵ Home</span>
            </MyLink>
            <span>&nbsp;&nbsp;</span>
            <span className="u-sf u-red">«&nbsp;&nbsp;Studio</span>
          </Section>
          <Section className="Section--about">
            <h3 className="u-mf">
              {aboutInfo.text}
              <br />
              <br />
              {signUp} &mdash; we'd love to work with you on your next project
              or event.
              <br />
              <br />
              <p
                className="ShowreelButton u-mf u-red"
                onClick={showShowreel}
                onKeyPress={showShowreel}
              >
                Watch showreel
              </p>
            </h3>
            <ResponsiveImage
              className="ResponsiveImage--about"
              id="aboutImg"
              alt="Hey it's James!"
              lg={aboutInfo.photo_url}
            />
          </Section>
          <Section className="Section--extraDetails" />
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  aboutPage: state.aboutPage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAboutInfo: () => {
    dispatch(aboutPage.fetchAboutInfo());
  },
  showShowreel: () => {
    dispatch(showreel.showShowreel());
  },
  showSignUpForm: () => {
    dispatch(signUpForm.showSignUpForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
