import * as React from 'react'
import { render, screen, within } from '@testing-library/react'
import {
    DeprecatedModal,
    DeprecatedModalHeader,
    DeprecatedModalFooter,
    DeprecatedModalActions,
    DeprecatedModalBody,
    DeprecatedModalCloseButton,
} from './modal'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

describe('Modal', () => {
    function TestCaseWithState() {
        const [isOpen, setOpen] = React.useState(false)
        return (
            <>
                <button type="button" onClick={() => setOpen(true)}>
                    Click me
                </button>
                <DeprecatedModal
                    isOpen={isOpen}
                    onDismiss={() => setOpen(false)}
                    aria-label="modal"
                >
                    <button type="button" onClick={() => setOpen(false)}>
                        Close me
                    </button>
                    <button type="button">Another button</button>
                </DeprecatedModal>
            </>
        )
    }

    it('renders a semantic accessible dialog', () => {
        render(
            <DeprecatedModal isOpen aria-label="I'm an accessible dialog">
                Hello
            </DeprecatedModal>,
        )
        expect(screen.getByRole('dialog', { name: "I'm an accessible dialog" })).toBeInTheDocument()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <DeprecatedModal
                aria-label="modal"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </DeprecatedModal>,
        )
        const modal = screen.getByRole('dialog', { name: 'modal' })
        expect(modal).toHaveClass('right')
        expect(modal).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <DeprecatedModal isOpen aria-label="modal">
                <div>one</div>
                <div>two</div>
            </DeprecatedModal>,
        )
        const modal = screen.getByRole('dialog', { name: 'modal' })
        expect(modal.innerHTML).toMatchInlineSnapshot(`"<div>one</div><div>two</div>"`)
    })

    it('is dismissed if isOpen="false"', () => {
        render(<TestCaseWithState />)
        expect(screen.queryByRole('dialog', { name: 'modal' })).not.toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.getByRole('dialog', { name: 'modal' })).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'Close me' }))
        expect(screen.queryByRole('dialog', { name: 'modal' })).not.toBeInTheDocument()
    })

    it('hides the content underneath from assistive technologies', () => {
        render(<TestCaseWithState />)
        userEvent.click(screen.getByRole('button', { name: 'Click me' }))

        // Button is present, but not found by role
        expect(screen.queryByRole('button', { name: 'Click me' })).not.toBeInTheDocument()
        expect(screen.getByText('Click me')).toBeInTheDocument()

        // Button is visible by role again once the modal is gone
        userEvent.click(screen.getByRole('button', { name: 'Close me' }))
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('is dismissed when clicking in the overlay', () => {
        render(<TestCaseWithState />)
        userEvent.click(screen.getByRole('button', { name: 'Click me' }))
        expect(screen.getByRole('dialog', { name: 'modal' })).toBeInTheDocument()
        userEvent.click(screen.getByTestId('modal-overlay'))
        expect(screen.queryByRole('dialog', { name: 'modal' })).not.toBeInTheDocument()
    })
})

describe('ModalHeader', () => {
    it('renders a semantic banner', () => {
        render(<DeprecatedModalHeader>Hello</DeprecatedModalHeader>)
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <DeprecatedModalHeader
                data-testid="modal-header"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </DeprecatedModalHeader>,
        )
        const modalHeader = screen.getByTestId('modal-header')
        expect(modalHeader).toHaveClass('right')
        expect(modalHeader).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <DeprecatedModalHeader data-testid="modal-header">
                <div data-testid="modal-header-content">Hello</div>
            </DeprecatedModalHeader>,
        )
        expect(
            within(screen.getByTestId('modal-header')).getByTestId('modal-header-content'),
        ).toBeInTheDocument()
    })

    it("renders a button that calls the modal's onDismiss callback when clicked", () => {
        const onDismiss = jest.fn()
        render(
            <DeprecatedModal isOpen onDismiss={onDismiss} aria-label="modal">
                <DeprecatedModalHeader>Hello</DeprecatedModalHeader>
            </DeprecatedModal>,
        )
        expect(onDismiss).not.toHaveBeenCalled()
        userEvent.click(screen.getByRole('button', { name: 'Close modal' }))
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('allows to render custom content in place of the button', () => {
        render(
            <DeprecatedModalHeader button={<a href="/help">Help</a>}>Hello</DeprecatedModalHeader>,
        )
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument()
    })

    it('hides the button if its content is set to `false` or `null`', () => {
        const { rerender } = render(
            <DeprecatedModalHeader button={false}>Hello</DeprecatedModalHeader>,
        )
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.queryByTestId('button-container')).not.toBeInTheDocument()
        rerender(<DeprecatedModalHeader button={null}>Hello</DeprecatedModalHeader>)
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.queryByTestId('button-container')).not.toBeInTheDocument()
    })

    it('optionally renders a divider', () => {
        const { rerender } = render(<DeprecatedModalHeader>Hello</DeprecatedModalHeader>)
        expect(screen.queryByRole('separator')).not.toBeInTheDocument()
        rerender(<DeprecatedModalHeader withDivider>Hello</DeprecatedModalHeader>)
        expect(screen.getByRole('separator')).toBeInTheDocument()
    })
})

