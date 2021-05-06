// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
    plugins: [],
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'raw-loader',
            },
            {
                test: /\.less$/,
                sideEffects: true,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: { auto: true }, esModule: false } },
                    'less-loader',
                ],
            },
            {
                test: /\.module\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName:
                                    process.env.NODE_ENV === 'production'
                                        ? '[hash:base64:8]'
                                        : '[path][name]__[local]',
                            },
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.svg'],
    },
}
