import React, { Component } from "react";
import { connect } from "react-redux";
import { Player, BigPlayButton, ControlBar, PosterImage } from "video-react";

import { loadHomeMedia } from "../actions/mediaLoadActions";
import { recursiveCheck } from "../utils";

import { LoadingView, MyLink } from "./";

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingDelay: false };
  }

  componentDidMount() {
    this.checkVideoLoading();

    const {
      mediaLoad: { featuredVideo, featuredThumbnail },
    } = this.props;

    setTimeout(() => {
      if (!(featuredVideo && featuredThumbnail)) {
        this.setState({ loadingDelay: true });
      }
    }, 250);
  }

  checkVideoLoading() {
    const checkVideo = (featured) => {
      return !!featured && featured.readyState === 4;
    };

    const checkThumbnail = (featured) => {
      return (
        !!featured && !!featured.previousElementSibling.style.backgroundImage
      );
    };

    const featuredReady = () => {
      const featured = document.getElementById("featured");
      const videoLoaded = checkVideo(featured);
      const thumbnailLoaded = checkThumbnail(featured);
      return videoLoaded && thumbnailLoaded;
    };

    const load = () => {
      this.props.loadHomeMedia("featuredVideo");
      this.props.loadHomeMedia("featuredThumbnail");
    };

    const error = () => {
      this.props.loadHomeMedia("featuredVideo");
      this.props.loadHomeMedia("featuredThumbnail");
      console.error("VideoThumbnail-featured did not load properly!");
    };

    recursiveCheck(featuredReady, load, error, 60);
  }

  render() {
    const {
      className,
      slug,
      subtitle,
      thumbnail_url,
      title,
      video_url,
      mediaLoad: {
        homePage: { featuredThumbnail, featuredVideo },
      },
    } = this.props;

    const { loadingDelay } = this.state;

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
            loaded={featuredVideo && featuredThumbnail ? true : false}
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

const mapStateToProps = (state) => ({
  mediaLoad: state.mediaLoad,
});

const mapDispatchToProps = (dispatch) => ({
  loadHomeMedia: (media) => {
    return dispatch(loadHomeMedia(media));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoThumbnail);
