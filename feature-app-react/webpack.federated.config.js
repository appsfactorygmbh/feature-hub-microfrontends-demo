const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {},
  output: {
    filename: 'feature-app-react.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@apps': path.resolve(__dirname, '..'),
    },
  },
  devServer: {
    port: 8000,
    static: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: '__feature_hub_feature_app_module_container__',
      exposes: {
        featureAppModule: path.join(__dirname, './src/index.tsx'),
      },
      shared: {
        react: { singleton: true },
      },
    }),
  ],
}
