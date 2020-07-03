const path = require('path')
const webpack = require('webpack')
const getComponentsMap = require('./scripts/buildHelpers').getComponentsMap
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const BASE_CONFIG = {
    entry: './src/index.js',
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'reactist.js',
        library: 'reactist',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        sourceMapFilename: 'reactist.map',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules', 'src'],
        extensions: ['.webpack.js', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader', options: { modules: { auto: true } } },
                    { loader: 'less-loader' },
                ],
            },
            {
                test: /\.svg$/,
                use: [{ loader: 'svg-url-loader' }],
            },
        ],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
        dayjs: 'dayjs',
        classnames: 'classnames',
        'prop-types': 'prop-types',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
        }),
    ],
}

const createConfig = (overriddenAttributes) => ({
    ...BASE_CONFIG,
    ...overriddenAttributes,
})

const modulesConfig = createConfig({
    entry: getComponentsMap(path.resolve(__dirname, './src/components')),
    devtool: false,
    optimization: {
        minimize: false,
    },
    output: {
        ...BASE_CONFIG.output,
        path: path.resolve(__dirname, 'dist'),
        filename: 'umd/[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name]/index.css',
        }),
    ],
})

module.exports = modulesConfig
