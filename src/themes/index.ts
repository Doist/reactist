import fs from 'fs'
import path from 'path'
import twistLight from './twistLight'
import twistDark from './twistDark'

const themes = { twistLight, twistDark }

const GENERATED_THEME_HEADER = `
//This is an auto-generated themes definition file. Do not edit manually!
//To make changes during development, run \`npm run start\` or
//\`npm run storybook\`\n
`

function compileThemeProperties() {
    const underscore = (camelCasedWord: string) => {
        const strPath = camelCasedWord.split('::')
        let i = 0
        const j = strPath.length

        for (; i < j; i++) {
            strPath[i] = strPath[i].replace(new RegExp('([A-Z])', 'g'), '_$1')
            strPath[i] = strPath[i].replace(new RegExp('^_'), '')
        }

        return strPath.join('/').toLowerCase()
    }

    const dasherize = (underscoredWord: string) => {
        return underscoredWord.replace(/_/g, '-')
    }

    /**
     * Generates CSS vars out of the above typescript definition.
     */
    return Object.entries(themes).reduce((compiledKeys, [themeKey, themeProps]) => {
        compiledKeys += `.reactist_theme_${underscore(themeKey)} {\n`
        Object.entries<string>(themeProps).forEach(([propKey, propValue]) => {
            compiledKeys += `  --${dasherize(underscore(propKey))}: ${propValue};\n`
        })
        compiledKeys += '}\n'
        return compiledKeys
    }, '')
}

const lessFilePath = path.join(__dirname, 'themes.less')
fs.writeFileSync(lessFilePath, `${GENERATED_THEME_HEADER}${compileThemeProperties()}`)
console.log('Theme LESS file generated.')
