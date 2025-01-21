import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Text } from './text'

describe('Text', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Text
                data-testid="text-element"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element')).toHaveClass('right')
        expect(screen.getByTestId('text-element')).not.toHaveClass('wrong')
    })

    it('can be rendered as any HTML element', () => {
        render(
            <Text data-testid="text-element" as="nav">
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element').tagName).toBe('NAV')
    })

    it('renders its children as its content', () => {
        render(
            <Text data-testid="text-element">
                Hello <strong>world</strong>
            </Text>,
        )
        expect(screen.getByTestId('text-element').innerHTML).toMatchInlineSnapshot(
            `"Hello <strong>world</strong>"`,
        )
    })

    describe('size="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Text data-testid="text-element" size="body">
                    Text
                </Text>,
            )
            const textElement = screen.getByTestId('text-element')
            expect(textElement).not.toHaveClass('size-body')
            expect(textElement).not.toHaveClass('size-caption')
            expect(textElement).not.toHaveClass('size-copy')
            expect(textElement).not.toHaveClass('size-subtitle')

            for (const size of ['caption', 'copy', 'subtitle'] as const) {
                rerender(
                    <Text data-testid="text-element" size={size}>
                        Text
                    </Text>,
                )
                expect(textElement).toHaveClass(`size-${size}`)
            }
        })
    })

    describe('weight="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Text data-testid="text-element" weight="regular">
                    Text
                </Text>,
            )
            const textElement = screen.getByTestId('text-element')
            expect(textElement).not.toHaveClass('weight-regular')
            expect(textElement).not.toHaveClass('weight-semibold')
            expect(textElement).not.toHaveClass('weight-bold')

            for (const weight of ['semibold', 'bold'] as const) {
                rerender(
                    <Text data-testid="text-element" weight={weight}>
                        Text
                    </Text>,
                )
                expect(textElement).toHaveClass(`weight-${weight}`)
            }
        })
    })

    describe('tone="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(
                <Text data-testid="text-element" tone="normal">
                    Text
                </Text>,
            )
            const textElement = screen.getByTestId('text-element')
            expect(textElement).not.toHaveClass('tone-normal')
            expect(textElement).not.toHaveClass('tone-secondary')
            expect(textElement).not.toHaveClass('tone-danger')

            for (const tone of ['secondary', 'danger'] as const) {
                rerender(
                    <Text data-testid="text-element" tone={tone}>
                        Text
                    </Text>,
                )
                expect(textElement).toHaveClass(`tone-${tone}`)
            }
        })
    })

    describe('align="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(<Text data-testid="text-element">Text</Text>)
            const textElement = screen.getByTestId('text-element')
            expect(textElement).not.toHaveClass('textAlign-start')
            expect(textElement).not.toHaveClass('textAlign-center')
            expect(textElement).not.toHaveClass('textAlign-end')
            expect(textElement).not.toHaveClass('textAlign-justify')

            for (const align of ['start', 'center', 'end', 'justify'] as const) {
                rerender(
                    <Text data-testid="text-element" align={align}>
                        Text
                    </Text>,
                )
                expect(textElement).toHaveClass(`textAlign-${align}`)
            }
        })

        it('supports responsive values', () => {
            render(
                <Text
                    data-testid="text-element"
                    align={{ mobile: 'start', tablet: 'center', desktop: 'end' }}
                >
                    Text
                </Text>,
            )
            const textElement = screen.getByTestId('text-element')
            expect(textElement).toHaveClass('textAlign-start')
            expect(textElement).toHaveClass('tablet-textAlign-center')
            expect(textElement).toHaveClass('desktop-textAlign-end')
        })
    })

    describe('lineClamp="…"', () => {
        it('adds the expected class names', () => {
            const { rerender } = render(<Text data-testid="text-element">Text</Text>)
            const textElement = screen.getByTestId('text-element')
            expect(textElement.className).not.toMatch(/lineClamp/)
            expect(textElement).not.toHaveClass('paddingRight-xsmall')

            for (const lineClamp of [1, '1'] as const) {
                rerender(
                    <Text data-testid="text-element" lineClamp={lineClamp}>
                        Text
                    </Text>,
                )
                expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
                expect(textElement).not.toHaveClass(`lineClampMultipleLines`)
                expect(textElement).toHaveClass('paddingRight-xsmall')
            }

            for (const lineClamp of [2, 3, 4, 5, '2', '3', '4', '5'] as const) {
                rerender(
                    <Text data-testid="text-element" lineClamp={lineClamp}>
                        Text
                    </Text>,
                )
                expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
                expect(textElement).toHaveClass(`lineClampMultipleLines`)
                expect(textElement).toHaveClass('paddingRight-xsmall')
            }
        })
    })
})
