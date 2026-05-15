import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { OutlinedControlContainer } from './outlined-control-container'

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
            // The class is hashed by CSS Modules in production but the import yields
            // an object whose `.container` value is the actual className used.
            // We assert presence of the class indirectly via toHaveClass with the
            // module's resolved class name.
            expect(container.firstElementChild?.className).toMatch(/container/)
        })

        it('applies the small border-radius class by default', () => {
            const { container } = render(
                <OutlinedControlContainer>
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            expect(container.firstElementChild?.className).toMatch(/borderRadiusSmall/)
            expect(container.firstElementChild?.className).not.toMatch(/borderRadiusLarge/)
        })

        it('applies the large border-radius class when borderRadius="large"', () => {
            const { container } = render(
                <OutlinedControlContainer borderRadius="large">
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            expect(container.firstElementChild?.className).toMatch(/borderRadiusLarge/)
            expect(container.firstElementChild?.className).not.toMatch(/borderRadiusSmall/)
        })
    })

    describe('click-to-focus dispatch', () => {
        it('focuses the inner control when the wrapper is clicked', () => {
            const { container } = render(
                <OutlinedControlContainer>
                    <input data-testid="control" aria-label="control" />
                </OutlinedControlContainer>,
            )
            const control = screen.getByTestId('control')
            expect(control).not.toHaveFocus()

            userEvent.click(container.firstElementChild as Element)
            expect(control).toHaveFocus()
        })

        it('does not double-fire when the inner control is clicked directly', () => {
            const onControlClick = jest.fn()
            render(
                <OutlinedControlContainer>
                    <button type="button" data-testid="control" onClick={onControlClick}>
                        click
                    </button>
                </OutlinedControlContainer>,
            )
            userEvent.click(screen.getByTestId('control'))
            expect(onControlClick).toHaveBeenCalledTimes(1)
        })

        it('calls a consumer onClick passed via Box props when the wrapper is clicked', () => {
            const onClick = jest.fn()
            const { container } = render(
                <OutlinedControlContainer onClick={onClick}>
                    <input aria-label="control" />
                </OutlinedControlContainer>,
            )
            userEvent.click(container.firstElementChild as Element)
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('uses showPicker for native <select>', () => {
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

            userEvent.click(container.firstElementChild as Element)
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
