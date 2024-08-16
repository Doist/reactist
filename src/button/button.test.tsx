import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, IconButton } from './button'
import { axe } from 'jest-axe'

jest.mock('../spinner', () => ({
    Spinner() {
        return '⏳'
    },
}))

describe('Button', () => {
    it('renders a semantic button', () => {
        render(<Button variant="primary">Click me</Button>)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(
            <Button variant="primary" onClick={onClick}>
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).not.toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('ignore clicks when disabled', () => {
        const onClick = jest.fn()
        render(
            <Button variant="primary" onClick={onClick} disabled>
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('only applies a soft disabled state to the button', () => {
        render(
            <Button variant="primary" disabled>
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).not.toBeDisabled()
        expect(button).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(button).toHaveFocus()
    })

    it('submits a form when used with type="submit"', () => {
        const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
        render(
            <form onSubmit={onSubmit}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>,
        )
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).not.toHaveAttribute('aria-disabled', 'true')
        expect(button).toHaveAttribute('type', 'submit')
        expect(onSubmit).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('does not submit a form when disabled', () => {
        const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
        render(
            <form onSubmit={onSubmit}>
                <Button variant="primary" type="submit" disabled>
                    Submit
                </Button>
            </form>,
        )
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).toHaveAttribute('aria-disabled', 'true')
        expect(onSubmit).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Button
                variant="primary"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('right')
        expect(button).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <Button variant="primary">
                Click me <strong>now</strong>
            </Button>,
        )
        expect(
            screen.getByRole('button', { name: 'Click me now' }).innerHTML,
        ).toMatchInlineSnapshot(
            `"<span class=\\"label box textAlign-center overflow-hidden\\">Click me <strong>now</strong></span>"`,
        )
    })

    it('renders a tooltip when the tooltip prop is given', async () => {
        render(
            <Button variant="primary" tooltip="tooltip content here">
                Click me
            </Button>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('button', { name: 'Click me' })).toHaveFocus()
        expect(
            await screen.findByRole('tooltip', { name: 'tooltip content here' }),
        ).toBeInTheDocument()
    })

    it('applies any extra props to the underlying button', () => {
        render(
            <Button variant="primary" type="submit" data-testid="test-button">
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveAttribute('type', 'submit')
        expect(button).toBe(screen.getByTestId('test-button'))
    })

    it('applies different class names based on variant', () => {
        const { rerender } = render(<Button variant="primary">Click me</Button>)
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-secondary')
        expect(button).not.toHaveClass('variant-tertiary')
        expect(button).not.toHaveClass('variant-quaternary')

        rerender(<Button variant="secondary">Click me</Button>)
        expect(button).toHaveClass('variant-secondary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-primary')
        expect(button).not.toHaveClass('variant-tertiary')
        expect(button).not.toHaveClass('variant-quaternary')

        rerender(<Button variant="tertiary">Click me</Button>)
        expect(button).toHaveClass('variant-tertiary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-primary')
        expect(button).not.toHaveClass('variant-secondary')
        expect(button).not.toHaveClass('variant-quaternary')

        rerender(<Button variant="quaternary">Click me</Button>)
        expect(button).toHaveClass('variant-quaternary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('variant-primary')
        expect(button).not.toHaveClass('variant-secondary')
        expect(button).not.toHaveClass('variant-tertiary')
    })

    it('applies different class names based on tone', () => {
        const { rerender } = render(<Button variant="primary">Click me</Button>)
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('tone-destructive')

        rerender(
            <Button variant="primary" tone="destructive">
                Click me
            </Button>,
        )
        expect(button).toHaveClass('variant-primary', 'tone-destructive', 'size-normal')
        expect(button).not.toHaveClass('tone-normal')
    })

    it('applies different class names based on size', () => {
        const { rerender } = render(
            <Button variant="primary" size="normal">
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(button).not.toHaveClass('size-small')
        expect(button).not.toHaveClass('size-large')

        rerender(
            <Button variant="secondary" size="small">
                Click me
            </Button>,
        )
        expect(button).toHaveClass('variant-secondary', 'tone-normal', 'size-small')
        expect(button).not.toHaveClass('size-normal')
        expect(button).not.toHaveClass('size-large')

        rerender(
            <Button variant="tertiary" size="large">
                Click me
            </Button>,
        )
        expect(button).toHaveClass('variant-tertiary', 'tone-normal', 'size-large')
        expect(button).not.toHaveClass('size-normal')
        expect(button).not.toHaveClass('size-small')
    })

    it('applies different class names to the label based on width and alignment', () => {
        render(
            <Button variant="primary" width="full" align="end">
                Click me
            </Button>,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        const buttonLabel = within(button).getByText('Click me')
        expect(buttonLabel).toHaveClass('textAlign-end')
        expect(buttonLabel).toHaveClass('width-full')
    })

    describe('with icons', () => {
        it('renders an icon before the label when startIcon is given', () => {
            render(
                <Button variant="primary" startIcon="😄">
                    Smile
                </Button>,
            )
            const button = screen.getByRole('button', { name: 'Smile' })
            expect(button.textContent).toMatchInlineSnapshot(`"😄Smile"`)
        })

        it('renders an icon after the label when endIcon is given', () => {
            render(
                <Button variant="primary" endIcon="😄">
                    Smile
                </Button>,
            )
            const button = screen.getByRole('button', { name: 'Smile' })
            expect(button.textContent).toMatchInlineSnapshot(`"Smile😄"`)
        })
    })

    describe('when loading={true}', () => {
        it('ignores clicks', () => {
            const onClick = jest.fn()
            render(
                <Button variant="primary" loading onClick={onClick}>
                    Click me
                </Button>,
            )
            userEvent.click(screen.getByRole('button', { name: 'Click me' }))
            expect(onClick).not.toHaveBeenCalled()
        })

        it('does not submit a form', () => {
            const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
            render(
                <form onSubmit={onSubmit}>
                    <Button variant="primary" type="submit" loading>
                        Submit
                    </Button>
                </form>,
            )
            const button = screen.getByRole('button', { name: 'Submit' })
            expect(button).toHaveAttribute('aria-disabled', 'true')
            expect(button).toHaveAttribute('type', 'submit')
            expect(onSubmit).not.toHaveBeenCalled()
            userEvent.click(button)
            expect(onSubmit).not.toHaveBeenCalled()
        })

        it('renders the button with aria-disabled="true"', () => {
            render(
                <Button variant="primary" loading>
                    Click me
                </Button>,
            )
            expect(screen.getByRole('button', { name: 'Click me' })).toHaveAttribute(
                'aria-disabled',
                'true',
            )
        })

        it('renders a loading spinner after the end of the label by default', () => {
            render(
                <Button variant="primary" loading>
                    Click me
                </Button>,
            )
            expect(
                screen.getByRole('button', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"Click me⏳"`)
        })

        it('renders a loading spinner before the start of the label if a startIcon is given', () => {
            render(
                <Button variant="primary" startIcon="😄" loading>
                    Click me
                </Button>,
            )
            expect(
                screen.getByRole('button', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"⏳Click me"`)
        })

        it('renders a loading spinner after the end of the label if an endIcon is given', () => {
            render(
                <Button variant="primary" endIcon="😄" loading>
                    Click me
                </Button>,
            )
            expect(
                screen.getByRole('button', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"Click me⏳"`)
        })

        it('renders a loading spinner after the end of the label if both startIcon and endIcon are given', () => {
            render(
                <Button variant="primary" startIcon="😄" endIcon="😄" loading>
                    Click me
                </Button>,
            )
            expect(
                screen.getByRole('button', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"😄Click me⏳"`)
        })

        it('renders a loading spinner in place of the icon when rendering in single-icon mode', () => {
            render(<IconButton variant="primary" icon="😄" aria-label="Click me" loading />)
            expect(
                screen.getByRole('button', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"⏳"`)
        })
    })

    describe('a11y', () => {
        it('renders text buttons with no a11y violations', async () => {
            const { container } = render(
                <>
                    <Button variant="primary" tone="normal">
                        Normal
                    </Button>
                    <Button variant="primary" tone="destructive">
                        Destructive
                    </Button>

                    <Button variant="primary" tone="normal" disabled>
                        Normal (Disabled)
                    </Button>
                    <Button variant="primary" tone="destructive" disabled>
                        Destructive (Disabled)
                    </Button>

                    <Button variant="primary" tone="normal" loading>
                        Normal (Loading)
                    </Button>
                    <Button variant="primary" tone="destructive" loading>
                        Destructive (Loading)
                    </Button>
                </>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })

        it('renders icon-only buttons with no a11y violations', async () => {
            const { container } = render(
                <>
                    <IconButton variant="primary" tone="normal" icon="😄" aria-label="Normal" />
                    <IconButton
                        variant="primary"
                        tone="destructive"
                        icon="😄"
                        aria-label="Destructive"
                    />

                    <IconButton
                        variant="primary"
                        tone="normal"
                        icon="😄"
                        disabled
                        aria-label="Normal (Disabled)"
                    />
                    <IconButton
                        variant="primary"
                        tone="destructive"
                        icon="😄"
                        disabled
                        aria-label="Destructive (Disabled)"
                    />

                    <IconButton
                        variant="primary"
                        tone="normal"
                        icon="😄"
                        loading
                        aria-label="Normal (Loading)"
                    />
                    <IconButton
                        variant="primary"
                        tone="destructive"
                        icon="😄"
                        loading
                        aria-label="Destructive (Loading)"
                    />
                </>,
            )
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})

describe('IconButton', () => {
    it('renders a semantic button', () => {
        render(<IconButton variant="primary" icon="😄" aria-label="Click me" />)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(<IconButton variant="primary" icon="😄" aria-label="Click me" onClick={onClick} />)
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).not.toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('ignore clicks when disabled', () => {
        const onClick = jest.fn()
        render(
            <IconButton
                variant="primary"
                icon="😄"
                aria-label="Click me"
                onClick={onClick}
                disabled
            />,
        )
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('only applies a soft disabled state to the button', () => {
        render(<IconButton variant="primary" icon="😄" aria-label="Click me" disabled />)
        const button = screen.getByRole('button', { name: 'Click me' })
        expect(button).not.toBeDisabled()
        expect(button).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(button).toHaveFocus()
    })

    it('submits a form when used with type="submit"', () => {
        const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
        render(
            <form onSubmit={onSubmit}>
                <IconButton variant="primary" type="submit" icon="😄" aria-label="Submit" />
            </form>,
        )
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).not.toHaveAttribute('aria-disabled', 'true')
        expect(button).toHaveAttribute('type', 'submit')
        expect(onSubmit).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('does not submit a form when disabled', () => {
        const onSubmit = jest.fn().mockImplementation((event) => event.preventDefault())
        render(
            <form onSubmit={onSubmit}>
                <IconButton
                    variant="primary"
                    icon="😄"
                    aria-label="Submit"
                    type="submit"
                    disabled
                />
            </form>,
        )
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).toHaveAttribute('aria-disabled', 'true')
        expect(onSubmit).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('renders an icon-only button with the given non-visual label', () => {
        render(<IconButton variant="primary" icon="😄" aria-label="Smile" />)
        const button = screen.getByRole('button', { name: 'Smile' })
        expect(button.textContent).toMatchInlineSnapshot(`"😄"`)
    })

    it('renders with the aria-label implicitly used as its tooltip', async () => {
        render(<IconButton variant="primary" icon="😄" aria-label="Smile" />)
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('button', { name: 'Smile' })).toHaveFocus()
        expect(await screen.findByRole('tooltip', { name: 'Smile' })).toBeInTheDocument()
    })

    it('renders a different tooltip if given explicitly', async () => {
        render(<IconButton variant="primary" icon="😄" aria-label="Smile" tooltip="Say cheese!" />)
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('button', { name: 'Smile' })).toHaveFocus()
        expect(await screen.findByRole('tooltip', { name: 'Say cheese!' })).toBeInTheDocument()
    })

    it('allows to supress the implicit "aria-label as tooltip" behaviour by passing tooltip={null}', () => {
        jest.useFakeTimers()

        render(<IconButton variant="primary" icon="😄" aria-label="Smile" tooltip={null} />)
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('button', { name: 'Smile' })).toHaveFocus()

        act(() => {
            jest.advanceTimersByTime(2000) // More than enough time for a potential tooltip appearance
        })

        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

        jest.useRealTimers()
    })
})

describe('<Button render={<a href="…" />} />', () => {
    it('renders a semantic link', () => {
        render(
            <Button variant="primary" render={<a href="/" />}>
                Click me
            </Button>,
        )
        expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(
            <Button variant="primary" onClick={onClick} render={<a href="/" />}>
                Click me
            </Button>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(link)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('ignore clicks when disabled', () => {
        let isNavigationPrevented = false
        const clickSpy: React.MouseEventHandler<HTMLDivElement> = jest
            .fn()
            .mockImplementation((event: React.MouseEvent<HTMLDivElement>) => {
                isNavigationPrevented = event.defaultPrevented
            })

        const onClick = jest.fn()
        render(
            <div onClick={clickSpy}>
                <Button variant="primary" onClick={onClick} disabled render={<a href="/" />}>
                    Click me
                </Button>
            </div>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })

        expect(link).toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(link)
        expect(onClick).not.toHaveBeenCalled()
        expect(isNavigationPrevented).toBe(true)
    })

    it('only applies a soft disabled state to the link', () => {
        render(
            <Button variant="primary" disabled render={<a href="/" />}>
                Click me
            </Button>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toBeDisabled()
        expect(link).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(link).toHaveFocus()
    })
})

describe('<IconButton render={<a href="…" />} />', () => {
    it('renders a semantic link', () => {
        render(
            <IconButton
                variant="primary"
                render={<a href="/" />}
                icon="😄"
                aria-label="Click me"
            />,
        )
        expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(
            <IconButton
                variant="primary"
                onClick={onClick}
                render={<a href="/" />}
                icon="😄"
                aria-label="Click me"
            />,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(link)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('ignore clicks when disabled', () => {
        let isNavigationPrevented = false
        const clickSpy: React.MouseEventHandler<HTMLDivElement> = jest
            .fn()
            .mockImplementation((event: React.MouseEvent<HTMLDivElement>) => {
                isNavigationPrevented = event.defaultPrevented
            })

        const onClick = jest.fn()
        render(
            <div onClick={clickSpy}>
                <IconButton
                    variant="primary"
                    onClick={onClick}
                    disabled
                    render={<a href="/" />}
                    icon="😄"
                    aria-label="Click me"
                />
            </div>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })

        expect(link).toHaveAttribute('aria-disabled', 'true')
        expect(onClick).not.toHaveBeenCalled()
        userEvent.click(link)
        expect(onClick).not.toHaveBeenCalled()
        expect(isNavigationPrevented).toBe(true)
    })

    it('only applies a soft disabled state to the link', () => {
        render(
            <IconButton
                variant="primary"
                disabled
                render={<a href="/" />}
                icon="😄"
                aria-label="Click me"
            />,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toBeDisabled()
        expect(link).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(link).toHaveFocus()
    })
})
