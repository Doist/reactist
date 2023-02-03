import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Heading } from './heading'
import { axe } from 'jest-axe'

describe('Heading', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Heading
                level="1"
                data-testid="heading-element"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Heading
            </Heading>,
        )
        expect(screen.getByTestId('heading-element')).toHaveClass('right')
        expect(screen.getByTestId('heading-element')).not.toHaveClass('wrong')
    })

    it('renders the expected heading tag name based on the level', () => {
        const { rerender } = render(
            <Heading data-testid="heading-element" level="1">
                Heading
            </Heading>,
        )
        expect(screen.getByTestId('heading-element').tagName).toBe('H1')

        for (const level of [2, 3, 4, 5, 6] as const) {
            rerender(
                <Heading data-testid="heading-element" level={level}>
                    Heading
                </Heading>,
            )
            expect(screen.getByTestId('heading-element').tagName).toBe(`H${level}`)
        }
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

    describe('size="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Heading level="1" data-testid="heading-element">
                    Heading
                </Heading>,
            )
            const textElement = screen.getByTestId('heading-element')
            expect(textElement).not.toHaveClass('size-smaller')
            expect(textElement).not.toHaveClass('size-larger')
            expect(textElement).not.toHaveClass('size-largest')

            for (const size of ['smaller', 'larger', 'largest'] as const) {
                rerender(
                    <Heading level={1} data-testid="heading-element" size={size}>
                        Heading
                    </Heading>,
                )
                expect(textElement).toHaveClass(`size-${size}`)
            }
        })
    })

    describe('weight="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Heading level="1" data-testid="heading-element" weight="regular">
                    Heading
                </Heading>,
            )
            const textElement = screen.getByTestId('heading-element')
            expect(textElement).not.toHaveClass('weight-regular')
            expect(textElement).not.toHaveClass('weight-light')

            rerender(
                <Heading level="1" data-testid="heading-element" weight="light">
                    Heading
                </Heading>,
            )
            expect(textElement).toHaveClass('weight-light')
        })
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
                expect(textElement).not.toHaveClass(`lineClampMultipleLines`)
                expect(textElement).toHaveClass('paddingRight-xsmall')
            }

            for (const lineClamp of [2, 3, 4, 5, '2', '3', '4', '5'] as const) {
                rerender(
                    <Heading level="1" data-testid="heading-element" lineClamp={lineClamp}>
                        Heading
                    </Heading>,
                )
                expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
                expect(textElement).toHaveClass(`lineClampMultipleLines`)
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
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
