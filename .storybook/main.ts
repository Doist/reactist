import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: [
        '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
        '../stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    addons: ['@storybook/addon-docs'],
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    async viteFinal(config) {
        const { mergeConfig } = await import('vite')
        return mergeConfig(config, {
            css: {
                modules: {
                    generateScopedName:
                        process.env.NODE_ENV === 'production'
                            ? '[hash:base64:8]'
                            : '[path][name]__[local]',
                },
            },
        })
    },
}

export default config
