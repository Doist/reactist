const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "reactist.js",
        sourceMapFilename: "reactist.map"
    },
    resolve: {
        modules: ["node_modules", "src"],
        extensions: [".webpack.js", ".js", ".jsx"]
    },
    module: {
        // rules: [
        //     { enforce: "pre", test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader" }
        // ],
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};