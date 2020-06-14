import React, { Component } from "react";
import { connect } from "react-redux";
import { Player, BigPlayButton, ControlBar, PosterImage } from "video-react";

import { resetError } from "../actions/authActions";
import { videos } from "../actions";

import {
  Main,
  MyLink,
  NotFound,
  Page,
  Section,
  ShareButtons,
  VideoEdit,
} from "./";

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { pastDelay: false };
    this.player = React.createRef();
    this.handleEditOn = this.handleEditOn.bind(this);
  }

  handleEditOn(e) {
    e.preventDefault();
    if (!this.props.videoDetail.isEdit) this.props.editOn();
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.slug);

    setTimeout(() => {
      const { video } = this.props.videoDetail;
      if (!video || !Object.keys(video).length) {
        this.setState({ pastDelay: true });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      if (!this.props.isAuthenticated) {
        this.props.fetchVideo(this.props.videoDetail.video.slug);
      }
    }

    if (
      this.props.videoDetail.isUpdating !== prevProps.videoDetail.isUpdating
    ) {
      if (!this.props.videoDetail.isUpdating && !this.props.videoDetail.error) {
        this.props.history.replace(
          `/films/${this.props.videoDetail.video.slug}`
        );
      }
    }

    if (
      this.props.videoDetail.isDeleting !== prevProps.videoDetail.isDeleting
    ) {
      if (!this.props.videoDetail.isDeleting && !this.props.videoDetail.error) {
        this.props.history.push("/films");
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
      videoDetail: { error, isLoading, isEdit, video },
    } = this.props;

    if (isAuthenticated && isEdit) {
      return <VideoEdit />;
    }

    const { pastDelay } = this.state;

    let header = (
      <Section className="Section--navLinks">
        <MyLink className="Link--home" active pathname="/">
          <span className="u-sf">⟵ Home</span>
        </MyLink>
        <span>&nbsp;&nbsp;</span>
        <MyLink className="Link--videoList" active pathname="/films">
          <span className="u-sf">«&nbsp;&nbsp;Films</span>
        </MyLink>
      </Section>
    );

    if ((!video || !Object.keys(video).length) && !isLoading) {
      return <NotFound />;
    } else if ((!video || !Object.keys(video).length) && isLoading) {
      return (
        <Page id="videoDetail" noCrawl>
          <Main>
            {header}
            {pastDelay && (
              <Section className="Section--error u-sf u-red">
                <p>Loading...</p>
                {!!error && <p className="u-nm">Error!</p>}
                {!!error && <p>{error}</p>}
              </Section>
            )}
            <Section className="Section--blank" />
          </Main>
        </Page>
      );
    }

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
      </Section>
    );

    const breadcrumbList = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://7mmedia.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Films",
        item: "https://7mmedia.online/films",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: video.title,
      },
    ];

    return (
      <Page
        id="videoDetail"
        title={`${video.title}`}
        description={video.description}
        image={video.thumbnail_url}
        published={video.published_at}
        breadcrumbList={breadcrumbList}
        schema="Movie"
      >
        <Main>
          {header}
          {!!error && (
            <Section className="Section--error u-sf u-red">
              <p className="u-nm">Error!</p>
              <p>{error}</p>
            </Section>
          )}
          <Section className="Section--editor">
            {isAuthenticated && (
              <div className="EditorButtons">
                <button
                  className="EditorButton"
                  type="button"
                  onClick={this.handleEditOn}
                >
                  Edit this page
                </button>
              </div>
            )}
            {!video.published_at && (
              <h3 className="u-mt">
                Currently unpublished draft! Only you can view this page.
              </h3>
            )}
          </Section>
          {!!video.business_website && (
            <Section className="Section--business">
              <h3 className="u-mf u-light">Client: {video.business_name}</h3>
              <h3 className="u-sf">
                <a
                  className="Link Link--business"
                  href={video.business_website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit website
                </a>
              </h3>
            </Section>
          )}
          <Section className="Section--mainDetails">
            <h3 className="u-mf">{video.description}</h3>
            <div className="UploadPlayerContainer">
              <div className="VideoContainer">
                <Player
                  fluid={false}
                  height="100%"
                  width="100%"
                  ref={this.player}
                  playsInline
                  src={video.video_url}
                  videoId={`video-${video.slug}`}
                >
                  {!!video.thumbnail_url && (
                    <PosterImage poster={video.thumbnail_url} />
                  )}
                  <BigPlayButton position="center" />
                  <ControlBar autoHideTime={1500} />
                </Player>
              </div>
            </div>
          </Section>
          <Section className="Section--extraDetails">
            <h3 className="u-mf">{video.extra_field_1}</h3>
            <h3 className="u-mf">{video.extra_field_2}</h3>
            <h3 className="u-mf">{video.extra_field_3}</h3>
            <h3 className="u-mf">{video.extra_field_4}</h3>
            <h3 className="u-mf">{video.extra_field_5}</h3>
          </Section>
          <Section className="Section--share">
            <p className="u-sf u-light">Share</p>
            <ShareButtons
              slug={video.slug}
              title={video.title}
              description={video.description}
            />
          </Section>
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  videoDetail: state.videoDetail,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVideo: (slug) => {
    dispatch(videos.fetchVideo(slug));
  },
  resetVideo: () => {
    dispatch(videos.resetVideo());
  },
  editOn: () => {
    dispatch(videos.editOn());
  },
  resetError: () => {
    dispatch(resetError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
