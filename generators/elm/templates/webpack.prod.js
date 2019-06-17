const path = require('path')
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
<% if (pwa || serviceWorker) { %>
const {
    GenerateSW
} = require('workbox-webpack-plugin');<% } %>

module.exports = merge(common, {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: "elm-webpack-loader",
        options: {
          optimize: true
        }
      },
      {
        test: /\.(css<% if (sass) { %>|sass|scss<% } %>)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", <% if (sass) { %>"sass-loader"<% } %>]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
      chunkFilename: "[id].min.css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    }),
    new HtmlWebpackPlugin({
      template: "static/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CopyWebpackPlugin([{
        from: path.join(__dirname, 'static')
    }]),
    <% if (pwa || serviceWorker) { %>
    new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        importWorkboxFrom: 'local'
    })<% } %>
  ]
});
