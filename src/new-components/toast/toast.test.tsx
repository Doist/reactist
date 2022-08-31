import React from 'react'
import { axe } from 'jest-axe'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestIcon } from '../test-helpers'
import { Toast, ToastProps } from './toast'

function renderTestCase(props: Partial<ToastProps> = {}) {
    return render(<Toast message="Default message" {...props} />)
}

describe('Toast', () => {
    it('renders a semantic alert with the given message', () => {
        renderTestCase({ message: 'Project has been published' })
        expect(screen.getByRole('alert').textContent).toBe('Project has been published')
    })

    it('also renders the description if given', () => {
        renderTestCase({
            message: 'No connection',
            description: 'You will be able to post comments when online',
        })
        expect(screen.getByRole('alert').textContent).toBe(
            'No connection You will be able to post comments when online',
        )
    })

    describe('action', () => {
        it('allows to provide an object used to generate an action button', () => {
            const onClick = jest.fn()
            renderTestCase({ action: { label: 'Retry', onClick } })
            expect(onClick).not.toHaveBeenCalled()
            userEvent.click(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Retry' }),
            )
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('allows to render something custom in the action slot', () => {
            renderTestCase({ action: <a href="/whatever">Whatever</a> })
            expect(
                within(screen.getByRole('alert')).getByRole('link', { name: 'Whatever' }),
            ).toBeInTheDocument()
        })
    })

    it('renders an icon if given', () => {
        renderTestCase({ icon: <TestIcon /> })
        expect(within(screen.getByRole('alert')).getByTestId('test-icon')).toBeInTheDocument()
    })

    describe('Dismiss button', () => {
        it('calls onDismiss when clicked', () => {
            const onDismiss = jest.fn()
            renderTestCase({ onDismiss })
            expect(onDismiss).not.toHaveBeenCalled()
            userEvent.click(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            )
            expect(onDismiss).toHaveBeenCalledTimes(1)
        })

        it('is not rendered if onDismiss is not provided', () => {
            renderTestCase()
            expect(
                within(screen.getByRole('alert')).queryByRole('button', { name: 'Close' }),
            ).not.toBeInTheDocument()
        })

        it('is possible to customize the label', () => {
            renderTestCase({ onDismiss: jest.fn(), dismissLabel: 'Cerrar' })
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Cerrar' }),
            ).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('renders with no accessibility violations', async () => {
            const { container } = renderTestCase({
                message: 'Task was completed',
                description: 'You can now continue with your next task',
                action: <button>Click me</button>,
                onDismiss: jest.fn(),
            })
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
