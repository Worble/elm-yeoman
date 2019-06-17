const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: [
            <% if (typescript) { %> './src/index.ts' <% } else { %> './src/index.js'<% } %>
        ]
    },<% if (typescript) { %>
    
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['ts-loader'],
            exclude: /node_modules/
        }]
    },<% } %>
    
    resolve: {
        extensions: [".js", <% if (typescript) { %> ".ts", <% } %>".elm", ".css"<% if (sass) { %>, ".scss" <% } %>]
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
};