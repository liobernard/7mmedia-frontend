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
  VideoBackground,
  VideoThumbnail
} from "./";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingDelay: false, pageComplete: false };
  }

  componentDidMount() {
    this.props.fetchHomePage();

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
      const banner = document.getElementById("banner");
      const { featured, latest, featuredLoading, latestLoading } = this.props;

      return banner &&
        banner.readyState === 4 &&
        featured &&
        !!Object.keys(featured).length &&
        latest &&
        !!latest.length &&
        !featuredLoading &&
        !latestLoading
        ? true
        : false;
    };

    const loaded = () => {
      removeClass(document.body, "is-loading");
      this.setState({ pageComplete: true });
    };

    recursiveCheck(check, loaded, null, Infinity);
  }

  render() {
    const { featured, latest } = this.props;
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
            <VideoBackground />
            <div className="IntroText IntroText--main">
              <div>
                <h1>J. Byrd Film Studio</h1>
              </div>
            </div>
            <div className="IntroText IntroText--sub">
              <h2>
                We're committed to capturing your special moments and sculpting
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
                  <span className="u-mf">About us</span>
                </MyLink>
              </InViewMonitor>
            </div>
          </Section>
          <Section className="Section--featured">
            <h4 className="Featured u-mf u-red">Featured</h4>
            <VideoThumbnail
              {...featured}
              yOffsetMin="30px"
              yOffsetMax="-30px"
            />
          </Section>
          <Section className="Section--latest">
            <h4 className="u-mf u-red">Latest</h4>
            <ImageThumbnail
              {...latest[0]}
              yOffsetMin="-5px"
              yOffsetMax="45px"
              isHome
              id="latest1"
            />
            <ImageThumbnail
              {...latest[1]}
              yOffsetMin="45px"
              yOffsetMax="-5px"
              isHome
              id="latest2"
            />
          </Section>
          <Section className="Section--help">
            <div className="Works">
              <MyLink className="Link--works" active pathname="/films">
                <span className="u-mf">More works</span>
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
                intoViewMargin="-20%"
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

const mapStateToProps = state => ({
  featured: state.homePage.featured,
  latest: state.homePage.latest,
  featuredLoading: state.homePage.featuredLoading,
  latestLoading: state.homePage.latestLoading
});

const mapDispatchToProps = dispatch => ({
  fetchHomePage: () => {
    return dispatch(homePage.fetchHomePage());
  },
  closeHomePage: () => {
    return dispatch(homePage.closeHomePage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
