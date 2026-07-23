import * as React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { Table, TableCell, TableRow } from './'

import type { TableColumn } from './'

type Person = {
    id: string
    name: string
    role: string
}

const people: Person[] = [
    { id: 'person-1', name: 'Avery Morgan', role: 'Product designer' },
    { id: 'person-2', name: 'Sam Rivera', role: 'Engineer' },
]

const columns: TableColumn<Person>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
]

describe('Table', () => {
    it('renders typed columns and data with native table semantics', () => {
        render(<Table data={people} columns={columns} getRowId={(person) => person.id} />)

        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('columnheader')).toHaveLength(2)
        expect(screen.getAllByRole('row')).toHaveLength(3)
        expect(screen.getByRole('cell', { name: 'Avery Morgan' })).toBeInTheDocument()
        expect(screen.getByRole('cell', { name: 'Engineer' })).toBeInTheDocument()
    })

    it('exposes controlled sorting through labeled header buttons', async () => {
        const user = userEvent.setup()
        const onSort = jest.fn()

        render(
            <Table
                data={people}
                columns={columns}
                sorting={{ columnId: 'name', direction: 'asc' }}
                onSort={onSort}
                getSortAriaLabel={({ columnId, direction }) =>
                    direction ? `${columnId}, sorted ${direction}` : `${columnId}, activate to sort`
                }
            />,
        )

        expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute(
            'aria-sort',
            'ascending',
        )
        expect(screen.getByRole('columnheader', { name: 'Role' })).toHaveAttribute(
            'aria-sort',
            'none',
        )

        await user.click(screen.getByRole('button', { name: 'name, sorted asc' }))
        screen.getByRole('button', { name: 'role, activate to sort' }).focus()
        await user.keyboard('{Enter}')

        expect(onSort).toHaveBeenNthCalledWith(1, 'name')
        expect(onSort).toHaveBeenNthCalledWith(2, 'role')
        expect(onSort).toHaveBeenCalledTimes(2)
    })

    it('renders empty-state content across all visible columns', () => {
        render(<Table data={[]} columns={columns} emptyState="No people yet" />)

        expect(screen.getByRole('cell', { name: 'No people yet' })).toHaveAttribute('colspan', '2')
    })

    it('supports consumer-wired row activation, selection, and custom cells', async () => {
        const user = userEvent.setup()

        function SelectablePeopleTable() {
            const [selectedId, setSelectedId] = React.useState<string | null>(null)

            return (
                <Table
                    data={people}
                    columns={columns}
                    getRowId={(person) => person.id}
                    renderRow={(row) => (
                        <TableRow
                            key={row.id}
                            aria-selected={selectedId === row.id}
                            tabIndex={0}
                            onClick={() => setSelectedId(row.id)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    setSelectedId(row.id)
                                }
                            }}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} cell={cell}>
                                    {cell.column.id === 'name' ? (
                                        <strong>{row.original.name}</strong>
                                    ) : undefined}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                />
            )
        }

        render(<SelectablePeopleTable />)

        const averyRow = screen.getByRole('row', { name: 'Avery Morgan Product designer' })
        const samRow = screen.getByRole('row', { name: 'Sam Rivera Engineer' })

        await user.click(averyRow)
        expect(averyRow).toHaveAttribute('aria-selected', 'true')

        samRow.focus()
        await user.keyboard(' ')
        expect(samRow).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByText('Avery Morgan', { selector: 'strong' })).toBeInTheDocument()
    })

    it('forwards refs and styling escape hatches from the public building blocks', () => {
        const tableRef = React.createRef<HTMLTableElement>()
        const rowRef = React.createRef<HTMLTableRowElement>()
        const cellRef = React.createRef<HTMLTableCellElement>()

        render(
            <Table
                ref={tableRef}
                data={people.slice(0, 1)}
                columns={columns}
                exceptionallySetClassName="custom-table"
                renderRow={(row) => (
                    <TableRow key={row.id} ref={rowRef} exceptionallySetClassName="custom-row">
                        {row.getVisibleCells().map((cell, index) => (
                            <TableCell
                                key={cell.id}
                                ref={index === 0 ? cellRef : undefined}
                                cell={cell}
                                exceptionallySetClassName="custom-cell"
                            />
                        ))}
                    </TableRow>
                )}
            />,
        )

        expect(tableRef.current).toHaveClass('custom-table')
        expect(rowRef.current).toHaveClass('custom-row')
        expect(cellRef.current).toHaveClass('custom-cell')
    })

    it('applies inert to custom cells without relying on React version support', () => {
        render(
            <Table
                data={people.slice(0, 1)}
                columns={columns}
                renderRow={(row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} cell={cell} inert />
                        ))}
                    </TableRow>
                )}
            />,
        )

        expect(screen.getByRole('cell', { name: 'Avery Morgan' })).toHaveAttribute('inert')
        expect(screen.getByRole('cell', { name: 'Product designer' })).toHaveAttribute('inert')
    })

    it('has no automated accessibility violations in its sortable state', async () => {
        const { container } = render(
            <Table
                data={people}
                columns={columns}
                sorting={{ columnId: 'name', direction: 'desc' }}
                onSort={jest.fn()}
                getSortAriaLabel={({ columnId, direction }) =>
                    direction ? `${columnId}, sorted ${direction}` : `${columnId}, sortable`
                }
            />,
        )

        expect(await axe(container)).toHaveNoViolations()
    })
})
