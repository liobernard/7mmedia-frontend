import React, { Component } from "react";
import { connect } from "react-redux";

import { Main, Page, Section } from "./";

class NotFound extends Component {
  render() {
    const { pathname, search, hash } = this.props;
    const oops = "Oops! Page not found.";
    const address = "The address below does not exist:";

    return (
      <Page id="notFound" noCrawl>
        <Main>
          <Section className="Section--intro">
            <div className="NotFound-message">
              <h1 className="u-mf u-light">{oops}</h1>
            </div>
            <div className="NotFound-address">
              <h2 className="u-mf">{address}</h2>
              <p>
                www.jbyrdfilm.com{pathname}{search}{hash}
              </p>
            </div>
          </Section>
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps)(NotFound);