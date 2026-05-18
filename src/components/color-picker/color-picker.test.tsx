import * as React from 'react'
import { act } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ColorItem, ColorPicker } from './color-picker'

type User = ReturnType<typeof userEvent.setup>

async function click(user: User, ...args: Parameters<User['click']>) {
    await act(async () => {
        await user.click(...args)
    })
}

describe('ColorPicker', () => {
    it('renders without crashing', async () => {
        const { container } = render(<ColorPicker />)
        const user = userEvent.setup()
        await click(user, screen.getByRole('button'))
        expect(container).toMatchSnapshot()
    })

    it('renders with custom colorList', async () => {
        const { container } = render(<ColorPicker colorList={['red', 'green', '#0000FF']} />)
        const user = userEvent.setup()
        await click(user, screen.getByRole('button'))
        expect(container).toMatchSnapshot()
    })

    describe('ColorItem', () => {
        it('renders given color and does nothing when clicked without specified onClick handler', async () => {
            const { container } = render(<ColorItem color="#606060" colorIndex={0} />)
            const user = userEvent.setup()
            await click(user, screen.getByTestId('reactist-color-item'))
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

            await click(user, screen.getByTestId('reactist-color-item'))

            expect(onClick).toHaveBeenLastCalledWith(5)
        })
    })
})
