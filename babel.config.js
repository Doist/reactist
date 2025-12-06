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
            },
        ],
        '@babel/proposal-object-rest-spread',
    ],
}
