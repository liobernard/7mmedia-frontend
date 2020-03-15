import React, { Component } from "react";
import { connect } from "react-redux";

import { hideAlert } from "../actions/alertActions";
import { logout } from "../actions/authActions";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  resetForm
} from "../actions/videosActions";

import { Button } from "./";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUndo   = this.handleUndo.bind(this);
    this.handleClose  = this.handleClose.bind(this);
  }

  handleCreate(e) {
    e.preventDefault();
    this.props.createVideo();
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteVideo();
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.updateVideo();
  }

  handleUndo(e) {
    e.preventDefault();
    this.props.resetForm();
  }

  handleClose(e) {
    e.preventDefault();
    this.props.hideAlert();
  }

  render() {
    const {
      alertOn,
      isCreate,
      isDelete,
      isLogout,
      isUpdate,
      isUndo,
      message
    } = this.props;

    return (
      <div className={`Alert${alertOn ? " is-active" : ""}`}>
        <p className="u-sf u-red u-nm">{message}</p>
        <div className="Alert-buttons">
          {isCreate && !isLogout && !isUndo && !isUpdate && !isDelete && (
            <Button
              title={"Create page"}
              action={this.handleCreate}
              type="button"
            />
          )}
          {isLogout && !isUndo && !isUpdate && !isDelete && !isCreate && (
            <Button
              title={"Logout now"}
              action={this.handleLogout}
              type="button"
            />
          )}
          {isUpdate && !isLogout && !isUndo && !isDelete && !isCreate && (
            <Button
              title={"Save changes"}
              action={this.handleUpdate}
              type="button"
            />
          )}
          {isUndo && !isLogout && !isUpdate && !isDelete && !isCreate && (
            <Button
              title={"Undo changes"}
              action={this.handleUndo}
              type="button"
            />
          )}
          {isDelete && !isLogout && !isUpdate && !isUndo && !isCreate && (
            <Button
              title={"Delete page"}
              action={this.handleDelete}
              type="button"
            />
          )}
          <Button
            title={"Close"}
            action={this.handleClose}
            type="button"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alertOn: state.alert.alertOn,
  message: state.alert.message,
  isCreate: state.alert.isCreate,
  isDelete: state.alert.isDelete,
  isLogout: state.alert.isLogout,
  isUpdate: state.alert.isUpdate,
  isUndo: state.alert.isUndo,
  video: state.videoDetail.video
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    return dispatch(logout());
  },
  hideAlert: () => {
    return dispatch(hideAlert());
  },
  resetForm: () => {
    return dispatch(resetForm());
  },
  updateVideo: () => {
    return dispatch(updateVideo());
  },
  deleteVideo: () => {
    return dispatch(deleteVideo());
  },
  createVideo: () => {
    return dispatch(createVideo());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
