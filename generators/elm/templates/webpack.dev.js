const path = require('path')
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
<% if (pwa || serviceWorker) { %>
const {
    GenerateSW
} = require('workbox-webpack-plugin');<% } %>

module.exports = merge(common, {
  mode: "development",

  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: "elm-webpack-loader",
        options: {
            debug: true
        }
      },
      {
        test: /\.(css<% if (sass) { %>|sass|scss<% } %>)$/,
        use: ["style-loader", "css-loader"<% if (sass) { %>, "sass-loader"<% } %>]
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: "static",
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "static/index.html"
    }),
    new CopyWebpackPlugin([{
        from: path.join(__dirname, 'static')
    }]),
    <% if (pwa || serviceWorker) { %>new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
    }),<% } %>
  ]
});
