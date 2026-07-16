import * as React from 'react'
import { act } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import { axe } from 'jest-axe'

import { Time } from './time'

function renderTest(
    props: React.ComponentProps<typeof Time>,
    userOptions: Parameters<typeof userEvent.setup>[0] = {
        advanceTimers: jest.advanceTimersByTime,
    },
) {
    const user = userEvent.setup(userOptions)

    return {
        user,
        ...render(<Time {...props} />),
    }
}

describe('Time', () => {
    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2023-03-14T12:00:00.000Z'))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    const testDate = dayjs(new Date('March 22, 1991 13:37:42')).unix()

    it('renders without crashing', () => {
        const { container } = renderTest({ time: dayjs().unix() })
        expect(container).toMatchSnapshot()
    })

    it('toggles hovered state on mouse enter and leave when mouse moves', async () => {
        const { user } = renderTest({ time: testDate, expandFullyOnHover: true })

        expect(screen.getByText('March 22, 1991')).toBeVisible()

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        expect(screen.getByText('March 22, 1991, 1:37 PM')).toBeVisible()

        // <Time> checks that the mouse coordinates have changed before setting state
        await act(async () => {
            await user.pointer({
                target: document.body,
                coords: {
                    clientX: 10,
                    clientY: 10,
                },
            })
        })
        expect(screen.getByText('March 22, 1991')).toBeVisible()
    })

    it('does not toggle hovered state when mouse did not move', async () => {
        const { user } = renderTest({ time: testDate, expandFullyOnHover: true })

        expect(screen.getByText('March 22, 1991')).toBeVisible()

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        expect(screen.getByText('March 22, 1991, 1:37 PM')).toBeVisible()

        // <Time> checks that the mouse coordinates have changed before setting state
        await act(async () => {
            await user.unhover(screen.getByText('March 22, 1991, 1:37 PM'))
        })
        expect(screen.getByText('March 22, 1991, 1:37 PM')).toBeVisible()
    })

    it('renders relative time when not hovered', () => {
        renderTest({ time: dayjs().unix() })
        expect(screen.getByText('moments ago')).toBeVisible()
    })

    it('renders short absolute time when hovered and expandedOnHover is set', async () => {
        const { user } = renderTest({ time: testDate, expandOnHover: true })

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        expect(screen.getByText('March 22, 1991')).toBeVisible()
    })

    it('adds additional class name if supplied', () => {
        const { container } = renderTest({
            time: testDate,
            className: 'this-classes were-added',
        })
        expect(container).toMatchSnapshot()
    })

    it('renders wrapped in tooltip when tooltipOnHover is set', async () => {
        jest.useRealTimers()
        const { user } = renderTest({ time: testDate, tooltipOnHover: true }, {})

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: 'March 22, 1991, 1:37 PM' })).toBeVisible()
        })
    })

    it('renders with custom tooltip when supplied', async () => {
        const { user } = renderTest({ time: testDate, tooltipOnHover: true, tooltip: 'Test' }, {})

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: 'Test' })).toBeVisible()
        })
    })

    it('does not render short absolute time on hover when tooltipOnHover is set', async () => {
        const { user } = renderTest(
            { time: dayjs().unix(), tooltipOnHover: true, expandOnHover: true },
            {},
        )
        await act(async () => {
            await user.hover(screen.getByText('moments ago'))
        })

        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: dayjs().format('LL, LT') })).toBeVisible()
            expect(screen.getByText('moments ago')).toBeVisible()
        })
    })

    it('does not render full absolute time on hover when tooltipOnHover is set', async () => {
        const { user } = renderTest(
            { time: dayjs().unix(), tooltipOnHover: true, expandFullyOnHover: true },
            {},
        )
        await act(async () => {
            await user.hover(screen.getByText('moments ago'))
        })

        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: dayjs().format('LL, LT') })).toBeVisible()
            expect(screen.getByText('moments ago')).toBeVisible()
        })
    })

    describe('a11y', () => {
        beforeAll(() => {
            jest.useRealTimers()
        })

        it('renders with no a11y violations', async () => {
            const { container } = renderTest({ time: dayjs().unix() }, {})
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
