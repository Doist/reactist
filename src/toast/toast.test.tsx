import React from 'react'
import { axe } from 'jest-axe'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestIcon } from '../utils/test-helpers'

import { ANIMATION_TIMEOUT } from './toast-animation'
import { Toast, ToastsProvider, useToasts } from './use-toasts'
import { StaticToast } from './static-toast'

import type { ToastProps, ToastsProviderProps } from './use-toasts'
import type { StaticToastProps } from './static-toast'

function getToast(content: string | RegExp) {
    return screen.getByRole('alert', {
        name(_accessibleName, element) {
            return typeof content === 'string'
                ? element.textContent === content
                : content.test(element.textContent ?? '')
        },
    })
}

describe('useToast', () => {
    function TestCase({ getToastProps }: { getToastProps: () => Partial<ToastProps> }) {
        const showToast = useToasts()
        return (
            <button onClick={() => showToast({ message: 'Default message', ...getToastProps() })}>
                Show toast
            </button>
        )
    }

    function renderTestCase(providerProps?: Omit<ToastsProviderProps, 'children'>) {
        const propsRef: { current: Partial<ToastProps> } = { current: {} }
        return {
            ...render(
                <ToastsProvider {...providerProps}>
                    <TestCase getToastProps={() => propsRef.current} />
                </ToastsProvider>,
            ),
            showToast(this: void, props: Partial<ToastProps> = {}) {
                propsRef.current = props
                userEvent.click(screen.getByRole('button', { name: 'Show toast' }))
            },
        }
    }

    it('renders a semantic alert with the given message', () => {
        const { showToast } = renderTestCase()
        showToast({ message: 'Project has been published' })
        expect(screen.getByRole('alert').textContent).toBe('Project has been published')
    })

    it('also renders the description if given', () => {
        const { showToast } = renderTestCase()
        showToast({
            message: 'No connection',
            description: 'You will be able to post comments when online',
        })
        expect(screen.getByRole('alert').textContent).toBe(
            'No connection You will be able to post comments when online',
        )
    })

    it('allows to show more than one toast at once, and dismiss them individually', async () => {
        const { showToast } = renderTestCase()

        showToast({ message: 'Your comment was sent' })
        showToast({ message: 'Task was created' })
        showToast({ message: 'The project could not be deleted' })

        expect(screen.getAllByRole('alert').map((node) => node.textContent)).toEqual([
            'Your comment was sent',
            'Task was created',
            'The project could not be deleted',
        ])

        userEvent.click(within(getToast('Task was created')).getByRole('button', { name: 'Close' }))

        await waitFor(() => {
            expect(screen.getAllByRole('alert').map((node) => node.textContent)).toEqual([
                'Your comment was sent',
                'The project could not be deleted',
            ])
        })
    })

    it('allows to render an action button that performs the action when clicked', () => {
        const actionFn = jest.fn()
        const { showToast } = renderTestCase()
        showToast({ action: { label: 'Undo', onClick: actionFn } })
        expect(actionFn).not.toHaveBeenCalled()
        userEvent.click(within(screen.getByRole('alert')).getByRole('button', { name: 'Undo' }))
        expect(actionFn).toHaveBeenCalledTimes(1)
    })

    it('allows to dismiss toast when action button is clicked', async () => {
        const { showToast } = renderTestCase()
        showToast({
            action: {
                label: 'Undo',
                onClick: ({ onDismiss }) => {
                    onDismiss?.()
                },
            },
        })
        expect(screen.queryByRole('alert')).toBeInTheDocument()
        userEvent.click(within(screen.getByRole('alert')).getByRole('button', { name: 'Undo' }))
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })

    it('allows to render something custom in the action slot', () => {
        const { showToast } = renderTestCase()
        showToast({ action: <a href="/whatever">Whatever</a> })
        expect(
            within(screen.getByRole('alert')).getByRole('link', { name: 'Whatever' }),
        ).toBeInTheDocument()
    })

    it('renders an icon if given', () => {
        const { showToast } = renderTestCase()
        showToast({ icon: <TestIcon /> })
        expect(within(screen.getByRole('alert')).getByTestId('test-icon')).toBeInTheDocument()
    })

    describe('Dismiss button', () => {
        it('is rendered with a default label', () => {
            const { showToast } = renderTestCase()
            showToast()
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            ).toBeInTheDocument()
        })

        it('is possible to customize the default label globally', () => {
            const { showToast } = renderTestCase({ defaultDismissLabel: 'Cerrar' })
            showToast()
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Cerrar' }),
            ).toBeInTheDocument()
        })

        it('is possible to customize the dismiss button label for a specific toast', () => {
            const { showToast } = renderTestCase()
            showToast({ dismissLabel: 'Cerrar notificación' })
            expect(
                within(screen.getByRole('alert')).getByRole('button', {
                    name: 'Cerrar notificación',
                }),
            ).toBeInTheDocument()
        })

        it('removes the toast from view when clicked', async () => {
            const { showToast } = renderTestCase()
            showToast()
            userEvent.click(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            )
            await waitFor(() => {
                expect(screen.queryByRole('alert')).not.toBeInTheDocument()
            })
        })

        it('can be hidden', () => {
            const { showToast } = renderTestCase()
            showToast({ showDismissButton: false })
            expect(within(screen.getByRole('alert')).queryByRole('button')).not.toBeInTheDocument()
        })

        it('calls the onDismiss callback, if given', () => {
            const onDismiss = jest.fn()
            const { showToast } = renderTestCase()
            showToast({ onDismiss })

            expect(onDismiss).not.toHaveBeenCalled()
            userEvent.click(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            )
            expect(onDismiss).toHaveBeenCalledTimes(1)
        })
    })

    describe('autoDismissDelay', () => {
        beforeEach(() => {
            jest.useFakeTimers()
        })

        afterEach(() => {
            jest.useRealTimers()
        })

        it('automatically hides from view after a few seconds', () => {
            const { showToast } = renderTestCase()
            showToast()
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('is possible to customize the default autoDismissDelay globally', () => {
            const { showToast } = renderTestCase({ defaultAutoDismissDelay: 5 })
            showToast()
            jest.advanceTimersByTime(4500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('is possible to customize the autoDismissDelay for a specific toast', () => {
            const { showToast } = renderTestCase()

            // Customized toast
            showToast({ autoDismissDelay: 15 })
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            jest.advanceTimersByTime(500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(5000 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()

            // Other toasts keep using the default
            showToast()
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('disables auto-dismiss behaviour when hovering over the toast', () => {
            const { showToast } = renderTestCase()

            // Show it, and advance nearly to auto-dismiss time
            showToast()
            jest.advanceTimersByTime(9500)

            // Hover, and check that it does not disappear after the remainig time
            userEvent.hover(screen.getByRole('alert'))
            jest.advanceTimersByTime(500)
            expect(screen.getByRole('alert')).toBeInTheDocument()

            // …or after a long period of time
            jest.advanceTimersByTime(60000)
            expect(screen.getByRole('alert')).toBeInTheDocument()

            // unhover, and check that we have to wait the default delay all over again
            userEvent.unhover(screen.getByRole('alert'))
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('can be disabled', () => {
            const { showToast } = renderTestCase()
            showToast({ autoDismissDelay: false })
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            jest.advanceTimersByTime(500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            jest.advanceTimersByTime(5000)
            expect(screen.getByRole('alert')).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('renders with no accessibility violations', async () => {
            const { container, showToast } = renderTestCase()

            // Show several toasts
            showToast({
                message: 'Task was completed',
                description: 'You can now continue with your next task',
                action: { label: 'Undo', onClick: () => undefined },
            })
            showToast({
                message: 'Task was deleted',
                description: 'This action cannot be undone',
            })
            showToast({
                message: 'Your account is unverified',
                action: { label: 'Click here to verify', onClick: () => undefined },
            })
            showToast({
                icon: <TestIcon />,
                message: 'Your comment was sent',
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })
})

describe('Toast', () => {
    it('renders a toast', () => {
        render(
            <ToastsProvider>
                <Toast message="Link copied to clipboard" />
            </ToastsProvider>,
        )
        expect(screen.getByRole('alert')).toHaveTextContent('Link copied to clipboard')
    })

    it('is removed when unmounted', async () => {
        function TestCase() {
            const [show, setShow] = React.useState(false)
            return (
                <>
                    <button onClick={() => setShow((s) => !s)}>Toggle</button>
                    {show ? <Toast message="A toast that can be toggled" /> : null}
                </>
            )
        }
        render(
            <ToastsProvider>
                <TestCase />
            </ToastsProvider>,
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
        expect(screen.getByRole('alert')).toHaveTextContent('A toast that can be toggled')
        userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })
})

describe('StaticToast', () => {
    function renderTestCase(props: Partial<StaticToastProps> = {}) {
        return render(<StaticToast message="Default message" {...props} />)
    }

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

        it('allows to dismiss toast when action is triggered', () => {
            const onDimissSpy = jest.fn()
            renderTestCase({
                action: {
                    label: 'Retry',
                    onClick: ({ onDismiss }) => {
                        onDismiss?.()
                    },
                },
                onDismiss: onDimissSpy,
            })
            expect(onDimissSpy).not.toHaveBeenCalled()
            userEvent.click(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Retry' }),
            )
            expect(onDimissSpy).toHaveBeenCalled()
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
