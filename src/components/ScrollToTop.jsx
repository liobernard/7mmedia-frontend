import { Component } from "react";
import { connect } from "react-redux";

import { menu } from "../actions";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      this.props.hideMenu();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

const mapDispatchToProps = dispatch => ({
  hideMenu: () => {
    dispatch(menu.hideMenu());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollToTop);
