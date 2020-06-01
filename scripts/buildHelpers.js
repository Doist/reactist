const fs = require('fs')

function getComponentsMap(componentsDir) {
    return fs
        .readdirSync(componentsDir)
        .filter((f) => f.match(/[A-Z].*\.tsx/)) // matches all jsx files starting with capital letter
        .map((f) => f.split('.')[0]) // only retain file name without ending
        .reduce((map, componentName) => {
            map[componentName] = `${componentsDir}/${componentName}.tsx`
            return map
        }, {}) // create a map like this { 'Button': './src/comps/Button.tsx' }
}

module.exports = { getComponentsMap }
