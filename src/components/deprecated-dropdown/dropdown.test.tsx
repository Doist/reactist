import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Dropdown } from './dropdown'

describe('Dropdown', () => {
    describe('Dropdown.Box', () => {
        it('renders the Trigger component without crashing', () => {
            const { container } = render(
                <Dropdown.Box>
                    <Dropdown.Trigger />
                    <Dropdown.Body />
                </Dropdown.Box>,
            )

            expect(container).toMatchSnapshot()
        })

        it('applies additionally provided class name', () => {
            render(
                <Dropdown.Box className="additional class">
                    <Dropdown.Trigger />
                    <Dropdown.Body />
                </Dropdown.Box>,
            )

            const box = screen.getByTestId('reactist-dropdown-box')

            expect(box).toHaveClass('additional class')
        })

        it('sets the correct positioning style attributes to the Body component', () => {
            render(
                <Dropdown.Box top right>
                    <Dropdown.Trigger>Click me</Dropdown.Trigger>
                    <Dropdown.Body />
                </Dropdown.Box>,
            )

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))

            const body = screen.getByTestId('reactist-dropdown-body')

            expect(body).toHaveStyle({ top: 'auto', right: 'auto', left: 0, bottom: 0 })
        })

        it('toggles the Body component with each Trigger click', () => {
            render(
                <Dropdown.Box>
                    <Dropdown.Trigger>Click me</Dropdown.Trigger>
                    <Dropdown.Body>My content</Dropdown.Body>
                </Dropdown.Box>,
            )

            expect(screen.queryByTestId('reactist-dropdown-body')).not.toBeInTheDocument()

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(screen.getByTestId('reactist-dropdown-body')).toBeVisible()
            expect(screen.getByText('My content')).toBeVisible()

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(screen.queryByTestId('reactist-dropdown-body')).not.toBeInTheDocument()
            expect(screen.queryByText('My content')).not.toBeInTheDocument()
        })

        it('toggles the Body component as a function with each Trigger click', () => {
            render(
                <Dropdown.Box>
                    <Dropdown.Trigger>Click me</Dropdown.Trigger>
                    {(props) => <Dropdown.Body {...props}>My content</Dropdown.Body>}
                </Dropdown.Box>,
            )

            expect(screen.queryByTestId('reactist-dropdown-body')).not.toBeInTheDocument()

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(screen.getByTestId('reactist-dropdown-body')).toBeVisible()

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(screen.queryByTestId('reactist-dropdown-body')).not.toBeInTheDocument()
        })

        it('renders the Trigger component first when top prop is not provided', () => {
            const { container } = render(
                <Dropdown.Box>
                    <Dropdown.Trigger>Click me</Dropdown.Trigger>
                    <Dropdown.Body />
                </Dropdown.Box>,
            )

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))

            expect(container).toMatchSnapshot()
        })

        it('renders the Body component first when top prop is provided', () => {
            const { container } = render(
                <Dropdown.Box top>
                    <Dropdown.Trigger>Click me</Dropdown.Trigger>
                    <Dropdown.Body />
                </Dropdown.Box>,
            )

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))

            expect(container).toMatchSnapshot()
        })

        it('calls onShowBody and onHideBody callbacks when the Body component is shown and hidden', () => {
            const onShowBodySpy = jest.fn()
            const onHideBodySpy = jest.fn()

            render(
                <Dropdown.Box onShowBody={onShowBodySpy} onHideBody={onHideBodySpy}>
                    <Dropdown.Trigger>Click me</Dropdown.Trigger>
                    <Dropdown.Body />
                </Dropdown.Box>,
            )

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(onShowBodySpy).toHaveBeenCalledTimes(1)
            expect(onHideBodySpy).not.toHaveBeenCalled()

            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(onShowBodySpy).toHaveBeenCalledTimes(1)
            expect(onHideBodySpy).toHaveBeenCalledTimes(1)
        })
    })
})
