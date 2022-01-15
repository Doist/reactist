import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Box, BoxProps } from './'
import { axe } from 'jest-axe'

describe('Box', () => {
    it('renders its children as its content', () => {
        render(
            <Box data-testid="box">
                Hello <strong>world</strong>!
            </Box>,
        )
        expect(screen.getByTestId('box').innerHTML).toMatchInlineSnapshot(
            `"Hello <strong>world</strong>!"`,
        )
    })

    it('can be rendered as any HTML element', () => {
        render(<Box data-testid="box" as="section" />)
        expect(screen.getByTestId('box').tagName).toBe('SECTION')
    })

    it('applies any extra className given to it', () => {
        render(<Box data-testid="box" className="custom" />)
        expect(screen.getByTestId('box')).toHaveClass('custom')
    })

    it('applies some extra class names corresponding to other styling props', () => {
        render(
            <Box
                data-testid="box"
                display="inlineBlock"
                maxWidth="xlarge"
                minWidth="xsmall"
                border="primary"
                borderRadius="full"
                background="aside"
                overflow="hidden"
            />,
        )
        expect(screen.getByTestId('box')).toHaveClass(
            'box',
            'display-inlineBlock',
            'minWidth-xsmall',
            'maxWidth-xlarge',
            'bg-aside',
            'borderRadius-full',
            'border-primary',
            'overflow-hidden',
        )
    })

    it('only applies flex-related styles if display="flex" or display="inlineFlex" is given', () => {
        const flexProps: Partial<BoxProps> = {
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
        }
        const classNames = [
            'flexDirection-column',
            'flexWrap-wrap',
            'alignItems-center',
            'justifyContent-center',
        ]
        const { rerender } = render(<Box data-testid="box" display="flex" {...flexProps} />)
        expect(screen.getByTestId('box')).toHaveClass('box', 'display-flex', ...classNames)

        rerender(<Box data-testid="box" display="inlineFlex" {...flexProps} />)
        expect(screen.getByTestId('box')).toHaveClass('box', 'display-inlineFlex', ...classNames)

        rerender(<Box data-testid="box" display="inline" {...flexProps} />)
        expect(screen.getByTestId('box')).toHaveClass('display-inline')
        expect(screen.getByTestId('box')).not.toHaveClass('display-flex')
        for (const className of classNames) {
            expect(screen.getByTestId('box')).not.toHaveClass(className)
        }
    })

    it('applies different class names when a responsive prop is given', () => {
        render(
            <Box
                data-testid="box"
                display={{ mobile: 'none', tablet: 'block', desktop: 'inline' }}
            />,
        )
        expect(screen.getByTestId('box')).toHaveClass(
            'display-none',
            'tablet-display-block',
            'desktop-display-inline',
        )
    })

    describe('textAlign="…"', () => {
        it('adds the appropriate class names', () => {
            const { rerender } = render(<Box data-testid="box" />)
            const boxElement = screen.getByTestId('box')
            expect(boxElement).not.toHaveClass('textAlign-start')
            expect(boxElement).not.toHaveClass('textAlign-center')
            expect(boxElement).not.toHaveClass('textAlign-end')
            expect(boxElement).not.toHaveClass('textAlign-justify')

            for (const align of ['start', 'center', 'end', 'justify'] as const) {
                rerender(<Box data-testid="box" textAlign={align} />)
                expect(boxElement).toHaveClass(`textAlign-${align}`)
            }
        })

        it('supports responsive values', () => {
            render(
                <Box
                    data-testid="box"
                    textAlign={{ mobile: 'start', tablet: 'center', desktop: 'end' }}
                />,
            )
            const boxElement = screen.getByTestId('box')
            expect(boxElement).toHaveClass('textAlign-start')
            expect(boxElement).toHaveClass('tablet-textAlign-center')
            expect(boxElement).toHaveClass('desktop-textAlign-end')
        })
    })

    describe('padding', () => {
        it('allows to apply padding in all directions at once', () => {
            render(<Box data-testid="box" padding="small" />)
            expect(screen.getByTestId('box')).toHaveClass(
                'paddingTop-small',
                'paddingRight-small',
                'paddingBottom-small',
                'paddingLeft-small',
            )
        })

        it('allows to apply padding to the horizontal and vertical directions separately', () => {
            render(<Box data-testid="box" paddingX="xlarge" paddingY="xsmall" />)
            expect(screen.getByTestId('box')).toHaveClass(
                'paddingTop-xsmall',
                'paddingRight-xlarge',
                'paddingBottom-xsmall',
                'paddingLeft-xlarge',
            )
        })

        it('allows to apply padding to each direction individually', () => {
            render(
                <Box
                    data-testid="box"
                    paddingTop="xsmall"
                    paddingRight="small"
                    paddingBottom="medium"
                    paddingLeft="large"
                />,
            )
            expect(screen.getByTestId('box')).toHaveClass(
                'paddingTop-xsmall',
                'paddingRight-small',
                'paddingBottom-medium',
                'paddingLeft-large',
            )
        })

        it('overrides more general padding settings with individual ones when given', () => {
            const { rerender } = render(
                <Box
                    data-testid="box"
                    padding="medium"
                    paddingX="large"
                    paddingY="small"
                    paddingTop="xsmall"
                    paddingRight="xlarge"
                />,
            )
            expect(screen.getByTestId('box')).toHaveClass(
                'paddingTop-xsmall', // set via paddingTop explicitly, overrides paddingY and padding
                'paddingRight-xlarge', // set via paddingRight explicitly, overrides paddingX and padding
                'paddingBottom-small', // set via paddingY
                'paddingLeft-large', // set via paddingX
            )

            rerender(<Box data-testid="box" padding="medium" paddingRight="xsmall" />)
            expect(screen.getByTestId('box')).toHaveClass(
                'paddingTop-medium',
                'paddingRight-xsmall', // set via paddingRight explicitly, overrides padding
                'paddingBottom-medium',
                'paddingLeft-medium',
            )
        })
    })

    describe('margin', () => {
        it('allows to apply margin in all directions at once', () => {
            render(<Box data-testid="box" margin="small" />)
            expect(screen.getByTestId('box')).toHaveClass(
                'marginTop-small',
                'marginRight-small',
                'marginBottom-small',
                'marginLeft-small',
            )
        })

        it('allows to apply margin to the horizontal and vertical directions separately', () => {
            render(<Box data-testid="box" marginX="xlarge" marginY="xsmall" />)
            expect(screen.getByTestId('box')).toHaveClass(
                'marginTop-xsmall',
                'marginRight-xlarge',
                'marginBottom-xsmall',
                'marginLeft-xlarge',
            )
        })

        it('allows to apply margin to each direction individually', () => {
            render(
                <Box
                    data-testid="box"
                    marginTop="xsmall"
                    marginRight="small"
                    marginBottom="medium"
                    marginLeft="large"
                />,
            )
            expect(screen.getByTestId('box')).toHaveClass(
                'marginTop-xsmall',
                'marginRight-small',
                'marginBottom-medium',
                'marginLeft-large',
            )
        })

        it('overrides more general margin settings with individual ones when given', () => {
            const { rerender } = render(
                <Box
                    data-testid="box"
                    margin="medium"
                    marginX="large"
                    marginY="small"
                    marginTop="xsmall"
                    marginRight="xlarge"
                />,
            )
            expect(screen.getByTestId('box')).toHaveClass(
                'marginTop-xsmall', // set via marginTop explicitly, overrides marginY and margin
                'marginRight-xlarge', // set via marginRight explicitly, overrides marginX and margin
                'marginBottom-small', // set via marginY
                'marginLeft-large', // set via marginX
            )

            rerender(<Box data-testid="box" margin="medium" marginRight="xsmall" />)
            expect(screen.getByTestId('box')).toHaveClass(
                'marginTop-medium',
                'marginRight-xsmall', // set via marginRight explicitly, overrides margin
                'marginBottom-medium',
                'marginLeft-medium',
            )
        })
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(<Box>Hello world!</Box>)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
