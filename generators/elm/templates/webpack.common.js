const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
<% if (pwa || serviceWorker) { %>const {
	GenerateSW
} = require('workbox-webpack-plugin');<% } %>


module.exports = {
    entry: {
        app: [
            <% if (typescript) { %>path.resolve(__dirname, "src", "index.ts")<% } else { %>path.resolve(__dirname, "src", "index.js")<% } %>
        ]
    },    
    module: {
			rules: [{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}, <% if (typescript) { %>{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			}<% } %>]
    },    
    resolve: {
			extensions: [".js", <% if (typescript) { %>".ts", <% } %>".elm", ".css" <% if (sass) { %>,".scss" <% } %>]
    },
    output: {
			filename: '[id].[hash].js',
			path: path.join(__dirname, 'dist')
    },
    plugins: [
			new CleanWebpackPlugin(),
			new webpack.ProgressPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'src', 'index.html')
			}),
			new CopyWebpackPlugin([{
					from: path.join(__dirname, 'static')
			}])<% if (pwa || serviceWorker) { %>,
			new GenerateSW({
				clientsClaim: true,
				skipWaiting: true,
			}),<% } %>
    ]
};