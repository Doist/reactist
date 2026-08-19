import * as React from 'react'

import {
    columnVisibilityFeature,
    createPaginatedRowModel,
    createSortedRowModel,
    FlexRender,
    rowPaginationFeature,
    rowSortingFeature,
    sortFn_text,
    tableFeatures,
    useTable,
} from '@tanstack/react-table'
import classNames from 'classnames'

import { Avatar } from '../avatar'
import { Box } from '../box'
import { Button } from '../button'
import { Text } from '../text'

import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow } from './table'

import styles from './table.stories.module.css'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'

type Person = {
    id: string
    name: string
    email: string
    role: string
    access: 'Admin' | 'Member' | 'Guest'
    activity: string
    placeholder?: boolean
}

const people: Person[] = [
    {
        id: 'avery-morgan',
        name: 'Avery Morgan',
        email: 'avery@example.com',
        role: 'Product designer',
        access: 'Admin',
        activity: 'Active now',
    },
    {
        id: 'sam-rivera',
        name: 'Sam Rivera',
        email: 'sam@example.com',
        role: 'Frontend engineer',
        access: 'Member',
        activity: '8 minutes ago',
    },
    {
        id: 'mika-chen',
        name: 'Mika Chen',
        email: 'mika@example.com',
        role: 'Product manager',
        access: 'Admin',
        activity: '2 hours ago',
    },
    {
        id: 'noor-patel',
        name: 'Noor Patel',
        email: 'noor@example.com',
        role: 'Research lead',
        access: 'Member',
        activity: 'Yesterday',
    },
    {
        id: 'theo-williams',
        name: 'Theo Williams',
        email: 'theo@example.com',
        role: 'Operations',
        access: 'Guest',
        activity: '3 days ago',
    },
]

const placeholderPeople: Person[] = [
    ...people.slice(0, 1),
    {
        id: 'placeholder-1',
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        role: 'Design',
        access: 'Member',
        activity: 'Example',
        placeholder: true,
    },
    {
        id: 'placeholder-2',
        name: 'Taylor Brooks',
        email: 'taylor@example.com',
        role: 'Engineering',
        access: 'Member',
        activity: 'Example',
        placeholder: true,
    },
    {
        id: 'placeholder-3',
        name: 'Morgan Silva',
        email: 'morgan@example.com',
        role: 'Marketing',
        access: 'Guest',
        activity: 'Example',
        placeholder: true,
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
                    'Compound primitives for tabular data. Compose Table with TableHeader, TableColumnHeader, TableBody, TableRow, and TableCell. The consumer owns the data, the sort state, and the selection state; pass aria-selected on a row to make it selectable.',
            },
        },
    },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

function PersonCell({ person }: { person: Person }) {
    return (
        <div className={styles.person}>
            <Avatar size={30} shape="circle" name={person.name} />
            <div className={styles.personText}>
                <Text variant="callout-2">{person.name}</Text>
                <Text variant="callout-2" tone="secondary">
                    {person.email}
                </Text>
            </div>
        </div>
    )
}

function ActivityCell({ person }: { person: Person }) {
    return (
        <span
            className={classNames(
                styles.status,
                person.activity !== 'Active now' && styles.statusMuted,
            )}
        >
            {person.activity}
        </span>
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
        <Table aria-label="Workspace people" exceptionallySetClassName={styles.presentationTable}>
            <TableHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Person</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Role</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Access</Text>
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
                        <TableCell>
                            <Text variant="callout-2" lineClamp={1}>
                                {person.access}
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
            <Table
                aria-label="Selectable workspace people"
                exceptionallySetClassName={styles.presentationTable}
            >
                <TableHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Person</Text>
                    </TableColumnHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Role</Text>
                    </TableColumnHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Access</Text>
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
                            <TableCell>
                                <Text variant="callout-2" lineClamp={1}>
                                    {person.access}
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

export const CustomPlaceholderRows = {
    name: 'Custom placeholder rows',
    render: () => (
        <Table
            aria-label="Workspace people with examples"
            exceptionallySetClassName={styles.presentationTable}
        >
            <TableHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Person</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Role</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Access</Text>
                </TableColumnHeader>
                <TableColumnHeader align="end">
                    <Text variant="body-2">Last active</Text>
                </TableColumnHeader>
            </TableHeader>
            <TableBody>
                {placeholderPeople.map((person) => (
                    <TableRow
                        key={person.id}
                        aria-hidden={person.placeholder || undefined}
                        exceptionallySetClassName={
                            person.placeholder ? styles.placeholderRow : undefined
                        }
                    >
                        <TableCell>
                            <PersonCell person={person} />
                        </TableCell>
                        <TableCell>
                            <Text variant="callout-2" tone="secondary" lineClamp={1}>
                                {person.role}
                            </Text>
                        </TableCell>
                        <TableCell>
                            <Text variant="callout-2" lineClamp={1}>
                                {person.access}
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

export const NarrowViewport = {
    name: 'Narrow viewport',
    render: () => (
        <div className={styles.narrowScroll}>
            <Table
                aria-label="Workspace people"
                exceptionallySetClassName={styles.presentationTable}
            >
                <TableHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Person</Text>
                    </TableColumnHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Role</Text>
                    </TableColumnHeader>
                    <TableColumnHeader>
                        <Text variant="body-2">Access</Text>
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
                            <TableCell>
                                <Text variant="callout-2" lineClamp={1}>
                                    {person.access}
                                </Text>
                            </TableCell>
                            <TableCell align="end">
                                <ActivityCell person={person} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
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
    parameters: {
        docs: {
            description: {
                story: 'The Table components do not dictate what external model layer they are used with. TanStack Table, for example, would be a good option for driving the data, including [sorting](https://tanstack.com/table/latest/docs/framework/react/guide/sorting) and [pagination](https://tanstack.com/table/latest/docs/framework/react/guide/pagination).',
            },
        },
    },
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
                                        <FlexRender header={header} />
                                    </Text>
                                </TableColumnHeader>
                            ) : (
                                <TableColumnHeader key={header.id}>
                                    <Text variant="body-2">
                                        <FlexRender header={header} />
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
                                            <FlexRender cell={cell} />
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