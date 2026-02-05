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

// Consumer target base path — where files end up in the consumer project.
// Consumer adds tsconfig path: "@reactist/*" → ["./src/components/reactist/*"]
const TARGET_BASE = 'src/components/reactist'

/**
 * Maps a relative import path from a source file to its @reactist alias.
 * @param {string} importPath - The relative import path (e.g. '../box', '../utils/common-types')
 * @param {string} sourceFile - The absolute path of the file containing the import
 * @returns {string|null} The rewritten path, or null if no rewrite needed
 */
function rewriteImport(importPath, sourceFile) {
    // Only rewrite relative imports
    if (!importPath.startsWith('.')) return null

    // CSS module imports - always keep relative
    if (importPath.endsWith('.css') || importPath.endsWith('.module.css')) {
        return null
    }

    // Resolve to absolute path
    const sourceDir = path.dirname(sourceFile)
    const resolved = path.resolve(sourceDir, importPath)
    const relative = path.relative(SRC, resolved)
    const sourceRelative = path.relative(SRC, sourceFile)

    // Same-directory imports (sibling files) - keep relative
    // e.g. spinner/index.ts importing ./spinner → stays ./spinner
    const sourceComponent = sourceRelative.split('/')[0]
    const targetComponent = relative.split('/')[0]
    if (sourceComponent === targetComponent && !relative.includes('/utils/') && !relative.includes('/styles/')) {
        return null
    }

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

    // icons/* → @reactist/ui/icons/*
    if (relative.startsWith('icons/')) {
        return `@reactist/ui/${relative}`
    }

    // Component directories → @reactist/ui/<component-dir>
    // If importing a specific file (not the dir index), preserve the subpath
    const parts = relative.split('/')
    if (parts.length >= 2) {
        // e.g. banner/banner → @reactist/ui/banner/banner (specific file)
        return `@reactist/ui/${relative}`
    }
    if (parts.length === 1) {
        // e.g. box → @reactist/ui/box (directory, resolves to index)
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
 * @param {string} virtualSrcPath - Optional: pretend the file is at this path for import resolution
 *   (used for extraFiles that are moved to a different component directory)
 */
function copyWithRewrite(srcPath, destPath, virtualSrcPath) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true })

    const ext = path.extname(srcPath)
    if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        const content = fs.readFileSync(srcPath, 'utf-8')
        const rewritten = rewriteImports(content, virtualSrcPath || srcPath)
        fs.writeFileSync(destPath, rewritten)
    } else {
        fs.copyFileSync(srcPath, destPath)
    }
}

// ─── Registry item definitions ───────────────────────────────────────────────
// Each item: { name, srcDir, files[], category, registryDependencies?, dependencies? }
// category: 'styles' | 'lib' | 'ui'

