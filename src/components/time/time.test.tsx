import * as React from 'react'
import { act } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import { axe } from 'jest-axe'

import { Time } from './time'

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
        const { container } = render(<Time time={dayjs().unix()} />)
        expect(container).toMatchSnapshot()
    })

    it('toggles hovered state on mouse enter and leave when mouse moves', async () => {
        render(<Time time={testDate} expandFullyOnHover />)
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

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
        render(<Time time={testDate} expandFullyOnHover />)
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

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
        render(<Time time={dayjs().unix()} />)
        expect(screen.getByText('moments ago')).toBeVisible()
    })

    it('renders short absolute time when hovered and expandedOnHover is set', async () => {
        render(<Time time={testDate} expandOnHover />)
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        expect(screen.getByText('March 22, 1991')).toBeVisible()
    })

    it('adds additional class name if supplied', () => {
        const { container } = render(<Time time={testDate} className="this-classes were-added" />)
        expect(container).toMatchSnapshot()
    })

    it('renders wrapped in tooltip when tooltipOnHover is set', async () => {
        jest.useRealTimers()
        render(<Time time={testDate} tooltipOnHover />)
        const user = userEvent.setup()

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: 'March 22, 1991, 1:37 PM' })).toBeVisible()
        })
    })

    it('renders with custom tooltip when supplied', async () => {
        render(<Time time={testDate} tooltipOnHover tooltip="Test" />)
        const user = userEvent.setup()

        await act(async () => {
            await user.hover(screen.getByText('March 22, 1991'))
        })
        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: 'Test' })).toBeVisible()
        })
    })

    it('does not render short absolute time on hover when tooltipOnHover is set', async () => {
        render(<Time time={dayjs().unix()} tooltipOnHover expandOnHover />)
        const user = userEvent.setup()
        await act(async () => {
            await user.hover(screen.getByText('moments ago'))
        })

        await waitFor(() => {
            expect(screen.getByRole('tooltip', { name: dayjs().format('LL, LT') })).toBeVisible()
            expect(screen.getByText('moments ago')).toBeVisible()
        })
    })

    it('does not render full absolute time on hover when tooltipOnHover is set', async () => {
        render(<Time time={dayjs().unix()} tooltipOnHover expandFullyOnHover />)
        const user = userEvent.setup()
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
            const { container } = render(<Time time={dayjs().unix()} />)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
