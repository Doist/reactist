const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules"), "node_modules", "src"],
        extensions: [".webpack.js", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        hot: true,
        inline: true
    }
};