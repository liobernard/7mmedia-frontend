import React, { Component } from "react";
import { Player, BigPlayButton, ControlBar, PosterImage } from 'video-react';
import { Parallax, withController } from 'react-scroll-parallax';

import { recursiveCheck } from "../js/utils";

import { LoadingView, MyLink } from "./";

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageError: false,
      loadingDelay: false,
    };
  }

  componentDidMount() {
    this.props.parallaxController.update();
    this.checkImageLoading();

    setTimeout(() => {
      if (!this.state.imageLoaded) {
        this.setState({ loadingDelay: true });
      }
    }, 200);
  }

  checkImageLoading() {
    const featured = document.getElementById("featured");
    const featuredReady = () => (
      !!featured &&
      !!featured.currentSrc &&
      !!featured.previousElementSibling.style.backgroundImage ?
      true : false
    );

    const loadImage = () => {
      this.setState({ imageLoaded: true });
    }

    const errorImage = () => {
      this.setState({ imageLoaded: false, imageError: true });
      console.error("VideoThumbnail-featured did not load properly!");
    }

    recursiveCheck(featuredReady, loadImage, errorImage);
  }

  render() {
    const {
      className,
      slug,
      subtitle,
      thumbnail_url,
      title,
      video_url,
      yOffsetMin,
      yOffsetMax
    } = this.props;

    const {
      imageLoaded,
      imageError,
      loadingDelay
    } = this.state;

    let classNames = ["VideoThumbnail", className].join(" ");

    return (
      <div className={classNames}>
        <Parallax
          y={[yOffsetMin, yOffsetMax]}
          styleOuter={{ height: "inherit" }}
          styleInner={{
            height: "inherit",
            WebkitTransition: "all 0.1s linear",
            transition: "all 0.1s linear"
          }}
        >
          <Player
            fluid={false}
            height="100%"
            width="100%"
            playsInline
            preload="none"
            src={video_url}
            videoId="featured"
          >
            <LoadingView
              className="LoadingView--thumbnail"
              loaded={imageLoaded || imageError ? true : false}
              spinnerOn={loadingDelay}
            />
            <BigPlayButton position="center" />
            <PosterImage poster={thumbnail_url} />
            <ControlBar autoHideTime={1500} />
          </Player>
        </Parallax>
        <div className="VideoThumbnail-text">
          <h3 className="VideoThumbnail-text-title u-mf">
            <MyLink active pathname={`films/${slug}`}>{title}</MyLink>
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

export default withController(VideoThumbnail);