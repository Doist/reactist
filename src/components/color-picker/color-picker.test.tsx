import * as React from 'react'
import { act } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ColorItem, ColorPicker } from './color-picker'

function click(...args: Parameters<typeof userEvent.click>) {
    act(() => {
        userEvent.click(...args)
    })
}

describe('ColorPicker', () => {
    it('renders without crashing', () => {
        const { container } = render(<ColorPicker />)
        click(screen.getByRole('button'))
        expect(container).toMatchSnapshot()
    })

    it('renders with custom colorList', () => {
        const { container } = render(<ColorPicker colorList={['red', 'green', '#0000FF']} />)
        click(screen.getByRole('button'))
        expect(container).toMatchSnapshot()
    })

    describe('ColorItem', () => {
        it('renders given color and does nothing when clicked without specified onClick handler', () => {
            const { container } = render(<ColorItem color="#606060" colorIndex={0} />)
            click(screen.getByTestId('reactist-color-item'))
            expect(container).toMatchSnapshot()
        })

        it('adds active class when prop is supplied', () => {
            render(<ColorItem color="#fff" colorIndex={5} isActive />)
            expect(screen.getByTestId('reactist-color-item')).toHaveClass('active')
        })

        it('calls onClick after clicking it', () => {
            const onClick = jest.fn()
            render(<ColorItem color="#fff" colorIndex={5} onClick={onClick} />)

            click(screen.getByTestId('reactist-color-item'))

            expect(onClick).toHaveBeenLastCalledWith(5)
        })
    })
})
