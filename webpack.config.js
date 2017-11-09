const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "reactist.js",
        library: 'reactist',
        libraryTarget: 'umd',
        sourceMapFilename: "reactist.map"
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules"), "node_modules", "src"],
        extensions: [".webpack.js", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.svg$/, loader: 'svg-url-loader' }
        ]
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
