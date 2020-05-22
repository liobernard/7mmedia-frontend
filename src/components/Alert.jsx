import React, { Component } from "react";
import { connect } from "react-redux";

import { hideAlert } from "../actions/alertActions";
import { logout } from "../actions/authActions";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  resetForm,
} from "../actions/videosActions";

import { Button } from "./";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
      willCreate,
      willDelete,
      willLogout,
      willUpdate,
      willUndo,
      message,
    } = this.props;

    return (
      <div className={`Alert${alertOn ? " is-active" : ""}`}>
        <p className="u-sf u-red u-nm">{message}</p>
        <div className="Alert-buttons">
          {willCreate &&
            !willLogout &&
            !willUndo &&
            !willUpdate &&
            !willDelete && (
              <Button
                title={"Create page"}
                action={this.handleCreate}
                type="button"
              />
            )}
          {willLogout &&
            !willUndo &&
            !willUpdate &&
            !willDelete &&
            !willCreate && (
              <Button
                title={"Logout now"}
                action={this.handleLogout}
                type="button"
              />
            )}
          {willUpdate &&
            !willLogout &&
            !willUndo &&
            !willDelete &&
            !willCreate && (
              <Button
                title={"Save changes"}
                action={this.handleUpdate}
                type="button"
              />
            )}
          {willUndo &&
            !willLogout &&
            !willUpdate &&
            !willDelete &&
            !willCreate && (
              <Button
                title={"Undo changes"}
                action={this.handleUndo}
                type="button"
              />
            )}
          {willDelete &&
            !willLogout &&
            !willUpdate &&
            !willUndo &&
            !willCreate && (
              <Button
                title={"Delete page"}
                action={this.handleDelete}
                type="button"
              />
            )}
          <Button title={"Close"} action={this.handleClose} type="button" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alertOn: state.alert.alertOn,
  message: state.alert.message,
  willCreate: state.alert.willCreate,
  willDelete: state.alert.willDelete,
  willLogout: state.alert.willLogout,
  willUpdate: state.alert.willUpdate,
  willUndo: state.alert.willUndo,
  video: state.videoDetail.video,
});

const mapDispatchToProps = (dispatch) => ({
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
