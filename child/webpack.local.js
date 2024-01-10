const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { RetryChunkLoadPlugin } = require("webpack-retry-chunk-load-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: "7001",
    historyApiFallback: true,
  },
  entry: {
    app: "./src/index",
  },
  output: {
    filename: "[name].dev.remote.js",
    publicPath: "http://localhost:7001/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({ overlay: false }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Child App",
    }),
    new ModuleFederationPlugin({
      name: "child_app",
      filename: "remoteEntry.js",
      exposes: {
        "./childApp": "./src/bootstrapRemote",
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new RetryChunkLoadPlugin({
      cacheBust: `function () {
        return Date.now();
      }`,
      retryDelay: `function (retryAttempt) {
        return retryAttempt * 100;
      }`,
      maxRetries: 5,
    }),
  ],
};
