const customWebpack = require('./webpack.config.js')

module.exports = {
    stories: ['../src/**/*.stories.(tsx|mdx)', '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
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
        '@geometricpanda/storybook-addon-badges',
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
