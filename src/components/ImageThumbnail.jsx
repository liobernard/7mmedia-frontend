import React, { Component } from "react";
import { Parallax } from 'react-scroll-parallax';

import { LoadingView, MyLink, ResponsiveImage } from "./";
import { recursiveCheck } from "../js/utils";

export default class ImageThumbnail extends Component {
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
    }, 200);
  }

  checkImageLoading() {
    const image = document.getElementById(`${this.props.id}`);
    const imageReady = () => (
      !!image && !!image.style.backgroundImage ? true : false
    );

    const loadImage = () => {
      this.setState({ imageLoaded: true });
    }

    const errorImage = () => {
      this.setState({ imageLoaded: false, imageError: true });
      console.error(`ImageThumbnail-${this.props.id} did not load properly!`);
    }

    recursiveCheck(imageReady, loadImage, errorImage);
  }

  render() {
    const {
      className,
      id,
      isHome,
      slug,
      subtitle,
      thumbnail_url,
      title,
      yOffsetMin,
      yOffsetMax
    } = this.props;

    const {
      imageLoaded,
      imageError,
      loadingDelay
    } = this.state;

    let classNames = ["ImageThumbnail", className].join(" ");

    const thumbnail = (
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
          <div className="ImageThumbnail-text-subtitle u-sf u-red">{subtitle}</div>
        </div>
      </MyLink>
    );

    return (
      <div className={classNames}>
        {isHome && (
          <Parallax
            y={[yOffsetMin, yOffsetMax]}
            styleOuter={{ height: "inherit" }}
            styleInner={{
              height: "inherit",
              WebkitTransition: "all 0.1s linear",
              transition: "all 0.1s linear"
            }}
          >
            {thumbnail}
          </Parallax>
        )}
        {!isHome && thumbnail}
      </div>
    );
  }
}