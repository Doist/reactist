import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { runSpaceTests } from '../test-helpers'
import { Inline } from './'

describe('Inline', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Inline
                data-testid="inline"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            />,
        )
        expect(screen.getByTestId('inline')).toHaveClass('right')
        expect(screen.getByTestId('inline')).not.toHaveClass('wrong')
    })

    it('can be rendered as any HTML element', () => {
        render(<Inline data-testid="inline" as="nav" />)
        expect(screen.getByTestId('inline').tagName).toBe('NAV')
    })

    it('renders its children as its content', () => {
        render(
            <Inline data-testid="inline">
                <div>one</div>
                <div>two</div>
            </Inline>,
        )
        expect(screen.getByTestId('inline').innerHTML).toMatchInlineSnapshot(
            `"<div>one</div><div>two</div>"`,
        )
    })

    it('applies some extra class names corresponding to other layout-related props', () => {
        render(
            <Inline
                data-testid="inline"
                maxWidth="large"
                minWidth="small"
                padding="medium"
                border="standard"
                borderRadius="standard"
                background="highlight"
            />,
        )
        expect(screen.getByTestId('inline')).toHaveClass(
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

    runSpaceTests(Inline)
})
