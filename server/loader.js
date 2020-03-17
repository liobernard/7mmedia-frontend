import path from "path";
import fs from "fs";

import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import Loadable from "react-loadable";

import manifest from "../build/asset-manifest.json";
import configureStore from "../src/store";
import { RootComponent } from "../src/components";

export default (req, res) => {
  const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
    data = data.replace("<html>", `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace("</head>", `${meta}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
    );
    data = data.replace("</body>", scripts.join("") + "</body>");

    return data;
  };

  fs.readFile(
    path.resolve(__dirname, "../build/index.html"),
    "utf8",
    (err, htmlData) => {
      if (err) {
        console.error("Read error", err);
        return res.status(404).end();
      }

      const { store } = configureStore(req.url);

      const context = {};
      const modules = [];

      const renderMarkup = new Promise(resolve => {
        resolve(renderToString(
          <Loadable.Capture report={m => modules.push(m)}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <RootComponent></RootComponent>
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        ));
      }).then(routeMarkup => {
        if (context.url) {
          res.writeHead(302, { "Location": context.url });
          res.end();
        } else {
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace(".js", "")) > -1)
              .map(k => assets[k]);

          const extraChunks = extractAssets(manifest, modules).map(c =>
            `<script type="text/javascript" src="/${c.replace(/^\//, "")}"></script>`
          );

          const helmet = Helmet.renderStatic();

          console.log("THE TITLE", helmet.title.toString());

          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraChunks,
            state: JSON.stringify(store.getState()).replace(/</g, "\\u003c")
          });

          res.set({
            "Content-Type": "text/html",
            "Content-Language": "en"
          });

          res.send(html);
        }
      }).catch(error => {
        console.error("Render error", error);
        res.status(500).end();
      });
    }
  );
};
