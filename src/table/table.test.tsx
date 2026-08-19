import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { Text } from '../text'

import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableColumnHeader,
    TableHeader,
    TableRow,
} from './index'

function BasicTable({ withHeader = true }: { withHeader?: boolean }) {
    return (
        <Table aria-label="People">
            {withHeader ? (
                <TableHeader>
                    <TableColumnHeader>Person</TableColumnHeader>
                    <TableColumnHeader>Role</TableColumnHeader>
                </TableHeader>
            ) : null}
            <TableBody>
                <TableRow>
                    <TableCell>Avery Morgan</TableCell>
                    <TableCell>Product designer</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

describe('Table primitives', () => {
    it('renders native table semantics from composed children', () => {
        render(<BasicTable />)
        expect(screen.getByRole('table', { name: 'People' })).toBeInTheDocument()
        expect(screen.getAllByRole('columnheader')).toHaveLength(2)
        expect(screen.getByRole('cell', { name: 'Avery Morgan' })).toBeInTheDocument()
    })

    it('renders no thead when TableHeader is omitted', () => {
        const { container } = render(<BasicTable withHeader={false} />)
        expect(container.querySelector('thead')).toBeNull()
        expect(screen.queryAllByRole('columnheader')).toHaveLength(0)
        expect(screen.getByRole('cell', { name: 'Avery Morgan' })).toBeInTheDocument()
    })

    it('forwards refs on every primitive', () => {
        const refs = {
            table: React.createRef<HTMLTableElement>(),
            body: React.createRef<HTMLTableSectionElement>(),
            row: React.createRef<HTMLTableRowElement>(),
            cell: React.createRef<HTMLTableCellElement>(),
        }
        render(
            <Table ref={refs.table} aria-label="People">
                <TableBody ref={refs.body}>
                    <TableRow ref={refs.row}>
                        <TableCell ref={refs.cell}>Avery</TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        )
        expect(refs.table.current?.tagName).toBe('TABLE')
        expect(refs.body.current?.tagName).toBe('TBODY')
        expect(refs.row.current?.tagName).toBe('TR')
        expect(refs.cell.current?.tagName).toBe('TD')
    })

    it('renders cell content untouched, imposing no type style of its own', () => {
        render(
            <Table aria-label="People">
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Text variant="callout-2" lineClamp={1}>
                                Avery Morgan
                            </Text>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        )
        const cellText = screen.getByText('Avery Morgan')
        expect(cellText.className).toContain('variant-callout-2')
        expect(cellText.className).toContain('lineClamp-1')
        expect(cellText.parentElement?.tagName).toBe('TD')
    })

    it('marks only rows with aria-selected as selectable', () => {
        render(
            <Table aria-label="People">
                <TableBody>
                    <TableRow aria-selected={false}>
                        <TableCell>Selectable</TableCell>
                    </TableRow>
                    <TableRow aria-selected>
                        <TableCell>Selected</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Plain</TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        )
        const rows = screen.getAllByRole('row')
        expect(rows[0]).toHaveAttribute('aria-selected', 'false')
        expect(rows[1]).toHaveAttribute('aria-selected', 'true')
        expect(rows[2]).not.toHaveAttribute('aria-selected')
    })

    it('maps the column width prop onto the column definition', () => {
        const { container } = render(
            <Table aria-label="People">
                <TableColumnGroup>
                    <TableColumn width="2/5" />
                    <TableColumn />
                </TableColumnGroup>
                <TableBody>
                    <TableRow>
                        <TableCell>Avery Morgan</TableCell>
                        <TableCell>Product designer</TableCell>
                    </TableRow>
                </TableBody>
            </Table>,
        )
        const [sized, defaulted] = Array.from(container.querySelectorAll('col'))
        expect(sized?.className).toContain('columnWidth-2-5')
        expect(defaulted?.className).toContain('columnWidth-auto')
    })

    it('has no automated accessibility violations', async () => {
        const { container } = render(<BasicTable />)
        expect(await axe(container)).toHaveNoViolations()
    })
})

describe('TableColumnHeader sorting', () => {
    function SortableHeader({
        sortDirection = null,
        onSort = jest.fn(),
        sortIcon,
    }: {
        sortDirection?: 'asc' | 'desc' | null
        onSort?: () => void
        sortIcon?: React.ReactNode
    }) {
        return (
            <Table aria-label="People">
                <TableHeader>
                    <TableColumnHeader
                        sortable
                        sortDirection={sortDirection}
                        onSort={onSort}
                        sortAriaLabel="Person, activate to sort ascending."
                        sortIcon={sortIcon}
                    >
                        Person
                    </TableColumnHeader>
                </TableHeader>
            </Table>
        )
    }

    it('omits aria-sort on a non-sortable header', () => {
        render(
            <Table aria-label="People">
                <TableHeader>
                    <TableColumnHeader>Person</TableColumnHeader>
                </TableHeader>
            </Table>,
        )
        expect(screen.getByRole('columnheader')).not.toHaveAttribute('aria-sort')
    })

    it.each([
        [null, 'none'],
        ['asc' as const, 'ascending'],
        ['desc' as const, 'descending'],
    ])('maps sortDirection %s to aria-sort %s', (direction, expected) => {
        render(<SortableHeader sortDirection={direction} />)
        expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', expected)
    })

    it('fires onSort exactly once per activation', async () => {
        const onSort = jest.fn()
        const user = userEvent.setup()
        render(<SortableHeader onSort={onSort} />)
        const button = screen.getByRole('button', { name: /Person/ })

        await user.click(button)
        expect(onSort).toHaveBeenCalledTimes(1)

        button.focus()
        await user.keyboard('{Enter}')
        expect(onSort).toHaveBeenCalledTimes(2)

        await user.keyboard(' ')
        expect(onSort).toHaveBeenCalledTimes(3)
    })
    it('renders the bundled sort icon when no slot is given', () => {
        const { container } = render(<SortableHeader sortDirection="asc" />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it.each([['asc' as const], ['desc' as const], [null]])(
        'replaces the bundled icon with the sortIcon slot when sorted %s',
        (direction) => {
            const { container } = render(
                <SortableHeader
                    sortDirection={direction}
                    sortIcon={<span data-testid="custom-icon" />}
                />,
            )
            expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
            expect(container.querySelector('svg')).not.toBeInTheDocument()
        },
    )

    it.each([
        ['asc' as const, false],
        ['desc' as const, true],
        [null, true],
    ])('rotates the indicator for sortDirection %s: %s', (direction, rotated) => {
        const { container } = render(<SortableHeader sortDirection={direction} />)
        const indicator = container.querySelector('th span[aria-hidden="true"]')
        expect(indicator?.className.includes('sortIndicatorDescending')).toBe(rotated)
    })
})
