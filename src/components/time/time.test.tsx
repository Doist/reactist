import dayjs from 'dayjs'
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Time } from './time'
import userEvent from '@testing-library/user-event'

import { SHOW_DELAY } from '../../tooltip/tooltip'

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

    it('toggles hovered state on mouse enter and leave when mouse moves', () => {
        render(<Time time={testDate} expandFullyOnHover />)

        expect(screen.getByText('March 22, 1991')).toBeVisible()

        userEvent.hover(screen.getByText('March 22, 1991'))
        expect(screen.getByText('March 22, 1991, 1:37 PM')).toBeVisible()

        // <Time> checks that the mouse coordinates have changed before setting state
        userEvent.unhover(screen.getByText('March 22, 1991, 1:37 PM'), { clientX: 10, clientY: 10 })
        expect(screen.getByText('March 22, 1991')).toBeVisible()
    })

    it('does not toggle hovered state when mouse did not move', () => {
        render(<Time time={testDate} expandFullyOnHover />)

        expect(screen.getByText('March 22, 1991')).toBeVisible()

        userEvent.hover(screen.getByText('March 22, 1991'))
        expect(screen.getByText('March 22, 1991, 1:37 PM')).toBeVisible()

        // <Time> checks that the mouse coordinates have changed before setting state
        userEvent.unhover(screen.getByText('March 22, 1991, 1:37 PM'))
        expect(screen.getByText('March 22, 1991, 1:37 PM')).toBeVisible()
    })

    it('renders relative time when not hovered', () => {
        render(<Time time={dayjs().unix()} />)
        expect(screen.getByText('moments ago')).toBeVisible()
    })

    it('renders short absolute time when hovered and expandedOnHover is set', () => {
        render(<Time time={testDate} expandOnHover />)

        userEvent.hover(screen.getByText('March 22, 1991'))
        expect(screen.getByText('March 22, 1991')).toBeVisible()
    })

    it('adds additional class name if supplied', () => {
        const { container } = render(<Time time={testDate} className="this-classes were-added" />)
        expect(container).toMatchSnapshot()
    })

    it('renders wrapped in tooltip when tooltipOnHover is set', async () => {
        render(<Time time={testDate} tooltipOnHover />)

        userEvent.hover(screen.getByText('March 22, 1991'))
        await waitFor(
            () => {
                expect(
                    screen.getByRole('tooltip', { name: 'March 22, 1991, 1:37 PM' }),
                ).toBeVisible()
            },
            { timeout: SHOW_DELAY + 10 },
        )

        userEvent.unhover(screen.getByText('March 22, 1991'))
        await waitFor(() => {
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
    })

    it('renders with custom tooltip when supplied', async () => {
        render(<Time time={testDate} tooltipOnHover tooltip="Test" />)

        userEvent.hover(screen.getByText('March 22, 1991'))
        await waitFor(
            () => {
                expect(screen.getByRole('tooltip', { name: 'Test' })).toBeVisible()
            },
            { timeout: SHOW_DELAY + 10 },
        )

        userEvent.unhover(screen.getByText('March 22, 1991'))
        await waitFor(() => {
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
    })

    it('does not render short absolute time on hover when tooltipOnHover is set', async () => {
        render(<Time time={dayjs().unix()} tooltipOnHover expandOnHover />)
        userEvent.hover(screen.getByText('moments ago'))

        await waitFor(
            () => {
                expect(
                    screen.getByRole('tooltip', { name: dayjs().format('LL, LT') }),
                ).toBeVisible()
                expect(screen.getByText('moments ago')).toBeVisible()
            },
            { timeout: SHOW_DELAY + 10 },
        )

        userEvent.unhover(screen.getByText('moments ago'))
        await waitFor(() => {
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
    })

    it('does not render full absolute time on hover when tooltipOnHover is set', async () => {
        render(<Time time={dayjs().unix()} tooltipOnHover expandFullyOnHover />)
        userEvent.hover(screen.getByText('moments ago'))

        await waitFor(
            () => {
                expect(
                    screen.getByRole('tooltip', { name: dayjs().format('LL, LT') }),
                ).toBeVisible()
                expect(screen.getByText('moments ago')).toBeVisible()
            },
            { timeout: SHOW_DELAY + 10 },
        )

        userEvent.unhover(screen.getByText('moments ago'))
        await waitFor(() => {
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
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
