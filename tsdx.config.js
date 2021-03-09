const styles = require('rollup-plugin-styles')

module.exports = {
    rollup(config, options) {
        // Add rollup-plugin styles and process as CSS modules anything that is named "index.css"
        // Also inline all assets in CSS files using base64 encoding & data URLs.
        config.plugins = [
            styles({
                autoModules: /\.module\.css$/,
                modules: {
                    mode: 'local',
                    generateScopedName: '[hash:8]',
                },
                mode: 'extract',
                url: { inline: true },
            }),
        ].concat(config.plugins)

        // Bundled output is tsdx default, so we don't need to do anything special.
        if (process.env.BUNDLED_OUTPUT === 'true' && config.output.format === 'cjs') {
            return config
        }

        // These are for unbundled output in ESM (es/) and CJS (lib/) folders.
        if (config.output.format === 'esm') {
            config.output.dir = 'es'
        } else if (config.output.format === 'cjs') {
            config.output.dir = 'lib'
        }

        config.preserveModules = true
        // file is unset as now we code-split into different folders
        config.output.file = undefined
        config.output.assetFileNames = '[name][extname]'

        return config
    },
}
