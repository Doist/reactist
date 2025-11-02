import * as React from 'react'

import { render, screen } from '@testing-library/react'

import { Hidden } from './hidden'

describe('Hidden', () => {
    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Hidden
                print
                data-testid="hidden-element"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                Something
            </Hidden>,
        )
        expect(screen.getByTestId('hidden-element')).toHaveClass('right')
        expect(screen.getByTestId('hidden-element')).not.toHaveClass('wrong')
    })

    it('can be rendered as any HTML element', () => {
        render(
            <Hidden print data-testid="hidden-element" as="main">
                Something
            </Hidden>,
        )
        expect(screen.getByTestId('hidden-element').tagName).toBe('MAIN')
    })

    it('renders its children as its content', () => {
        render(
            <Hidden print data-testid="hidden-element">
                <div>one</div>
                <div>two</div>
            </Hidden>,
        )
        expect(screen.getByTestId('hidden-element').innerHTML).toMatchInlineSnapshot(
            `"<div>one</div><div>two</div>"`,
        )
    })

    it('requires receiving some criteria to hide itself', () => {
        /* eslint-disable no-console */
        const originalConsoleWarn = console.warn
        console.warn = jest.fn()

        render(
            // @ts-expect-error requires receiving some prop that instructs under which condition to hide
            <Hidden data-testid="hidden-element">Something</Hidden>,
        )
        const hiddenElement = screen.getByTestId('hidden-element')
        expect(hiddenElement).not.toHaveClass('hiddenOnPrint')
        expect(hiddenElement.className).not.toMatch('display-none')

        console.warn = originalConsoleWarn
        /* eslint-enable no-console */
    })

    describe('print={true}', () => {
        it('hides the element in print mode', () => {
            render(
                <Hidden print data-testid="hidden-element">
                    Something
                </Hidden>,
            )
            expect(screen.getByTestId('hidden-element')).toHaveClass('hiddenOnPrint')
        })
    })

    describe('above="…"', () => {
        it('works as expected', () => {
            const { rerender } = render(
                <Hidden data-testid="hidden-element" above="mobile">
                    Something
                </Hidden>,
            )
            const hiddenElement = screen.getByTestId('hidden-element')
            expect(hiddenElement).toHaveClass('display-block')
            expect(hiddenElement).toHaveClass('tablet-display-none')
            expect(hiddenElement).toHaveClass('desktop-display-none')

            rerender(
                <Hidden data-testid="hidden-element" above="tablet">
                    Something
                </Hidden>,
            )
            expect(hiddenElement).toHaveClass('display-block')
            expect(hiddenElement).toHaveClass('tablet-display-block')
            expect(hiddenElement).toHaveClass('desktop-display-none')
        })

        it('works alongside print={true}', () => {
            render(
                <Hidden above="mobile" print data-testid="hidden-element">
                    Something
                </Hidden>,
            )
            const hiddenElement = screen.getByTestId('hidden-element')
            expect(hiddenElement).toHaveClass('hiddenOnPrint')
            expect(hiddenElement).toHaveClass('display-block')
            expect(hiddenElement).toHaveClass('tablet-display-none')
            expect(hiddenElement).toHaveClass('desktop-display-none')
        })
    })

    describe('below="…"', () => {
        it('works as expected', () => {
            const { rerender } = render(
                <Hidden below="tablet" data-testid="hidden-element">
                    Something
                </Hidden>,
            )
            const hiddenElement = screen.getByTestId('hidden-element')
            expect(hiddenElement).toHaveClass('display-none')
            expect(hiddenElement).toHaveClass('tablet-display-block')
            expect(hiddenElement).toHaveClass('desktop-display-block')

            rerender(<Hidden below="desktop">Something</Hidden>)
            expect(hiddenElement).toHaveClass('display-none')
            expect(hiddenElement).toHaveClass('tablet-display-none')
            expect(hiddenElement).toHaveClass('desktop-display-block')
        })

        it('works alongside print={true}', () => {
            render(
                <Hidden below="desktop" print data-testid="hidden-element">
                    Something
                </Hidden>,
            )
            const hiddenElement = screen.getByTestId('hidden-element')
            expect(hiddenElement).toHaveClass('hiddenOnPrint')
            expect(hiddenElement).toHaveClass('display-none')
            expect(hiddenElement).toHaveClass('tablet-display-none')
            expect(hiddenElement).toHaveClass('desktop-display-block')
        })
    })

    describe('above="…" and below="…" at the same time', () => {
        it('is not allowed', () => {
            /* eslint-disable no-console */
            const originalConsoleWarn = console.warn
            console.warn = jest.fn()

            render(
                // @ts-expect-error
                <Hidden above="tablet" below="tablet" data-testid="hidden-element">
                    Something
                </Hidden>,
            )

            expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/but not both/))

            const hiddenElement = screen.getByTestId('hidden-element')
            expect(hiddenElement).toHaveClass('display-none')
            expect(hiddenElement.className).not.toMatch(/(tablet|desktop)-display/)

            console.warn = originalConsoleWarn
            /* eslint-enable no-console */
        })
    })
})
