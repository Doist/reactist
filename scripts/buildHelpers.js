const fs = require('fs')

const getComponentsMap = componentsDir => {
    return fs
        .readdirSync(componentsDir)
        .filter(f => f.match(/[A-Z].*\.jsx/)) // matches all jsx files starting with capital letter
        .map(f => f.split('.')[0]) // only retain file name without ending
        .reduce((map, componentName) => {
            map[componentName] = `${componentsDir}/${componentName}`
            return map
        }, {}) // create a map like this { 'Button': './src/comps/Button' }
}

export { getComponentsMap }
