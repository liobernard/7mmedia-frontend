import React, { Component } from "react";
import { connect } from "react-redux";

import { menu } from "../actions";

class MenuIcon extends Component {
  render() {
    const { hideMenu, showMenu, menuOn } = this.props;
    return (
      <div
        className={`MenuIcon${menuOn ? " is-active" : ""}`}
        onClick={menuOn ? hideMenu : showMenu}
        onKeyPress={menuOn ? hideMenu : showMenu}
        tabIndex={4}
      >
        <div className="MenuIcon-line MenuIcon-line--line1"></div>
        <div className="MenuIcon-line MenuIcon-line--line2"></div>
        <div className="MenuIcon-line MenuIcon-line--line3"></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showMenu: () => {
    dispatch(menu.showMenu());
  },
  hideMenu: () => {
    dispatch(menu.hideMenu());
  }
});

export default connect(null, mapDispatchToProps)(MenuIcon);
