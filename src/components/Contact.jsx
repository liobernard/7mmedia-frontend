import React, { Component } from "react";

import { MyLink, SignUpButton, SocialIcons } from "./";

export default class Contact extends Component {
  render() {
    const { className, menu } = this.props;
    let classNames = ["Contact", className].join(" ");
    return (
      <div className={`${classNames}${menu ? " Contact--menu" : ""}`}>
        <div className="Contact-info">
          <SignUpButton className="SignUpButton--contact" />
          <h5>Filming Charlotte, NC and surrounding areas</h5>
          <h5 className="Contact-info-email">
            Question or concerns? Talk to us at
            <br />
            <a href="mailto:contact@7mmedia.online">contact@7mmedia.online</a>
          </h5>
        </div>
        <div className="Contact-links">
          <SocialIcons
            className="SocialIcons--contact"
            color={`${menu ? "white" : "red"}`}
          />
          <div className="Logo Logo--bottom">
            <MyLink active pathname="/">
              7 Mile Media
            </MyLink>
          </div>
        </div>
      </div>
    );
  }
}
