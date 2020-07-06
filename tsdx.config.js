const styles = require('rollup-plugin-styles')

module.exports = {
    rollup(config, options) {
        if (config.output.format === 'esm') {
            config.output.dir = 'es'
            config.preserveModules = true
            // file is unset as now we code-split into different folders
            config.output.file = undefined
            config.output.assetFileNames = '[name][extname]'
        } else if (config.output.format === 'cjs') {
        }

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
