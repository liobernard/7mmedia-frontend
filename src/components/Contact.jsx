import React, { Component } from "react";

import { MyLink, SignUpButton, SocialIcons } from "./";

export default class Contact extends Component {
  render() {
    const { className, menu } = this.props;
    let classNames = ["Contact", className].join(" ");
    return (
      <div className={`${classNames}${menu ? " Contact--menu" : ""}`}>
        <div className="Contact-info">
          <SignUpButton className="SignUpButton--contact"/>
          <h5>
            Filming Charlotte, NC and surrounding areas
          </h5>
          <p>704<b>.</b>555<b>.</b>1234</p>
          <h5 className="Contact-info-email">
            <a href="mailto:hello@jbyrdfilm.com">
              hello@jbyrdfilm.com
            </a>
          </h5>
        </div>
        <div className="Contact-links">
          <SocialIcons
            className="SocialIcons--contact"
            color={`${menu ? "white" : "red"}`}
          />
          <div className="Logo Logo--bottom">
            <MyLink active pathname="/">J. Byrd Film Studio</MyLink>
          </div>
        </div>
      </div>
    );
  }
}
