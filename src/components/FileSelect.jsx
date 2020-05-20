import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";

import { editDetail } from "../actions/videosActions";

const REACT_APP_API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

class FileSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      files: [],
      isLoading: false,
      isInitiated: false,
    };

    this.getFiles = this.getFiles.bind(this);
    this.initiate = this.initiate.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    if (!["thumbnail_url", "video_url"].includes(e.target.name)) return;
    this.props.editDetail(e.target.name, e.target.value);
  }

  getFiles() {
    this.setState({ isLoading: true, error: null });

    const { prefix, token } = this.props;

    const url = `${REACT_APP_API_DOMAIN}/s3/${prefix}`;

    return request
      .get(url)
      .set({ Authorization: `Token ${token}` })
      .then((res) => {
        const files = res.body;
        this.setState({ isLoading: false, files });
      })
      .catch((err) => {
        console.error(err);
        let error = err.message;
        this.setState({ error, isLoading: false });
      });
  }

  initiate(e) {
    e.preventDefault();
    this.setState({ isInitiated: true });
    this.getFiles();
  }

  render() {
    const { className, prefix } = this.props;
    const { error, files, isLoading, isInitiated } = this.state;
    let classNames = ["FileSelect", className].join(" ");
    let type = "file";

    if (prefix === "media/images/film_thumbnails/") {
      type = "thumbnail";
    } else if (prefix === "media/videos/films/") {
      type = "video";
    }

    if (isInitiated) {
      return (
        <>
          <>
            {isLoading && <p>Loading {type}s...</p>}
            {!isLoading && (
              <>
                <>
                  <p className="u-mt">Select {type} from cloud storage</p>
                  {!!error && <p className="u-red u-nm">Error: {error}</p>}
                  <select
                    className={classNames}
                    name={`${type}_url`}
                    onChange={this.handleInput}
                    disabled={!files.length}
                  >
                    {!files.length && (
                      <option value="">
                        No {type}s in storage. Try uploading some!
                      </option>
                    )}
                    {!!files.length && (
                      <>
                        <>
                          <option value="">Select a {type}</option>
                          {files.map((file) => (
                            <option key={file} value={file}>
                              {file.slice(file.lastIndexOf("/") + 1)}
                            </option>
                          ))}
                        </>
                      </>
                    )}
                  </select>
                  <span>&nbsp;&nbsp;</span>
                  <img
                    className="u-pt u-tf u-red"
                    src="/refresh_red.png"
                    width="15"
                    alt={`Refresh ${type} list`}
                    onClick={this.getFiles}
                  />
                </>
              </>
            )}
          </>
        </>
      );
    } else {
      return (
        <>
          <>
            <p className="u-pt u-red u-mt" onClick={this.initiate}>
              Click here to select a {type} from cloud storage >>>
            </p>
            {!!error && <p className="u-red u-nm">Error: {error}</p>}
          </>
        </>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(FileSelect);
