import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ColorItem, ColorPicker } from './color-picker'

describe('ColorPicker', () => {
    it('renders without crashing', async () => {
        const { container } = render(<ColorPicker />)
        const user = userEvent.setup()
        await user.click(screen.getByRole('button'))
        expect(container).toMatchSnapshot()
    })

    it('renders with custom colorList', async () => {
        const { container } = render(<ColorPicker colorList={['red', 'green', '#0000FF']} />)
        const user = userEvent.setup()
        await user.click(screen.getByRole('button'))
        expect(container).toMatchSnapshot()
    })

    describe('ColorItem', () => {
        it('renders given color and does nothing when clicked without specified onClick handler', async () => {
            const { container } = render(<ColorItem color="#606060" colorIndex={0} />)
            const user = userEvent.setup()
            await user.click(screen.getByTestId('reactist-color-item'))
            expect(container).toMatchSnapshot()
        })

        it('adds active class when prop is supplied', () => {
            render(<ColorItem color="#fff" colorIndex={5} isActive />)
            expect(screen.getByTestId('reactist-color-item')).toHaveClass('active')
        })

        it('calls onClick after clicking it', async () => {
            const onClick = jest.fn()
            render(<ColorItem color="#fff" colorIndex={5} onClick={onClick} />)
            const user = userEvent.setup()

            await user.click(screen.getByTestId('reactist-color-item'))

            expect(onClick).toHaveBeenLastCalledWith(5)
        })
    })
})
