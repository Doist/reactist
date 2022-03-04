import * as React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Modal, ModalHeader, ModalFooter, ModalActions, ModalBody, ModalCloseButton } from './modal'
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
                <Modal isOpen={isOpen} onDismiss={() => setOpen(false)} aria-label="modal">
                    <button type="button" onClick={() => setOpen(false)}>
                        Close me
                    </button>
                    <button type="button">Another button</button>
                </Modal>
            </>
        )
    }

    it('renders a semantic accessible dialog', () => {
        render(
            <Modal isOpen aria-label="I'm an accessible dialog">
                Hello
            </Modal>,
        )
        expect(screen.getByRole('dialog', { name: "I'm an accessible dialog" })).toBeInTheDocument()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Modal
                aria-label="modal"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </Modal>,
        )
        const modal = screen.getByRole('dialog', { name: 'modal' })
        expect(modal).toHaveClass('right')
        expect(modal).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <Modal isOpen aria-label="modal">
                <div>one</div>
                <div>two</div>
            </Modal>,
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
        render(<ModalHeader>Hello</ModalHeader>)
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <ModalHeader
                data-testid="modal-header"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </ModalHeader>,
        )
        const modalHeader = screen.getByTestId('modal-header')
        expect(modalHeader).toHaveClass('right')
        expect(modalHeader).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <ModalHeader data-testid="modal-header">
                <div data-testid="modal-header-content">Hello</div>
            </ModalHeader>,
        )
        expect(
            within(screen.getByTestId('modal-header')).getByTestId('modal-header-content'),
        ).toBeInTheDocument()
    })

    it("renders a button that calls the modal's onDismiss callback when clicked", () => {
        const onDismiss = jest.fn()
        render(
            <Modal isOpen onDismiss={onDismiss} aria-label="modal">
                <ModalHeader>Hello</ModalHeader>
            </Modal>,
        )
        expect(onDismiss).not.toHaveBeenCalled()
        userEvent.click(screen.getByRole('button', { name: 'Close modal' }))
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('allows to render custom content in place of the button', () => {
        render(<ModalHeader button={<a href="/help">Help</a>}>Hello</ModalHeader>)
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument()
    })

    it('hides the button if its content is set to `false` or `null`', () => {
        const { rerender } = render(<ModalHeader button={false}>Hello</ModalHeader>)
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.queryByTestId('button-container')).not.toBeInTheDocument()
        rerender(<ModalHeader button={null}>Hello</ModalHeader>)
        expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument()
        expect(screen.queryByTestId('button-container')).not.toBeInTheDocument()
    })

    it('optionally renders a divider', () => {
        const { rerender } = render(<ModalHeader>Hello</ModalHeader>)
        expect(screen.queryByRole('separator')).not.toBeInTheDocument()
        rerender(<ModalHeader withDivider>Hello</ModalHeader>)
        expect(screen.getByRole('separator')).toBeInTheDocument()
    })
})

describe('ModalFooter', () => {
    it('renders a semantic contentinfo', () => {
        render(<ModalFooter>Hello</ModalFooter>)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <ModalFooter
                data-testid="modal-footer"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </ModalFooter>,
        )
        const modalFooter = screen.getByTestId('modal-footer')
        expect(modalFooter).toHaveClass('right')
        expect(modalFooter).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <ModalFooter data-testid="modal-footer">
                <div data-testid="modal-footer-content">Hello</div>
            </ModalFooter>,
        )
        expect(
            within(screen.getByTestId('modal-footer')).getByTestId('modal-footer-content'),
        ).toBeInTheDocument()
    })

    it('optionally renders a divider', () => {
        const { rerender } = render(<ModalFooter>Hello</ModalFooter>)
        expect(screen.queryByRole('separator')).not.toBeInTheDocument()
        rerender(<ModalFooter withDivider>Hello</ModalFooter>)
        expect(screen.getByRole('separator')).toBeInTheDocument()
    })
})

