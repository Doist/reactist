// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// Babel configuration for transpiling modern JS features in node_modules
const babelConfigForNodeModules = {
    presets: [['@babel/preset-env', { targets: { browsers: 'defaults, not IE 11' } }]],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
}

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
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
            {
                test: /\.(m?jsx?|tsx?)$/,
                // Exclude all node_modules from transpilation, except for Ariakit and Storybook testing libraries
                exclude: /node_modules\/(?!(ariakit.*|@storybook\/expect|@storybook\/jest|@adobe\/css-tools|@testing-library\/jest-dom)\/).*/,
                use: [{ loader: 'babel-loader', options: babelConfigForNodeModules }],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
                use: [{ loader: 'babel-loader', options: babelConfigForNodeModules }],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.svg'],
    },
}
