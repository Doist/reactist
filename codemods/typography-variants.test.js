const path = require('path')
const fs = require('fs')

const { applyTransform } = require('jscodeshift/dist/testUtils')
const j = require('jscodeshift').withParser('tsx')
const prettier = require('prettier/standalone')
const estree = require('prettier/plugins/estree')
const typescript = require('prettier/plugins/typescript')

const transform = require('./typography-variants')
const fixturesDirectory = path.join(__dirname, '__testfixtures__')

function format(source) {
    return prettier.format(source, {
        parser: 'typescript',
        plugins: [typescript, estree],
        arrowParens: 'always',
        printWidth: 100,
        semi: false,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: 'all',
    })
}

async function transformFixture(name) {
    const inputPath = path.join(fixturesDirectory, name + '.input.tsx')
    const source = fs.readFileSync(inputPath, 'utf8')
    const output = await applyTransform(transform, null, { path: inputPath, source })
    const expected = fs.readFileSync(path.join(fixturesDirectory, name + '.output.tsx'), 'utf8')

    expect(await format(output)).toBe(await format(expected))
    return output
}

test('transforms exact Text typography variants', async () => {
    await transformFixture('typography-variants-text')
})

test('transforms exact Heading typography variants', async () => {
    await transformFixture('typography-variants-heading')
})

test('marks ambiguous Text typography uses for manual migration', async () => {
    const output = await transformFixture('typography-variants-manual')

    expect(() => j(output)).not.toThrow()
})

test('reports every manual migration with file and line', () => {
    const source = fs.readFileSync(
        path.join(fixturesDirectory, 'typography-variants-manual.input.tsx'),
        'utf8',
    )
    const report = jest.fn()

    const output = transform(
        { path: 'src/manual.tsx', source },
        { jscodeshift: j, report, stats: jest.fn() },
        {},
    )

    expect(report).toHaveBeenCalledTimes(21)
    for (const [message] of report.mock.calls) {
        expect(message).toMatch(/^src\/manual\.tsx:\d+ /)
    }
    expect(() => j(output)).not.toThrow()
})
