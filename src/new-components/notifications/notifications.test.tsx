import React from 'react'
import { axe } from 'jest-axe'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestIcon } from '../test-helpers'
import { ANIMATION_TIMEOUT } from './notifications-animation'
import {
    Notification,
    NotificationProps,
    NotificationsProvider,
    NotificationsProviderProps,
    useNotifications,
} from './notifications'

function getNotification(content: string | RegExp) {
    return screen.getByRole('alert', {
        name(_accessibleName, element) {
            return typeof content === 'string'
                ? element.textContent === content
                : content.test(element.textContent ?? '')
        },
    })
}

function TestCase({
    getNotificationProps,
}: {
    getNotificationProps: () => Partial<NotificationProps>
}) {
    const showNotification = useNotifications()
    return (
        <button
            onClick={() =>
                showNotification({ message: 'Default message', ...getNotificationProps() })
            }
        >
            Show notification
        </button>
    )
}

function renderTestCase(providerProps?: Omit<NotificationsProviderProps, 'children'>) {
    const propsRef: { current: Partial<NotificationProps> } = { current: {} }
    return {
        ...render(
            <NotificationsProvider {...providerProps}>
                <TestCase getNotificationProps={() => propsRef.current} />
            </NotificationsProvider>,
        ),
        showNotification(this: void, props: Partial<NotificationProps> = {}) {
            propsRef.current = props
            userEvent.click(screen.getByRole('button', { name: 'Show notification' }))
        },
    }
}

describe('useNotification', () => {
    it('renders a semantic alert with the given message', () => {
        const { showNotification } = renderTestCase()
        showNotification({ message: 'Project has been published' })
        expect(screen.getByRole('alert').textContent).toBe('Project has been published')
    })

    it('also renders the description if given', () => {
        const { showNotification } = renderTestCase()
        showNotification({
            message: 'No connection',
            description: 'You will be able to post comments when online',
        })
        expect(screen.getByRole('alert').textContent).toBe(
            'No connection You will be able to post comments when online',
        )
    })

    it('allows to show more than one notification at once, and dismiss them individually', async () => {
        const { showNotification } = renderTestCase()

        showNotification({ message: 'Your comment was sent' })
        showNotification({ message: 'Task was created' })
        showNotification({ message: 'The project could not be deleted' })

        expect(screen.getAllByRole('alert').map((node) => node.textContent)).toEqual([
            'Your comment was sent',
            'Task was created',
            'The project could not be deleted',
        ])

        userEvent.click(
            within(getNotification('Task was created')).getByRole('button', { name: 'Close' }),
        )

        await waitFor(() => {
            expect(screen.getAllByRole('alert').map((node) => node.textContent)).toEqual([
                'Your comment was sent',
                'The project could not be deleted',
            ])
        })
    })

    it('allows to render an action button that performs the action when clicked', () => {
        const actionFn = jest.fn()
        const { showNotification } = renderTestCase()
        showNotification({ action: { label: 'Undo', onClick: actionFn } })
        expect(actionFn).not.toHaveBeenCalled()
        userEvent.click(within(screen.getByRole('alert')).getByRole('button', { name: 'Undo' }))
        expect(actionFn).toHaveBeenCalledTimes(1)
    })

    it('allows to render something custom in the action slot', () => {
        const { showNotification } = renderTestCase()
        showNotification({ action: <a href="/whatever">Whatever</a> })
        expect(
            within(screen.getByRole('alert')).getByRole('link', { name: 'Whatever' }),
        ).toBeInTheDocument()
    })

    it('renders an icon if given', () => {
        const { showNotification } = renderTestCase()
        showNotification({ icon: <TestIcon /> })
        expect(within(screen.getByRole('alert')).getByTestId('test-icon')).toBeInTheDocument()
    })

    describe('Dismiss button', () => {
        it('is rendered with a default label', () => {
            const { showNotification } = renderTestCase()
            showNotification()
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            ).toBeInTheDocument()
        })

        it('is possible to customize the default label globally', () => {
            const { showNotification } = renderTestCase({ defaultDismissLabel: 'Cerrar' })
            showNotification()
            expect(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Cerrar' }),
            ).toBeInTheDocument()
        })

        it('is possible to customize the dismiss button label for a specific notification', () => {
            const { showNotification } = renderTestCase()
            showNotification({ dismissLabel: 'Cerrar notificación' })
            expect(
                within(screen.getByRole('alert')).getByRole('button', {
                    name: 'Cerrar notificación',
                }),
            ).toBeInTheDocument()
        })

        it('removes the notification from view when clicked', async () => {
            const { showNotification } = renderTestCase()
            showNotification()
            userEvent.click(
                within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }),
            )
            await waitFor(() => {
                expect(screen.queryByRole('alert')).not.toBeInTheDocument()
            })
        })

        it('can be hidden', () => {
            const { showNotification } = renderTestCase()
            showNotification({ showDismissButton: false })
            expect(within(screen.getByRole('alert')).queryByRole('button')).not.toBeInTheDocument()
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
            const { showNotification } = renderTestCase()
            showNotification()
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('is possible to customize the default autoDismissDelay globally', () => {
            const { showNotification } = renderTestCase({ defaultAutoDismissDelay: 5 })
            showNotification()
            jest.advanceTimersByTime(4500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('is possible to customize the autoDismissDelay for a specific notification', () => {
            const { showNotification } = renderTestCase()

            // Customized notification
            showNotification({ autoDismissDelay: 15 })
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            jest.advanceTimersByTime(500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(5000 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()

            // Other notifications keep using the default
            showNotification()
            jest.advanceTimersByTime(9500)
            expect(screen.getByRole('alert')).toBeInTheDocument()
            act(() => {
                jest.advanceTimersByTime(500 + ANIMATION_TIMEOUT)
            })
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('disables auto-dismiss behaviour when hovering over the notification', () => {
            const { showNotification } = renderTestCase()

            // Show it, and advance nearly to auto-dismiss time
            showNotification()
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
            const { showNotification } = renderTestCase()
            showNotification({ autoDismissDelay: false })
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
            const { container, showNotification } = renderTestCase()

            // Show several notifications
            showNotification({
                message: 'Task was completed',
                description: 'You can now continue with your next task',
                action: { label: 'Undo', onClick: () => undefined },
            })
            showNotification({
                message: 'Task was deleted',
                description: 'This action cannot be undone',
            })
            showNotification({
                message: 'Your account is unverified',
                action: { label: 'Click here to verify', onClick: () => undefined },
            })
            showNotification({
                icon: <TestIcon />,
                message: 'Your comment was sent',
            })

            expect(await axe(container)).toHaveNoViolations()
        })
    })
})

describe('Notification', () => {
    it('renders a notification', () => {
        render(
            <NotificationsProvider>
                <Notification message="Link copied to clipboard" />
            </NotificationsProvider>,
        )
        expect(screen.getByRole('alert')).toHaveTextContent('Link copied to clipboard')
    })

    it('is removed when unmounted', async () => {
        function TestCase() {
            const [show, setShow] = React.useState(false)
            return (
                <>
                    <button onClick={() => setShow((s) => !s)}>Toggle</button>
                    {show ? <Notification message="Notification that can be toggled" /> : null}
                </>
            )
        }
        render(
            <NotificationsProvider>
                <TestCase />
            </NotificationsProvider>,
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
        expect(screen.getByRole('alert')).toHaveTextContent('Notification that can be toggled')
        userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
    })
})
