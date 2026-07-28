'use no memo'

import * as React from 'react'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import styles from './table.module.css'

import type { Cell, ColumnDef, Row } from '@tanstack/react-table'
import type { ObfuscatedClassName } from '../utils/common-types'

/** A Reactist-owned TanStack column definition for a table row. */
type TableColumn<TData extends object> = ColumnDef<TData, unknown>

/** The row model passed to `renderRow`. */
type TableRowModel<TData extends object> = Row<TData>

/** The cell model rendered by `TableCell`. */
type TableCellModel<TData extends object> = Cell<TData, unknown>

/** Props for a styled native table row. */
type TableRowProps = Omit<React.HTMLAttributes<HTMLTableRowElement>, 'className'> &
    ObfuscatedClassName

/** Props for a styled native table cell. */
type TableCellProps<TData extends object> = Omit<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    'className' | 'inert'
> &
    ObfuscatedClassName & {
        /** TanStack cell model used for default cell rendering. */
        cell: TableCellModel<TData>

        /** Removes this custom cell and its descendants from interaction. */
        inert?: boolean
    }

/** Controlled sorting state for a Reactist table. */
type TableSorting = {
    /** The id of the column currently used for sorting. */
    columnId: string

    /** The current sort direction. */
    direction: 'asc' | 'desc'
} | null

type TableSortLabelInput = {
    columnId: string
    direction: 'asc' | 'desc' | null
}

type TableSortingProps =
    | {
          /** Controlled sorting state. Pass `null` when no column is sorted. */
          sorting: TableSorting

          /** Called when a sortable column header is activated. */
          onSort: (columnId: string) => void

          /** Returns the complete localized accessible label for a sort button. */
          getSortAriaLabel: (input: TableSortLabelInput) => string
      }
    | {
          sorting?: never
          onSort?: never
          getSortAriaLabel?: never
      }

/** Props for the provisional `Table` presentation prototype. */
type TableProps<TData extends object> = Omit<
    React.TableHTMLAttributes<HTMLTableElement>,
    'children' | 'className'
> &
    ObfuscatedClassName &
    TableSortingProps & {
        /** Row data. Reactist never sorts or mutates this controlled input. */
        data: TData[]

        /** Typed definitions for the table's columns. */
        columns: TableColumn<TData>[]

        /** Returns a stable identifier for a row. */
        getRowId?: (row: TData, index: number) => string

        /** Content rendered across the visible columns when `data` is empty. */
        emptyState?: React.ReactNode

        /**
         * Renders a structurally custom row. Use `TableRow` and `TableCell` to retain the baseline
         * styling without importing the component's CSS module.
         */
        renderRow?: (row: TableRowModel<TData>) => React.ReactNode
    }

type TableComponent = {
    <TData extends object>(
        props: TableProps<TData> & React.RefAttributes<HTMLTableElement>,
    ): React.ReactElement | null
    displayName?: string
}

type TableCellComponent = {
    <TData extends object>(
        props: TableCellProps<TData> & React.RefAttributes<HTMLTableCellElement>,
    ): React.ReactElement | null
    displayName?: string
}

/** Styled native row building block for custom `Table` rows. */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
    { exceptionallySetClassName, onClick, ...rowProps },
    ref,
) {
    return (
        <tr
            {...rowProps}
            ref={ref}
            onClick={onClick}
            className={classNames(
                styles.row,
                exceptionallySetClassName,
                onClick && styles.clickable,
            )}
        />
    )
})

/** Styled native cell building block for custom `Table` rows. */
const TableCell = React.forwardRef(function TableCell<TData extends object>(
    {
        cell,
        children,
        inert = false,
        exceptionallySetClassName,
        ...cellProps
    }: TableCellProps<TData>,
    ref: React.ForwardedRef<HTMLTableCellElement>,
) {
    const internalRef = React.useRef<HTMLTableCellElement>(null)
    const combinedRef = useMergeRefs([internalRef, ref])

    React.useEffect(
        function syncInertAttribute() {
            internalRef.current?.toggleAttribute('inert', inert)
        },
        [inert],
    )

    return (
        <td
            {...cellProps}
            ref={combinedRef}
            className={classNames(styles.cell, exceptionallySetClassName)}
        >
            {children ?? flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
    )
}) as TableCellComponent

TableRow.displayName = 'TableRow'
TableCell.displayName = 'TableCell'

/**
 * Displays typed row data using native table markup.
 *
 * This API is provisional while the Reactist Table proposal is being reviewed.
 */
const Table = React.forwardRef(function Table<TData extends object>(
    {
        data,
        columns,
        getRowId,
        emptyState,
        renderRow,
        sorting,
        onSort,
        getSortAriaLabel,
        exceptionallySetClassName,
        ...tableProps
    }: TableProps<TData>,
    ref: React.ForwardedRef<HTMLTableElement>,
) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId,
        enableSorting: false,
        manualSorting: true,
        state: {
            sorting: sorting ? [{ id: sorting.columnId, desc: sorting.direction === 'desc' }] : [],
        },
    })
    const rows = table.getRowModel().rows

    return (
        <table
            {...tableProps}
            ref={ref}
            className={classNames(styles.table, exceptionallySetClassName)}
        >
            <thead className={styles.header}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className={styles.row}>
                        {headerGroup.headers.map((header) => {
                            const canSort = Boolean(onSort && getSortAriaLabel)
                            const direction =
                                sorting?.columnId === header.column.id ? sorting.direction : null
                            const ariaSort = canSort
                                ? direction === 'asc'
                                    ? 'ascending'
                                    : direction === 'desc'
                                      ? 'descending'
                                      : 'none'
                                : undefined
                            const content = header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())

                            return (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className={classNames(
                                        styles.headerCell,
                                        canSort && styles.headerCellSortable,
                                    )}
                                    aria-sort={ariaSort}
                                >
                                    {canSort && onSort && getSortAriaLabel ? (
                                        <button
                                            type="button"
                                            className={styles.sortButton}
                                            aria-label={getSortAriaLabel({
                                                columnId: header.column.id,
                                                direction,
                                            })}
                                            onClick={() => onSort(header.column.id)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' || event.key === ' ') {
                                                    event.preventDefault()
                                                    onSort(header.column.id)
                                                }
                                            }}
                                        >
                                            <span className={styles.headerCellContent}>
                                                {content}
                                            </span>
                                            <span
                                                className={styles.sortIndicator}
                                                aria-hidden="true"
                                            >
                                                {direction ? (
                                                    <SortIndicator direction={direction} />
                                                ) : null}
                                            </span>
                                        </button>
                                    ) : (
                                        content
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {rows.length === 0 && emptyState !== undefined ? (
                    <tr>
                        <td
                            className={classNames(styles.cell, styles.emptyCell)}
                            colSpan={Math.max(table.getVisibleLeafColumns().length, 1)}
                        >
                            {emptyState}
                        </td>
                    </tr>
                ) : (
                    rows.map((row) =>
                        renderRow ? (
                            renderRow(row)
                        ) : (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} cell={cell} />
                                ))}
                            </TableRow>
                        ),
                    )
                )}
            </tbody>
        </table>
    )
}) as TableComponent

Table.displayName = 'Table'

export { Table, TableCell, TableRow }
export type {
    TableCellModel,
    TableCellProps,
    TableColumn,
    TableProps,
    TableRowModel,
    TableRowProps,
    TableSorting,
}

function SortIndicator({ direction }: { direction: 'asc' | 'desc' }) {
    return (
        <svg className={styles.sortIndicatorIcon} viewBox="0 0 16 16" focusable="false">
            <path d={direction === 'asc' ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} />
        </svg>
    )
}
