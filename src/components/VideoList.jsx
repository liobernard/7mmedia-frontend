import React, { Component } from "react";
import { connect } from "react-redux";
import throttle from "lodash/throttle";

import { resetError } from "../actions/authActions";
import { fetchVideos, resetVideos } from "../actions/videosActions";
import { getScrollY, getDocHeight } from "../utils/dom";

import { ImageThumbnail, Main, MyLink, Page, Section } from "./";

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = { pastDelay: false };
    this.onScroll = throttle(this.onScroll.bind(this), 1000, {
      trailing: true,
    });
  }

  onScroll() {
    const {
      videos: { error, isLoading, hasMore, videos },
      fetchVideos,
      drafts,
    } = this.props;

    if (error || isLoading || !hasMore) return;

    const scrollPos = getScrollY();
    const docHeight = getDocHeight();

    if (scrollPos + window.innerHeight >= docHeight - 15) {
      fetchVideos(videos.length, drafts);
    }
  }

  componentDidMount() {
    this.props.fetchVideos(0, this.props.drafts);

    const addListener = () => {
      setTimeout(() => {
        const { videos } = this.props.videos;
        if (!!videos.length) {
          window.addEventListener("scroll", this.onScroll, false);
          return;
        } else {
          addListener();
        }
      }, 250);
    };

    addListener();

    setTimeout(() => {
      const { videos } = this.props.videos;
      if (!videos.length) {
        this.setState({ pastDelay: true });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.drafts !== prevProps.drafts) {
      this.props.resetVideos();

      const reset = () => {
        setTimeout(() => {
          const { videos } = this.props.videos;
          if (videos.length === 0) {
            this.props.fetchVideos(0, this.props.drafts);
            return;
          } else {
            reset();
          }
        }, 250);
      };

      reset();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.resetError();
    this.props.resetVideos();
  }

  render() {
    const {
      drafts,
      isAuthenticated,
      videos: { error, hasMore, isLoading, videos },
    } = this.props;

    const { pastDelay } = this.state;

    const navLinks = (
      <Section className="Section--navLinks">
        <MyLink className="Link--home" active pathname="/">
          <span className="u-sf">⟵ Home</span>
        </MyLink>
        <span>&nbsp;&nbsp;</span>
        <MyLink className="Link--videoList" active={drafts} pathname="/films">
          <span className="u-sf u-red">«&nbsp;&nbsp;Films</span>
        </MyLink>
        {isAuthenticated && (
          <>
            <>
              <span>&nbsp;&nbsp;</span>
              <MyLink
                className="Link--videoList"
                active={!drafts}
                pathname="/drafts"
              >
                <span className="u-sf u-red">«&nbsp;&nbsp;Drafts</span>
              </MyLink>
            </>
          </>
        )}
      </Section>
    );

    const editor = !isAuthenticated ? null : (
      <Section className="Section--editor">
        <div className="EditorButtons">
          <MyLink active pathname="/add_film">
            <button className="EditorButton" type="button">
              Add a film
            </button>
          </MyLink>
          <br />
        </div>
      </Section>
    );

    let child = (
      <Main>
        {navLinks}
        {editor}
        <Section className="Section--videoList">
          {videos.map((video) => (
            <ImageThumbnail
              className="ImageThumbnail--videoList"
              key={video.id}
              {...video}
            />
          ))}
        </Section>
        <Section className="Section--error u-sf u-red">
          {!!error && <p className="u-nm">Error!</p>}
          {!!error && <p>{error}</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !hasMore && <p>End of results</p>}
        </Section>
      </Main>
    );

    if (isLoading && !videos.length) {
      if (pastDelay) {
        child = (
          <Main>
            {navLinks}
            <Section className="Section--error u-sf u-red">
              <p>Loading...</p>
            </Section>
            <Section className="Section--blank" />
          </Main>
        );
      } else {
        child = (
          <Main>
            {navLinks}
            <Section className="Section--blank" />
          </Main>
        );
      }
    } else if (!videos.length) {
      child = (
        <Main>
          {navLinks}
          {editor}
          <Section className="Section--error u-sf u-red">
            <p>Sorry, something went wrong. Please try again.</p>
            {!!error && <p>{error}</p>}
            <p>No results were found.</p>
          </Section>
        </Main>
      );
    }

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
      },
    ];

    return (
      <Page
        id="videoList"
        title={drafts ? "Drafts" : "Films"}
        breadcrumbList={breadcrumbList}
      >
        {child}
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  videos: state.videoList,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => {
    return dispatch(resetError());
  },
  resetVideos: () => {
    return dispatch(resetVideos());
  },
  fetchVideos: (offset = 0, drafts = false) => {
    return dispatch(fetchVideos(offset, drafts));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
