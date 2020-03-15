import React, { Component } from "react";

export default class SocialIcons extends Component {
  render() {
    const { className, color } = this.props;
    let classNames = ["SocialIcons", className].join(" ");

    return (
      <ul className={classNames}>
        <li>
          <a
            className="SocialIcon" id="facebook"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `${color}` }}
          >
            <img src={`/facebook_${color}.png`} width="30" height="30" alt="Facebook" />
          </a>
        </li>
        <li>
          <a
            className="SocialIcon" id="instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `${color}` }}
          >
            <img src={`/instagram_${color}.png`} width="30" height="30" alt="Instagram" />
          </a>
        </li>
        <li>
          <a
            className="SocialIcon" id="twitter"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `${color}` }}
          >
            <img src={`/twitter_${color}.png`} width="30" height="30" alt="Twitter" />
          </a>
        </li>
      </ul>
    );
  }
}
