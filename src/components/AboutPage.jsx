import React, { Component } from "react";
import { connect } from "react-redux";

import { aboutPage, showreel, signUpForm, mediaLoad } from "../actions";
import { classes, recursiveCheck } from "../utils";

import { LoadingView, Main, MyLink, Page, ResponsiveImage, Section } from "./";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingDelay: false };
  }

  isLoaded(media) {
    return !Object.keys(media).some((key) => !media[key]);
  }

  componentDidMount() {
    if (!this.isLoaded(this.props.mediaLoad.aboutPage)) {
      this.props.fetchAboutInfo();

      classes.addClass(document.body, "is-loading");
      this.checkPageComplete();

      setTimeout(() => {
        if (!this.isLoaded(this.props.mediaLoad.aboutPage)) {
          this.setState({ loadingDelay: true });
        }
      }, 250);
    }
  }

  checkPageComplete() {
    const check = () => {
      const image = document.getElementById("aboutImg");
      const showreel = document.getElementById("showreel");
      return (
        !!image &&
        !!image.style.backgroundImage &&
        !!showreel &&
        showreel.readyState === 4
      );
    };

    const loaded = () => {
      classes.removeClass(document.body, "is-loading");
      this.props.loadAboutMedia("image");
      this.props.loadAboutMedia("showreel");
    };

    const error = () => {
      classes.removeClass(document.body, "is-loading");
      this.props.loadAboutMedia("image");
      this.props.loadAboutMedia("showreel");
      console.error("AboutPage did not load properly!");
    };

    recursiveCheck(check, loaded, error, Infinity);
  }

  render() {
    const {
      showShowreel,
      showSignUpForm,
      aboutPage: { aboutInfo },
      mediaLoad: { aboutPage },
    } = this.props;
    const { loadingDelay } = this.state;
    const loaded = this.isLoaded(aboutPage);

    const breadcrumbList = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://7mmedia.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Studio",
      },
    ];

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
      <Page
        id="aboutPage"
        title="Studio"
        description={aboutInfo.text}
        breadcrumbList={breadcrumbList}
        noCrawl
      >
        <LoadingView
          className="LoadingView--fullscreen"
          loaded={loaded}
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
  mediaLoad: state.mediaLoad,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAboutInfo: () => {
    return dispatch(aboutPage.fetchAboutInfo());
  },
  loadAboutMedia: (media) => {
    return dispatch(mediaLoad.loadAboutMedia(media));
  },
  showShowreel: () => {
    return dispatch(showreel.showShowreel());
  },
  showSignUpForm: () => {
    return dispatch(signUpForm.showSignUpForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
