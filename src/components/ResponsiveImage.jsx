import React, { Component } from "react";

export default class ResponsiveImage extends Component {
  constructor(props) {
    super(props);
    this.image = React.createRef();
  }

  componentDidMount() {
    const el = this.image.current;
    new ResponsiveBackgroundImage(el);
  }

  render() {
    const { className, lg, md, sm, xs, sizes, alt, id } = this.props;
    let classNames = ["ResponsiveImage", className].join(" ");

    return (
      <div className={classNames} id={id} ref={this.image}>
        <img
          src={lg}
          srcSet={`
            ${xs ? xs + " 320w," : ""}
            ${sm ? sm + " 600w," : ""}
            ${md ? md + " 900w," : ""}
            ${lg} 1200w
          `}
          sizes={sizes}
          alt={alt ? alt : "Responsive Image"}
          style={{ display: "none" }}
        />
      </div>
    );
  }
}

class ResponsiveBackgroundImage {
  constructor(element) {
    this.element = element;
    this.img = element.querySelector("img");
    this.src = "";

    this.img.addEventListener("load", () => {
      this.update();
    });

    if (this.img.complete) {
      this.update();
    }
  }

  update() {
    let src =
      typeof this.img.currentSrc !== "undefined"
        ? this.img.currentSrc
        : this.img.src;

    if (this.src !== src) {
      this.src = src;
      this.element.style.backgroundImage = 'url("' + this.src + '")';
    }
  }
}
