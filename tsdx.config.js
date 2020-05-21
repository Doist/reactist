const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const url = require('postcss-url')

module.exports = {
    rollup(config, options) {
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
            })
        )
        return config
    },
}
