import * as React from 'react'

import { Select } from './select'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

    it('calls onChange handler with selected value', () => {
        const onChangeSpy = jest.fn()

        render(
            <Select
                onChange={onChangeSpy}
                value="test"
                options={[{ value: 'test2', text: 'test2' }]}
            />,
        )

        userEvent.selectOptions(screen.getByRole('combobox'), 'test2')

        expect(onChangeSpy).toHaveBeenLastCalledWith('test2')
    })
})
