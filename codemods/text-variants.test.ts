import * as fs from 'node:fs'
import * as path from 'node:path'

import jscodeshift from 'jscodeshift'
import { applyTransform } from 'jscodeshift/dist/testUtils'
import * as estree from 'prettier/plugins/estree'
import * as typescript from 'prettier/plugins/typescript'
import * as prettier from 'prettier/standalone'

import * as transformModule from './text-variants'

import type { API } from 'jscodeshift'
import type { Plugin } from 'prettier'

const j = jscodeshift.withParser('tsx')
const transform = transformModule.default
const fixturesDirectory = path.join(__dirname, '__testfixtures__')

function format(source: string): Promise<string> {
    return prettier.format(source, {
        parser: 'typescript',
        plugins: [typescript, estree as Plugin],
        arrowParens: 'always',
        printWidth: 100,
        semi: false,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: 'all',
    })
}

async function transformFixture(name: string): Promise<string> {
    const inputPath = path.join(fixturesDirectory, name + '.input.tsx')
    const source = fs.readFileSync(inputPath, 'utf8')
    const output = applyTransform(transformModule, null, { path: inputPath, source })
    const expected = fs.readFileSync(path.join(fixturesDirectory, name + '.output.tsx'), 'utf8')

    expect(await format(output)).toBe(await format(expected))
    return output
}

function createApi(report = jest.fn()): API {
    return {
        j,
        jscodeshift: j,
        report,
        stats: jest.fn(),
    }
}

describe('text variants codemod', () => {
    describe('Text', () => {
        it('maps documented legacy variants', async () => {
            expect(await transformFixture('text-variants-text')).toBeTruthy()
        })

        it('marks ambiguous uses for manual migration', async () => {
            const output = await transformFixture('text-variants-manual')

            expect(() => j(output)).not.toThrow()
        })

        it('retains unsafe legacy element and mixed props for manual migration', async () => {
            const output = await transformFixture('text-variants-safety')

            expect(() => j(output)).not.toThrow()
        })

        it('reports unsafe legacy element and mixed props', () => {
            const source = fs.readFileSync(
                path.join(fixturesDirectory, 'text-variants-safety.input.tsx'),
                'utf8',
            )
            const report = jest.fn()

            transform({ path: 'src/safety.tsx', source }, createApi(report), {})

            expect(report.mock.calls.map(([message]) => message)).toEqual([
                expect.stringMatching(
                    /Text as migration requires no props besides size or weight$/,
                ),
                expect.stringMatching(
                    /Text as migration requires no props besides size or weight$/,
                ),
                expect.stringMatching(/dynamic Text as target$/),
                expect.stringMatching(/Text as component requires manual render props$/),
                expect.stringMatching(/Text mixes variant with legacy size or weight props$/),
                expect.stringMatching(
                    /Heading mixes variant or render with legacy level, size, or weight props$/,
                ),
                expect.stringMatching(
                    /Heading mixes variant or render with legacy level, size, or weight props$/,
                ),
                expect.stringMatching(/duplicate Heading variant props$/),
                expect.stringMatching(/duplicate Heading render props$/),
            ])
        })
    })

    describe('Heading and Display', () => {
        it('maps documented legacy Heading variants', async () => {
            expect(await transformFixture('text-variants-heading')).toBeTruthy()
        })

        it('maps every consolidated variant to Text', async () => {
            const output = await transformFixture('text-variants-consolidated-components')
            const secondOutput = transform(
                { path: 'src/consolidated-components.tsx', source: output },
                createApi(),
                {},
            )

            expect(secondOutput).toBeNull()
        })

        it('migrates direct Heading uses and marks indirect references', async () => {
            const output = await transformFixture('text-variants-indirect-heading')
            const report = jest.fn()

            const secondOutput = transform(
                { path: 'src/indirect-heading.tsx', source: output },
                createApi(report),
                {},
            )

            expect(secondOutput).toBeNull()
            expect(report).not.toHaveBeenCalled()
        })

        it('ignores unrelated Heading property and type keys', async () => {
            expect(await transformFixture('text-variants-heading-name-keys')).toBeTruthy()
        })

        it('reports indirect Heading references', () => {
            const source = fs.readFileSync(
                path.join(fixturesDirectory, 'text-variants-indirect-heading.input.tsx'),
                'utf8',
            )
            const report = jest.fn()

            transform({ path: 'src/indirect-heading.tsx', source }, createApi(report), {})

            expect(report.mock.calls.map(([message]) => message)).toEqual([
                expect.stringMatching(
                    /^src\/indirect-heading\.tsx:\d+ indirect Heading reference$/,
                ),
                expect.stringMatching(
                    /^src\/indirect-heading\.tsx:\d+ indirect Heading reference$/,
                ),
            ])
        })

        it('marks removed types and namespace references', async () => {
            const output = await transformFixture('text-variants-types-and-namespace')
            const report = jest.fn()

            const secondOutput = transform(
                { path: 'src/types-and-namespace.tsx', source: output },
                createApi(report),
                {},
            )

            expect(output).toContain('type Text as Heading')
            expect(secondOutput).toBeNull()
            expect(report).not.toHaveBeenCalled()
        })
    })

    describe('repeat runs', () => {
        it('leaves consolidated Heading aliases unchanged', () => {
            const source = fs.readFileSync(
                path.join(fixturesDirectory, 'text-variants-idempotence.input.tsx'),
                'utf8',
            )
            const report = jest.fn()

            const output = transform({ path: 'src/idempotence.tsx', source }, createApi(report), {})

            expect(output).toBeNull()
            expect(report).not.toHaveBeenCalled()
        })

        it('leaves reported manual migrations unchanged', () => {
            const source = fs.readFileSync(
                path.join(fixturesDirectory, 'text-variants-manual.output.tsx'),
                'utf8',
            )
            const report = jest.fn()

            const output = transform({ path: 'src/manual.tsx', source }, createApi(report), {})

            expect(output).toBeNull()
            expect(report).not.toHaveBeenCalled()
        })

        it('reports every manual migration with file and line', () => {
            const source = fs.readFileSync(
                path.join(fixturesDirectory, 'text-variants-manual.input.tsx'),
                'utf8',
            )
            const report = jest.fn()

            const output = transform({ path: 'src/manual.tsx', source }, createApi(report), {})

            expect(report).toHaveBeenCalledTimes(16)
            for (const [message] of report.mock.calls) {
                expect(message).toMatch(/^src\/manual\.tsx:\d+ /)
            }
            expect(output).not.toBeNull()
            if (output === null) throw new Error('Expected manual migration output')
            expect(() => j(output)).not.toThrow()
        })
    })
})