describe('ModalFooter', () => {
    it('renders a semantic contentinfo', () => {
        render(<DeprecatedModalFooter>Hello</DeprecatedModalFooter>)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <DeprecatedModalFooter
                data-testid="modal-footer"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </DeprecatedModalFooter>,
        )
        const modalFooter = screen.getByTestId('modal-footer')
        expect(modalFooter).toHaveClass('right')
        expect(modalFooter).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <DeprecatedModalFooter data-testid="modal-footer">
                <div data-testid="modal-footer-content">Hello</div>
            </DeprecatedModalFooter>,
        )
        expect(
            within(screen.getByTestId('modal-footer')).getByTestId('modal-footer-content'),
        ).toBeInTheDocument()
    })

    it('optionally renders a divider', () => {
        const { rerender } = render(<DeprecatedModalFooter>Hello</DeprecatedModalFooter>)
        expect(screen.queryByRole('separator')).not.toBeInTheDocument()
        rerender(<DeprecatedModalFooter withDivider>Hello</DeprecatedModalFooter>)
        expect(screen.getByRole('separator')).toBeInTheDocument()
    })
})

describe('ModalActions', () => {
    it('renders a semantic contentinfo', () => {
        render(<DeprecatedModalActions data-testid="modal-actions">Hello</DeprecatedModalActions>)
        expect(screen.getByRole('contentinfo')).toBe(screen.getByTestId('modal-actions'))
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <DeprecatedModalActions
                data-testid="modal-actions"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </DeprecatedModalActions>,
        )
        const modalFooter = screen.getByTestId('modal-actions')
        expect(modalFooter).toHaveClass('right')
        expect(modalFooter).not.toHaveClass('wrong')
    })

    it('renders its children inlined inside it', () => {
        render(
            <DeprecatedModalActions data-testid="modal-actions">
                <button>OK</button>
                <button>Cancel</button>
            </DeprecatedModalActions>,
        )
        expect(screen.getByTestId('modal-actions')).toMatchInlineSnapshot(`
            <footer
              class="box paddingTop-large paddingRight-large paddingBottom-large paddingLeft-large"
              data-testid="modal-actions"
            >
              <div
                class="space-large box display-flex flexDirection-row flexWrap-wrap alignItems-center justifyContent-flexEnd"
              >
                <button>
                  OK
                </button>
                <button>
                  Cancel
                </button>
              </div>
            </footer>
        `)
    })

    it('optionally renders a divider', () => {
        const { rerender } = render(<DeprecatedModalActions>Hello</DeprecatedModalActions>)
        expect(screen.queryByRole('separator')).not.toBeInTheDocument()
        rerender(<DeprecatedModalActions withDivider>Hello</DeprecatedModalActions>)
        expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('ignores null children', () => {
        render(
            <DeprecatedModalActions data-testid="modal-actions">
                <button>OK</button>
                <button>Cancel</button>
                {null}
            </DeprecatedModalActions>,
        )
        expect(screen.getByTestId('modal-actions').firstChild?.childNodes).toHaveLength(2)
    })

    it('flattens fragments', () => {
        render(
            <DeprecatedModalActions data-testid="modal-actions">
                <>
                    <button>Overwrite</button>
                    <button>Keep copy</button>
                </>
                <button>Cancel</button>
            </DeprecatedModalActions>,
        )
        expect(screen.getByTestId('modal-actions').firstChild?.childNodes).toHaveLength(3)
    })
})

describe('ModalBody', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <DeprecatedModalBody
                data-testid="modal-body"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </DeprecatedModalBody>,
        )
        const modalBody = screen.getByTestId('modal-body')
        expect(modalBody).toHaveClass('right')
        expect(modalBody).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <DeprecatedModalBody data-testid="modal-body">
                <div data-testid="modal-body-content">Hello</div>
            </DeprecatedModalBody>,
        )
        expect(
            within(screen.getByTestId('modal-body')).getByTestId('modal-body-content'),
        ).toBeInTheDocument()
    })

    it('adapts its styles to the height prop of the outer Modal', () => {
        const { rerender } = render(
            <DeprecatedModal isOpen height="fitContent" aria-label="modal">
                <DeprecatedModalBody data-testid="modal-body">Content</DeprecatedModalBody>
            </DeprecatedModal>,
        )
        const modalBody = screen.getByTestId('modal-body')
        expect(modalBody).toHaveClass('flexGrow-0')
        expect(modalBody).not.toHaveClass('flexGrow-1')
        expect(modalBody).not.toHaveClass('height-full')

        rerender(
            <DeprecatedModal isOpen height="expand" aria-label="modal">
                <DeprecatedModalBody data-testid="modal-body">Content</DeprecatedModalBody>
            </DeprecatedModal>,
        )
        expect(modalBody).not.toHaveClass('flexGrow-0')
        expect(modalBody).toHaveClass('flexGrow-1')
        expect(modalBody).toHaveClass('height-full')
    })
})

