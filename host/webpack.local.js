const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: "7000",
    historyApiFallback: true,
  },
  entry: {
    app: "/src/index.ts",
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "[name].dev.host.js",
    publicPath: "http://localhost:7000/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Host",
      template: "/public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "host_app",
      remotes: {
        childApp: 'child_app@http://localhost:7001/remoteEntry.js',
      },
    }),
    new ExternalTemplateRemotesPlugin(),
  ],
};
