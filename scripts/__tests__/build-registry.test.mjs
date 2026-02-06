/**
 * Snapshot tests for the registry build output.
 *
 * Validates that import/export rewriting in registry files hasn't regressed,
 * and that registry.json structure (deps, file paths) is stable.
 *
 * Run: npm run test:registry
 * Update snapshots: npm run test:registry -- --test-update-snapshots
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { describe, before, test } from 'node:test'

const ROOT = path.resolve(import.meta.dirname, '../..')
const REGISTRY_DIR = path.join(ROOT, 'registry')

before(() => {
    execSync('node scripts/build-registry.mjs', { cwd: ROOT, stdio: 'pipe' })
})

/** Recursively collect all files matching a predicate */
function walk(dir, predicate) {
    const results = []
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            results.push(...walk(full, predicate))
        } else if (predicate(entry.name)) {
            results.push(full)
        }
    }
    return results.sort()
}

describe('registry build', () => {
    test('import/export lines match snapshot', (t) => {
        const tsFiles = walk(REGISTRY_DIR, (name) => /\.(ts|tsx)$/.test(name))
        const imports = {}

        for (const file of tsFiles) {
            const content = fs.readFileSync(file, 'utf-8')
            const lines = content
                .split('\n')
                .filter((l) => /^\s*(import|export)\s/.test(l))
            const rel = path.relative(ROOT, file)
            if (lines.length > 0) {
                imports[rel] = lines
            }
        }

        t.assert.snapshot(imports)
    })

    test('registry.json structure matches snapshot', (t) => {
        const registryJson = JSON.parse(
            fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf-8'),
        )

        // Snapshot the structural parts (names, deps, file targets) — not full paths
        // which could differ per machine
        const structure = registryJson.items.map((item) => ({
            name: item.name,
            type: item.type,
            dependencies: item.dependencies,
            registryDependencies: item.registryDependencies,
            fileTargets: item.files.map((f) => f.target),
        }))

        t.assert.snapshot(structure)
    })
})