describe('ModalActions', () => {
    it('renders a semantic contentinfo', () => {
        render(<ModalActions data-testid="modal-actions">Hello</ModalActions>)
        expect(screen.getByRole('contentinfo')).toBe(screen.getByTestId('modal-actions'))
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <ModalActions
                data-testid="modal-actions"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </ModalActions>,
        )
        const modalFooter = screen.getByTestId('modal-actions')
        expect(modalFooter).toHaveClass('right')
        expect(modalFooter).not.toHaveClass('wrong')
    })

    it('renders its children inlined inside it', () => {
        render(
            <ModalActions data-testid="modal-actions">
                <button>OK</button>
                <button>Cancel</button>
            </ModalActions>,
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
        const { rerender } = render(<ModalActions>Hello</ModalActions>)
        expect(screen.queryByRole('separator')).not.toBeInTheDocument()
        rerender(<ModalActions withDivider>Hello</ModalActions>)
        expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('ignores null children', () => {
        render(
            <ModalActions data-testid="modal-actions">
                <button>OK</button>
                <button>Cancel</button>
                {null}
            </ModalActions>,
        )
        expect(screen.getByTestId('modal-actions').firstChild?.childNodes).toHaveLength(2)
    })

    it('flattens fragments', () => {
        render(
            <ModalActions data-testid="modal-actions">
                <>
                    <button>Overwrite</button>
                    <button>Keep copy</button>
                </>
                <button>Cancel</button>
            </ModalActions>,
        )
        expect(screen.getByTestId('modal-actions').firstChild?.childNodes).toHaveLength(3)
    })
})

describe('ModalBody', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <ModalBody
                data-testid="modal-body"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Hello
            </ModalBody>,
        )
        const modalBody = screen.getByTestId('modal-body')
        expect(modalBody).toHaveClass('right')
        expect(modalBody).not.toHaveClass('wrong')
    })

    it('renders its children as its content', () => {
        render(
            <ModalBody data-testid="modal-body">
                <div data-testid="modal-body-content">Hello</div>
            </ModalBody>,
        )
        expect(
            within(screen.getByTestId('modal-body')).getByTestId('modal-body-content'),
        ).toBeInTheDocument()
    })

    it('adapts its styles to the height prop of the outer Modal', () => {
        const { rerender } = render(
            <Modal isOpen height="fitContent" aria-label="modal">
                <ModalBody data-testid="modal-body">Content</ModalBody>
            </Modal>,
        )
        const modalBody = screen.getByTestId('modal-body')
        expect(modalBody).toHaveClass('flexGrow-0')
        expect(modalBody).not.toHaveClass('flexGrow-1')
        expect(modalBody).not.toHaveClass('height-full')

        rerender(
            <Modal isOpen height="expand" aria-label="modal">
                <ModalBody data-testid="modal-body">Content</ModalBody>
            </Modal>,
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
            <Modal isOpen onDismiss={onDismiss} aria-label="modal">
                <ModalHeader button={<ModalCloseButton aria-label="Cerrar ventana" />}>
                    Hello
                </ModalHeader>
            </Modal>,
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
            <Modal isOpen={true} aria-label="modal">
                <input type="text" aria-labelledby="test-label" />
                <label id="test-label">Test Input</label>
            </Modal>,
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it('renders with no a11y violations when using inner-structure components', async () => {
        const { container } = render(
            <Modal isOpen={true} aria-label="modal">
                <ModalHeader>Header</ModalHeader>
                <ModalBody>Body</ModalBody>
                <ModalFooter>Footer</ModalFooter>
            </Modal>,
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })

    it("calls the modal's onDismiss callback when 'Esc' is pressed", () => {
        const onDismiss = jest.fn()
        render(
            <Modal isOpen onDismiss={onDismiss} aria-label="modal">
                <ModalHeader>Hello</ModalHeader>
            </Modal>,
        )
        const modal = screen.getByRole('dialog', { name: 'modal' })

        expect(onDismiss).not.toHaveBeenCalled()
        userEvent.type(modal, '{esc}')
        expect(onDismiss).toHaveBeenCalledTimes(1)
    })
})
