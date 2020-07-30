import fs from 'fs'
import path from 'path'

import dasherize from '../utils/dasherize'
import underscore from '../utils/underscore'

import { themes } from './config'

const GENERATED_THEME_HEADER = `
//This is an auto-generated themes definition file. Do not edit manually!
//To make changes during development, run \`npm run start\` or
//\`npm run storybook\`\n
`

function compileThemeProperties() {
    /**
     * Generates CSS vars out of the above typescript definition.
     */
    return Object.entries(themes).reduce((compiledKeys, [themeKey, themeProps]) => {
        compiledKeys += `:root[data-reactist-theme='${underscore(themeKey)}'] {\n`
        Object.entries<string>(themeProps).forEach(([propKey, propValue]) => {
            compiledKeys += `  --reactist-${dasherize(underscore(propKey))}: ${propValue};\n`
        })
        compiledKeys += '}\n'
        return compiledKeys
    }, '')
}

const lessFilePath = path.join(__dirname, 'themes.less')
fs.writeFileSync(lessFilePath, `${GENERATED_THEME_HEADER}${compileThemeProperties()}`)
console.log('Theme LESS file generated.')

export { themes }
