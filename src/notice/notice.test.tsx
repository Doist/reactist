import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Notice } from './notice'

describe('Alert', () => {
    it('renders with the given text', () => {
        render(<Notice tone="info">Info message</Notice>)
        expect(screen.getByRole('alert')).toHaveTextContent('Info message')
    })

    it('renders with no a11y violations', async () => {
        const { container } = render(<Notice tone="info">Info message</Notice>)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
