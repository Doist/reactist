const styles = require('rollup-plugin-styles')

module.exports = {
    rollup(config, options) {
        if (config.output.format === 'esm') {
            config.output.dir = 'es'
        } else {
            config.output.dir = 'dist'
        }
        config.preserveModules = true
        config.output.file = undefined
        config.output.assetFileNames = '[name][extname]'
        config.output.chunkFileNames = '[name]'
        config.plugins = [
            styles({
                autoModules: /index/,
                mode: 'extract',
                url: { inline: true },
            }),
        ].concat(config.plugins)

        return config
    },
}
