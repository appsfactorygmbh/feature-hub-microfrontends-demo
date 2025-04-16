const path = require("path");

module.exports = {
  entry: {
    "feature-app": "./src/index.tsx",
  },
  externals: { react: "react", "react-dom": "react-dom" },
  output: {
    filename: "feature-app-react.umd.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    publicPath: "/",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@apps": path.resolve(__dirname, ".."),
    },
  },
  devServer: {
    port: 8000,
    static: "./dist",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
  },
};
