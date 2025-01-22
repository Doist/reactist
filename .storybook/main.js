const customWebpack = require('./webpack.config.js')

module.exports = {
    stories: ['../src/**/*.stories.@(tsx|mdx)', '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    siteUrl: 'https://github.com/Doist/reactist',
    features: {
        // Needed for Chromatic/Storybooks interactive tests
        // See https://storybook.js.org/docs/react/writing-tests/interaction-testing
        // See https://www.chromatic.com/docs/interactions#how-to-write-interaction-tests
        interactionsDebugger: true,
    },
    addons: [
        '@storybook/addon-postcss',
        '@storybook/addon-actions',
        {
            name: '@storybook/addon-docs',
            options: { configureJSX: true },
        },
        '@storybook/addon-controls',
        '@geometricpanda/storybook-addon-badges',
        '@storybook/addon-interactions',
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
            // Storybook does not compile on WSL2 without this
            node: {
                fs: 'empty',
            },
            module: {
                ...config.module,
                rules: [
                    ...customWebpack.module.rules,
                    ...config.module.rules.flatMap((rule) => {
                        return rule.test instanceof RegExp && rule.test.test('.css')
                            ? [
                                  {
                                      ...rule,
                                      use: rule.use.map((useEntry) => {
                                          return useEntry.loader?.match(/\/css-loader/)
                                              ? {
                                                    ...useEntry,
                                                    options: {
                                                        ...useEntry.options,
                                                        modules: {
                                                            mode: 'local',
                                                            localIdentName:
                                                                process.env.NODE_ENV ===
                                                                'production'
                                                                    ? '[hash:base64:8]'
                                                                    : '[path][name]__[local]',
                                                        },
                                                        esModule: false,
                                                    },
                                                }
                                              : useEntry
                                      }),
                                  },
                                  {
                                      ...rule,
                                      test: /\.module\.css$/,
                                      exclude: /\.module\.css$/,
                                  },
                              ]
                            : [rule]
                    }),
                ],
            },
        }
    },
}
