import React from 'react'
import { render, screen } from '@testing-library/react'

import { Loading } from './loading'

describe('Loading', () => {
    it('renders a loading indicator', () => {
        render(<Loading />)
        expect(screen.getByRole('alert', { name: 'Loading' })).toBeVisible()
    })

    it('adds accessibility attributes', () => {
        render(<Loading />)

        const loading = screen.getByRole('alert', { name: 'Loading' })
        expect(loading).toHaveAttribute('aria-live', 'assertive')
    })

    it('allows for custom aria labels', () => {
        render(<Loading aria-label="Your content is now loading" />)

        expect(screen.getByRole('alert', { name: 'Your content is now loading' })).toBeVisible()
    })

    it('adds additionally supplied className', () => {
        render(<Loading className="additional className" />)

        const loading = screen.getByRole('alert', { name: 'Loading' })
        expect(loading).toHaveClass('additional', 'className')
    })
})
