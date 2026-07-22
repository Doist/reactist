import * as React from 'react'

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { flushMicrotasks, TestIcon } from '../utils/test-helpers'

import { SegmentedControl } from './segmented-control'

const OPTIONS = [
    { id: 'list', label: 'List' },
    { id: 'board', label: 'Board' },
    { id: 'calendar', label: 'Calendar' },
] as const

async function flushAnimationFrames() {
    await act(
        () =>
            new Promise<void>((resolve) =>
                requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
            ),
    )
}

async function renderSegmentedControl(element: React.ReactElement) {
    const result = render(element)
    await flushAnimationFrames()
    return result
}

describe('SegmentedControl', () => {
    it('selects an option in uncontrolled mode', async () => {
        const onSelectedOptionChange = jest.fn()
        const user = userEvent.setup()

        await renderSegmentedControl(
            <SegmentedControl
                aria-label="Project layout"
                initialSelectedOptionId="list"
                options={OPTIONS}
                onSelectedOptionChange={onSelectedOptionChange}
            />,
        )

        expect(screen.getByRole('radio', { name: 'List' })).toBeChecked()

        await user.click(screen.getByRole('radio', { name: 'Board' }))
        await flushMicrotasks()

        expect(screen.getByRole('radio', { name: 'Board' })).toBeChecked()
        expect(onSelectedOptionChange).toHaveBeenCalledWith('board')
    })

    it('does not update the selected option until controlled props change', async () => {
        const onSelectedOptionChange = jest.fn()
        const user = userEvent.setup()
        const { rerender } = await renderSegmentedControl(
            <SegmentedControl
                aria-label="Project layout"
                selectedOptionId="list"
                options={OPTIONS}
                onSelectedOptionChange={onSelectedOptionChange}
            />,
        )

        await user.click(screen.getByRole('radio', { name: 'Board' }))
        await flushMicrotasks()

        expect(onSelectedOptionChange).toHaveBeenCalledWith('board')
        expect(screen.getByRole('radio', { name: 'List' })).toBeChecked()

        rerender(
            <SegmentedControl
                aria-label="Project layout"
                selectedOptionId="board"
                options={OPTIONS}
                onSelectedOptionChange={onSelectedOptionChange}
            />,
        )

        expect(screen.getByRole('radio', { name: 'Board' })).toBeChecked()
    })

    it('supports keyboard selection', async () => {
        const onSelectedOptionChange = jest.fn()
        const user = userEvent.setup()

        await renderSegmentedControl(
            <SegmentedControl
                aria-label="Project layout"
                initialSelectedOptionId="list"
                options={OPTIONS}
                onSelectedOptionChange={onSelectedOptionChange}
            />,
        )

        await user.tab()
        expect(screen.getByRole('radio', { name: 'List' })).toHaveFocus()

        await user.keyboard('{ArrowRight}')
        await flushMicrotasks()

        expect(screen.getByRole('radio', { name: 'Board' })).toHaveFocus()
        expect(screen.getByRole('radio', { name: 'Board' })).toBeChecked()
        expect(onSelectedOptionChange).toHaveBeenCalledWith('board')
    })

    it('supports disabled options, icons, rich labels, and content wrappers', async () => {
        function ContentWrapper({ children }: { children: React.ReactNode }) {
            return <span title="Wrapped option">{children}</span>
        }

        await renderSegmentedControl(
            <SegmentedControl
                aria-label="Project layout"
                initialSelectedOptionId="list"
                options={[
                    {
                        id: 'list',
                        label: (
                            <>
                                List <strong>recommended</strong>
                            </>
                        ),
                        icon: <TestIcon />,
                        Wrapper: ContentWrapper,
                    },
                    { id: 'board', label: 'Board', disabled: true },
                ]}
            />,
        )
        await flushMicrotasks()

        expect(screen.getByRole('radio', { name: 'List recommended' })).toBeChecked()
        expect(screen.getByRole('radio', { name: 'Board' })).toBeDisabled()
        expect(screen.getByTitle('Wrapped option')).toBeVisible()
    })

    it('can be labelled and described by other elements', async () => {
        await renderSegmentedControl(
            <>
                <h2 id="layout-label">Project layout</h2>
                <p id="layout-description">Changes how tasks are arranged.</p>
                <SegmentedControl
                    aria-labelledby="layout-label"
                    aria-describedby="layout-description"
                    initialSelectedOptionId="list"
                    options={OPTIONS}
                />
            </>,
        )
        await flushMicrotasks()

        const group = screen.getByRole('radiogroup', { name: 'Project layout' })
        expect(group).toHaveAccessibleDescription('Changes how tasks are arranged.')
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = await renderSegmentedControl(
                <SegmentedControl
                    aria-label="Project layout"
                    initialSelectedOptionId="list"
                    options={OPTIONS}
                />,
            )
            await flushMicrotasks()

            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