describe('ModalCloseButton', () => {
    function renderTestCase() {
        const onDismiss = jest.fn()
        const renderResult = render(
            <DeprecatedModal isOpen onDismiss={onDismiss} aria-label="modal">
                <DeprecatedModalHeader
                    button={<DeprecatedModalCloseButton aria-label="Cerrar ventana" />}
                >
                    Hello
                </DeprecatedModalHeader>
            </DeprecatedModal>,
        )
        return {
            button: screen.getByRole('button', { name: 'Cerrar ventana' }),
            onDismiss,
            ...renderResult,
        }
    }

    it('can be used to render a customized button in place of the default one', () => {
        renderTestCase()
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cerrar ventana' })).toBeInTheDocument()
    })

    it("calls the modal's onDismiss callback when clicked", () => {
        const { button, onDismiss } = renderTestCase()
        expect(onDismiss).not.toHaveBeenCalled()
        userEvent.click(button)
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('renders as a regular non-submit button', () => {
        const { button } = renderTestCase()
        expect(button).toHaveAttribute('type', 'button')
    })

    it('renders a svg icon as its content', () => {
        const { button } = renderTestCase()
        expect(button.firstElementChild?.tagName).toBe('svg')
    })

    it('does not get focus initially', () => {
        const { button } = renderTestCase()
        expect(button).not.toHaveFocus()
    })
})

describe('a11y', () => {
    it('renders with no a11y violations with custom content', async () => {
        const { container } = render(
            <DeprecatedModal isOpen={true} aria-label="modal">
                <input type="text" aria-labelledby="test-label" />
                <label id="test-label">Test Input</label>
            </DeprecatedModal>,
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it('renders with no a11y violations when using inner-structure components', async () => {
        const { container } = render(
            <DeprecatedModal isOpen={true} aria-label="modal">
                <DeprecatedModalHeader>Header</DeprecatedModalHeader>
                <DeprecatedModalBody>Body</DeprecatedModalBody>
                <DeprecatedModalFooter>Footer</DeprecatedModalFooter>
            </DeprecatedModal>,
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it("calls the modal's onDismiss callback when 'Esc' is pressed", () => {
        const onDismiss = jest.fn()
        render(
            <DeprecatedModal isOpen onDismiss={onDismiss} aria-label="modal">
                <DeprecatedModalHeader>Hello</DeprecatedModalHeader>
            </DeprecatedModal>,
        )
        const modal = screen.getByRole('dialog', { name: 'modal' })

        expect(onDismiss).not.toHaveBeenCalled()
        userEvent.type(modal, '{esc}')
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })
})
