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
                label="Choose image file to upload"
                accept="image/*"
                buttonText="Upload image file"
              />
              <br />
              <br />
              <FileUpload
                label="Choose video file to upload"
                accept="video/*"
                buttonText="Upload video file"
              />
              <br />
            </div>
          </Section>
        </Main>
      </Page>
    );
  }
}
