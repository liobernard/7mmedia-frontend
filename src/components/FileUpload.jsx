import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";

import { editDetail } from "../actions/videosActions";

const REACT_APP_API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.upload = React.createRef();
    this.handleReset = this.handleReset.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      error: null,
      file: null,
      isGettingUrl: false,
      isUploading: false,
      signedUrl: {
        url: "",
        fields: {
          key: "",
          acl: "",
          "x-amz-credential": "",
          "x-amz-algorithm": "",
          "x-amz-date": "",
          policy: "",
          "x-amz-signature": "",
        },
      },
    };
  }

  handleReset(e) {
    e.preventDefault();
    this.setState(this.getInitialState());
    this.upload.current.value = "";
  }

  handleFile(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({ file });
    this.getSignedUrl(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: null, isUploading: false });
    this.uploadFile();
  }

  getSignedUrl(file) {
    this.setState({ isGettingUrl: true });

    let headers = { "Content-Type": "application/json" };

    const { token } = this.props;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const url = `${REACT_APP_API_DOMAIN}/s3/signed_url/`;
    let object_name;

    if (/^image/.test(file.type)) {
      object_name = `media/images/film_thumbnails/${file.name}`;
    } else if (/^video/.test(file.type)) {
      object_name = `media/videos/films/${file.name}`;
    }

    return request
      .post(url)
      .set(headers)
      .send({ object_name })
      .then((res) => {
        this.setState({ isGettingUrl: false, signedUrl: res.body });
      })
      .catch((err) => {
        console.error(err);
        let error = err.message;
        this.setState({ error, isGettingUrl: false });
      });
  }

  uploadFile() {
    this.setState({ isUploading: true });

    const { file, signedUrl } = this.state;
    let fieldName;

    if (/^image/.test(file.type)) {
      fieldName = "thumbnail_url";
    } else if (/^video/.test(file.type)) {
      fieldName = "video_url";
    }

    return request
      .post(signedUrl.url)
      .field(signedUrl.fields)
      .attach("file", file)
      .then((res) => {
        const value = `${signedUrl.url}${signedUrl.fields["key"]}`;
        this.props.editDetail(fieldName, value);
        this.setState(this.getInitialState());
        this.upload.current.value = "";
      })
      .catch((err) => {
        console.error(err);
        let error = err.message;
        this.setState({ error, isUploading: false });
      });
  }

  render() {
    const { className, accept } = this.props;
    const { error, file, signedUrl, isGettingUrl, isUploading } = this.state;

    let { buttonText, label } = this.props;
    let classNames = ["FileUpload", className].join(" ");

    if (isGettingUrl) {
      buttonText = "Getting signed URL...";
    } else if (signedUrl && signedUrl.url) {
      buttonText = "Ready to upload, click again!";
    } else if (isUploading) {
      buttonText = "Uploading file...";
    }

    if (error) {
      label = `Oops! Something went wrong. ${error}.`;
    }

    return (
      <form className={classNames} onSubmit={this.handleSubmit}>
        {!!label && <p className="u-mt">{label}</p>}
        <input
          type="file"
          name="file"
          ref={this.upload}
          accept={accept}
          disabled={isGettingUrl || isUploading}
          onChange={this.handleFile}
        />
        <span onClick={this.handleReset}>&times;</span>
        <br />
        <input
          type="submit"
          value={buttonText}
          disabled={!file || isGettingUrl || isUploading}
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  editDetail: (name, value) => {
    return dispatch(editDetail(name, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
