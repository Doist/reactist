/**
 * Prepares source files for shadcn registry build.
 *
 * Copies component source files to registry/ directory with import paths
 * rewritten from relative (../box) to alias-based (@reactist/ui/box).
 *
 * Run via: npm run build:registry
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'src')
const REGISTRY_DIR = path.join(ROOT, 'registry')

// Import path mappings: relative source path → registry alias
// Components in src/<name>/ → @reactist/ui/<name>
// Utils in src/utils/ → @reactist/lib/<name>
// Styles in src/styles/ → @reactist/styles/<name>

const UTIL_FILES = ['common-types', 'common-helpers', 'responsive-props', 'polymorphism']

/**
 * Maps a relative import path from a source file to its @reactist alias.
 * @param {string} importPath - The relative import path (e.g. '../box', '../utils/common-types')
 * @param {string} sourceFile - The absolute path of the file containing the import
 * @returns {string|null} The rewritten path, or null if no rewrite needed
 */
function rewriteImport(importPath, sourceFile) {
    // Only rewrite relative imports
    if (!importPath.startsWith('.')) return null

    // Resolve to absolute path
    const sourceDir = path.dirname(sourceFile)
    const resolved = path.resolve(sourceDir, importPath)
    const relative = path.relative(SRC, resolved)

    // utils/* → @reactist/lib/*
    if (relative.startsWith('utils/')) {
        const name = relative.replace('utils/', '')
        return `@reactist/lib/${name}`
    }

    // styles/* → @reactist/styles/*
    if (relative.startsWith('styles/')) {
        const name = relative.replace('styles/', '')
        return `@reactist/styles/${name}`
    }

    // CSS module imports (same directory) - keep relative
    if (importPath.endsWith('.css') || importPath.endsWith('.module.css')) {
        return null
    }

    // Component directories → @reactist/ui/*
    const parts = relative.split('/')
    if (parts.length >= 1) {
        return `@reactist/ui/${parts[0]}`
    }

    return null
}

/**
 * Rewrites all import/require paths in a TypeScript/JavaScript source string.
 */
function rewriteImports(source, sourceFile) {
    // Match: import ... from '...' / import '...' / export ... from '...'
    return source.replace(
        /((?:import|export)\s+(?:(?:type\s+)?(?:\{[^}]*\}|[^'"]*)\s+from\s+)?['"])([^'"]+)(['"])/g,
        (match, prefix, importPath, suffix) => {
            const rewritten = rewriteImport(importPath, sourceFile)
            if (rewritten) {
                return `${prefix}${rewritten}${suffix}`
            }
            return match
        },
    )
}

/**
 * Copies a source file to the registry directory, rewriting imports.
 * @param {string} srcPath - Absolute path to source file
 * @param {string} destPath - Absolute path to destination
 */
function copyWithRewrite(srcPath, destPath) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true })

    const ext = path.extname(srcPath)
    if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        const content = fs.readFileSync(srcPath, 'utf-8')
        const rewritten = rewriteImports(content, srcPath)
        fs.writeFileSync(destPath, rewritten)
    } else {
        // CSS, etc - copy as-is
        fs.copyFileSync(srcPath, destPath)
    }
}

/**
 * Registry item definitions. Each item maps to a shadcn registry entry.
 * @type {Array<{name: string, type: string, srcDir: string, files: string[], registryDependencies?: string[], dependencies?: string[]}>}
 */
const REGISTRY_ITEMS = []

// Build registry
function build() {
    // Clean
    fs.rmSync(REGISTRY_DIR, { recursive: true, force: true })

    for (const item of REGISTRY_ITEMS) {
        const srcDir = path.join(SRC, item.srcDir)
        for (const file of item.files) {
            const srcPath = path.join(srcDir, file)
            const destDir = item.type === 'registry:file' ? 'styles' : item.srcDir.startsWith('utils') ? 'lib' : 'ui'
            const destPath = path.join(REGISTRY_DIR, destDir, item.name, file)
            copyWithRewrite(srcPath, destPath)
        }
    }

    // Generate registry.json with file paths pointing to registry/ dir
    const registryJson = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: 'reactist',
        homepage: 'https://github.com/Doist/reactist',
        items: REGISTRY_ITEMS.map((item) => ({
            name: item.name,
            type: item.type,
            dependencies: item.dependencies || [],
            registryDependencies: item.registryDependencies || [],
            files: item.files.map((file) => {
                const destDir = item.type === 'registry:file' ? 'styles' : item.srcDir.startsWith('utils') ? 'lib' : 'ui'
                const registryPath = `registry/${destDir}/${item.name}/${file}`
                const isCss = file.endsWith('.css')
                const isHook = file.startsWith('use-') || file.startsWith('use.')
                const fileType = isCss ? 'registry:file' : isHook ? 'registry:hook' : 'registry:component'
                const entry = { path: registryPath, type: fileType }
                if (isCss) {
                    entry.target = `components/reactist/${destDir}/${item.name}/${file}`
                }
                return entry
            }),
        })),
    }

    fs.writeFileSync(path.join(ROOT, 'registry.json'), JSON.stringify(registryJson, null, 4) + '\n')

    console.log(`Built ${REGISTRY_ITEMS.length} registry items`)
}

build()
