import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import styles from 'rollup-plugin-styles'
import terser from '@rollup/plugin-terser'
import { exec } from 'child_process'
import { visualizer } from 'rollup-plugin-visualizer'

const isWatchMode = process.env.ROLLUP_WATCH === 'true'
const onSuccessCallback = process.env.ON_SUCCESS

const external = [
    /@babel\/runtime/,
    'react',
    'react-dom',
    'react-compiler-runtime',
    'classnames',
    'prop-types',
    '@ariakit/react',
    'aria-hidden',
    'dayjs',
    'dayjs/plugin/localizedFormat',
    'react-focus-lock',
    'react-keyed-flatten-children',
    'use-callback-ref',
    'tslib',
]

const basePlugins = [
    resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    }),
    commonjs(),
    babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
    }),
]

const baseStylesConfig = {
    autoModules: /\.module\.css$/,
    modules: {
        mode: 'local',
        generateScopedName: '[hash:8]',
    },
    mode: 'extract',
    url: { inline: true },
}

const baseTypescriptConfig = {
    tsconfig: './tsconfig.dist.json',
}

// Plugin to run a command after successful build
function onSuccess(command) {
    return {
        name: 'on-success',
        closeBundle() {
            if (command) {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing command: ${error}`)
                        return
                    }
                    if (stdout) console.log(stdout)
                    if (stderr) console.error(stderr)
                })
            }
        },
    }
}

// Build configurations for es/, lib/, and dist/ folders
function createConfig({
    format,
    outputDir,
    outputFile,
    preserveModules,
    withDeclarations,
    withMinification,
    withVisualizer,
    onSuccessCommand,
}) {
    return {
        input: 'src/index.ts',
        output: {
            ...(outputFile ? { file: outputFile } : { dir: outputDir }),
            format,
            sourcemap: true,
            ...(preserveModules && {
                preserveModules: true,
                preserveModulesRoot: 'src',
                assetFileNames: '[name][extname]',
            }),
            ...(format === 'cjs' && { exports: 'named' }),
        },
        external,
        plugins: [
            ...basePlugins,
            styles({
                ...baseStylesConfig,
                ...(withMinification && { minimize: true }),
            }),
            ...(withDeclarations
                ? [
                      typescript({
                          ...baseTypescriptConfig,
                          noForceEmit: true,
                          compilerOptions: {
                              outDir: outputDir || 'dist',
                              declaration: true,
                              declarationMap: false,
                              emitDeclarationOnly: true,
                          },
                      }),
                  ]
                : []),
            ...(withMinification ? [terser()] : []),
            ...(withVisualizer ? [visualizer({ gzipSize: true })] : []),
            ...(onSuccessCommand ? [onSuccess(onSuccessCommand)] : []),
        ],
    }
}

// ESM unbundled build (es/ folder)
const es = createConfig({
    format: 'esm',
    outputDir: 'es',
    preserveModules: true,
    withVisualizer: true,
})

// CJS unbundled build with TypeScript declarations (lib/ folder)
const lib = createConfig({
    format: 'cjs',
    outputDir: 'lib',
    preserveModules: true,
    withDeclarations: true,
    ...(isWatchMode && onSuccessCallback && { onSuccessCommand: onSuccessCallback }),
})

// Generate dist/index.js proxy file
const distIndex = {
    input: 'src/index.ts',
    external: () => true,
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    plugins: [
        {
            name: 'write-dist-index',
            generateBundle(_, bundle) {
                for (const fileName in bundle) {
                    delete bundle[fileName]
                }

                this.emitFile({
                    type: 'asset',
                    fileName: 'index.js',
                    source: `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./reactist.cjs.production.min.js')
} else {
  module.exports = require('./reactist.cjs.development.js')
}
`,
                })
            },
        },
    ],
}

// Bundled CJS development build (dist/ folder)
const distDev = createConfig({
    format: 'cjs',
    outputFile: 'dist/reactist.cjs.development.js',
})

// Bundled CJS production build - minified (dist/ folder)
const distProd = createConfig({
    format: 'cjs',
    outputFile: 'dist/reactist.cjs.production.min.js',
    withMinification: true,
})

export default isWatchMode ? [es, lib, distIndex] : [es, lib, distDev, distProd]
