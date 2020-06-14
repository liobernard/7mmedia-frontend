import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://7mmedia.online";

const defaultTitle =
  "7 Mile Media Productions — Weddings, Events, Promos, Documentaries & More";
const defaultDescription =
  "We're committed to capturing your special moments and sculpting them into shareable, honest works of art. In need of filming, production, or editing services? We'd love to hear from you.";
const defaultImage =
  "https://assets.7mmedia.online/media/images/logos/7mm-red-sm-nw.png";

class Page extends Component {
  getMetaTags(
    {
      title,
      description,
      image,
      contentType,
      noCrawl,
      published,
      updated,
      category,
      tags,
    },
    pathname
  ) {
    const theTitle = title ? `${title} — 7MMedia.online` : defaultTitle;
    const theDescription = description ? description : defaultDescription;
    const theImage = image ? image : defaultImage;

    const metaTags = [
      { itemprop: "name", content: theTitle },
      { itemprop: "description", content: theDescription },
      { itemprop: "image", content: theImage },
      { name: "description", content: theDescription },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: theTitle },
      { property: "og:type", content: contentType || "website" },
      { property: "og:url", content: SITE_URL + pathname },
      { property: "og:image", content: theImage },
      { property: "og:description", content: theDescription },
    ];

    if (noCrawl) {
      metaTags.push({ name: "robots", content: "noindex, nofollow" });
    }
    if (published) {
      metaTags.push({ name: "article:published_time", content: published });
    }
    if (updated) {
      metaTags.push({ name: "article:modified_time", content: updated });
    }
    if (category) {
      metaTags.push({ name: "article:section", content: category });
    }
    if (tags) {
      metaTags.push({ name: "article:tag", content: tags });
    }

    return metaTags;
  }

  render() {
    const { children, id, pathname, ...rest } = this.props;

    const defaultBreadcrumbList = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://7mmedia.online",
      },
    ];

    const breadcrumb = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: rest.breadcrumbList || defaultBreadcrumbList,
    });

    return (
      <div id={id} className="MainContent">
        <Helmet
          htmlAttributes={{
            lang: "en",
            itemscope: undefined,
            itemtype: `https://schema.org/${rest.schema || "WebPage"}`,
          }}
          title={rest.title ? `${rest.title} — 7MMedia.online` : defaultTitle}
          link={[{ rel: "canonical", href: SITE_URL + pathname }]}
          meta={this.getMetaTags(rest, pathname)}
        />
        <Helmet>
          <script type="application/ld+json">{breadcrumb}</script>
        </Helmet>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Page);
