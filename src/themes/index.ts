/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const twistLight = require('./twistLight')
const twistDark = require('./twistDark')

const themes = { twistLight, twistDark }

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
        Object.entries(themeProps).forEach(([propKey, propValue]) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            compiledKeys += `  --${dasherize(underscore(propKey))}: ${propValue};\n`
        })
        compiledKeys += '}\n'
        return compiledKeys
    }, '')
}

fs.writeFileSync(`${__dirname}/themes.less`, compileThemeProperties())
console.log('Theme LESS file generated.')
