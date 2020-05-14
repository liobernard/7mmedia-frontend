import React, { Component } from "react";
import throttle from "lodash/throttle";
import { connect } from "react-redux";

import { getScrollY } from "../js/utils";

import { LogoutButton, Menu, MenuIcon } from "./";

let prevScrollPos = 0;

class ToggleMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPastBanner: false,
      isHidden: false,
    };

    this.onScroll = throttle(this.onScroll.bind(this), 100, {
      trailing: true,
    });
  }

  onScroll() {
    if (this.props.menuOn) return;

    const currentScrollPos = getScrollY();

    if (currentScrollPos < prevScrollPos) {
      this.setState({ isHidden: false });
    } else {
      this.setState({ isHidden: true });
    }

    if (this.props.pathname === "/") {
      const videoBackground = document.getElementById("video-banner");
      if (currentScrollPos < videoBackground.clientHeight - 50) {
        this.setState({ isPastBanner: false });
      } else {
        this.setState({ isPastBanner: true });
      }
    }

    prevScrollPos = currentScrollPos;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    prevScrollPos = getScrollY();
  }

  componentDidUpdate(prevProps) {
    if (this.props.pathname !== prevProps.pathname) {
      if (this.props.pathname === "/") {
        this.setState({ isPastBanner: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const { isHidden, isPastBanner } = this.state;
    const { pathname, isAuthenticated, menuOn } = this.props;

    let links = [...this.props.links];
    if (isAuthenticated) links.push({ path: "/upload", name: "upload" });

    return (
      <div
        className={`ToggleMenu
          ${pathname === "/" ? "is-home" : ""}
          ${isHidden ? "is-hidden" : ""}
          ${isPastBanner ? "is-pastBanner" : ""}`}
      >
        <div className="MenuIcon-container">
          <MenuIcon menuOn={menuOn} />
        </div>
        {isAuthenticated && (
          <LogoutButton className={menuOn ? "is-active" : ""} />
        )}
        <Menu links={links} className={menuOn ? "is-active" : ""} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menuOn: state.menu.menuOn,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(ToggleMenu);
