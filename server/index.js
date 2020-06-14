require("ignore-styles");
require("core-js/stable");
require("regenerator-runtime/runtime");
require("@babel/register")({
  ignore: [/\/(build|node_modules)\//],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-modules-commonjs",
    "@loadable/babel-plugin",
    "dynamic-import-node",
    [
      "transform-assets",
      {
        "extensions": [
          ".css", ".scss", ".jpg", ".jpeg",
          ".gif", ".png", ".svg", ".tff"
        ],
        "name": "static/media/[name].[contenthash:8].[ext]"
      }
    ]
  ]
});

require("./server");
