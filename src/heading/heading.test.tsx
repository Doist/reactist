import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Heading } from './heading'

describe('Heading', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Heading
                level="1"
                data-testid="heading-element"
                // @ts-expect-error className is intentionally unavailable
                className="wrong"
                exceptionallySetClassName="right"
            >
                Heading
            </Heading>,
        )

        expect(screen.getByTestId('heading-element')).toHaveClass('right')
        expect(screen.getByTestId('heading-element')).not.toHaveClass('wrong')
    })

    it.each([
        [1, 'H1', 'heading-1'],
        [2, 'H2', 'heading-2'],
        [3, 'H3', 'heading-3'],
        [4, 'H4', 'heading-4'],
        [5, 'H5', 'heading-4'],
        [6, 'H6', 'heading-4'],
    ] as const)('renders level %s as %s with %s', (level, tagName, variant) => {
        render(
            <Heading data-testid="heading-element" level={level}>
                Heading
            </Heading>,
        )
        const element = screen.getByTestId('heading-element')

        expect(element.tagName).toBe(tagName)
        expect(element).toHaveClass('variant-' + variant)
    })

    it('lets semantic level and visual variant differ', () => {
        render(
            <Heading data-testid="heading-element" level={2} variant="heading-1">
                Heading
            </Heading>,
        )
        const element = screen.getByTestId('heading-element')

        expect(element.tagName).toBe('H2')
        expect(element).toHaveClass('variant-heading-1')
    })

    it('requires an explicit variant for custom rendering', () => {
        render(
            <Heading
                data-testid="heading-element"
                variant="heading-2"
                render={<button type="button" />}
            >
                Edit title
            </Heading>,
        )

        expect(screen.getByRole('button', { name: 'Edit title' })).toHaveClass('variant-heading-2')
    })

    it('forwards its semantic heading ref', () => {
        const ref = React.createRef<HTMLHeadingElement>()

        render(
            <Heading level={2} ref={ref}>
                Heading
            </Heading>,
        )

        expect(ref.current?.tagName).toBe('H2')
    })

    it('renders its children as its content', () => {
        render(
            <Heading level="1" data-testid="heading-element">
                Hello <strong>world</strong>
            </Heading>,
        )

        expect(screen.getByTestId('heading-element').innerHTML).toMatchInlineSnapshot(
            `"Hello <strong>world</strong>"`,
        )
    })

    describe('tone="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Heading level="1" data-testid="heading-element" tone="normal">
                    Heading
                </Heading>,
            )
            const textElement = screen.getByTestId('heading-element')

            expect(textElement).not.toHaveClass('tone-normal')
            expect(textElement).not.toHaveClass('tone-secondary')
            expect(textElement).not.toHaveClass('tone-danger')

            for (const tone of ['secondary', 'danger'] as const) {
                rerender(
                    <Heading level="1" data-testid="heading-element" tone={tone}>
                        Heading
                    </Heading>,
                )
                expect(textElement).toHaveClass(`tone-${tone}`)
            }
        })
    })

    describe('align="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Heading level="1" data-testid="heading-element">
                    Heading
                </Heading>,
            )
            const textElement = screen.getByTestId('heading-element')

            expect(textElement).not.toHaveClass('textAlign-start')
            expect(textElement).not.toHaveClass('textAlign-center')
            expect(textElement).not.toHaveClass('textAlign-end')
            expect(textElement).not.toHaveClass('textAlign-justify')

            for (const align of ['start', 'center', 'end', 'justify'] as const) {
                rerender(
                    <Heading level="1" data-testid="heading-element" align={align}>
                        Heading
                    </Heading>,
                )
                expect(textElement).toHaveClass(`textAlign-${align}`)
            }
        })

        it('supports responsive values', () => {
            render(
                <Heading
                    level="1"
                    data-testid="heading-element"
                    align={{ mobile: 'start', tablet: 'center', desktop: 'end' }}
                >
                    Heading
                </Heading>,
            )
            const textElement = screen.getByTestId('heading-element')

            expect(textElement).toHaveClass('textAlign-start')
            expect(textElement).toHaveClass('tablet-textAlign-center')
            expect(textElement).toHaveClass('desktop-textAlign-end')
        })
    })

    describe('lineClamp="…"', () => {
        it('adds the expected class names', () => {
            const { rerender } = render(
                <Heading level="1" data-testid="heading-element">
                    Heading
                </Heading>,
            )
            const textElement = screen.getByTestId('heading-element')

            expect(textElement.className).not.toMatch(/lineClamp/)
            expect(textElement).not.toHaveClass('paddingRight-xsmall')

            for (const lineClamp of [1, '1'] as const) {
                rerender(
                    <Heading level="1" data-testid="heading-element" lineClamp={lineClamp}>
                        Heading
                    </Heading>,
                )
                expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
                expect(textElement).not.toHaveClass('lineClampMultipleLines')
                expect(textElement).toHaveClass('paddingRight-xsmall')
            }

            for (const lineClamp of [2, 3, 4, 5, '2', '3', '4', '5'] as const) {
                rerender(
                    <Heading level="1" data-testid="heading-element" lineClamp={lineClamp}>
                        Heading
                    </Heading>,
                )
                expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
                expect(textElement).toHaveClass('lineClampMultipleLines')
                expect(textElement).toHaveClass('paddingRight-xsmall')
            }
        })
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <Heading level={1}>Heading</Heading>
                    <Heading level={2}>Heading</Heading>
                    <Heading level={3}>Heading</Heading>
                    <Heading level={4}>Heading</Heading>
                    <Heading level={5}>Heading</Heading>
                    <Heading level={6}>Heading</Heading>
                    <Heading level={2} variant="heading-1">
                        Overridden heading
                    </Heading>
                    <Heading variant="heading-2" render={<button type="button" />}>
                        Button heading
                    </Heading>
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})

const invalidHeadingProps = (
    // @ts-expect-error level and render are mutually exclusive
    <Heading level={2} variant="heading-1" render={<button type="button" />}>
        Invalid
    </Heading>
)
// eslint-disable-next-line no-void
void invalidHeadingProps

const missingRenderVariant = (
    // @ts-expect-error custom render requires a variant
    <Heading render={<button type="button" />}>Invalid</Heading>
)
// eslint-disable-next-line no-void
void missingRenderVariant
