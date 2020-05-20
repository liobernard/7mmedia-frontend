import React, { Component } from "react";

import { FileUpload, Main, MyLink, Page, Section } from "./";

export default class UploadPage extends Component {
  render() {
    return (
      <Page id="UploadPage" title="Upload a file" noCrawl>
        <Main>
          <Section className="Section--navLinks">
            <MyLink className="Link--home" active pathname="/">
              <span className="u-sf">⟵ Home</span>
            </MyLink>
            <span>&nbsp;&nbsp;</span>
            <span className="u-sf u-red">
              «&nbsp;&nbsp;Miscellaneous File Upload
            </span>
          </Section>
          <Section className="Section--upload">
            <div className="Uploader">
              <FileUpload
                accept="image/*"
                buttonText="Upload image file"
                label="Choose image file to upload"
                prefix="media/images/"
              />
              <br />
              <br />
              <FileUpload
                accept="video/mp4"
                buttonText="Upload video file"
                label="Choose video file to upload"
                prefix="media/videos/"
              />
              <br />
            </div>
          </Section>
        </Main>
      </Page>
    );
  }
}