const REGISTRY_ITEMS = [
    // Layer 0: Foundation
    {
        name: 'design-tokens',
        srcDir: 'styles',
        files: ['design-tokens.css'],
        category: 'styles',
    },
    {
        name: 'common-types',
        srcDir: 'utils',
        files: ['common-types.ts'],
        category: 'lib',
        dependencies: ['classnames'],
    },
    {
        name: 'common-helpers',
        srcDir: 'utils',
        files: ['common-helpers.ts'],
        category: 'lib',
    },
    {
        name: 'responsive-props',
        srcDir: 'utils',
        files: ['responsive-props.ts'],
        category: 'lib',
    },
    {
        name: 'polymorphism',
        srcDir: 'utils',
        files: ['polymorphism.ts'],
        category: 'lib',
        registryDependencies: ['common-types'],
    },

    // Layer 1: Primitives
    {
        name: 'spinner',
        srcDir: 'spinner',
        files: ['index.ts', 'spinner.tsx', 'spinner.module.css'],
        category: 'ui',
        registryDependencies: ['design-tokens'],
    },
    {
        name: 'close-icon',
        srcDir: 'icons',
        files: ['close-icon.tsx'],
        category: 'ui/icons',
    },
    {
        name: 'alert-icon',
        srcDir: 'icons',
        files: ['alert-icon.tsx'],
        category: 'ui/icons',
        registryDependencies: ['common-types'],
    },
    {
        name: 'password-icons',
        srcDir: 'icons',
        files: ['password-hidden-icon.tsx', 'password-visible-icon.tsx'],
        category: 'ui/icons',
    },

    // Layer 2: Core layout
    {
        name: 'box',
        srcDir: 'box',
        files: ['index.ts', 'box.tsx', 'box.module.css', 'gap.module.css', 'margin.module.css', 'padding.module.css', 'width.module.css'],
        category: 'ui',
        registryDependencies: ['polymorphism', 'responsive-props', 'common-types', 'design-tokens'],
        dependencies: ['classnames'],
    },
    {
        name: 'hidden-visually',
        srcDir: 'hidden-visually',
        files: ['index.ts', 'hidden-visually.tsx', 'hidden-visually.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'polymorphism'],
    },
    {
        name: 'hidden',
        srcDir: 'hidden',
        files: ['index.ts', 'hidden.tsx', 'hidden.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'polymorphism', 'responsive-props'],
    },
    {
        name: 'divider',
        srcDir: 'divider',
        files: ['index.ts', 'divider.tsx', 'divider.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'responsive-props', 'common-types'],
    },
    {
        name: 'heading',
        srcDir: 'heading',
        files: ['index.ts', 'heading.tsx', 'heading.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'responsive-props', 'common-types'],
    },
    {
        name: 'text',
        srcDir: 'text',
        files: ['index.ts', 'text.tsx', 'text.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'polymorphism', 'responsive-props', 'common-types'],
    },
    {
        name: 'stack',
        srcDir: 'stack',
        files: ['index.ts', 'stack.tsx'],
        category: 'ui',
        registryDependencies: ['box', 'divider', 'polymorphism', 'responsive-props', 'common-types'],
        dependencies: ['react-keyed-flatten-children'],
    },
    {
        name: 'inline',
        srcDir: 'inline',
        files: ['index.ts', 'inline.tsx'],
        category: 'ui',
        registryDependencies: ['box', 'polymorphism', 'responsive-props', 'common-types'],
    },
    {
        name: 'columns',
        srcDir: 'columns',
        files: ['index.ts', 'columns.tsx', 'columns.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'polymorphism', 'responsive-props', 'common-types'],
    },

    // Layer 3: Interactive components
    {
        name: 'tooltip',
        srcDir: 'tooltip',
        files: ['index.ts', 'tooltip.tsx', 'tooltip.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'common-types'],
        dependencies: ['@ariakit/react'],
    },
    {
        name: 'button',
        srcDir: 'button',
        files: ['index.ts', 'button.tsx', 'button.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'spinner', 'tooltip', 'common-types'],
        dependencies: ['@ariakit/react', 'classnames'],
    },
    {
        name: 'text-link',
        srcDir: 'text-link',
        files: ['index.ts', 'text-link.tsx', 'text-link.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'polymorphism', 'common-types'],
    },
    {
        name: 'badge',
        srcDir: 'badge',
        files: ['index.ts', 'badge.tsx', 'badge.module.css'],
        category: 'ui',
        registryDependencies: ['box'],
    },
    {
        name: 'avatar',
        srcDir: 'avatar',
        files: ['index.ts', 'avatar.tsx', 'avatar.module.css', 'utils.ts'],
        category: 'ui',
        registryDependencies: ['box', 'responsive-props', 'common-types'],
    },
    {
        name: 'loading',
        srcDir: 'loading',
        files: ['index.ts', 'loading.tsx'],
        category: 'ui',
        registryDependencies: ['box', 'spinner', 'common-types'],
    },
    {
        name: 'prose',
        srcDir: 'prose',
        files: ['index.ts', 'prose.tsx', 'prose.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'common-types'],
        dependencies: ['marked'],
    },

    // Layer 4: Form fields
    {
        name: 'base-field',
        srcDir: 'base-field',
        files: ['index.ts', 'base-field.tsx', 'base-field.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'columns', 'spinner', 'stack', 'text', 'common-helpers', 'common-types'],
    },
    {
        name: 'text-field',
        srcDir: 'text-field',
        files: ['index.ts', 'text-field.tsx', 'text-field.module.css'],
        category: 'ui',
        registryDependencies: ['base-field', 'box'],
        dependencies: ['use-callback-ref'],
    },
    {
        name: 'text-area',
        srcDir: 'text-area',
        files: ['index.ts', 'text-area.tsx', 'text-area.module.css'],
        category: 'ui',
        registryDependencies: ['base-field', 'box'],
        dependencies: ['classnames', 'use-callback-ref'],
    },
    {
        name: 'select-field',
        srcDir: 'select-field',
        files: ['index.ts', 'select-field.tsx', 'select-field.module.css'],
        category: 'ui',
        registryDependencies: ['base-field', 'box'],
    },
    {
        name: 'checkbox-field',
        srcDir: 'checkbox-field',
        files: ['index.ts', 'checkbox-field.tsx', 'checkbox-field.module.css', 'checkbox-icon.tsx', 'use-fork-ref.ts'],
        category: 'ui',
        registryDependencies: ['box', 'text'],
    },
    {
        name: 'switch-field',
        srcDir: 'switch-field',
        files: ['index.ts', 'switch-field.tsx', 'switch-field.module.css'],
        category: 'ui',
        registryDependencies: ['base-field', 'box', 'hidden-visually', 'stack', 'text', 'common-helpers'],
    },
    {
        name: 'password-field',
        srcDir: 'password-field',
        files: ['index.ts', 'password-field.tsx'],
        category: 'ui',
        registryDependencies: ['button', 'text-field', 'password-icons', 'base-field'],
    },

    // Banner icon (separate item; has type-only import from banner but no registryDep
    // to avoid circular dep — banner always brings in banner-icon via its own deps)
    {
        name: 'banner-icon',
        srcDir: 'icons',
        files: ['banner-icon.tsx', 'banner-icon.module.css'],
        category: 'ui/icons',
    },

    // Layer 5: Complex components
    {
        name: 'banner',
        srcDir: 'banner',
        files: ['index.ts', 'banner.tsx', 'banner.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'button', 'text-link', 'banner-icon', 'close-icon', 'common-helpers'],
    },
    {
        name: 'notice',
        srcDir: 'notice',
        files: ['index.ts', 'notice.tsx', 'notice.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'columns', 'alert-icon', 'responsive-props', 'common-types'],
    },
    {
        name: 'menu',
        srcDir: 'menu',
        // NOTE: menu.less will become menu.module.css after rebasing on the less migration branch
        files: ['index.ts', 'menu.tsx', 'menu.less'],
        category: 'ui',
        registryDependencies: ['common-types'],
        dependencies: ['@ariakit/react', 'classnames'],
    },
    {
        name: 'tabs',
        srcDir: 'tabs',
        files: ['index.ts', 'tabs.tsx', 'tabs.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'inline', 'common-types'],
        dependencies: ['@ariakit/react', 'classnames'],
    },
    {
        name: 'modal',
        srcDir: 'modal',
        files: ['index.ts', 'modal.tsx', 'modal.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'button', 'columns', 'divider', 'close-icon', 'inline', 'common-types'],
        dependencies: ['@ariakit/react', 'react-focus-lock', 'aria-hidden', 'classnames'],
    },
    {
        name: 'toast',
        srcDir: 'toast',
        files: ['index.ts', 'static-toast.tsx', 'use-toasts.tsx', 'toast-animation.ts', 'toast.module.css'],
        category: 'ui',
        registryDependencies: ['box', 'button', 'stack', 'text', 'close-icon', 'common-helpers', 'common-types'],
        dependencies: ['@ariakit/react'],
    },
]

// ─── Build ───────────────────────────────────────────────────────────────────

function build() {
    // Clean
    fs.rmSync(REGISTRY_DIR, { recursive: true, force: true })

    for (const item of REGISTRY_ITEMS) {
        const srcDir = path.join(SRC, item.srcDir)
        for (const file of item.files) {
            const srcPath = path.join(srcDir, file)
            const destPath = path.join(REGISTRY_DIR, item.category, item.name, file)
            copyWithRewrite(srcPath, destPath)
        }
        // Extra files from other source directories bundled into this item
        // Use virtual source path so imports resolve relative to the target component
        if (item.extraFiles) {
            for (const extra of item.extraFiles) {
                const srcPath = path.join(SRC, extra.srcDir, extra.file)
                const destPath = path.join(REGISTRY_DIR, item.category, item.name, extra.file)
                const virtualSrcPath = path.join(SRC, item.srcDir, extra.file)
                copyWithRewrite(srcPath, destPath, virtualSrcPath)
            }
        }
    }

    // Generate registry.json
    const registryJson = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: 'reactist',
        homepage: 'https://github.com/Doist/reactist',
        items: REGISTRY_ITEMS.map((item) => ({
            name: item.name,
            type: 'registry:file',
            dependencies: item.dependencies || [],
            registryDependencies: item.registryDependencies || [],
            files: [
                ...item.files.map((file) => ({
                    path: `registry/${item.category}/${item.name}/${file}`,
                    type: 'registry:file',
                    target: `${TARGET_BASE}/${item.category}/${item.name}/${file}`,
                })),
                ...(item.extraFiles || []).map((extra) => ({
                    path: `registry/${item.category}/${item.name}/${extra.file}`,
                    type: 'registry:file',
                    target: `${TARGET_BASE}/${item.category}/${item.name}/${extra.file}`,
                })),
            ],
        })),
    }

    fs.writeFileSync(path.join(ROOT, 'registry.json'), JSON.stringify(registryJson, null, 4) + '\n')
    console.log(`Built ${REGISTRY_ITEMS.length} registry items`)
}

build()
