const baseConfig = require('./jest.config')

// Runs the Jest suite against React 18 by remapping react/react-dom to the aliased 18 packages.
module.exports = {
    ...baseConfig,
    moduleNameMapper: {
        ...baseConfig.moduleNameMapper,
        '^react$': 'react-18',
        '^react/(.*)$': 'react-18/$1',
        '^react-dom$': 'react-dom-18',
        '^react-dom/(.*)$': 'react-dom-18/$1',
    },
}
