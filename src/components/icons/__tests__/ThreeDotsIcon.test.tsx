import * as React from 'react'
import { render } from '@testing-library/react'

import ThreeDotsIcon from '../ThreeDotsIcon.svg'

describe('ThreeDotsIcon', () => {
    it('renders a svg icon', () => {
        const { container } = render(<ThreeDotsIcon />)
        expect(container).toMatchSnapshot()
    })
})
