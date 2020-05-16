import React, { Component } from "react";
import { Player, BigPlayButton, ControlBar, PosterImage } from "video-react";

import { recursiveCheck } from "../js/utils";

import { LoadingView, MyLink } from "./";

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoLoaded: false,
      videoError: false,
      loadingDelay: false,
    };
  }

  componentDidMount() {
    this.checkVideoLoading();

    setTimeout(() => {
      if (!this.state.videoLoaded) {
        this.setState({ loadingDelay: true });
      }
    }, 200);
  }

  checkVideoLoading() {
    const featuredReady = () => {
      const featured = document.getElementById("featured");
      return !!featured &&
        !!featured.currentSrc &&
        !!featured.previousElementSibling.style.backgroundImage &&
        featured.readyState === 4
        ? true
        : false;
    };

    const loadVideo = () => {
      this.setState({ videoLoaded: true });
    };

    const errorVideo = () => {
      this.setState({ videoLoaded: false, videoError: true });
      console.error("VideoThumbnail-featured did not load properly!");
    };

    recursiveCheck(featuredReady, loadVideo, errorVideo);
  }

  render() {
    const {
      className,
      slug,
      subtitle,
      thumbnail_url,
      title,
      video_url,
    } = this.props;

    const { videoLoaded, videoError, loadingDelay } = this.state;

    let classNames = ["VideoThumbnail", className].join(" ");

    return (
      <div className={classNames}>
        <Player
          fluid={false}
          height="100%"
          width="100%"
          playsInline
          src={video_url}
          videoId="featured"
        >
          <LoadingView
            className="LoadingView--thumbnail"
            loaded={videoLoaded || videoError ? true : false}
            spinnerOn={loadingDelay}
          />
          <BigPlayButton position="center" />
          {!!thumbnail_url && <PosterImage poster={thumbnail_url} />}
          <ControlBar autoHideTime={1500} />
        </Player>
        <div className="VideoThumbnail-text">
          <h3 className="VideoThumbnail-text-title u-mf">
            <MyLink active pathname={`films/${slug}`}>
              {title}
            </MyLink>
          </h3>
          <h4 className="VideoThumbnail-text-subtitle u-sf">
            <MyLink className="u-red" active pathname={`films/${slug}`}>
              {subtitle}
            </MyLink>
          </h4>
        </div>
      </div>
    );
  }
}

export default VideoThumbnail;
