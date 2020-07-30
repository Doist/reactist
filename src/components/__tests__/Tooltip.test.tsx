import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Tooltip } from '../Tooltip'

// Runs the same test abstracting how the tooltip is triggered (can be via mouse or keyboard)
function testShowHide({
    triggerShow,
    triggerHide,
}: {
    triggerShow: () => void
    triggerHide: () => void
}) {
    triggerShow()

    // tooltip is not immediately visible
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    // wait a bit
    act(() => {
        jest.advanceTimersByTime(150)
    })
    // tooltip is now visible
    expect(screen.getByRole('tooltip', { name: 'tooltip content here' })).toBeInTheDocument()

    triggerHide()

    // tooltip is not immediately removed
    expect(screen.getByRole('tooltip', { name: 'tooltip content here' })).toBeInTheDocument()
    // wait a bit
    act(() => {
        jest.advanceTimersByTime(150)
    })
    // tooltip is gone
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
}

describe('Tooltip', () => {
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

        testShowHide({
            triggerShow() {
                fireEvent.focus(screen.getByRole('button', { name: 'Click me' }))
            },
            triggerHide() {
                fireEvent.blur(screen.getByRole('button', { name: 'Click me' }))
            },
        })
    })

    it('renders a tooltip when the button is hovered, hides it when unhovered', () => {
        render(
            <Tooltip content="tooltip content here">
                <button>Click me</button>
            </Tooltip>,
        )
        testShowHide({
            triggerShow() {
                fireEvent.mouseOver(screen.getByRole('button', { name: 'Click me' }))
            },
            triggerHide() {
                fireEvent.mouseLeave(screen.getByRole('button', { name: 'Click me' }))
            },
        })
    })

    it('does not render a tooltip if the content is empty', () => {
        render(
            <Tooltip content={null}>
                <button>Click me</button>
            </Tooltip>,
        )

        // mouse over and wait more than enough
        fireEvent.mouseOver(screen.getByRole('button', { name: 'Click me' }))
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

        // focus on button and wait more than enough
        fireEvent.blur(screen.getByRole('button', { name: 'Click me' }))
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
})
