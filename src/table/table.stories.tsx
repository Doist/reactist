import * as React from 'react'

import classNames from 'classnames'

import { Avatar } from '../avatar'
import { Text } from '../text'

import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow } from './table'

import styles from './table.stories.module.css'

import type { Meta, StoryObj } from '@storybook/react-vite'

type Person = {
    id: string
    name: string
    email: string
    role: string
    access: 'Admin' | 'Member' | 'Guest'
    activity: string
    placeholder?: boolean
}

type Sorting = {
    columnId: string
    direction: 'asc' | 'desc'
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

function sortPeople(data: Person[], sorting: Sorting) {
    return [...data].sort((first, second) => {
        const firstValue = String(first[sorting.columnId as keyof Person] ?? '')
        const secondValue = String(second[sorting.columnId as keyof Person] ?? '')
        const result = firstValue.localeCompare(secondValue)
        return sorting.direction === 'asc' ? result : -result
    })
}

function nextSorting(current: Sorting, columnId: string): Sorting {
    return {
        columnId,
        direction: current.columnId === columnId && current.direction === 'asc' ? 'desc' : 'asc',
    }
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

export const ControlledSorting = {
    name: 'Controlled sorting',
    render: function ControlledSorting() {
        const [sorting, setSorting] = React.useState<Sorting>({
            columnId: 'name',
            direction: 'asc',
        })
        const sorted = sortPeople(people, sorting)

        return (
            <Table
                aria-label="Workspace people"
                exceptionallySetClassName={styles.presentationTable}
            >
                <TableHeader>
                    <TableColumnHeader
                        sortable
                        sortDirection={sorting.columnId === 'name' ? sorting.direction : null}
                        onSort={() => setSorting(nextSorting(sorting, 'name'))}
                        sortAriaLabel={getSortAriaLabel({
                            columnId: 'name',
                            direction: sorting.columnId === 'name' ? sorting.direction : null,
                        })}
                    >
                        <Text variant="body-2">Person</Text>
                    </TableColumnHeader>
                    <TableColumnHeader
                        sortable
                        sortDirection={sorting.columnId === 'role' ? sorting.direction : null}
                        onSort={() => setSorting(nextSorting(sorting, 'role'))}
                        sortAriaLabel={getSortAriaLabel({
                            columnId: 'role',
                            direction: sorting.columnId === 'role' ? sorting.direction : null,
                        })}
                    >
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
                    {sorted.map((person) => (
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
        )
    },
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
                            exceptionallySetClassName={styles.clickableRow}
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

export const EmptyState = {
    name: 'Empty state',
    render: () => (
        <Table
            aria-label="Empty workspace people"
            exceptionallySetClassName={styles.presentationTable}
        >
            <TableHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Person</Text>
                </TableColumnHeader>
                <TableColumnHeader>
                    <Text variant="body-2">Role</Text>
                </TableColumnHeader>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2} exceptionallySetClassName={styles.emptyCell}>
                        <p className={styles.emptyTitle}>No people to show</p>
                        <p className={styles.emptyDescription}>
                            People with workspace access will appear here.
                        </p>
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
    name: 'Narrow viewport (current behavior)',
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
