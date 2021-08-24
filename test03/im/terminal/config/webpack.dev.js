var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var { merge } = require("webpack-merge");
var common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "../build"),
        publicPath: "./",
        filename: "[name].[fullhash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../index.html"),
            inject: "body",
            xhtml: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css",
            chunkFilename: "[id].css"
        }),
        new BrowserSyncPlugin(
            {
                host: "0.0.0.0",
                port: 3456,
                server: {
                    baseDir: [
                        path.resolve(__dirname, "../build")
                    ]
                }
            }, {
                reload: true
            }
        )
    ]
})
