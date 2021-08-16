import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { runSpaceTests } from '../test-helpers'
import { Stack } from './'

describe('Stack', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Stack
                data-testid="stack"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            />,
        )
        expect(screen.getByTestId('stack')).toHaveClass('right')
        expect(screen.getByTestId('stack')).not.toHaveClass('wrong')
    })

    it('can be rendered as any HTML element', () => {
        render(<Stack data-testid="stack" as="nav" />)
        expect(screen.getByTestId('stack').tagName).toBe('NAV')
    })

    it('renders its children as its content', () => {
        render(
            <Stack data-testid="stack">
                <div>one</div>
                <div>two</div>
            </Stack>,
        )
        expect(screen.getByTestId('stack').innerHTML).toMatchInlineSnapshot(
            `"<div>one</div><div>two</div>"`,
        )
    })

    it('renders dividers when instructed to do so', () => {
        const { rerender } = render(
            <Stack data-testid="stack" dividers>
                <div>one</div>
                <div>two</div>
                <div>three</div>
            </Stack>,
        )
        expect(screen.getByTestId('stack')).toMatchSnapshot('dividers={true}')

        // regular dividers
        rerender(
            <Stack data-testid="stack" dividers="regular">
                <div>one</div>
                <div>two</div>
                <div>three</div>
            </Stack>,
        )
        expect(screen.getByTestId('stack')).toMatchSnapshot('dividers="regular"')

        // strong dividers
        rerender(
            <Stack data-testid="stack" dividers="strong">
                <div>one</div>
                <div>two</div>
                <div>three</div>
            </Stack>,
        )
        expect(screen.getByTestId('stack')).toMatchSnapshot('dividers="strong"')
    })

    it('applies some extra class names corresponding to other layout-related props', () => {
        render(
            <Stack
                data-testid="stack"
                maxWidth="large"
                minWidth="small"
                padding="medium"
                border="standard"
                borderRadius="standard"
                background="highlight"
            />,
        )
        expect(screen.getByTestId('stack')).toHaveClass(
            'box',
            'minWidth-small',
            'maxWidth-large',
            'paddingTop-medium',
            'paddingRight-medium',
            'paddingBottom-medium',
            'paddingLeft-medium',
            'bg-highlight',
            'borderRadius-standard',
            'border-standard',
        )
    })

    describe('align', () => {
        it('allows to align its children to the left, center or right', () => {
            // no explicit alignment
            const { rerender } = render(<Stack data-testid="stack" />)
            expect(screen.getByTestId('stack')).toHaveClass('display-block')
            expect(screen.getByTestId('stack')).not.toHaveClass('display-flex')
            expect(screen.getByTestId('stack')).not.toHaveClass('flexDirection-column')
            expect(screen.getByTestId('stack')).not.toHaveClass('alignItems-center')

            // aligned to the left (same as when there's no explicit alignment)
            rerender(<Stack data-testid="stack" align="left" />)
            expect(screen.getByTestId('stack')).toHaveClass('display-block')
            expect(screen.getByTestId('stack')).not.toHaveClass('display-flex')
            expect(screen.getByTestId('stack')).not.toHaveClass('flexDirection-column')
            expect(screen.getByTestId('stack')).not.toHaveClass('alignItems-center')

            // aligned to the center
            rerender(<Stack data-testid="stack" align="center" />)
            expect(screen.getByTestId('stack')).not.toHaveClass('display-block')
            expect(screen.getByTestId('stack')).toHaveClass('display-flex')
            expect(screen.getByTestId('stack')).toHaveClass('flexDirection-column')
            expect(screen.getByTestId('stack')).toHaveClass('alignItems-center')

            // aligned to the right
            rerender(<Stack data-testid="stack" align="right" />)
            expect(screen.getByTestId('stack')).not.toHaveClass('display-block')
            expect(screen.getByTestId('stack')).toHaveClass('display-flex')
            expect(screen.getByTestId('stack')).toHaveClass('flexDirection-column')
            expect(screen.getByTestId('stack')).toHaveClass('alignItems-flexEnd')
        })

        it('supports specifying alignment based on viewport size', () => {
            render(<Stack data-testid="stack" align={['left', 'center', 'right']} />)
            expect(screen.getByTestId('stack')).toHaveClass('display-flex')
            expect(screen.getByTestId('stack')).toHaveClass('flexDirection-column')
            expect(screen.getByTestId('stack')).toHaveClass('alignItems-flexStart')
            expect(screen.getByTestId('stack')).toHaveClass('tablet-alignItems-center')
            expect(screen.getByTestId('stack')).toHaveClass('desktop-alignItems-flexEnd')
        })
    })

    runSpaceTests(Stack)
})
