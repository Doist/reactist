import React from 'react'
import { render } from '@testing-library/react'

import CloseIcon from '../CloseIcon.svg'

describe('CloseIcon', () => {
    it('renders a svg icon', () => {
        const { container } = render(<CloseIcon />)
        expect(container).toMatchSnapshot()
    })
})
