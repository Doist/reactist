import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { OutlinedControlContainer } from './outlined-control-container'

import styles from './outlined-control-container.module.css'

describe('OutlinedControlContainer', () => {
    // Note: CSS `:has()`-driven state styling (readonly/disabled tinting, error
    // border via aria-invalid, hover/focus border colors) is verified by visual
    // regression / Chromatic, not Jest. jsdom does not implement `:has()` for
    // computed styles, so asserting these rules in Jest would require parsing
    // the CSS module and computing match — out of scope.

    it('renders children', () => {
        render(
            <OutlinedControlContainer>
                <input data-testid="control" aria-label="control" />
            </OutlinedControlContainer>,
        )
        expect(screen.getByTestId('control')).toBeInTheDocument()
    })

    it('forwards ref to the wrapper element', () => {
        const ref = React.createRef<HTMLDivElement>()
        const { container } = render(
            <OutlinedControlContainer ref={ref}>
                <input aria-label="control" />
            </OutlinedControlContainer>,
        )
        expect(ref.current).toBe(container.firstElementChild)
    })

    it('merges exceptionallySetClassName onto the wrapper', () => {
        const { container } = render(
            <OutlinedControlContainer exceptionallySetClassName="custom">
                <input aria-label="control" />
            </OutlinedControlContainer>,
        )
        expect(container.firstElementChild).toHaveClass('custom')
    })

    describe('chrome class wiring', () => {
        it('applies the base container class to the wrapper', () => {
            const { container } = render(
                <OutlinedControlContainer>
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            expect(container.firstElementChild).toHaveClass(styles.container!)
        })

        it('applies the small border-radius class by default', () => {
            const { container } = render(
                <OutlinedControlContainer>
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            expect(container.firstElementChild).toHaveClass(styles.borderRadiusSmall!)
            expect(container.firstElementChild).not.toHaveClass(styles.borderRadiusLarge!)
        })

        it('applies the large border-radius class when borderRadius="large"', () => {
            const { container } = render(
                <OutlinedControlContainer borderRadius="large">
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            expect(container.firstElementChild).toHaveClass(styles.borderRadiusLarge!)
            expect(container.firstElementChild).not.toHaveClass(styles.borderRadiusSmall!)
        })
    })

    describe('click-to-focus dispatch', () => {
        it('focuses the inner control when the wrapper is clicked', async () => {
            const { container } = render(
                <OutlinedControlContainer>
                    <input data-testid="control" aria-label="control" />
                </OutlinedControlContainer>,
            )
            const control = screen.getByTestId('control')
            expect(control).not.toHaveFocus()

            await userEvent.click(container.firstElementChild as Element)
            expect(control).toHaveFocus()
        })

        it('does not double-fire when the inner control is clicked directly', async () => {
            const onControlClick = jest.fn()
            render(
                <OutlinedControlContainer>
                    <button type="button" data-testid="control" onClick={onControlClick}>
                        click
                    </button>
                </OutlinedControlContainer>,
            )
            await userEvent.click(screen.getByTestId('control'))
            expect(onControlClick).toHaveBeenCalledTimes(1)
        })

        it('calls a consumer onClick passed via Box props when the wrapper is clicked', async () => {
            const onClick = jest.fn()
            const { container } = render(
                <OutlinedControlContainer onClick={onClick}>
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            await userEvent.click(container.firstElementChild as Element)
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not latch the dispatch guard if the dispatched click does not bubble', async () => {
            const { container } = render(
                <OutlinedControlContainer>
                    <input
                        aria-label="control"
                        data-testid="control"
                        onClick={(e) => e.stopPropagation()}
                    />
                </OutlinedControlContainer>,
            )
            const wrapper = container.firstElementChild as Element
            const control = screen.getByTestId('control')

            await userEvent.click(wrapper)
            expect(control).toHaveFocus()

            control.blur()
            await userEvent.click(wrapper)
            expect(control).toHaveFocus()
        })

        it('uses showPicker for native <select>', async () => {
            const showPicker = jest.fn()
            const { container } = render(
                <OutlinedControlContainer>
                    <select aria-label="fruit" data-testid="control">
                        <option value="a">A</option>
                    </select>
                </OutlinedControlContainer>,
            )
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const select = screen.getByRole('combobox') as unknown as HTMLSelectElement
            // jsdom does not implement showPicker; stub it.
            Object.assign(select, { showPicker })

            await userEvent.click(container.firstElementChild as Element)
            expect(showPicker).toHaveBeenCalledTimes(1)
            expect(select).toHaveFocus()
        })
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <>
                    <label htmlFor="plain">Plain</label>
                    <OutlinedControlContainer>
                        <input id="plain" />
                    </OutlinedControlContainer>
                </>,
            )
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
