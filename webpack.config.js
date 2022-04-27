const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: {
        index: "./src/javascript/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" 
    },
    plugins:  [
        new HtmlWebpackPlugin({
            title: "To do list || The odin project",
            template: './src/index.html'
        }),
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, "dist"),
        open: true
    },
    mode: "development"
}
