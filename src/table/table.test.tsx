import * as React from 'react'

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow } from './index'

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

    it('has no automated accessibility violations', async () => {
        const { container } = render(<BasicTable />)
        expect(await axe(container)).toHaveNoViolations()
    })
})
