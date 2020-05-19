const styles = require('rollup-plugin-styles')

module.exports = {
    rollup(config, options) {
        config.plugins = [
            styles({
                mode: ['extract'],
                include: ['**/*.less', '**/*.css'],
            }),
            ...config.plugins,
        ]

        return config
    },
}
