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

function createApi(report = jest.fn(), stats = jest.fn()): API {
    return {
        j,
        jscodeshift: j,
        report,
        stats,
    }
}

async function transformSource(source: string, options = {}): Promise<string> {
    const output = transform({ path: 'src/example.tsx', source }, createApi(), options)

    expect(output).not.toBeNull()
    if (output === null) throw new Error('Expected transformed output')
    return format(output)
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

        it('migrates static as targets and retains ambiguous uses', async () => {
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
                expect.stringMatching(/dynamic Text as target$/),
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

        it('moves element props into render for static as targets', async () => {
            const source = `
                import * as React from 'react'
                import { Box, Text } from '@doist/reactist'

                const labelRef = React.createRef<HTMLElement>()

                export function Example() {
                    return (
                        <>
                            <Text
                                as="label"
                                htmlFor="name"
                                data-testid="name"
                                size="copy"
                                tone="secondary"
                                ref={labelRef}
                            >
                                Name
                            </Text>
                            <Text as={Box} display="inline" size="caption">
                                Box
                            </Text>
                            <Text as="span" children="Child" title="Title" />
                        </>
                    )
                }
            `
            const expected = `
                import * as React from 'react'
                import { Box, Text } from '@doist/reactist'

                const labelRef = React.createRef<HTMLElement>()

                export function Example() {
                    return (
                        <>
                            <Text
                                variant="callout-2"
                                render={<label htmlFor="name" data-testid="name" />}
                                tone="secondary"
                                ref={labelRef}
                            >
                                Name
                            </Text>
                            <Text variant="caption-3" render={<Box display="inline" />}>
                                Box
                            </Text>
                            <Text render={<span title="Title" />} children="Child" />
                        </>
                    )
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('maps finite conditional size and weight expressions', async () => {
            const source = `
                import { Text } from '@doist/reactist'

                export function Example({ compact, selected, strong }) {
                    return (
                        <>
                            <Text size={compact ? 'copy' : 'body'}>Size</Text>
                            <Text weight={selected ? 'semibold' : 'regular'}>Weight</Text>
                            <Text size={\`caption\`} weight={strong ? 'bold' : undefined}>
                                Optional weight
                            </Text>
                        </>
                    )
                }
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export function Example({ compact, selected, strong }) {
                    return (
                        <>
                            <Text variant={compact ? 'callout-2' : 'body-3'}>Size</Text>
                            <Text variant={selected ? 'body-2' : 'body-3'}>Weight</Text>
                            <Text variant={strong ? 'caption-1' : 'caption-3'}>
                                Optional weight
                            </Text>
                        </>
                    )
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('maps two finite conditional props without repeating their tests', async () => {
            const source = `
                import { Text } from '@doist/reactist'

                export function Example({ compact, selected }) {
                    return (
                        <Text
                            size={compact ? 'copy' : 'body'}
                            weight={selected ? 'semibold' : 'regular'}
                        >
                            Copy
                        </Text>
                    )
                }
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export function Example({ compact, selected }) {
                    return (
                        <Text
                            variant={compact
                                ? selected
                                    ? 'callout-1'
                                    : 'callout-2'
                                : selected
                                  ? 'body-2'
                                  : 'body-3'}
                        >
                            Copy
                        </Text>
                    )
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
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
                expect.stringMatching(/^line \d+: indirect Heading reference$/),
                expect.stringMatching(/^line \d+: indirect Heading reference$/),
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

        it('maps finite conditional Heading sizes', async () => {
            const source = `
                import { Heading } from '@doist/reactist'

                export function Example({ large }) {
                    return <Heading level={1} size={large ? 'larger' : 'smaller'}>Title</Heading>
                }
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export function Example({ large }) {
                    return (
                        <Text variant={large ? 'header-2' : 'subheader-1'} render={<h1 />}>
                            Title
                        </Text>
                    )
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('uses one Text import for direct Heading and Display JSX', async () => {
            const source = `
                import { Display, Heading, Text } from '@doist/reactist'

                export function Example() {
                    return (
                        <>
                            <Heading level={1}>Title</Heading>
                            <Display variant="display-1">Hero</Display>
                            <Text>Body</Text>
                        </>
                    )
                }
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export function Example() {
                    return (
                        <>
                            <Text variant="header-3" render={<h1 />}>Title</Text>
                            <Text variant="display-1">Hero</Text>
                            <Text>Body</Text>
                        </>
                    )
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('merges direct components when Text uses a separate import declaration', async () => {
            const source = `
                import { Heading } from '@doist/reactist'
                import { Text } from '@doist/reactist'

                export const Example = () => (
                    <>
                        <Heading level={1}>Title</Heading>
                        <Text>Body</Text>
                    </>
                )
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export const Example = () => (
                    <>
                        <Text variant="header-3" render={<h1 />}>Title</Text>
                        <Text>Body</Text>
                    </>
                )
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('upgrades an inline type-only Text import when consolidating direct components', async () => {
            const source = `
                import { Heading, type Text } from '@doist/reactist'

                export function Example() {
                    return <Heading level={1}>Title</Heading>
                }
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export function Example() {
                    return <Text variant="header-3" render={<h1 />}>Title</Text>
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('upgrades a type-only Text import declaration when consolidating direct components', async () => {
            const source = `
                import type { Text, TextProps } from '@doist/reactist'
                import { Heading } from '@doist/reactist'

                type Tone = TextProps['tone']

                export function Example() {
                    return <Heading level={1}>Title</Heading>
                }
            `
            const expected = `
                import { Text, type TextProps } from '@doist/reactist'

                type Tone = TextProps['tone']

                export function Example() {
                    return <Text variant="header-3" render={<h1 />}>Title</Text>
                }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('removes an unused legacy import without adding a conflicting Text import', async () => {
            const source = `
                import { Heading } from '@doist/reactist'

                const Text = () => null
                export { Text }
            `
            const expected = `
                const Text = () => null
                export { Text }
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })
    })

    describe('manual migration reports', () => {
        it('keeps self-closing JSX intact when it adds a TODO', () => {
            const source = `
                import { Text } from '@doist/reactist'

                export function Example({ size }) {
                    return <Text size={size} />
                }
            `
            const output = transform({ path: 'src/example.tsx', source }, createApi(), {})

            expect(output).toContain('TODO(reactist-codemod): dynamic Text size')
            expect(output).toContain('<Text size={size} />')
            expect(output).not.toContain('</Text>')
        })

        it('reports legacy TextProps property references precisely', () => {
            const source = `
                import { type TextProps } from '@doist/reactist'

                type Size = TextProps['size']
                type Props = Pick<TextProps, 'size' | 'tone' | 'weight'>
                type Tone = TextProps['tone']
            `
            const report = jest.fn()

            const output = transform({ path: 'src/types.ts', source }, createApi(report), {})

            expect(output).toContain(
                "TODO(reactist-codemod): TextProps['size'] uses a removed Text prop",
            )
            expect(output).toContain(
                'TODO(reactist-codemod): Pick<TextProps> includes removed size and weight props',
            )
            expect(report.mock.calls.map(([message]) => message)).toEqual([
                expect.stringMatching(/TextProps\['size'\] uses a removed Text prop$/),
                expect.stringMatching(/Pick<TextProps> includes removed size and weight props$/),
            ])
        })

        it('reports aliased TextProps property references', () => {
            const source = `
                import { type TextProps as LegacyTextProps } from '@doist/reactist'

                type Size = LegacyTextProps['size']
                type Props = Pick<LegacyTextProps, 'size' | 'weight'>
                type Tone = LegacyTextProps['tone']
            `
            const report = jest.fn()

            const output = transform({ path: 'src/types.ts', source }, createApi(report), {})

            expect(output).toContain(
                "TODO(reactist-codemod): LegacyTextProps['size'] uses a removed Text prop",
            )
            expect(output).toContain(
                'TODO(reactist-codemod): Pick<LegacyTextProps> includes removed size and weight props',
            )
            expect(report).toHaveBeenCalledTimes(2)
        })

        it('marks oversized conditional size and weight combinations for manual migration', () => {
            const source = `
                import { Text } from '@doist/reactist'

                export function Example({ a, b, c, d, e, f, g }) {
                    return (
                        <Text
                            size={a ? 'body' : b ? 'copy' : c ? 'caption' : d ? 'subtitle' : 'body'}
                            weight={e ? 'bold' : f ? 'semibold' : g ? 'regular' : 'bold'}
                        >
                            Too many combinations
                        </Text>
                    )
                }
            `
            const output = transform({ path: 'src/example.tsx', source }, createApi(), {})

            expect(output).toContain(
                'TODO(reactist-codemod): dynamic Text size; dynamic Text weight',
            )
            expect(output).not.toContain('variant=')
        })

        it('records manual totals and reason categories', () => {
            const source = `
                import { Text } from '@doist/reactist'
                export const Example = ({ size }) => <Text size={size} />
            `
            const stats = jest.fn()

            transform({ path: 'src/example.tsx', source }, createApi(jest.fn(), stats), {})

            expect(stats.mock.calls).toEqual([
                ['manual migrations'],
                ['manual reason: dynamic Text size'],
            ])
        })

        it('can fail a dry run when manual migrations remain', () => {
            const source = `
                import { Text } from '@doist/reactist'
                export const Example = ({ size }) => <Text size={size} />
            `

            expect(() =>
                transform({ path: 'src/example.tsx', source }, createApi(), {
                    'fail-on-manual': true,
                }),
            ).toThrow('1 manual migration remains in src/example.tsx')
        })

        it('fails strict repeat runs while an existing TODO remains', () => {
            const source = `
                import { Text } from '@doist/reactist'
                export const Example = ({ size }) => (
                    /* TODO(reactist-codemod): dynamic Text size */
                    <Text size={size} />
                )
            `

            expect(() =>
                transform({ path: 'src/example.tsx', source }, createApi(), {
                    'fail-on-manual': true,
                }),
            ).toThrow('1 manual migration remains in src/example.tsx')
        })

        it('fails strict runs for existing TODOs after the Reactist import is removed', () => {
            const source = `
                /* TODO(reactist-codemod): dynamic Text size */
                export const size = 'body'
            `

            expect(() =>
                transform({ path: 'src/example.ts', source }, createApi(), {
                    'fail-on-manual': true,
                }),
            ).toThrow('1 manual migration remains in src/example.ts')
        })
    })

    describe('source filtering', () => {
        it('does not parse files that cannot use the transform', () => {
            const invalidTypeScript = `
                declare module '*.svg' {
                    export { ReactComponent }
                }
            `

            expect(
                transform(
                    { path: 'src/@types/global/assets/svg.d.ts', source: invalidTypeScript },
                    createApi(),
                    {},
                ),
            ).toBeNull()
        })

        it('transforms files whose Reactist import spans lines before the module name', async () => {
            const source = `
                import { Text }
                from '@doist/reactist'

                export const Example = () => (
                    <Text size="caption" weight="bold">
                        Caption
                    </Text>
                )
            `
            const expected = `
                import { Text } from '@doist/reactist'

                export const Example = () => <Text variant="caption-1">Caption</Text>
            `

            expect(await transformSource(source)).toBe(await format(expected))
        })

        it('detects multi-line Reactist re-exports', () => {
            const source = `
                export { Heading }
                from '@doist/reactist'
            `
            const output = transform({ path: 'src/reexport.ts', source }, createApi(), {})

            expect(output).toContain(
                'TODO(reactist-codemod): re-exported Heading requires manual migration',
            )
        })

        it('does not parse invalid files that only mention Reactist in data', () => {
            const invalidTypeScript = `
                const packageName = '@doist/reactist'
                export { ReactComponent }
            `

            expect(
                transform({ path: 'src/data.ts', source: invalidTypeScript }, createApi(), {}),
            ).toBeNull()
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

        it('reports every manual migration with its line', () => {
            const source = fs.readFileSync(
                path.join(fixturesDirectory, 'text-variants-manual.input.tsx'),
                'utf8',
            )
            const report = jest.fn()

            const output = transform({ path: 'src/manual.tsx', source }, createApi(report), {})

            expect(report).toHaveBeenCalledTimes(16)
            for (const [message] of report.mock.calls) {
                expect(message).toMatch(/^line \d+: /)
            }
            expect(output).not.toBeNull()
            if (output === null) throw new Error('Expected manual migration output')
            expect(() => j(output)).not.toThrow()
        })
    })
})
