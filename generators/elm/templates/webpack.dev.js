const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: 'elm-hot-webpack-loader' },
          {
            loader:"elm-webpack-loader",
            options: {
              debug: true
            }
          }
        ]
      },
      {
        test: /\.(css<% if (sass) { %>|sass|scss<% } %>)$/,
        use: ["style-loader", "css-loader"<% if (sass) { %>, "sass-loader"<% } %>]
      }
    ]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: "static",
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
});
