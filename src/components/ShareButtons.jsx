import React, { Component } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

export default class ShareButtons extends Component {
  render() {
    const { description, slug, title } = this.props;
    const url = `https://www.jbyrdfilm.com/films/${slug}`;

    return (
      <div className="ShareButtons">
        <FacebookShareButton
          children={<FacebookIcon size={32} round={false} />}
          url={url}
          quote={`${title} | ${description}`}
          className="ShareButton"
        />
        <TwitterShareButton
          children={<TwitterIcon size={32} round={false} />}
          url={url}
          title={title}
          className="ShareButton"
        />
      </div>
    );
  }
}
