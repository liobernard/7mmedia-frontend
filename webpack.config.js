const { resolve } = require("path");
const { HashedModuleIdsPlugin, SourceMapDevToolPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const Dotenv = require("dotenv-webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;
  const PUBLIC_URL = process.env.PUBLIC_URL || "";
  const PORT = process.env.PORT || 3000;

  return {
    entry: {
      main: resolve("./src/index.js")
    },
    mode: argv.mode,
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: isProduction }
            }
          ]
        },
        {
          test: /\.module\.(s(a|c)|c)ss$/,
          loader: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: isDevelopment
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.(s(a|c)|c)ss$/,
          exclude: /\.module.(s(a|c)|c)ss$/,
          loader: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: isProduction
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            },
          ],
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: resolve("public/index.html"),
          },
          isProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, { PUBLIC_URL }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      }),
      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: PUBLIC_URL + "/"
      }),
      new Dotenv(),
      isProduction && new LoadablePlugin(),
      new HashedModuleIdsPlugin(),
      isProduction &&
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          exclude: [
            /\.map$/,
            /(asset-manifest|loadable-stats)\.json$/,
            /\.chunk\.js\.LICENSE\.txt$/
          ],
          inlineWorkboxRuntime: true,
          navigateFallback: PUBLIC_URL + "/index.html",
          navigateFallbackDenylist: [
            // Exclude URLs starting with /_, as they're likely an API call
            new RegExp('^/_'),
            // Exclude any URLs whose last part seems to be a file extension
            // as they're likely a resource and not a SPA route.
            // URLs containing a "?" character won't be blacklisted as they're likely
            // a route with query params (e.g. auth callbacks).
            new RegExp('/[^/?]+\\.[^/]+$'),
          ],
        }),
      isDevelopment &&
        new SourceMapDevToolPlugin({
          filename: "[file].map[query]",
          exclude: /npm\..*\.chunk\.js$/,
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [
        ".js", ".jsx", ".ts", ".tsx", ".scss", ".css",
        ".gif", ".png", ".jpg", ".jpeg", ".svg"
      ]
    },
    devServer: {
      contentBase: resolve(__dirname, "public"),
      hot: true,
      historyApiFallback: true,
      clientLogLevel: "error",
      port: PORT
    },
    output: {
      filename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : isDevelopment && "static/js/bundle.js",
      path: resolve(__dirname, "build"),
      publicPath: PUBLIC_URL + "/",
      chunkFilename: isProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isDevelopment && "static/js/[name].chunk.js",
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          extractComments: true,
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: isDevelopment
              ? {
                  // `inline: false` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true,
                }
              : false,
          },
          cssProcessorPluginOptions: {
            preset: ["default", { minifyFontValues: { removeQuotes: false } }],
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const moduleRegex = /[\\/]node_modules[\\/](.*?)([\\/]|$)/;
              const packageName = module.context.match(moduleRegex)[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
      // Keep the runtime chunk separated to enable long term caching
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
  };
};
