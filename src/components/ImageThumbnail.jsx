import React, { Component } from "react";
import { connect } from "react-redux";

import { loadHomeMedia } from "../actions/mediaLoadActions";
import { recursiveCheck } from "../utils";

import { LoadingView, MyLink, ResponsiveImage } from "./";

class ImageThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageError: false,
      loadingDelay: false,
    };
  }

  componentDidMount() {
    this.checkImageLoading();

    setTimeout(() => {
      if (!this.state.imageLoaded) {
        this.setState({ loadingDelay: true });
      }
    }, 250);
  }

  checkImageLoading() {
    const imageReady = () => {
      const image = document.getElementById(`${this.props.id}`);
      if (!!image && !!image.style.backgroundImage) {
        if (/^latest[1,2]$/.test(this.props.id)) {
          this.props.loadHomeMedia(this.props.id);
        }
        return true;
      }
      return false;
    };

    const loadImage = () => {
      this.setState({ imageLoaded: true });
    };

    const errorImage = () => {
      this.setState({ imageLoaded: false, imageError: true });
      console.error(`ImageThumbnail-${this.props.id} did not load properly!`);
    };

    recursiveCheck(imageReady, loadImage, errorImage, 60);
  }

  render() {
    const { className, id, slug, subtitle, thumbnail_url, title } = this.props;

    const { imageLoaded, imageError, loadingDelay } = this.state;

    let classNames = ["ImageThumbnail", className].join(" ");

    return (
      <div className={classNames}>
        <MyLink active pathname={`/films/${slug}`}>
          <ResponsiveImage
            className="ResponsiveImage--imageThumbnail"
            id={id}
            alt={title}
            lg={thumbnail_url}
          />
          <LoadingView
            className="LoadingView--thumbnail"
            loaded={imageLoaded || imageError ? true : false}
            spinnerOn={loadingDelay}
          />
          <div className="ImageThumbnail-overlay" />
          <div className="ImageThumbnail-text">
            <div className="ImageThumbnail-text-title">{title}</div>
            <div className="ImageThumbnail-text-subtitle u-sf u-red">
              {subtitle}
            </div>
          </div>
        </MyLink>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadHomeMedia: (media) => {
    return dispatch(loadHomeMedia(media));
  },
});

export default connect(null, mapDispatchToProps)(ImageThumbnail);
