import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Text } from './text'

import type { TextProps } from './text'

const textVariants = [
    'subheader-1',
    'subheader-2',
    'body-1',
    'body-2',
    'body-3',
    'callout-1',
    'callout-2',
    'caption-1',
    'caption-2',
    'caption-3',
    'footnote-1',
    'footnote-2',
] as const

const decoratedTextProps = [
    { variant: 'subheader-1', decoration: 'strikethrough' },
    { variant: 'subheader-2', decoration: 'strikethrough' },
    { variant: 'body-3', decoration: 'strikethrough' },
    { variant: 'callout-1', decoration: 'strikethrough' },
    { variant: 'callout-2', decoration: 'strikethrough' },
    { variant: 'caption-2', decoration: 'strikethrough' },
    { variant: 'caption-2', decoration: 'underline' },
    { variant: 'caption-3', decoration: 'strikethrough' },
    { variant: 'caption-3', decoration: 'underline' },
] as const satisfies ReadonlyArray<
    Omit<Extract<TextProps, { decoration: 'strikethrough' | 'underline' }>, 'children'>
>

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

    it('defaults to body-3', () => {
        render(<Text data-testid="text-element">Text</Text>)
        expect(screen.getByTestId('text-element')).toHaveClass('variant-body-3')
    })

    it.each(textVariants)('applies the %s variant', (variant) => {
        render(
            <Text data-testid="text-element" variant={variant}>
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element')).toHaveClass('variant-' + variant)
    })

    it('renders through Ariakit Role', () => {
        render(
            <Text data-testid="text-element" variant="body-1" render={<label htmlFor="name" />}>
                Name
            </Text>,
        )
        const element = screen.getByTestId('text-element')
        expect(element.tagName).toBe('LABEL')
        expect(element).toHaveAttribute('for', 'name')
    })

    it('forwards its ref', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(<Text ref={ref}>Text</Text>)
        expect(ref.current?.tagName).toBe('DIV')
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

    it.each(decoratedTextProps)('supports $variant with $decoration', (textProps) => {
        render(
            <Text data-testid="text-element" {...textProps}>
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element')).toHaveClass('decoration-' + textProps.decoration)
    })

    it('supports uppercase only for footnote-1', () => {
        render(
            <Text data-testid="text-element" variant="footnote-1" case="uppercase">
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element')).toHaveClass('case-uppercase')
    })

    it('rejects invalid modifiers at type level', () => {
        const invalidTextModifier = (
            // @ts-expect-error body-1 does not support decoration
            <Text variant="body-1" decoration="underline">
                Invalid
            </Text>
        )
        expect(invalidTextModifier).toBeDefined()
    })

    it('has no accessibility violations', async () => {
        const { container } = render(
            <>
                <Text>Default text</Text>
                <Text variant="caption-2" decoration="underline">
                    Caption
                </Text>
                <Text variant="body-1" render={<label htmlFor="name" />}>
                    Name
                </Text>
                <input id="name" />
            </>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
