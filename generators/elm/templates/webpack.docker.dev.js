const merge = require("webpack-merge");
const dev = require("./webpack.dev.js");

module.exports = merge(dev, {
  devServer: {
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    port: 8080,
    host: "0.0.0.0",
    public: "0.0.0.0",
    disableHostCheck: true,
    watchOptions: {
      poll: true
    }
  }
});
