import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Alert, type AlertProps } from './alert'

describe('Alert', () => {
    it('allows to be dismissed', () => {
        function Example(props: Omit<AlertProps, 'closeLabel' | 'onClose'>) {
            const [show, setShow] = useState(true)
            return show ? (
                <Alert {...props} closeLabel="Close alert" onClose={() => setShow(false)} />
            ) : null
        }
        render(<Example tone="info">Info message</Example>)
        expect(screen.getByRole('alert')).toHaveTextContent('Info message')
        userEvent.click(screen.getByRole('button', { name: 'Close alert' }))
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('renders with no a11y violations', async () => {
        const { container } = render(
            <>
                <Alert tone="info">Info message</Alert>
                <Alert tone="info" closeLabel="Close" onClose={() => undefined}>
                    Another info message
                </Alert>
            </>,
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
