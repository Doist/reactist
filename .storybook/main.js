const customWebpack = require('./webpack.config.js')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    siteUrl: 'https://github.com/Doist/reactist',
    addons: [
        '@storybook/addon-postcss',
        '@storybook/addon-options/register',
        '@storybook/addon-actions/register',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
            },
        },
        '@storybook/addon-controls',
    ],
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    webpackFinal: (config) => {
        const resolveConfig = {
            ...config.resolve,
        }

        return {
            ...config,
            resolve: resolveConfig,
            module: {
                ...config.module,
                rules: [...customWebpack.module.rules, ...config.module.rules],
            },
        }
    },
}
