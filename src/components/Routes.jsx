import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import { updateHistory } from "../actions/browserHistoryActions";

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "homePage" */ "./HomePage"),
  loading: () => null,
  modules: ["homePage"],
  render(loaded) {
    let Loaded = loaded.default;
    return <Loaded />;
  }
});

const VideoList = Loadable({
  loader: () => import(/* webpackChunkName: "videoList" */ "./VideoList"),
  loading: () => null,
  modules: ["videoList"],
  render(loaded, props) {
    let Loaded = loaded.default;
    return <Loaded drafts={props.drafts} />;
  }
});

const VideoCreate = Loadable({
  loader: () => import(/* webpackChunkName: "videoCreate" */ "./VideoCreate"),
  loading: () => null,
  modules: ["videoCreate"],
  render(loaded, props) {
    let Loaded = loaded.default;
    return <Loaded history={props.history} />;
  }
});

const VideoDetail = Loadable({
  loader: () => import(/* webpackChunkName: "videoDetail" */ "./VideoDetail"),
  loading: () => null,
  modules: ["videoDetail"],
  render(loaded, props) {
    let Loaded = loaded.default;
    return <Loaded match={props.match} history={props.history} />;
  }
});

const AboutPage = Loadable({
  loader: () => import(/* webpackChunkName: "aboutPage" */ "./AboutPage"),
  loading: () => null,
  modules: ["aboutPage"],
  render(loaded) {
    let Loaded = loaded.default;
    return <Loaded />;
  }
});

const LoginPage = Loadable({
  loader: () => import(/* webpackChunkName: "loginPage" */ "./LoginPage"),
  loading: () => null,
  modules: ["loginPage"],
  render(loaded) {
    let Loaded = loaded.default;
    return <Loaded />;
  }
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notFound" */ "./NotFound"),
  loading: () => null,
  modules: ["notFound"],
  render(loaded) {
    let Loaded = loaded.default;
    return <Loaded />;
  }
});

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
        <Route exact path="/add_film" render={props => (
          isAuthenticated ?
            <VideoCreate history={props.history} /> :
            <Redirect
              exact
              to={{ pathname: "/login", search: "?from=add_film" }}
            />
        )}/>
        <Route exact path="/drafts" render={() => (
          isAuthenticated ?
            <VideoList drafts /> :
            <Redirect
              exact
              to={{ pathname: "/login", search: "?from=drafts" }}
            />
        )}/>
        <Route exact path="/films" component={VideoList} />
        <Route exact path="/films/:slug" component={VideoDetail} />
        <Route exact path="/studio" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

const mapDispatchToProps = dispatch => ({
  updateHistory: location => {
    return dispatch(updateHistory(location));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
