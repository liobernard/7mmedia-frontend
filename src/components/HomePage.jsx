import React, { Component } from "react";
import { connect } from "react-redux";
import InViewMonitor from "react-inview-monitor";

import { homePage } from "../actions";
import { recursiveCheck, addClass, removeClass } from "../js/utils";

import {
  Contact,
  ImageThumbnail,
  LoadingView,
  Main,
  MyLink,
  Page,
  Section,
  SignUpButton,
  SocialIcons,
  VideoThumbnail,
} from "./";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerLoaded: false,
      logoLoaded: false,
      loadingDelay: false,
      pageComplete: false,
    };
  }

  componentDidMount() {
    this.props.fetchHomeInfo();

    addClass(document.body, "is-loading");
    this.checkPageComplete();

    setTimeout(() => {
      if (!this.state.pageComplete) {
        this.setState({ loadingDelay: true });
      }
    }, 200);
  }

  componentWillUnmount() {
    this.props.closeHomePage();
  }

  checkPageComplete() {
    const check = () => {
      const { bannerLoaded, logoLoaded } = this.state;
      const {
        homeInfo,
        homeInfoLoading,
        latest,
        latestLoading,
      } = this.props.homePage;

      return bannerLoaded &&
        logoLoaded &&
        homeInfo &&
        homeInfo.featured_video &&
        !!Object.keys(homeInfo.featured_video).length &&
        latest &&
        !!latest.length &&
        !homeInfoLoading &&
        !latestLoading
        ? true
        : false;
    };

    const loaded = () => {
      removeClass(document.body, "is-loading");
      this.setState({ pageComplete: true });
    };

    recursiveCheck(check, loaded, null, 20);
  }

  render() {
    const { latest, homeInfo } = this.props.homePage;
    const { loadingDelay, pageComplete } = this.state;

    return (
      <Page id="homePage">
        <LoadingView
          className="LoadingView--fullscreen"
          loaded={pageComplete}
          spinnerOn={loadingDelay}
        />
        <Main>
          <Section className="Section--intro">
            <div className="VideoBackground" id="video-banner">
              <video
                autoPlay="autoplay"
                muted="muted"
                loop="loop"
                type="video/mp4"
                src={homeInfo.video_banner_url}
                onCanPlayThrough={() => this.setState({ bannerLoaded: true })}
              />
            </div>
            <div className="IntroText IntroText--main">
              <img
                src={homeInfo.logo_url}
                width="300"
                alt="7MileMedia"
                onLoad={() => this.setState({ logoLoaded: true })}
              />
            </div>
            <div className="IntroText IntroText--sub">
              <h2>
                We are committed to capturing your special moments and sculpting
                them into shareable, honest works of art.
              </h2>
              <h3>
                In need of filming, production, or editing services? We'd love
                to hear from you.
              </h3>
              <SignUpButton />
              <SocialIcons className="SocialIcons--intro" color="red" />
            </div>
          </Section>
          <Section className="Section--description">
            <div className="Description">
              <InViewMonitor
                classNameInView="animate-this in-view"
                classNameNotInView="animate-this"
                intoViewMargin="-20%"
              >
                <h3 className="u-mf u-light">
                  Our culture is rooted in the belief that every moment carries
                  with it the potential to make a lasting impression.
                </h3>
              </InViewMonitor>
              <br />
              <InViewMonitor
                classNameInView="animate-this in-view"
                classNameNotInView="animate-this"
                intoViewMargin="-20%"
              >
                <h3 className="u-mf">
                  Our work embodies this potential with every frame.
                </h3>
              </InViewMonitor>
              <br />
              <InViewMonitor
                classNameInView="animate-this in-view"
                classNameNotInView="animate-this"
                intoViewMargin="-10%"
              >
                <MyLink className="Link--studio" active pathname="/studio">
                  <span className="u-sf">About us</span>
                </MyLink>
              </InViewMonitor>
            </div>
          </Section>
          <Section className="Section--featured">
            <h4 className="Featured u-mf u-red">Featured</h4>
            <VideoThumbnail {...homeInfo.featured_video} />
          </Section>
          <Section className="Section--latest">
            <h4 className="u-mf u-red">Latest</h4>
            <ImageThumbnail {...latest[0]} id="latest1" />
            <ImageThumbnail {...latest[1]} id="latest2" />
          </Section>
          <Section className="Section--help">
            <div className="Works">
              <MyLink className="Link--works" active pathname="/films">
                <span className="u-sf">View our work</span>
              </MyLink>
            </div>
            <div className="Help">
              <InViewMonitor
                classNameInView="animate-this in-view"
                classNameNotInView="animate-this"
                intoViewMargin="-20%"
              >
                <h3 className="u-mf u-light">
                  Upcoming wedding? Special event? Commercial project?
                </h3>
              </InViewMonitor>
              <br />
              <InViewMonitor
                classNameInView="animate-this in-view"
                classNameNotInView="animate-this"
                intoViewMargin="-10%"
              >
                <h3 className="u-mf">Let's discuss how we can help.</h3>
              </InViewMonitor>
            </div>
          </Section>
          <Section className="Section--contact">
            <Contact className="Contact--about" />
          </Section>
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  homePage: state.homePage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeInfo: () => {
    return dispatch(homePage.fetchHomeInfo());
  },
  closeHomePage: () => {
    return dispatch(homePage.closeHomePage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
