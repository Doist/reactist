import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { runSpaceTests } from '../test-helpers'
import { Columns, Column, ColumnWidth } from './'
import { axe } from 'jest-axe'

const columnWidths: Array<ColumnWidth> = [
    '1/2',
    '1/3',
    '1/4',
    '1/5',
    '2/3',
    '2/5',
    '3/4',
    '3/5',
    '4/5',
    'auto',
    'content',
]

describe('Columns', () => {
    it('can be rendered as any HTML element', () => {
        render(<Columns data-testid="container" as="label" />)
        expect(screen.getByTestId('container').tagName).toBe('LABEL')
    })

    it('renders its child Column elements as its content', () => {
        render(
            <Columns data-testid="container">
                {columnWidths.map((width) => (
                    <Column key={width} width={width}>
                        {width}
                    </Column>
                ))}
            </Columns>,
        )
        expect(screen.getByTestId('container').childNodes).toHaveLength(columnWidths.length)
        expect(screen.getByTestId('container')).toHaveTextContent(columnWidths.join(''))
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Columns
                data-testid="container"
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            />,
        )
        expect(screen.getByTestId('container')).not.toHaveClass('wrong')
        expect(screen.getByTestId('container')).toHaveClass('right')
    })

    it('renders as a flex row container', () => {
        render(<Columns data-testid="container" />)
        expect(screen.getByTestId('container')).toHaveClass('display-flex', 'flexDirection-row')
    })

    it('applies some extra class names corresponding to other layout-related props', () => {
        render(
            <Columns
                data-testid="container"
                maxWidth="large"
                minWidth="small"
                padding="medium"
                border="primary"
                borderRadius="standard"
                background="highlight"
            />,
        )
        expect(screen.getByTestId('container')).toHaveClass(
            'box',
            'minWidth-small',
            'maxWidth-large',
            'paddingTop-medium',
            'paddingRight-medium',
            'paddingBottom-medium',
            'paddingLeft-medium',
            'bg-highlight',
            'borderRadius-standard',
            'border-primary',
        )
    })

    describe('align', () => {
        it('sets the columns horizontal alignment', () => {
            // test with no explicit alignment first
            const { rerender } = render(<Columns data-testid="container" />)
            expect(screen.getByTestId('container')).toHaveClass('justifyContent-flexStart')

            // left-aligned horizontally
            rerender(<Columns data-testid="container" align="left" />)
            expect(screen.getByTestId('container')).toHaveClass('justifyContent-flexStart')

            // centered horizontally
            rerender(<Columns data-testid="container" align="center" />)
            expect(screen.getByTestId('container')).toHaveClass('justifyContent-center')

            // right-aligned horizontally
            rerender(<Columns data-testid="container" align="right" />)
            expect(screen.getByTestId('container')).toHaveClass('justifyContent-flexEnd')
        })

        it('supports specifying a responsive value', () => {
            render(
                <Columns
                    data-testid="container"
                    align={{ mobile: 'left', tablet: 'center', desktop: 'right' }}
                />,
            )
            expect(screen.getByTestId('container')).toHaveClass(
                'justifyContent-flexStart',
                'tablet-justifyContent-center',
                'desktop-justifyContent-flexEnd',
            )
        })
    })

    describe('alignY', () => {
        it('sets the columns vertical alignment', () => {
            // test with no explicit alignment first
            const { rerender } = render(<Columns data-testid="container" />)
            expect(screen.getByTestId('container')).toHaveClass('alignItems-flexStart')

            // top-aligned vertically
            rerender(<Columns data-testid="container" alignY="top" />)
            expect(screen.getByTestId('container')).toHaveClass('alignItems-flexStart')

            // centered vertically
            rerender(<Columns data-testid="container" alignY="center" />)
            expect(screen.getByTestId('container')).toHaveClass('alignItems-center')

            // bottom-aligned vertically
            rerender(<Columns data-testid="container" alignY="bottom" />)
            expect(screen.getByTestId('container')).toHaveClass('alignItems-flexEnd')
        })

        it('supports specifying a responsive value', () => {
            render(
                <Columns
                    data-testid="container"
                    alignY={{ mobile: 'top', tablet: 'center', desktop: 'bottom' }}
                />,
            )
            expect(screen.getByTestId('container')).toHaveClass(
                'alignItems-flexStart',
                'tablet-alignItems-center',
                'desktop-alignItems-flexEnd',
            )
        })
    })

    describe('collapseBellow', () => {
        it('is set to render stacked when instructed to collapse below a certain responsive viewport width', () => {
            const { rerender } = render(<Columns data-testid="container" />)
            const container = screen.getByTestId('container')

            // never collapses by default
            expect(container).toHaveClass('display-flex', 'flexDirection-row')
            expect(container).not.toHaveClass('flexDirection-column')
            expect(container).not.toHaveClass('tablet-flexDirection-row')
            expect(container).not.toHaveClass('tablet-flexDirection-column')
            expect(container).not.toHaveClass('desktop-flexDirection-row')
            expect(container).not.toHaveClass('desktop-flexDirection-column')

            // collapses on screens of tablet-like sizes or smaller
            rerender(<Columns data-testid="container" collapseBelow="tablet" />)
            expect(container).toHaveClass(
                'display-flex',
                'flexDirection-column',
                'tablet-flexDirection-row',
            )
            expect(container).not.toHaveClass('flexDirection-row')
            expect(container).not.toHaveClass('tablet-flexDirection-column')
            expect(container).not.toHaveClass('desktop-flexDirection-row')
            expect(container).not.toHaveClass('desktop-flexDirection-column')

            // collapses on screens of tablet-like sizes or smaller
            rerender(<Columns data-testid="container" collapseBelow="desktop" />)
            expect(container).toHaveClass(
                'display-flex',
                'flexDirection-column',
                'tablet-flexDirection-column',
                'desktop-flexDirection-row',
            )
            expect(container).not.toHaveClass('flexDirection-row')
            expect(container).not.toHaveClass('tablet-flexDirection-row')
            expect(container).not.toHaveClass('desktop-flexDirection-column')
        })
    })

    runSpaceTests(Columns)

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(<Columns />)
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})

