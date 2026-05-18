import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select } from './select'

describe('Select', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Select
                onChange={jest.fn()}
                value="test"
                options={[{ value: 'test', text: 'test' }]}
            />,
        )
        expect(container).toMatchSnapshot()
    })

    it('calls onChange handler with selected value', async () => {
        const onChangeSpy = jest.fn()

        render(
            <Select
                onChange={onChangeSpy}
                value="test"
                options={[{ value: 'test2', text: 'test2' }]}
            />,
        )
        const user = userEvent.setup()

        await user.selectOptions(screen.getByRole('combobox'), 'test2')

        expect(onChangeSpy).toHaveBeenLastCalledWith('test2')
    })
})
