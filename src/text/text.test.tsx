import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Text } from './text'

import type { TextProps } from './text'

const displayVariants = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5'] as const

const headingVariants = ['heading-1', 'heading-2', 'heading-3', 'heading-4'] as const

const bodyVariants = [
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

    it('defaults to body-3 rendered as a div', () => {
        render(<Text data-testid="text-element">Text</Text>)
        const element = screen.getByTestId('text-element')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveClass('variant-body-3')
    })

    it.each([...displayVariants, ...headingVariants, ...bodyVariants])(
        'applies the %s variant',
        (variant) => {
            render(
                <Text data-testid="text-element" variant={variant}>
                    Text
                </Text>,
            )
            expect(screen.getByTestId('text-element')).toHaveClass('variant-' + variant)
        },
    )

    it.each(bodyVariants)('renders %s as a div', (variant) => {
        render(
            <Text data-testid="text-element" variant={variant}>
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element').tagName).toBe('DIV')
    })

    it.each([
        ['heading-1', 'H1'],
        ['heading-2', 'H2'],
        ['heading-3', 'H3'],
        ['heading-4', 'H4'],
    ] as const)('renders %s as %s', (variant, tagName) => {
        render(
            <Text data-testid="text-element" variant={variant}>
                Text
            </Text>,
        )
        expect(screen.getByTestId('text-element').tagName).toBe(tagName)
    })

    it.each(displayVariants)('renders %s as a div with the display font', (variant) => {
        render(
            <Text data-testid="text-element" variant={variant}>
                Text
            </Text>,
        )
        const element = screen.getByTestId('text-element')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveClass('display')
        expect(element).toHaveClass('font-family-sf-for-web')
    })

    it('renders custom elements through Ariakit Role', () => {
        render(
            <Text data-testid="text-element" variant="body-1" render={<label htmlFor="name" />}>
                Name
            </Text>,
        )
        const element = screen.getByTestId('text-element')
        expect(element.tagName).toBe('LABEL')
        expect(element).toHaveAttribute('for', 'name')
    })

    it('lets render override the heading variant default element', () => {
        render(
            <Text data-testid="text-element" variant="heading-1" render={<h2 />}>
                Text
            </Text>,
        )
        const element = screen.getByTestId('text-element')
        expect(element.tagName).toBe('H2')
        expect(element).toHaveClass('variant-heading-1')
    })

    it('lets render override the display variant default element', () => {
        render(
            <Text data-testid="text-element" variant="display-1" render={<h1 />}>
                Text
            </Text>,
        )
        const element = screen.getByTestId('text-element')
        expect(element.tagName).toBe('H1')
        expect(element).toHaveClass('variant-display-1')
    })

    it('applies heading typography to non-heading controls', () => {
        render(
            <Text variant="heading-2" render={<button type="button" />}>
                Edit title
            </Text>,
        )
        expect(screen.getByRole('button', { name: 'Edit title' })).toHaveClass('variant-heading-2')
    })

    it('forwards its ref', () => {
        const ref = React.createRef<HTMLElement>()
        render(<Text ref={ref}>Text</Text>)
        expect(ref.current?.tagName).toBe('DIV')
    })

    it('forwards its ref to the variant default element', () => {
        const ref = React.createRef<HTMLElement>()
        render(
            <Text variant="heading-2" ref={ref}>
                Text
            </Text>,
        )
        expect(ref.current?.tagName).toBe('H2')
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
        const invalidBodyModifier = (
            // @ts-expect-error body-1 does not support decoration
            <Text variant="body-1" decoration="underline">
                Invalid
            </Text>
        )
        const invalidHeadingModifier = (
            // @ts-expect-error heading variants do not support decoration
            <Text variant="heading-1" decoration="strikethrough">
                Invalid
            </Text>
        )
        const invalidDisplayModifier = (
            // @ts-expect-error display variants do not support case
            <Text variant="display-1" case="uppercase">
                Invalid
            </Text>
        )
        expect(invalidBodyModifier).toBeDefined()
        expect(invalidHeadingModifier).toBeDefined()
        expect(invalidDisplayModifier).toBeDefined()
    })

    it('has no accessibility violations', async () => {
        const { container } = render(
            <>
                <Text variant="display-2">Display</Text>
                <Text variant="heading-1">Heading</Text>
                <Text variant="heading-2" render={<button type="button" />}>
                    Button heading
                </Text>
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
