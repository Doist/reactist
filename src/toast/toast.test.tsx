import React, { act } from 'react'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { TestIcon } from '../utils/test-helpers'

import { StaticToast } from './static-toast'
import { ANIMATION_TIMEOUT } from './toast-animation'
import { Toast, ToastsProvider, useToasts } from './use-toasts'

import type { StaticToastProps } from './static-toast'
import type { ToastProps, ToastsProviderProps } from './use-toasts'

function getToast(content: string | RegExp) {
    return screen.getByRole('alert', {
        name(_accessibleName, element) {
            return typeof content === 'string'
                ? element.textContent === content
                : content.test(element.textContent ?? '')
        },
    })
}

type User = ReturnType<typeof userEvent.setup>

async function click(user: User, ...args: Parameters<User['click']>) {
    await act(async () => {
        await user.click(...args)
    })
}

async function hover(user: User, ...args: Parameters<User['hover']>) {
    await act(async () => {
        await user.hover(...args)
    })
}

async function unhover(user: User, ...args: Parameters<User['unhover']>) {
    await act(async () => {
        await user.unhover(...args)
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

    function renderTestCase(
        providerProps?: Omit<ToastsProviderProps, 'children'>,
        user: User = userEvent.setup(),
    ) {
        const propsRef: { current: Partial<ToastProps> } = { current: {} }
        return {
            user,
            ...render(
                <ToastsProvider {...providerProps}>
                    <TestCase getToastProps={() => propsRef.current} />
                </ToastsProvider>,
            ),
            async showToast(this: void, props: Partial<ToastProps> = {}) {
                propsRef.current = props
                await click(user, screen.getByRole('button', { name: 'Show toast' }))
            },
        }
    }

    describe('ToastsProvider', () => {
        it('allows to pass a custom className for the container', async () => {
            const { showToast } = renderTestCase({
                containerClassName: 'customContainerClassName',
            })
            await showToast()

            expect(screen.getByTestId('toasts-container')).toHaveClass('customContainerClassName')
        })
    })

    it('renders a semantic alert with the given message', async () => {
        const { showToast } = renderTestCase()
        await showToast({ message: 'Project has been published' })
        expect(screen.getByRole('alert').textContent).toBe('Project has been published')
    })

    it('also renders the description if given', async () => {
        const { showToast } = renderTestCase()
        await showToast({
            message: 'No connection',
            description: 'You will be able to post comments when online',
        })
        expect(screen.getByRole('alert').textContent).toBe(
            'No connection You will be able to post comments when online',
        )
    })

    it('allows to show more than one toast at once, and dismiss them individually', async () => {
        const { showToast, user } = renderTestCase()

        await showToast({ message: 'Your comment was sent' })
        await showToast({ message: 'Task was created' })
        await showToast({ message: 'The project could not be deleted' })

        expect(screen.getAllByRole('alert').map((node) => node.textContent)).toEqual([
            'Your comment was sent',
            'Task was created',
            'The project could not be deleted',
        ])

        await click(
            user,
            within(getToast('Task was created')).getByRole('button', { name: 'Close' }),
        )

        await waitFor(() => {
            expect(screen.getAllByRole('alert').map((node) => node.textContent)).toEqual([
                'Your comment was sent',
                'The project could not be deleted',
            ])
        })
    })

    it('allows to render an action button that performs the action when clicked', async () => {
        const actionFn = jest.fn()
        const { showToast, user } = renderTestCase()
        await showToast({ action: { label: 'Undo', onClick: actionFn } })
        expect(actionFn).not.toHaveBeenCalled()
        await click(user, within(screen.getByRole('alert')).getByRole('button', { name: 'Undo' }))
        expect(actionFn).toHaveBeenCalledTimes(1)
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })

    it('allows to render something custom in the action slot', async () => {
        const { showToast } = renderTestCase()
        await showToast({ action: <a href="/whatever">Whatever</a> })
        expect(
            within(screen.getByRole('alert')).getByRole('link', { name: 'Whatever' }),
        ).toBeInTheDocument()
    })

    it('renders an icon if given', async () => {
        const { showToast } = renderTestCase()
        await showToast({ icon: <TestIcon /> })
        expect(within(screen.getByRole('alert')).getByTestId('test-icon')).toBeInTheDocument()
    })

    describe('if `closeToast` is false', () => {
        it('keeps the toast visible after the action button is clicked', async () => {
            const actionFn = jest.fn()
            const { showToast, user } = renderTestCase()
            await showToast({
                action: { label: 'A sticky toast action', onClick: actionFn, closeToast: false },
            })
            expect(actionFn).not.toHaveBeenCalled()
            await click(
                user,
                within(screen.getByRole('alert')).getByRole('button', {
                    name: 'A sticky toast action',
                }),
            )
            expect(actionFn).toHaveBeenCalledTimes(1)

            // closeToast has kept it in view
            expect(screen.getByRole('alert')).toBeInTheDocument()
        })
    })

    describe('if `closeToast` is true', () => {
        it('removes the toast from view after the action button is clicked', async () => {
            const actionFn = jest.fn()
            const { showToast, user } = renderTestCase()
            await showToast({
                action: { label: 'A sticky toast action', onClick: actionFn },
            })
            expect(actionFn).not.toHaveBeenCalled()
            await click(
                user,
                within(screen.getByRole('alert')).getByRole('button', {
                    name: 'A sticky toast action',
                }),
            )
            expect(actionFn).toHaveBeenCalledTimes(1)

            await waitFor(() => {
                expect(screen.queryByRole('alert')).not.toBeInTheDocument()
            })
        })
    })

    describe('Dismiss button', () => {
        it('is rendered with a default label', async () => {
            const { showToast } = renderTestCase()
            await showToast()
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            ).toBeInTheDocument()
        })

        it('is possible to customize the default label globally', async () => {
            const { showToast } = renderTestCase({ defaultDismissLabel: 'Cerrar' })
            await showToast()
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Cerrar' }),
            ).toBeInTheDocument()
        })

        it('is possible to customize the dismiss button label for a specific toast', async () => {
            const { showToast } = renderTestCase()
            await showToast({ dismissLabel: 'Cerrar notificación' })
            expect(
                within(screen.getByRole('alert')).getByRole('button', {
                    name: 'Cerrar notificación',
                }),
            ).toBeInTheDocument()
        })

        it('removes the toast from view when clicked', async () => {
            const { showToast, user } = renderTestCase()
            await showToast()
            await click(
                user,
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            )
            await waitFor(() => {
                expect(screen.queryByRole('alert')).not.toBeInTheDocument()
            })
        })

        it('can be hidden', async () => {
            const { showToast } = renderTestCase()
            await showToast({ showDismissButton: false })
            expect(within(screen.getByRole('alert')).queryByRole('button')).not.toBeInTheDocument()
        })

        it('calls the onDismiss callback, if given', async () => {
            const onDismiss = jest.fn()
            const { showToast, user } = renderTestCase()
            await showToast({ onDismiss })

            expect(onDismiss).not.toHaveBeenCalled()
            await click(
                user,
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

        it('automatically hides from view after a few seconds', async () => {
            const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
            const { showToast } = renderTestCase(undefined, user)
            await showToast()
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('is possible to customize the default autoDismissDelay globally', async () => {
            const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
            const { showToast } = renderTestCase({ defaultAutoDismissDelay: 5 }, user)
            await showToast()
            jest.advanceTimersByTime(4500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('is possible to customize the autoDismissDelay for a specific toast', async () => {
            const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
            const { showToast } = renderTestCase(undefined, user)

            // Customized toast
            await showToast({ autoDismissDelay: 15 })
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            jest.advanceTimersByTime(500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(5000 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()

            // Other toasts keep using the default
            await showToast()
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('disables auto-dismiss behaviour when hovering over the toast', async () => {
            const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
            const { showToast } = renderTestCase(undefined, user)

            // Show it, and advance nearly to auto-dismiss time
            await showToast()
            jest.advanceTimersByTime(9500)

            // Hover, and check that it does not disappear after the remainig time
            await hover(user, screen.getByRole('alert'))
            jest.advanceTimersByTime(500)
            expect(screen.getByRole('alert')).toBeInTheDocument()

            // …or after a long period of time
            jest.advanceTimersByTime(60000)
            expect(screen.getByRole('alert')).toBeInTheDocument()

            // unhover, and check that we have to wait the default delay all over again
            await unhover(user, screen.getByRole('alert'))
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('can be disabled', async () => {
            const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
            const { showToast } = renderTestCase(undefined, user)
            await showToast({ autoDismissDelay: false })
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
            await showToast({
                message: 'Task was completed',
                description: 'You can now continue with your next task',
                action: { label: 'Undo', onClick: () => undefined },
            })
            await showToast({
                message: 'Task was deleted',
                description: 'This action cannot be undone',
            })
            await showToast({
                message: 'Your account is unverified',
                action: { label: 'Click here to verify', onClick: () => undefined },
            })
            await showToast({
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
        const user = userEvent.setup()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        await click(user, screen.getByRole('button', { name: 'Toggle' }))
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent('A toast that can be toggled')
        })
        await click(user, screen.getByRole('button', { name: 'Toggle' }))
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
        it('allows to provide an object used to generate an action button', async () => {
            const onClick = jest.fn()
            renderTestCase({ action: { label: 'Retry', onClick } })
            const user = userEvent.setup()
            expect(onClick).not.toHaveBeenCalled()
            await click(
                user,
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
        it('calls onDismiss when clicked', async () => {
            const onDismiss = jest.fn()
            renderTestCase({ onDismiss })
            const user = userEvent.setup()
            expect(onDismiss).not.toHaveBeenCalled()
            await click(
                user,
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
