import * as React from 'react'

import {
    columnVisibilityFeature,
    createPaginatedRowModel,
    createSortedRowModel,
    flexRender,
    rowPaginationFeature,
    rowSortingFeature,
    sortFn_text,
    tableFeatures,
    useTable,
} from '@tanstack/react-table'

import { Avatar } from '../avatar'
import { Badge } from '../badge'
import { Box } from '../box'
import { Button } from '../button'
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
} from './table'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'

type Person = {
    id: string
    name: string
    email: string
    role: string
    access: 'Admin' | 'Member' | 'Guest'
    projects: string
    activity: string
}

const people: Person[] = [
    {
        id: 'avery-morgan',
        projects: '1,284',
        name: 'Avery Morgan',
        email: 'avery@example.com',
        role: 'Product designer',
        access: 'Admin',
        activity: 'Active now',
    },
    {
        id: 'sam-rivera',
        projects: '1,037',
        name: 'Sam Rivera',
        email: 'sam@example.com',
        role: 'Frontend engineer',
        access: 'Member',
        activity: '8 minutes ago',
    },
    {
        id: 'mika-chen',
        projects: '9,102',
        name: 'Mika Chen',
        email: 'mika@example.com',
        role: 'Product manager',
        access: 'Admin',
        activity: '2 hours ago',
    },
    {
        id: 'noor-patel',
        projects: '1,116',
        name: 'Noor Patel',
        email: 'noor@example.com',
        role: 'Research lead',
        access: 'Member',
        activity: 'Yesterday',
    },
    {
        id: 'theo-williams',
        projects: '4,411',
        name: 'Theo Williams',
        email: 'theo@example.com',
        role: 'Operations',
        access: 'Guest',
        activity: '3 days ago',
    },
]

const meta = {
    title: '📊 Data display/Table',
    component: Table,
    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Table',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=26089-87636',
        },
        docs: {
            description: {
                component:
                    'Compound primitives for tabular data. Compose Table with TableColumnGroup, TableHeader, TableColumnHeader, TableBody, TableRow, and TableCell. The consumer owns the data, the sort state, and the selection state; pass aria-selected on a row to make it selectable.',
            },
        },
    },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

function PersonCell({ person }: { person: Person }) {
    return (
        <Box display="flex" alignItems="center" gap="small">
            <Avatar size={28} shape="circle" name={person.name} />
            <Box flexGrow={1} minWidth={0} overflow="hidden">
                <Text variant="callout-2" lineClamp={1}>
                    {person.name}
                </Text>
                <Text variant="callout-2" tone="secondary" lineClamp={1}>
                    {person.email}
                </Text>
            </Box>
        </Box>
    )
}

function ActivityCell({ person }: { person: Person }) {
    return (
        <Badge
            tone={person.activity === 'Active now' ? 'positive' : 'info'}
            label={person.activity}
        />
    )
}

function getSortAriaLabel(label: string, direction: 'asc' | 'desc' | null) {
    if (direction === 'asc') return `${label}, sorted ascending. Activate to sort descending.`
    if (direction === 'desc') return `${label}, sorted descending. Activate to sort ascending.`
    return `${label}, activate to sort ascending.`
}

function handleRowKeyDown(
    event: React.KeyboardEvent<HTMLTableRowElement>,
    personId: string,
    onActivate: (personId: string) => void,
) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onActivate(personId)
    }
}

