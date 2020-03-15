import React, { Component } from "react";
import { connect } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import { Player, BigPlayButton, ControlBar, PosterImage } from 'video-react';
import throttle from "lodash/throttle";

import { showAlert } from "../actions/alertActions";
import { resetError } from "../actions/authActions";
import { videos } from "../actions";

import {
  FileSelect,
  FileUpload,
  Main,
  MyLink,
  NotFound,
  Page,
  Section,
  ShareButtons,
} from "./";

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state  = { pastDelay: false };
    this.player = React.createRef();

    this.handleDate       = this.handleDate.bind(this);
    this.handleDelete     = this.handleDelete.bind(this);
    this.handleEdit       = this.handleEdit.bind(this);
    this.handleFeatured   = this.handleFeatured.bind(this);
    this.handleFocus      = this.handleFocus.bind(this);
    this.handleInput      = this.handleInput.bind(this);
    this.handleReset      = this.handleReset.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.resetPlayer = throttle(this.resetPlayer.bind(this), 1000, {
      leading: true
    })
  }

  handleDate(date) {
    if (!!date) { date = date.toISOString() };
    this.props.editDate(date);
  }

  handleDelete(e) {
    e.preventDefault();
    const message = "Are you sure you want to delete this page?";
    this.props.showAlert({ message, isDelete: true });
  }

  handleEdit(e) {
    e.preventDefault();
    if (!this.props.video.isEdit) this.props.editOn();
    if (this.props.video.isEdit)  this.props.editOff();
  }

  handleFeatured(e) {
    this.props.editDetail("featured", e.target.checked);
  }

  handleFocus(e) {
    e.preventDefault();
    e.target.setSelectionRange(0, 500);
  }

  handleInput(e) {
    e.preventDefault();
    this.props.editDetail(e.target.name, e.target.value);
  }

  handleReset(e) {
    e.preventDefault();
    const message = "Are you sure you want to undo all unsaved changes?";
    this.props.showAlert({ message, isUndo: true });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const message = "Are you sure you want to save changes to this page?";
    this.props.showAlert({ message, isUpdate: true });
  }

  resetPlayer(url) {
    this.props.editDetail("video_url", "Loading...");

    setTimeout(() => {
      this.props.editDetail("video_url", url);
    }, 1);
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.slug);

    setTimeout(() => {
      const { video } = this.props.video;
      if (!video || !Object.keys(video).length) {
        this.setState({ pastDelay: true });
      }
    }, 250);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      if (!this.props.isAuthenticated) {
        this.props.fetchVideo(this.props.video.video.slug);
      }
    }

    if (this.props.video.isUpdating !== prevProps.video.isUpdating) {
      if (!this.props.video.isUpdating && !this.props.video.error) {
        this.props.history.replace(`/films/${this.props.video.video.slug}`);
      }
    }

    if (this.props.video.isDeleting !== prevProps.video.isDeleting) {
      if (!this.props.video.isDeleting && !this.props.video.error) {
        this.props.history.push("/films");
      }
    }

    if (this.props.video.form.thumbnail_url !== prevProps.video.form.thumbnail_url) {
      if (!!prevProps.video.form.video_url) {
        this.resetPlayer(prevProps.video.form.video_url);
      }
    }
  }

  componentWillUnmount() {
    this.props.resetError();
    this.props.resetVideo();
  }

  render() {
    const {
      isAuthenticated,
      video: {
        error,
        isEdit,
        isLoading,
        video,
        form
      }
    } = this.props;

    const { pastDelay } = this.state;

    if ((!video || !Object.keys(video).length) && !isLoading) {
      return <NotFound />;
    } else if ((!video || !Object.keys(video).length) && isLoading ) {
      const header = (
        <Section className="Section--navLinks">
          <MyLink className="Link--home" active pathname="/">
            <span className="u-sf">⟵ Home</span>
          </MyLink>
          <span>&nbsp;&nbsp;</span>
          <MyLink className="Link--videoList" active pathname="/films">
            <span className="u-sf">« Films</span>
          </MyLink>
        </Section>
      );

      if (pastDelay) {
        return (
          <Page id="videoDetail" noCrawl>
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

      return (
        <Page id="videoDetail" noCrawl>
          <Main>
            {header}
            <Section className="Section--blank" />
          </Main>
        </Page>
      );
    }

    let businessName = <h3 className="u-mf u-light">Client: {video.business_name}</h3>;
    let businessWebsite = (
      <h3 className="u-mf">
        <a
          className="Link Link--business"
          href={video.business_website}
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit website
        </a>
      </h3>
    );
    let description   = <h3 className="u-mf">{video.description}</h3>;
    let extraField1   = <h3 className="u-mf">{video.extra_field_1}</h3>;
    let extraField2   = <h3 className="u-mf">{video.extra_field_2}</h3>;
    let extraField3   = <h3 className="u-mf">{video.extra_field_3}</h3>;
    let extraField4   = <h3 className="u-mf">{video.extra_field_4}</h3>;
    let extraField5   = <h3 className="u-mf">{video.extra_field_5}</h3>;
    let featured      = null;
    let publishedAt   = null;
    let slug          = null;
    let subtitle      = null;
    let title         = null;
    let fileUpload    = null;
    let thumbnailUrl  = video.thumbnail_url;
    let videoUrl      = video.video_url;

    if (isAuthenticated && isEdit) {
      businessName = (
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

      businessWebsite = (
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
            placeholder={"Enter the website url of the client/business, if applicable"}
          />
        </h3>
      );

      description = (
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

      extraField1 = (
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
            placeholder={"Enter any additional info (notes, credits, etc) if applicable"}
          />
        </h3>
      );

      extraField2 = (
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
            placeholder={"Enter any additional info (notes, credits, etc) if applicable"}
          />
        </h3>
      );

      extraField3 = (
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
            placeholder={"Enter any additional info (notes, credits, etc) if applicable"}
          />
        </h3>
      );

      extraField4 = (
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
            placeholder={"Enter any additional info (notes, credits, etc) if applicable"}
          />
        </h3>
      );

      extraField5 = (
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
            placeholder={"Enter any additional info (notes, credits, etc) if applicable"}
          />
        </h3>
      );

      featured = (
        <h3 className="u-mt">
          <label className="u-mf" htmlFor="featured">
            Featured ?&nbsp;&nbsp;
          </label>
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={form.featured}
            onChange={this.handleFeatured}
          />
          <p className="u-nm u-tf">
            If checked, this video will be featured on the home page.
            If multiple videos are set to be featured, only the most
            recent will be displayed on the home page.
          </p>
        </h3>
      );

      publishedAt = (
        <h3 className="u-mt u-mf">
          <span>Published date:&nbsp;&nbsp;</span>
          <DateTimePicker
            disableCalendar
            disableClock
            onChange={this.handleDate}
            value={!form.published_at ? null : new Date(form.published_at)}
          />
          <br/>
          <br/>
          <button
            className="EditorButton"
            type="button"
            onClick={() => {this.props.editDate(new Date())}}
          >
            Set today
          </button>
          <button
            className="EditorButton"
            type="button"
            onClick={() => {this.props.editDate(null)}}
          >
            Clear date (unpublish)
          </button>
          {!form.published_at && (
            <p className="u-tf">
              No publish date set. If saved,
              this page will not be displayed on the website 
              and will instead be saved as a draft.
            </p>
          )}
        </h3>
      );

      slug = (
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
            A slug is the end part of a URL which
            identifies a particular page on a website
            in an easy-to-read form. In other words,
            it’s the part of the URL that explains the page’s content.
            For example, with the URL https://www.example.com/the_slug,
            the slug simply is "the_slug". Must be unique to this
            particular video page. For simplicity's sake, I recommend
            just using an abbreviated version of the film's title,
            formatted as such:
            <br/>
            <br/>
            Example title: "Wedding in the Park, Summer 2020"
            <br/>
            Example slugs: "wedding_in_the_park" or "wedding_park_2020" or
            "wedding_summer_2020", etc.
            <br/>
            Full URL example:
            "http://www.jbyrdfilm.com/films/wedding_in_the_park"
          </p>
        </h3>
      );

      title = (
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

      subtitle = (
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

      fileUpload = (
        <div className="Uploader">
          <FileUpload
            label="Choose thumbnail image to upload"
            accept="image/*"
            buttonText="Upload thumbnail image file"
          />
          <FileSelect type="thumbnail" />
          <br/>
          <br/>
          <br/>
          <FileUpload
            label="Choose video file to upload"
            accept="video/*"
            buttonText="Upload video file"
          />
          <FileSelect type="video" />
          <br/>
          <br/>
          <p>
            The video and thumbnail URLs will be updated 
            automatically when either the video file or 
            thumbnail image is uploaded to storage.
            Alternatively, you may directly insert URLs for
            videos and thumbnails which were previously uploaded,
            or which are already available in cloud storage
            or some other location on the web. Whether edited/inserted 
            directly or after a successful upload, the following 
            URLs will be saved to the page upon saving.
            <br/>
            <br/>
            Make sure the video player is functioning properly before
            saving! On the player below, you should see either the 
            thumbnail image if provided, or the first frame of the video file,
            displayed before the video has begun playing. If you see a
            black screen and/or the video does not play, then you likely
            have the incorrect URL(s) provided, or the file(s) have not been
            uploaded to the provided URL(s), or the file(s) are 
            corrupted.
          </p>
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
              placeholder={"Enter the URL of the video file"}
            />
          </h4>
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
              placeholder={"Enter the URL of the thumbnail image for this video, if applicable"}
            />
          </h4>
          <br/>
        </div>
      );

      thumbnailUrl  = form.thumbnail_url;
      videoUrl      = form.video_url;
    }

    return (
      <Page
        id="videoDetail"
        title={`${video.title}`}
        description={video.description}
        image={video.thumbnail_url}
        published={video.published_at}
        schema="Movie"
        noCrawl
      >
        <Main>
          <Section className="Section--navLinks">
            <MyLink className="Link--home" active pathname="/">
              <span className="u-sf">⟵ Home</span>
            </MyLink>
            <span>&nbsp;&nbsp;</span>
            <MyLink className="Link--videoList" active pathname="/films">
              <span className="u-sf">« Films</span>
            </MyLink>
            {!video.published_at && (
              <><>
              <span>&nbsp;&nbsp;</span>
              <MyLink className="Link--videoList" active pathname="/drafts">
                <span className="u-sf">« Drafts</span>
              </MyLink>
              </></>
            )}
            {!isEdit && (
              <><>
              <span>&nbsp;&nbsp;</span>
              <span className="u-sf u-red">« {video.title}</span>
              <span>&nbsp;&nbsp;</span>
              <span className="u-sf u-red">&mdash; {video.subtitle}</span>
              </></>
            )}
          </Section>
          {!!error && (
            <Section className="Section--error u-sf u-red">
              <p className="u-nm">Error!</p>
              <p>{error}</p>
            </Section>
          )}
          <Section className="Section--editor">
            {isAuthenticated && (
              <div className="EditorButtons">
                {!isEdit && (
                  <button
                    className="EditorButton"
                    type="button"
                    onClick={this.handleEdit}
                  >
                    Edit this page
                  </button>
                )}
                {isEdit && (
                  <><>
                    <br/>
                    <button
                      className="EditorButton"
                      type="button"
                      onClick={this.handleEdit}
                    >
                      Exit edit mode
                    </button>
                    <br/>
                    <button
                      className="EditorButton"
                      type="button"
                      onClick={this.handleReset}
                    >
                      Undo changes
                    </button>
                    <br/>
                    <button
                      className="EditorButton"
                      type="button"
                      onClick={this.handleFormSubmit}
                    >
                      Save changes
                    </button>
                    <br/>
                    <br/>
                  </></>
                )}
              </div>
            )}
            {isAuthenticated && isEdit && (
              <><>
              {slug}
              <br/>
              {title}
              {subtitle}
              {featured}
              <br/>
              </></>
            )}
            {!video.published_at && (
              <h3 className="u-mt">Currently unpublished draft! Only you can view this page.</h3>
            )}
            {publishedAt}
          </Section>
          {((isEdit && isAuthenticated) || !!video.business_name) &&
            <Section className="Section--business">
              {businessName}
              {((isEdit && isAuthenticated) || !!video.business_website) && businessWebsite}
            </Section>
          }
          <Section className="Section--mainDetails">
            {((isEdit && isAuthenticated) || !!video.description) && description}
            <div className="UploadPlayerContainer">
              {fileUpload}
              <div className="VideoContainer">
                <Player
                  fluid={false}
                  height="100%"
                  width="100%"
                  ref={this.player}
                  playsInline
                  preload={!!thumbnailUrl ? "none" : "auto"}
                  src={videoUrl}
                  videoId={`video-${video.slug}`}
                >
                  {!!thumbnailUrl && <PosterImage poster={thumbnailUrl} />}
                  <BigPlayButton position="center" />
                  <ControlBar autoHideTime={1500} />
                </Player>
              </div>
            </div>
          </Section>
          <Section className="Section--extraDetails">
            {((isEdit && isAuthenticated) || !!video.extra_field_1) && extraField1}
            {((isEdit && isAuthenticated) || !!video.extra_field_2) && extraField2}
            {((isEdit && isAuthenticated) || !!video.extra_field_3) && extraField3}
            {((isEdit && isAuthenticated) || !!video.extra_field_4) && extraField4}
            {((isEdit && isAuthenticated) || !!video.extra_field_5) && extraField5}
          </Section>
          <Section className="Section--share">
            {!isEdit && (
              <><>
              <p className="u-sf u-light">Share</p>
              <ShareButtons
                slug={video.slug}
                title={video.title}
                description={video.description}
              />
              </></>
            )}
            {isAuthenticated && isEdit && (
              <button
                className="EditorButton"
                type="button"
                onClick={this.handleDelete}
              >
                Delete this page
              </button>
            )}
          </Section>
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  video: state.videoDetail,
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: slug => {
    return dispatch(videos.fetchVideo(slug));
  },
  resetVideo: () => {
    return dispatch(videos.resetVideo());
  },
  editOn: () => {
    return dispatch(videos.editOn());
  },
  editOff: () => {
    return dispatch(videos.editOff());
  },
  editDetail: (name, value) => {
    return dispatch(videos.editDetail(name, value));
  },
  editDate: date => {
    return dispatch(videos.editDate(date));
  },
  resetError: () => {
    return dispatch(resetError());
  },
  showAlert: ({ message, isDelete=false, isUndo=false, isUpdate=false }) => {
    return dispatch(showAlert({ message, isDelete, isUndo, isUpdate }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
