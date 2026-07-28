import * as React from 'react'

import classNames from 'classnames'

import { Avatar } from '../avatar'

import { Table, TableCell, TableRow } from './table'

import styles from './table.stories.module.css'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TableColumn, TableRowModel, TableSorting } from './table'

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

const columns: TableColumn<Person>[] = [
    {
        accessorKey: 'name',
        header: 'Person',
        cell: ({ row }) => <PersonCell person={row.original} />,
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ getValue }) => <span className={styles.role}>{String(getValue())}</span>,
    },
    { accessorKey: 'access', header: 'Access' },
    {
        accessorKey: 'activity',
        header: 'Last active',
        cell: ({ getValue }) => {
            const activity = String(getValue())
            return (
                <span
                    className={classNames(
                        styles.status,
                        activity !== 'Active now' && styles.statusMuted,
                    )}
                >
                    {activity}
                </span>
            )
        },
    },
]

const columnLabels = new Map([
    ['name', 'Person'],
    ['role', 'Role'],
    ['access', 'Access'],
    ['activity', 'Last active'],
])

const meta = {
    title: '📊 Data display/Table',
    component: Table,
    parameters: {
        badges: ['partiallyAccessible'],
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Presentation prototype based on Todoist’s current flat data table. The API remains provisional while sorting, selection, dependency placement, and responsive behavior are reviewed.',
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
                <div className={styles.personName}>{person.name}</div>
                <div className={styles.personEmail}>{person.email}</div>
            </div>
        </div>
    )
}

function PresentationFrame({
    children,
    count,
    narrow = false,
}: {
    children: React.ReactNode
    count: number
    narrow?: boolean
}) {
    return (
        <main className={classNames(styles.canvas, narrow && styles.narrowCanvas)}>
            <div className={styles.frame}>
                <header className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.title}>People</h1>
                        <p className={styles.subtitle}>Everyone with access to this workspace</p>
                    </div>
                    <span className={styles.count}>
                        {count} {count === 1 ? 'person' : 'people'}
                    </span>
                </header>
                <div className={styles.surface}>
                    <div className={styles.scrollArea}>{children}</div>
                </div>
            </div>
        </main>
    )
}

function getSortAriaLabel({
    columnId,
    direction,
}: {
    columnId: string
    direction: 'asc' | 'desc' | null
}) {
    const label = columnLabels.get(columnId) ?? columnId
    if (direction === 'asc') return `${label}, sorted ascending. Activate to sort descending.`
    if (direction === 'desc') return `${label}, sorted descending. Activate to sort ascending.`
    return `${label}, activate to sort ascending.`
}

function sortPeople(data: Person[], sorting: Exclude<TableSorting, null>) {
    return [...data].sort((first, second) => {
        const firstValue = String(first[sorting.columnId as keyof Person] ?? '')
        const secondValue = String(second[sorting.columnId as keyof Person] ?? '')
        const result = firstValue.localeCompare(secondValue)
        return sorting.direction === 'asc' ? result : -result
    })
}

function SortableTable({ narrow = false }: { narrow?: boolean }) {
    const [sorting, setSorting] = React.useState<Exclude<TableSorting, null>>({
        columnId: 'name',
        direction: 'asc',
    })
    const sortedPeople = sortPeople(people, sorting)

    function handleSort(columnId: string) {
        setSorting((current) => ({
            columnId,
            direction:
                current.columnId === columnId && current.direction === 'asc' ? 'desc' : 'asc',
        }))
    }

    return (
        <PresentationFrame count={people.length} narrow={narrow}>
            <Table
                aria-label="Workspace people"
                data={sortedPeople}
                columns={columns}
                getRowId={(person) => person.id}
                sorting={sorting}
                onSort={handleSort}
                getSortAriaLabel={getSortAriaLabel}
                exceptionallySetClassName={styles.presentationTable}
            />
        </PresentationFrame>
    )
}

function handleRowKeyDown(
    event: React.KeyboardEvent<HTMLTableRowElement>,
    row: TableRowModel<Person>,
    onActivate: (rowId: string) => void,
) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onActivate(row.id)
    }
}

function SelectableTable() {
    const [selectedId, setSelectedId] = React.useState(people[1]!.id)
    return (
        <PresentationFrame count={people.length}>
            <Table
                aria-label="Selectable workspace people"
                data={people}
                columns={columns}
                getRowId={(person) => person.id}
                exceptionallySetClassName={styles.presentationTable}
                renderRow={(row) => (
                    <TableRow
                        key={row.id}
                        aria-selected={selectedId === row.id || undefined}
                        tabIndex={0}
                        onClick={() => setSelectedId(row.id)}
                        onKeyDown={(event) => handleRowKeyDown(event, row, setSelectedId)}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} cell={cell} />
                        ))}
                    </TableRow>
                )}
            />
        </PresentationFrame>
    )
}

function PlaceholderTable() {
    return (
        <PresentationFrame count={1}>
            <Table
                aria-label="Workspace people with examples"
                data={placeholderPeople}
                columns={columns}
                getRowId={(person) => person.id}
                exceptionallySetClassName={styles.presentationTable}
                renderRow={(row) => {
                    const isPlaceholder = Boolean(row.original.placeholder)
                    return (
                        <TableRow
                            key={row.id}
                            aria-hidden={isPlaceholder || undefined}
                            exceptionallySetClassName={
                                isPlaceholder ? styles.placeholderRow : undefined
                            }
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} cell={cell} inert={isPlaceholder} />
                            ))}
                        </TableRow>
                    )
                }}
            />
            <p className={styles.placeholderNote}>
                Faded rows demonstrate inert, assistive-technology-hidden examples without exposing
                the component’s CSS module.
            </p>
        </PresentationFrame>
    )
}

export const Default = { render: () => <SortableTable /> } satisfies Story

export const ControlledSorting = {
    name: 'Controlled sorting',
    render: () => <SortableTable />,
} satisfies Story

export const SelectedAndClickableRows = {
    name: 'Selected and clickable rows',
    render: () => <SelectableTable />,
} satisfies Story

export const EmptyState = {
    name: 'Empty state',
    render: () => (
        <PresentationFrame count={0}>
            <Table
                aria-label="Empty workspace people"
                data={[]}
                columns={columns}
                exceptionallySetClassName={styles.presentationTable}
                emptyState={
                    <div className={styles.emptyState}>
                        <p className={styles.emptyTitle}>No people to show</p>
                        <p className={styles.emptyDescription}>
                            People with workspace access will appear here.
                        </p>
                    </div>
                }
            />
        </PresentationFrame>
    ),
} satisfies Story

export const CustomPlaceholderRows = {
    name: 'Custom placeholder rows',
    render: () => <PlaceholderTable />,
} satisfies Story

export const NarrowViewport = {
    name: 'Narrow viewport (current behavior)',
    render: () => <SortableTable narrow />,
} satisfies Story
