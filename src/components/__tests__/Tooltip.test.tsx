import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tooltip } from '../Tooltip'

describe('Tooltip', () => {
    // Setup ==================================================================
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders a tooltip when the button gets focus, hides it when blurred', () => {
        render(
            <Tooltip content="tooltip content here">
                <button>Click me</button>
            </Tooltip>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        fireEvent.focus(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.getByRole('tooltip', { name: 'tooltip content here' })).toBeInTheDocument()
        fireEvent.blur(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('renders a tooltip when the button is hovered, hides it when unhovered', () => {
        render(
            <Tooltip content="tooltip content here">
                <button>Click me</button>
            </Tooltip>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        fireEvent.mouseOver(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.getByRole('tooltip', { name: 'tooltip content here' })).toBeInTheDocument()
        fireEvent.mouseLeave(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('does not render a tooltip if the content is empty', () => {
        render(
            <Tooltip content={null}>
                <button>Click me</button>
            </Tooltip>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        fireEvent.mouseOver(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        fireEvent.blur(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
})
