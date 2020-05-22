import React, { Component } from "react";
import { connect } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import { Player, BigPlayButton, ControlBar, PosterImage } from "video-react";
import throttle from "lodash/throttle";

import { showAlert } from "../actions/alertActions";
import { resetError } from "../actions/authActions";
import { videos } from "../actions";

import { FileSelect, FileUpload, Main, MyLink, Page, Section } from "./";

class VideoEdit extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();

    this.handleDate = this.handleDate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditOff = this.handleEditOff.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.resetPlayer = throttle(this.resetPlayer.bind(this), 1000, {
      leading: true,
    });
  }

  handleDate(date) {
    if (!!date) {
      date = date.toISOString();
    }
    this.props.editDate(date);
  }

  handleDelete(e) {
    e.preventDefault();
    const message = "Are you sure you want to delete this page?";
    this.props.showAlert({ message, willDelete: true });
  }

  handleEditOff(e) {
    e.preventDefault();
    if (this.props.videoDetail.isEdit) this.props.editOff();
  }

  handleFocus(e) {
    e.preventDefault();
    e.target.setSelectionRange(0, 500);
  }

  handleInput(e) {
    e.preventDefault();
    this.props.editDetail(e.target.name, e.target.value);
  }

  handleUndo(e) {
    e.preventDefault();
    const message = "Are you sure you want to undo all unsaved changes?";
    this.props.showAlert({ message, willUndo: true });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const message = "Are you sure you want to save this page?";
    if (this.props.videoDetail.isEdit) {
      this.props.showAlert({ message, willUpdate: true });
    } else {
      this.props.showAlert({ message, willCreate: true });
    }
  }

  resetPlayer(url) {
    this.props.editDetail("video_url", "Loading...");

    setTimeout(() => {
      this.props.editDetail("video_url", url);
    }, 1);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.videoDetail.isCreating !== prevProps.videoDetail.isCreating
    ) {
      if (!this.props.videoDetail.isCreating && !this.props.videoDetail.error) {
        this.props.history.push(`/films/${this.props.videoDetail.form.slug}`);
      }
    }

    if (
      this.props.videoDetail.form.thumbnail_url !==
      prevProps.videoDetail.form.thumbnail_url
    ) {
      if (!!prevProps.videoDetail.form.video_url) {
        this.resetPlayer(prevProps.videoDetail.form.video_url);
      }
    }
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {
    const {
      error,
      isCreating,
      isUpdating,
      isEdit,
      form,
      video,
    } = this.props.videoDetail;

    let header = (
      <Section className="Section--navLinks">
        <MyLink className="Link--home" active pathname="/">
          <span className="u-sf">⟵ Home</span>
        </MyLink>
        <span>&nbsp;&nbsp;</span>
        <MyLink className="Link--videoList" active pathname="/films">
          <span className="u-sf">«&nbsp;&nbsp;Films</span>
        </MyLink>
        <span>&nbsp;&nbsp;</span>
        <span className="u-sf u-red">«&nbsp;&nbsp;Add page</span>
      </Section>
    );

    if (isEdit) {
      header = (
        <Section className="Section--navLinks">
          <MyLink className="Link--home" active pathname="/">
            <span className="u-sf">⟵ Home</span>
          </MyLink>
          <span>&nbsp;&nbsp;</span>
          <MyLink className="Link--videoList" active pathname="/films">
            <span className="u-sf">«&nbsp;&nbsp;Films</span>
          </MyLink>
          {!video.published_at && (
            <>
              <>
                <span>&nbsp;&nbsp;</span>
                <MyLink className="Link--videoList" active pathname="/drafts">
                  <span className="u-sf">«&nbsp;&nbsp;Drafts</span>
                </MyLink>
              </>
            </>
          )}
          <span>&nbsp;&nbsp;</span>
          <span className="u-sf u-red">«&nbsp;&nbsp;{video.title}</span>
          {video.subtitle && (
            <>
              <>
                <span>&nbsp;&nbsp;</span>
                <span className="u-sf u-red">
                  &mdash;&nbsp;&nbsp;{video.subtitle}
                </span>
              </>
            </>
          )}
          <span>&nbsp;&nbsp;</span>
          <span className="u-sf u-red">«&nbsp;&nbsp;Edit page</span>
        </Section>
      );
    }

    if (isCreating || isUpdating) {
      return (
        <Page id="videoEdit" noCrawl>
          <Main>
            {header}
            <Section className="Section--error u-sf u-red">
              <p>Loading...</p>
              {!!error && <p className="u-nm">Error!</p>}
              {!!error && <p>{error}</p>}
            </Section>
            <Section className="Section--blank" />
          </Main>
        </Page>
      );
    }

    const businessName = (
      <h3 className="u-mf">
        Client:&nbsp;&nbsp;
        <textarea
          className="u-mf"
          id={"business_name"}
          name={"business_name"}
          type={"text"}
          maxLength={255}
          rows={5}
          value={form.business_name}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={"Enter the name of the client/business, if applicable"}
        />
      </h3>
    );

    const businessWebsite = (
      <h3 className="u-mf">
        Client website url:&nbsp;&nbsp;
        <input
          id={"business_website"}
          name={"business_website"}
          type={"text"}
          maxLength={255}
          value={form.business_website}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={
            "Enter the website url of the client/business, if applicable"
          }
        />
      </h3>
    );

    const description = (
      <h3 className="u-mf">
        Video description:&nbsp;&nbsp;
        <textarea
          className="u-mf"
          id={"description"}
          name={"description"}
          type={"text"}
          minLength={1}
          maxLength={500}
          required
          value={form.description}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={"Enter a description for the video project (required)"}
        />
      </h3>
    );

    const extraField1 = (
      <h3 className="u-mf">
        Extra field 1:&nbsp;&nbsp;
        <input
          id={"extra_field_1"}
          name={"extra_field_1"}
          type={"text"}
          maxLength={255}
          value={form.extra_field_1}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={
            "Enter any additional info (notes, credits, etc) if applicable"
          }
        />
      </h3>
    );

    const extraField2 = (
      <h3 className="u-mf">
        Extra field 2:&nbsp;&nbsp;
        <input
          id={"extra_field_2"}
          name={"extra_field_2"}
          type={"text"}
          maxLength={255}
          value={form.extra_field_2}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={
            "Enter any additional info (notes, credits, etc) if applicable"
          }
        />
      </h3>
    );

    const extraField3 = (
      <h3 className="u-mf">
        Extra field 3:&nbsp;&nbsp;
        <input
          id={"extra_field_3"}
          name={"extra_field_3"}
          type={"text"}
          maxLength={255}
          value={form.extra_field_3}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={
            "Enter any additional info (notes, credits, etc) if applicable"
          }
        />
      </h3>
    );

    const extraField4 = (
      <h3 className="u-mf">
        Extra field 4:&nbsp;&nbsp;
        <input
          id={"extra_field_4"}
          name={"extra_field_4"}
          type={"text"}
          maxLength={255}
          value={form.extra_field_4}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={
            "Enter any additional info (notes, credits, etc) if applicable"
          }
        />
      </h3>
    );

    const extraField5 = (
      <h3 className="u-mf">
        Extra field 5:&nbsp;&nbsp;
        <input
          id={"extra_field_5"}
          name={"extra_field_5"}
          type={"text"}
          maxLength={255}
          value={form.extra_field_5}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={
            "Enter any additional info (notes, credits, etc) if applicable"
          }
        />
      </h3>
    );

    const publishedAt = (
      <h3 className="u-mt u-mf">
        <span>Published date:&nbsp;&nbsp;</span>
        <DateTimePicker
          disableCalendar
          disableClock
          onChange={this.handleDate}
          value={!form.published_at ? null : new Date(form.published_at)}
        />
        <br />
        <br />
        <button
          className="EditorButton"
          type="button"
          onClick={() => {
            this.props.editDate(new Date());
          }}
        >
          Set today
        </button>
        <button
          className="EditorButton"
          type="button"
          onClick={() => {
            this.props.editDate(null);
          }}
        >
          Clear date (unpublish)
        </button>
        {!form.published_at && (
          <p className="u-tf">
            No publish date set. If saved, this page will not be displayed on
            the website and will instead be saved as a draft.
          </p>
        )}
      </h3>
    );

    const slug = (
      <h3 className="u-mf">
        Video slug (url keyword):&nbsp;&nbsp;
        <input
          id={"slug"}
          name={"slug"}
          type={"text"}
          maxLength={255}
          minLength={1}
          required
          value={form.slug}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={"Enter a slug for this video (required)"}
        />
        <p className="u-tf">
          A slug is the end part of a URL which identifies a particular page on
          a website in an easy-to-read form. In other words, it’s the part of
          the URL that explains the page’s content. For example, with the URL
          https://www.example.com/the-slug, the slug simply is "the-slug"
          portion of the URL. Must be unique to this particular video page. For
          simplicity's sake, I recommend just using an abbreviated version of
          the film's title, formatted as such:
          <br />
          <br />
          Example title: "Wedding in the Park, Summer 2020"
          <br />
          Example slugs: "wedding-in-the-park" or "wedding-park-2020" or
          "wedding-summer-2020", etc.
          <br />
          Full URL example: "https://7mmedia.online/films/wedding-in-the-park"
        </p>
      </h3>
    );

    const title = (
      <h3 className="u-mf u-mt">
        Video title:&nbsp;&nbsp;
        <textarea
          className="u-mf"
          id={"title"}
          name={"title"}
          type={"text"}
          maxLength={255}
          minLength={1}
          required
          rows={5}
          value={form.title}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={"Enter the title of this video (required)"}
        />
      </h3>
    );

    const subtitle = (
      <h3 className="u-mf">
        Video subtitle:&nbsp;&nbsp;
        <input
          id={"subtitle"}
          name={"subtitle"}
          type={"text"}
          maxLength={255}
          value={form.subtitle}
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          placeholder={"Enter a subtitle to this video, if applicable"}
        />
      </h3>
    );

    const fileUpload = (
      <div className="Uploader">
        <FileUpload
          accept="image/*"
          buttonText="Upload thumbnail image file"
          label="Choose thumbnail image to upload"
          prefix="media/images/film_thumbnails/"
        />
        <FileSelect prefix="media/images/film_thumbnails/" />
        <br />
        <br />
        <br />
        <FileUpload
          accept="video/mp4"
          buttonText="Upload video file"
          label="Choose video file to upload"
          prefix="media/videos/films/"
        />
        <FileSelect prefix="media/videos/films/" />
        <br />
        <br />
        <p>
          The video and thumbnail URLs will be updated automatically when either
          the video file or thumbnail image is uploaded to storage.
          Alternatively, you may directly insert URLs for videos and thumbnails
          which were previously uploaded, or which are already available in
          cloud storage or some other location on the web. Whether
          edited/inserted directly or after a successful upload, the following
          URLs will be saved to the page upon saving.
          <br />
          <br />
          Make sure the video player is functioning properly before saving! On
          the player below, you should see either the thumbnail image if
          provided, or the first frame of the video file, displayed before the
          video has begun playing. If you see a black screen and/or the video
          does not play, then you likely have the incorrect URL(s) provided, or
          the file(s) have not been uploaded to the provided URL(s), or the
          file(s) are corrupted.
        </p>
        <h4 className="u-mf u-mt">
          Thumbnail URL:&nbsp;&nbsp;
          <textarea
            id={"thumbnail_url"}
            name={"thumbnail_url"}
            type={"text"}
            rows={5}
            value={form.thumbnail_url}
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            placeholder={
              "Enter the URL of the thumbnail image for this video, if applicable"
            }
          />
        </h4>
        <h4 className="u-mf u-mt">
          Video URL:&nbsp;&nbsp;
          <textarea
            id={"video_url"}
            name={"video_url"}
            type={"text"}
            minLength={1}
            required
            rows={5}
            value={form.video_url}
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            placeholder={"Enter the URL of the video file (required)"}
          />
        </h4>
        <br />
      </div>
    );

    const thumbnailUrl = form.thumbnail_url;
    const videoUrl = form.video_url;

    return (
      <Page id="videoEdit" title={`${isEdit ? "Edit" : "Add"} page`} noCrawl>
        <Main>
          {header}
          {!!error && (
            <Section className="Section--error u-sf u-red">
              <p className="u-nm">Error!</p>
              <p>{error}</p>
            </Section>
          )}
          <Section className="Section--editor">
            <div className="EditorButtons">
              {isEdit && (
                <>
                  <>
                    <button
                      className="EditorButton"
                      type="button"
                      onClick={this.handleEditOff}
                    >
                      Exit edit mode
                    </button>
                    <br />
                  </>
                </>
              )}
              <button
                className="EditorButton"
                type="button"
                onClick={this.handleUndo}
              >
                Undo changes
              </button>
              <br />
              <button
                className="EditorButton"
                type="button"
                onClick={this.handleFormSubmit}
              >
                Save changes
              </button>
              <br />
              <br />
            </div>
            {slug}
            <br />
            {title}
            {subtitle}
            <br />
            {publishedAt}
          </Section>
          <Section className="Section--business">
            {businessName}
            {businessWebsite}
          </Section>
          <Section className="Section--mainDetails">
            {description}
            <div className="UploadPlayerContainer">
              {fileUpload}
              <div className="VideoContainer">
                <Player
                  fluid={false}
                  height="100%"
                  width="100%"
                  ref={this.player}
                  playsInline
                  src={videoUrl}
                  videoId={`video-${isEdit ? video.slug : form.slug}`}
                >
                  {!!thumbnailUrl && <PosterImage poster={thumbnailUrl} />}
                  <BigPlayButton position="center" />
                  <ControlBar autoHideTime={1500} />
                </Player>
              </div>
            </div>
          </Section>
          <Section className="Section--extraDetails">
            {extraField1}
            {extraField2}
            {extraField3}
            {extraField4}
            {extraField5}
          </Section>
          <Section className="Section--share">
            <button
              className="EditorButton"
              type="button"
              onClick={this.handleFormSubmit}
            >
              Save changes
            </button>
            <br />
            {isEdit && (
              <>
                <>
                  <button
                    className="EditorButton"
                    type="button"
                    onClick={this.handleDelete}
                  >
                    Delete this page
                  </button>
                  <br />
                </>
              </>
            )}
          </Section>
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  videoDetail: state.videoDetail,
});

const mapDispatchToProps = (dispatch) => ({
  editOff: () => {
    dispatch(videos.editOff());
  },
  editDetail: (name, value) => {
    dispatch(videos.editDetail(name, value));
  },
  editDate: (date) => {
    dispatch(videos.editDate(date));
  },
  resetError: () => {
    dispatch(resetError());
  },
  showAlert: ({
    message,
    willCreate = false,
    willDelete = false,
    willUndo = false,
    willUpdate = false,
  }) => {
    dispatch(
      showAlert({ message, willCreate, willDelete, willUndo, willUpdate })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoEdit);
