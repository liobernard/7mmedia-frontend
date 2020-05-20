import React, { Component } from "react";

import { MyLink, SignUpButton, SocialIcons } from "./";

const REACT_APP_CDN_DOMAIN = process.env.REACT_APP_CDN_DOMAIN;

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
          <MyLink active pathname="/" className="Link--logo">
            <img
              src={`${REACT_APP_CDN_DOMAIN}/media/images/logos/7mm-${
                menu ? "wh" : "red"
              }-lg.png`}
              width="75"
              alt="7MileMedia"
            />
          </MyLink>
        </div>
      </div>
    );
  }
}
