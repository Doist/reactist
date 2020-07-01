const path = require('path')
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const url = require('postcss-url')
const getComponentsMap = require('./scripts/buildHelpers').getComponentsMap

module.exports = {
    rollup(config, options) {
        if (config.output.format === 'esm') {
            config.input = {
                ...getComponentsMap(path.resolve(__dirname, './src/components')),
                index: path.resolve(__dirname, './src/index.ts'),
            }
            config.output.dir = 'dist'
            config.output.file = undefined
            config.output.entryFileNames = '[name]/index.js'
            config.output.hoistTransitiveImports = false
        }
        config.plugins.push(
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default',
                    }),
                    url({
                        url: 'inline',
                        maxSize: 10,
                        fallback: 'copy',
                    }),
                ],
                inject: false,
                extract: 'reactist.css',
            }),
        )
        return config
    },
}
