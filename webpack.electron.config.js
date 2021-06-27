const path = require("path");
const webpack = require('webpack');


module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: "./electron/main.ts",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
            },
          },  
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    // new webpack.IgnorePlugin({ resourceRegExp: /^aws-sdk$/ }),
    // new webpack.IgnorePlugin({ resourceRegExp: /^mock-aws-s3$/ }),
    // new webpack.IgnorePlugin({ resourceRegExp: /^nock$/ }),
  ],
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
