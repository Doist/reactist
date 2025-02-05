import * as React from 'react'

import { Input } from './input'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
    it('renders without crashing', () => {
        const { container } = render(<Input />)
        expect(container).toMatchSnapshot()
    })

    it('adds arbitrary props to the underlying input element', () => {
        const onChange = jest.fn()
        render(<Input onChange={onChange} />)

        userEvent.type(screen.getByRole('textbox'), 'Hello')
        expect(onChange).toHaveBeenCalled()
    })

    it('adds additional className when supplied', () => {
        render(<Input className="very-complex classnames-are-added" />)
        expect(screen.getByRole('textbox')).toHaveClass('very-complex classnames-are-added')
    })
})
