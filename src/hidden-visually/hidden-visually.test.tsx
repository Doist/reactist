import * as React from 'react'

import { render, screen } from '@testing-library/react'

import { HiddenVisually } from './hidden-visually'

describe('HiddenVisually', () => {
    it('can be rendered as any HTML element', () => {
        render(
            <HiddenVisually data-testid="hidden-element" as="p">
                Something
            </HiddenVisually>,
        )
        expect(screen.getByTestId('hidden-element').tagName).toBe('P')
    })

    it('renders its children as its content', () => {
        render(
            <HiddenVisually data-testid="hidden-element">
                <div>one</div>
                <div>two</div>
            </HiddenVisually>,
        )
        expect(screen.getByTestId('hidden-element').innerHTML).toMatchInlineSnapshot(
            `"<div>one</div><div>two</div>"`,
        )
    })

    it('gets applied the expected class names', () => {
        render(<HiddenVisually data-testid="hidden-element">Something</HiddenVisually>)
        const hiddenElement = screen.getByTestId('hidden-element')
        expect(hiddenElement).toHaveClass('hiddenVisually', 'position-absolute', 'overflow-hidden')
    })
})
