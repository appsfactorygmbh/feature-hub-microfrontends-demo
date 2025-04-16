const path = require("path");
const webpack = require("webpack");
const { AngularWebpackPlugin } = require("@ngtools/webpack");

module.exports = {
  entry: {},
  output: {
    filename: "feature-app-angular.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "@ngtools/webpack",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ["to-string-loader", "style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    port: 4200,
    static: "./dist",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
  },
  plugins: [
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, "tsconfig.app.json"),
    }),
    new webpack.container.ModuleFederationPlugin({
      name: "__feature_hub_feature_app_module_container__",
      exposes: {
        featureAppModule: path.join(__dirname, "./src/main.ts"),
      },
    }),
  ],
};
