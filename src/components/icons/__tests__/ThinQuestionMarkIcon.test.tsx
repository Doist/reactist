import * as React from 'react'

import { render } from '@testing-library/react'

import ThinQuestionMarkIcon from '../ThinQuestionMarkIcon.svg'

describe('ThinQuestionMarkIcon', () => {
    it('renders a svg icon', () => {
        const { container } = render(<ThinQuestionMarkIcon />)
        expect(container).toMatchSnapshot()
    })
})
