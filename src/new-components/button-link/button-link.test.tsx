import * as React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonLink } from './button-link'

jest.mock('../spinner', () => ({
    Spinner() {
        return '⏳'
    },
}))

describe('ButtonLink', () => {
    it('renders a semantic link', () => {
        render(
            <ButtonLink href="/" variant="primary">
                Click me
            </ButtonLink>,
        )
        expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', () => {
        const onClick = jest.fn()
        render(
            <ButtonLink href="/" variant="primary" onClick={onClick}>
                Click me
            </ButtonLink>,
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
                <ButtonLink href="/" variant="primary" onClick={onClick} disabled>
                    Click me
                </ButtonLink>
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
            <ButtonLink href="/" variant="primary" disabled>
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).not.toBeDisabled()
        expect(link).toHaveAttribute('aria-disabled', 'true')
        userEvent.tab()
        expect(link).toHaveFocus()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <ButtonLink
                href="/"
                variant="primary"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('right')
        expect(link).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <ButtonLink href="/" variant="primary">
                Click me <strong>now</strong>
            </ButtonLink>,
        )
        const buttonLink = screen.getByRole('link', { name: 'Click me now' })
        expect(buttonLink.innerHTML).toMatchInlineSnapshot(
            `"<span class=\\"label box textAlign-center overflow-hidden\\">Click me <strong>now</strong></span>"`,
        )
    })

    it('renders a tooltip when prop is supplied', async () => {
        render(
            <ButtonLink href="/" variant="primary" tooltip="tooltip content here">
                Click me
            </ButtonLink>,
        )
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        userEvent.tab()
        expect(screen.getByRole('link', { name: 'Click me' })).toHaveFocus()
        expect(
            await screen.findByRole('tooltip', { name: 'tooltip content here' }),
        ).toBeInTheDocument()
    })

    it('applies any extra props to the underlying link', () => {
        render(
            <ButtonLink href="/" variant="primary" type="submit" data-testid="test-link">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveAttribute('type', 'submit')
        expect(link).toBe(screen.getByTestId('test-link'))
    })

    it('applies different class names based on variant', () => {
        const { rerender } = render(
            <ButtonLink href="/" variant="primary">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-secondary')
        expect(link).not.toHaveClass('variant-tertiary')
        expect(link).not.toHaveClass('variant-quaternary')

        rerender(
            <ButtonLink href="/" variant="secondary">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-secondary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-primary')
        expect(link).not.toHaveClass('variant-tertiary')
        expect(link).not.toHaveClass('variant-quaternary')

        rerender(
            <ButtonLink href="/" variant="tertiary">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-tertiary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-primary')
        expect(link).not.toHaveClass('variant-secondary')
        expect(link).not.toHaveClass('variant-quaternary')

        rerender(
            <ButtonLink href="/" variant="quaternary">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-quaternary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('variant-primary')
        expect(link).not.toHaveClass('variant-secondary')
        expect(link).not.toHaveClass('variant-tertiary')
    })

    it('applies different class names based on tone', () => {
        const { rerender } = render(
            <ButtonLink href="/" variant="primary">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('tone-destructive')

        rerender(
            <ButtonLink href="/" variant="primary" tone="destructive">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-primary', 'tone-destructive', 'size-normal')
        expect(link).not.toHaveClass('tone-normal')
    })

    it('applies different class names based on size', () => {
        const { rerender } = render(
            <ButtonLink href="/" variant="primary" size="normal">
                Click me
            </ButtonLink>,
        )
        const link = screen.getByRole('link', { name: 'Click me' })
        expect(link).toHaveClass('variant-primary', 'tone-normal', 'size-normal')
        expect(link).not.toHaveClass('size-small')
        expect(link).not.toHaveClass('size-large')

        rerender(
            <ButtonLink href="/" variant="secondary" size="small">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-secondary', 'tone-normal', 'size-small')
        expect(link).not.toHaveClass('size-normal')
        expect(link).not.toHaveClass('size-large')

        rerender(
            <ButtonLink href="/" variant="tertiary" size="large">
                Click me
            </ButtonLink>,
        )
        expect(link).toHaveClass('variant-tertiary', 'tone-normal', 'size-large')
        expect(link).not.toHaveClass('size-normal')
        expect(link).not.toHaveClass('size-small')
    })

    it('applies different class names to the label based on width and alignment', () => {
        render(
            <ButtonLink href="/" variant="primary" width="full" align="end">
                Click me
            </ButtonLink>,
        )
        const buttonLink = screen.getByRole('link', { name: 'Click me' })
        const buttonLabel = within(buttonLink).getByText('Click me')
        expect(buttonLabel).toHaveClass('textAlign-end')
        expect(buttonLabel).toHaveClass('width-full')
    })

    it('ignores align when width is not full', () => {
        render(
            // @ts-expect-error invalid props on purpose
            <ButtonLink href="/" variant="primary" align="end">
                Click me
            </ButtonLink>,
        )
        const buttonLink = screen.getByRole('link', { name: 'Click me' })
        expect(buttonLink).not.toHaveClass('align-end')
    })

    describe('with icons', () => {
        it('renders an icon before the label when startIcon is given', () => {
            render(
                <ButtonLink href="/" variant="primary" startIcon="😄">
                    Smile
                </ButtonLink>,
            )
            const buttonLink = screen.getByRole('link', { name: 'Smile' })
            expect(buttonLink.textContent).toMatchInlineSnapshot(`"😄Smile"`)
        })

        it('renders an icon after the label when endIcon is given', () => {
            render(
                <ButtonLink href="/" variant="primary" endIcon="😄">
                    Smile
                </ButtonLink>,
            )
            const buttonLink = screen.getByRole('link', { name: 'Smile' })
            expect(buttonLink.textContent).toMatchInlineSnapshot(`"Smile😄"`)
        })
    })

    describe('icon-only mode', () => {
        it('renders an icon-only ButtonLink with the given non-visual label', () => {
            render(<ButtonLink href="/" variant="primary" icon="😄" aria-label="Smile" />)
            const buttonLink = screen.getByRole('link', { name: 'Smile' })
            expect(buttonLink.textContent).toMatchInlineSnapshot(`"😄"`)
        })

        it('does not support receiving any of the props "children", "startIcon" and "endIcon"', () => {
            render(
                // @ts-expect-error invalid props on purpose
                <ButtonLink
                    href="/"
                    variant="primary"
                    icon="😄"
                    aria-label="Smile"
                    startIcon="😢"
                    endIcon="😢"
                >
                    Cry
                </ButtonLink>,
            )
            const buttonLink = screen.getByRole('link', { name: 'Smile' })
            expect(buttonLink.textContent).toMatchInlineSnapshot(`"😄"`)
        })

        it('does not support receiving any of the props "width" and "align"', () => {
            render(
                // @ts-expect-error invalid props on purpose
                <ButtonLink
                    href="/"
                    variant="primary"
                    icon="😄"
                    aria-label="Smile"
                    width="full"
                    align="end"
                />,
            )
            const buttonLink = screen.getByRole('link', { name: 'Smile' })
            expect(buttonLink.className).not.toMatch(/align/)
            expect(buttonLink.className).not.toMatch(/width/)
        })
    })

    describe('when loading={true}', () => {
        it('ignores clicks', () => {
            const onClick = jest.fn()
            render(
                <ButtonLink href="/" variant="primary" loading onClick={onClick}>
                    Click me
                </ButtonLink>,
            )
            userEvent.click(screen.getByRole('link', { name: 'Click me' }))
            expect(onClick).not.toHaveBeenCalled()
        })

        it('renders the link with aria-disabled="true"', () => {
            render(
                <ButtonLink href="/" variant="primary" loading>
                    Click me
                </ButtonLink>,
            )
            expect(screen.getByRole('link', { name: 'Click me' })).toHaveAttribute(
                'aria-disabled',
                'true',
            )
        })

        it('renders a loading spinner after the end of the label by default', () => {
            render(
                <ButtonLink href="/" variant="primary" loading>
                    Click me
                </ButtonLink>,
            )
            expect(
                screen.getByRole('link', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"Click me⏳"`)
        })

        it('renders a loading spinner before the start of the label if a startIcon is given', () => {
            render(
                <ButtonLink href="/" variant="primary" startIcon="😄" loading>
                    Click me
                </ButtonLink>,
            )
            expect(
                screen.getByRole('link', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"⏳Click me"`)
        })

        it('renders a loading spinner after the end of the label if an endIcon is given', () => {
            render(
                <ButtonLink href="/" variant="primary" endIcon="😄" loading>
                    Click me
                </ButtonLink>,
            )
            expect(
                screen.getByRole('link', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"Click me⏳"`)
        })

        it('renders a loading spinner after the end of the label if both startIcon and endIcon are given', () => {
            render(
                <ButtonLink href="/" variant="primary" startIcon="😄" endIcon="😄" loading>
                    Click me
                </ButtonLink>,
            )
            expect(
                screen.getByRole('link', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"😄Click me⏳"`)
        })

        it('renders a loading spinner in place of the icon when rendering in single-icon mode', () => {
            render(
                <ButtonLink href="/" variant="primary" icon="😄" aria-label="Click me" loading />,
            )
            expect(
                screen.getByRole('link', { name: 'Click me' }).textContent,
            ).toMatchInlineSnapshot(`"⏳"`)
        })
    })
})
