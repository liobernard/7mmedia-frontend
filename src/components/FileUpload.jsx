import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";

import { editDetail } from "../actions/videosActions";

const API_URL = process.env.API_URL;
const CDN_URL = process.env.CDN_URL;

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.upload = React.createRef();
    this.handleReset = this.handleReset.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      error: null,
      file: null,
      isGettingUrl: false,
      isUploading: false,
      isUploaded: false,
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
    if (this.state.isGettingUrl || this.state.isUploading) return;
    this.setState(this.getInitialState());
    this.upload.current.value = "";
  }

  handleSelectFile(e) {
    e.preventDefault();
    if (this.state.isGettingUrl || this.state.isUploading) return;
    const file = e.target.files[0];
    this.setState({ isUploaded: false });
    this.getSignedURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { file, isGettingUrl, isUploading } = this.state;
    if (!file || isGettingUrl || isUploading) return;
    this.uploadFile();
  }

  getSignedURL(file) {
    this.setState({ isGettingUrl: true, error: null });

    const { token, prefix } = this.props;

    const url = `${API_URL}/s3/${prefix}`;

    return request
      .post(url)
      .set({ Authorization: `Token ${token}` })
      .attach("file", file)
      .then((res) => {
        this.setState({ file, isGettingUrl: false, signedUrl: res.body });
      })
      .catch((err) => {
        console.error(err);
        let error = err.response.body;
        this.setState({ error, isGettingUrl: false });
      });
  }

  uploadFile() {
    this.setState({ isUploading: true, error: null });

    const { file, signedUrl } = this.state;
    const { prefix, editDetail } = this.props;

    let fieldName;

    if (prefix === "media/images/film_thumbnails/") {
      fieldName = "thumbnail_url";
    } else if (prefix === "media/videos/films/") {
      fieldName = "video_url";
    }

    return request
      .post(signedUrl.url)
      .field(signedUrl.fields)
      .attach("file", file)
      .then((res) => {
        const value = `${CDN_URL}/${signedUrl.fields["key"]}`;
        if (fieldName) editDetail(fieldName, value);
        this.setState({ ...this.getInitialState(), isUploaded: true });
        this.upload.current.value = "";
      })
      .catch((err) => {
        console.error(err);
        let error = err.response.body;
        this.setState({ error, isUploading: false, isUploaded: false });
      });
  }

  render() {
    const { className, accept } = this.props;
    const {
      error,
      file,
      signedUrl,
      isGettingUrl,
      isUploading,
      isUploaded,
    } = this.state;

    let { buttonText, label } = this.props;
    let classNames = ["FileUpload", className].join(" ");

    if (isGettingUrl) {
      buttonText = "Validating file...";
    } else if (signedUrl && signedUrl.url) {
      buttonText = "Ready to upload, click again!";
    } else if (isUploading) {
      buttonText = "Uploading file...";
    } else if (isUploaded) {
      buttonText = "Upload successful!";
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
          onChange={this.handleSelectFile}
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
