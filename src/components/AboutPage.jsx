import React, { Component } from "react";
import { connect } from "react-redux";

import { showreel, signUpForm } from "../actions";

import {
  Main,
  MyLink,
  Page,
  ResponsiveImage,
  Section
} from "./";

class AboutPage extends Component {
  render() {
    const { showShowreel, showSignUpForm } = this.props;

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
        <Main>
          <Section className="Section--navLinks">
            <MyLink className="Link--home" active pathname="/">
              <span className="u-sf">⟵ Home</span>
            </MyLink>
            <span>&nbsp;&nbsp;</span>
            <span className="u-sf u-red">« Studio</span>
          </Section>
          <Section className="Section--about">
            <h3 className="u-mf">
              J. Byrd Film Studio provides film solutions for 
              any event. Our mission is to meet your needs through 
              stellar videography, sharp attention to detail, 
              and outstanding service. 
              <br/>
              <br/>
              Our team works closely with each of our clients to help bring 
              their vision to life. We offer 
              reasonably priced and customizable packages guaranteed to fit 
              your needs.
              <br/>
              <br/>
              {signUp} &mdash; we'd love to work with 
              you on your next project or event.
              <br/>
              <br/>
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
              lg="filmmaker-stock.jpg"
            />
          </Section>
          <Section className="Section--extraDetails" />
        </Main>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showShowreel: () => {
    dispatch(showreel.showShowreel());
  },
  showSignUpForm: () => {
    dispatch(signUpForm.showSignUpForm());
  }
});

export default connect(null, mapDispatchToProps)(AboutPage);
