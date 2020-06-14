module.exports = function(api) {
  api.cache(true);

  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": "> 0.25%",
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ],
      "@babel/preset-react",
      ["@babel/preset-typescript", { "allExtensions": true, "isTSX": true }],

    ],
    "plugins": [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@loadable/babel-plugin",
      "react-hot-loader/babel"
    ]
  };
};