export const Default = {
    render: () => (
        <Table aria-label="Workspace people">
            <TableColumnGroup>
                <TableColumn width="2/5" />
                <TableColumn width="1/5" />
                <TableColumn width="1/5" />
                <TableColumn width="1/5" />
            </TableColumnGroup>
            <TableHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Person</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Role</Text>
                </TableColumnHeader>
                <TableColumnHeader align="end">
                    <Text variant="body-2">Projects</Text>
                </TableColumnHeader>
                <TableColumnHeader align="end">
                    <Text variant="body-2">Last active</Text>
                </TableColumnHeader>
            </TableHeader>
            <TableBody>
                {people.map((person) => (
                    <TableRow key={person.id}>
                        <TableCell>
                            <PersonCell person={person} />
                        </TableCell>
                        <TableCell>
                            <Text variant="callout-2" tone="secondary" lineClamp={1}>
                                {person.role}
                            </Text>
                        </TableCell>
                        <TableCell align="end">
                            <Text variant="callout-2" lineClamp={1}>
                                {person.projects}
                            </Text>
                        </TableCell>
                        <TableCell align="end">
                            <ActivityCell person={person} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
} satisfies Story

export const SelectedAndClickableRows = {
    name: 'Selected and clickable rows',
    render: function SelectedAndClickableRows() {
        const [selectedId, setSelectedId] = React.useState(people[1]!.id)

        return (
            <Table aria-label="Selectable workspace people">
                <TableColumnGroup>
                    <TableColumn width="2/5" />
                    <TableColumn width="1/5" />
                    <TableColumn width="1/5" />
                    <TableColumn width="1/5" />
                </TableColumnGroup>
                <TableHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Person</Text>
                    </TableColumnHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Role</Text>
                    </TableColumnHeader>
                    <TableColumnHeader align="end">
                        <Text variant="body-2">Projects</Text>
                    </TableColumnHeader>
                    <TableColumnHeader align="end">
                        <Text variant="body-2">Last active</Text>
                    </TableColumnHeader>
                </TableHeader>
                <TableBody>
                    {people.map((person) => (
                        <TableRow
                            key={person.id}
                            aria-selected={selectedId === person.id}
                            tabIndex={0}
                            onClick={() => setSelectedId(person.id)}
                            onKeyDown={(event) => handleRowKeyDown(event, person.id, setSelectedId)}
                        >
                            <TableCell>
                                <PersonCell person={person} />
                            </TableCell>
                            <TableCell>
                                <Text variant="callout-2" tone="secondary" lineClamp={1}>
                                    {person.role}
                                </Text>
                            </TableCell>
                            <TableCell align="end">
                                <Text variant="callout-2" lineClamp={1}>
                                    {person.projects}
                                </Text>
                            </TableCell>
                            <TableCell align="end">
                                <ActivityCell person={person} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    },
} satisfies Story

export const NoHeaderRow = {
    name: 'No header row',
    render: () => (
        <Table aria-label="Workspace people">
            <TableColumnGroup>
                <TableColumn width="1/2" />
                <TableColumn width="1/4" />
                <TableColumn width="1/4" />
            </TableColumnGroup>
            <TableBody>
                {people.map((person) => (
                    <TableRow key={person.id}>
                        <TableCell>
                            <PersonCell person={person} />
                        </TableCell>
                        <TableCell>
                            <Text variant="callout-2" lineClamp={1}>
                                {person.role}
                            </Text>
                        </TableCell>
                        <TableCell>
                            <Text variant="callout-2" lineClamp={1}>
                                {person.activity}
                            </Text>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
} satisfies Story

export const MultiLineCells = {
    name: 'Single and multi-line cells',
    render: () => (
        <Table aria-label="Cell content">
            <TableColumnGroup>
                <TableColumn width="1/2" />
                <TableColumn width="1/2" />
            </TableColumnGroup>
            <TableHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Single line</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Two line</Text>
                </TableColumnHeader>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Text variant="callout-2" lineClamp={1}>
                            Cell content long enough that it has to truncate with an ellipsis
                        </Text>
                    </TableCell>
                    <TableCell>
                        <Text variant="callout-2">Cell content</Text>
                        <Text variant="callout-2" tone="secondary">
                            Secondary line
                        </Text>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    ),
} satisfies Story

const features = tableFeatures({
    columnVisibilityFeature,
    rowPaginationFeature,
    rowSortingFeature,
    paginatedRowModel: createPaginatedRowModel(),
    sortedRowModel: createSortedRowModel(),
    sortFns: { text: sortFn_text },
})

const tanStackColumns: ColumnDef<typeof features, Person, unknown>[] = [
    { accessorKey: 'name', header: 'Person', sortFn: 'text' },
    { accessorKey: 'role', header: 'Role', sortFn: 'text' },
    { accessorKey: 'access', header: 'Access', enableSorting: false },
]

export const TanStackIntegration = {
    name: 'TanStack Table integration',
    render: function TanStackIntegration() {
        const table = useTable({
            features,
            data: people,
            columns: tanStackColumns,
            getRowId: (person) => person.id,
            initialState: { pagination: { pageIndex: 0, pageSize: 2 } },
        })
        const { pageIndex } = table.state.pagination ?? { pageIndex: 0 }

        return (
            <Box display="flex" flexDirection="column" gap="medium">
                <Table aria-label="TanStack-driven people">
                    <TableColumnGroup>
                        <TableColumn width="1/2" />
                        <TableColumn width="1/4" />
                        <TableColumn width="1/4" />
                    </TableColumnGroup>
                    <TableHeader>
                        {table.getHeaderGroups()[0]?.headers.map((header) => {
                            const direction = header.column.getIsSorted() || null
                            const label = String(header.column.columnDef.header)

                            return header.column.getCanSort() ? (
                                <TableColumnHeader
                                    key={header.id}
                                    sortable
                                    sortDirection={direction}
                                    onSort={() => header.column.toggleSorting()}
                                    sortAriaLabel={getSortAriaLabel(label, direction)}
                                >
                                    <Text variant="body-2">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Text>
                                </TableColumnHeader>
                            ) : (
                                <TableColumnHeader key={header.id}>
                                    <Text variant="body-2">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Text>
                                </TableColumnHeader>
                            )
                        })}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        <Text variant="callout-2" lineClamp={1}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Text>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box display="flex" alignItems="center" gap="small">
                    <Button
                        variant="secondary"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="secondary"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                    >
                        Next
                    </Button>
                    <Text variant="callout-2" tone="secondary">
                        Page {pageIndex + 1} of {table.getPageCount()}
                    </Text>
                </Box>
            </Box>
        )
    },
} satisfies Story
