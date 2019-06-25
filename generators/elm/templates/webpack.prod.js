const path = require('path')
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
<% if (pwa || serviceWorker) { %>const {
    GenerateSW
} = require('workbox-webpack-plugin');<% } %>
<% if (compression) { %>const CompressionPlugin = require("compression-webpack-plugin");<% } %>

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

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
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { sourceMap: true }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }<% if (sass) { %>,
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }<% } %>
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          sourceMap: true,
          map: {
            inline: false, // set to false if you want CSS source maps
            annotation: true
          }
        }
      })
    ]
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].min.css",
      chunkFilename: "[id].[contenthash].min.css"
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
    <% if (pwa || serviceWorker) { %>new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        importWorkboxFrom: 'local'
    }),<% } %>
    <% if (compression) { %>new CompressionPlugin({
        deleteOriginalAssets: true<% if (brotli) { %>,
        algorithm: "brotliCompress"<% } %>
    }),<% } %>
  ]
});
