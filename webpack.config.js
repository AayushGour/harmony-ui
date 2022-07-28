const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: "./src/index",
    mode: "development",
    output: {
        // filename: "bundle.js", 
        // path: "./dist", 
        // assetModuleFilename: "assets/^[hash^]^[ext^]^[query^]", 
        // publicPath: "auto",
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        allowedHosts: "auto",
        compress: true,
        hot: true,
        port: 3000,
        open: true,
        client: {
            logging: "info",
        },
        historyApiFallback: true,
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    performance: {
        maxAssetSize: 3000000,
        maxEntrypointSize: 3000000
    },
    // devtool: "eval",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/env", "@babel/react"]
                }
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.json$/,
                type: 'json'
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "public/assets/", to: "assets/" }
            ]
        }),
        new NodePolyfillPlugin()
    ]
} 
