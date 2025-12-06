const test = process.env.NODE_ENV === 'test'

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: test ? { node: 'current' } : { browsers: 'defaults, not IE 11' },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'babel-plugin-react-compiler',
            {
                // Support React 17 as a minimum
                target: '17',
                logger: {
                    /**
                     * @param {string | null} filename
                     * @param {import('babel-plugin-react-compiler').LoggerEvent} event
                     */
                    logEvent(filename, event) {
                        if (
                            event.kind === 'CompileError' ||
                            event.kind === 'CompileSkip' ||
                            event.kind === 'PipelineError'
                        ) {
                            if (event.kind === 'CompileError') {
                                console.warn(
                                    `\n[React Compiler] \x1b[33mCompilation skipped\x1b[0m: ${filename}`,
                                )
                            }

                            if (event.detail?.reason) {
                                console.error(`Reason: ${event.detail.reason}`)
                            }

                            if (event.detail?.description) {
                                console.error(`Details: ${event.detail.description}`)
                            }

                            if (event.detail.primaryLocation) {
                                const sourceLocation = event.detail.primaryLocation()

                                if (sourceLocation?.start) {
                                    console.error(
                                        `Location: Line ${sourceLocation.start.line}, Column ${sourceLocation.start.column}`,
                                    )
                                }
                            }

                            if (event.detail?.suggestions?.length) {
                                console.error('Suggestions:')
                                for (const suggestion of event.detail.suggestions) {
                                    console.error(`• ${suggestion.description}`)
                                }
                            }

                            if (event.data) {
                                console.error(`Data: ${event.data}`)
                            }
                        }
                    },
                },
            },
        ],
        '@babel/proposal-object-rest-spread',
        [
            '@babel/plugin-transform-runtime',
            {
                // Prevent helpers from being inlined in the output code
                // https://babeljs.io/docs/babel-plugin-transform-runtime#version
                version: '^7.28.4',
            },
        ],
    ],
}
