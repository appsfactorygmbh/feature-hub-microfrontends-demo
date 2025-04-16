const path = require("path");
const webpack = require("webpack");
const { AngularWebpackPlugin } = require("@ngtools/webpack");

module.exports = {
  entry: {
    "feature-app": "./src/main.ts",
  },
  externals: {},
  output: {
    filename: "feature-app-angular.umd.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    publicPath: "/",
    globalObject: "this",
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
  ],
};