describe('Column', () => {
    it('renders its children as its content', () => {
        render(
            <Columns>
                <Column data-testid="column">
                    Hello <strong>world</strong>!
                </Column>
            </Columns>,
        )
        expect(screen.getByTestId('column').innerHTML).toMatchInlineSnapshot(
            `"Hello <strong>world</strong>!"`,
        )
    })

    it('can be rendered as any HTML element', () => {
        render(
            <Columns>
                <Column data-testid="column" as="li" />
            </Columns>,
        )
        expect(screen.getByTestId('column').tagName).toBe('LI')
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Columns>
                <Column
                    data-testid="column"
                    // @ts-expect-error
                    className="bad"
                    exceptionallySetClassName="good"
                />
            </Columns>,
        )
        expect(screen.getByTestId('column')).not.toHaveClass('bad')
        expect(screen.getByTestId('column')).toHaveClass('good')
    })

    it('is set to width auto by default', () => {
        render(
            <Columns>
                <Column data-testid="column" />
            </Columns>,
        )
        const column = screen.getByTestId('column')
        // We have no better way to check this than checking that no other columnWidth class is applied
        for (const width of columnWidths) {
            if (width === 'auto') continue
            expect(column).not.toHaveClass(`columnWidth-${width.replace('/', '-')}`)
        }
    })

    it('is set to zero mininum width regardless of the width prop value', () => {
        const { rerender } = render(
            <Columns>
                <Column data-testid="column" width="content" />
            </Columns>,
        )
        const column = screen.getByTestId('column')

        for (const width of columnWidths) {
            rerender(
                <Columns>
                    <Column data-testid="column" width={width} />
                </Columns>,
            )
            expect(column).toHaveClass('minWidth-0')
        }
    })

    it('is set to the specified width', () => {
        const { rerender } = render(
            <Columns>
                <Column data-testid="column" />
            </Columns>,
        )
        const column = screen.getByTestId('column')

        // // for width="content" no css class is added
        // for (const width of columnWidths) {
        //     expect(column).not.toHaveClass(`columnWidth-${width.replace('/', '-')}`)
        // }

        // for all non-content widths, a single corresponding css class is added
        for (const actualWidth of columnWidths) {
            rerender(
                <Columns>
                    <Column data-testid="column" width={actualWidth} />
                </Columns>,
            )
            for (const width of columnWidths) {
                if (width === actualWidth) continue
                expect(column).not.toHaveClass(`columnWidth-${width.replace('/', '-')}`)
            }
            expect(column).toHaveClass(`columnWidth-${actualWidth.replace('/', '-')}`)
        }
    })

    it('is set to shrink only if width="content"', () => {
        const { rerender } = render(
            <Columns>
                <Column data-testid="column" width="content" />
            </Columns>,
        )
        const column = screen.getByTestId('column')
        expect(column).toHaveClass('flexShrink-0')

        for (const width of columnWidths) {
            if (width === 'content') continue
            rerender(
                <Columns>
                    <Column data-testid="column" width={width} />
                </Columns>,
            )
            expect(column).not.toHaveClass('flexShrink-0')
        }
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <Columns>
                    <Column>Test</Column>
                </Columns>,
            )
            const results = await axe(container)

            expect(results).toHaveNoViolations()
        })
    })
})
