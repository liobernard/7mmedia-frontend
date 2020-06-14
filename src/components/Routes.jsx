import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { updateHistory } from "../actions/browserHistoryActions";

import {
  AboutPage,
  HomePage,
  LoginPage,
  NotFound,
  VideoDetail,
  VideoEdit,
  VideoList,
  UploadPage,
} from "./"

class Routes extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.updateHistory(this.props.location);
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/add_film" render={props =>
          isAuthenticated ?
            <VideoEdit history={props.history} /> :
            <Redirect
              exact
              to={{ pathname: "/login", search: "?from=add_film" }}
            />
        }/>
        <Route exact path="/drafts" render={() =>
          isAuthenticated ?
            <VideoList drafts /> :
            <Redirect
              exact to={{ pathname: "/login", search: "?from=drafts" }}
            />
        }/>
        <Route exact path="/films" component={VideoList} />
        <Route exact path="/films/:slug" render={props => (
          <VideoDetail match={props.match} history={props.history} />
        )}/>
        <Route exact path="/studio" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/upload" render={() =>
          isAuthenticated ?
            <UploadPage /> :
            <Redirect
              exact
              to={{ pathname: "/login", search: "?from=upload" }}
            />
        }/>
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  location: state.router.location,
});

const mapDispatchToProps = (dispatch) => ({
  updateHistory: (location) => {
    return dispatch(updateHistory(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
