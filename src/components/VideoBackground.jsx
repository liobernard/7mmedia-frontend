import React, { Component } from "react";

export default class VideoBackground extends Component {
  render() {
    let classNames = ["VideoBackground", this.props.className].join(" ");
    return (
      <div className={classNames} id="video-banner">
        <video
          id="banner"
          autoPlay="autoplay" muted="muted" loop="loop"
          type="video/mp4"
        >
          <source src="https://assets.liobernard.com/images/james/port.mp4" />
        </video>
      </div>
    );
  }
}
