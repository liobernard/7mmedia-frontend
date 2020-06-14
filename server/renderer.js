const path = require("path");
const fs = require("fs");

const React = require("react");
const ChunkExtractor = require("@loadable/server").ChunkExtractor;
const renderToString = require("react-dom/server").renderToString;
const Helmet = require("react-helmet").Helmet;
const Provider = require("react-redux").Provider;
const matchPath = require("react-router").matchPath;
const StaticRouter = require("react-router").StaticRouter;

const configureStore = require("../src/store").default;
const routes = require("../src/routes").default;
const RootComponent = require("../src/components").default;


const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
  data = data.replace("<html>", `<html ${html}>`);
  data = data.replace(/<title>.*?<\/title>/g, title);
  data = data.replace("</head>", `${meta}</head>`);
  data = data.replace(
    /<div id="root">.*<\/body>/,
    `<div id="root">${
      body
    }</div><script>window.__PRELOADED_STATE__ = ${
      state
    }</script>${
      scripts
    }</body>`
  );

  return data;
};

exports = module.exports;

exports.render = (req, res, next) => {
  const match = routes.find(route => (
    matchPath(req.path, { path: route.path, exact: true })
  ));

  const is404 = req._possible404;
  
  if (match || is404) {
    const filePath = path.resolve(__dirname, "../build/index.html");

    fs.readFile(filePath, "utf8", (err, htmlData) => {
      if (err) {
        console.error("Read error", err);
        return res.status(404).end();
      }

      const context = {};
      const location = req.url;
      const { store } = configureStore(req.url);

      const statsFile = path.resolve("./build/loadable-stats.json");
      const extractor = new ChunkExtractor({ statsFile });

      const renderMarkup = new Promise((resolve) => {
        resolve(renderToString(() => extractor.collectChunks(
          <Provider store={store}>
            <StaticRouter location={location} context={context}>
              <RootComponent />
            </StaticRouter>
          </Provider>
        )));
      });

      renderMarkup.then((routeMarkup) => {
        if (context.url) {
          res.writeHead(302, { Location: context.url });
          res.end();
        } else {
          const helmet = Helmet.renderStatic();
          console.log("THE TITLE", helmet.title.toString());

          const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: `${
              helmet.meta.toString() +
              extractor.getLinkTags() +
              extractor.getStyleTags()
            }`,
            body: routeMarkup,
            scripts: extractor.getScriptTags(),
            state: JSON.stringify(store.getState()).replace(/</g, "\\u003c"),
          });

          const headers = {
            "Content-Language": "en",
            "Content-Type": "text/html"
          };

          if (is404) {
            res.writeHead(404, headers);
            console.log(`SSR of unrouted path ${req.path} (404 ahead)`);
          } else {
            res.writeHead(200, headers);
            console.log(`SSR of ${req.path}`);
          }

          return res.end(html);
        }
      })
      .catch((error) => {
        console.error("Render error", error);
        res.status(500).end();
      });
    });
  } else {
    req._possible404 = true;
    return next();
  }
};
