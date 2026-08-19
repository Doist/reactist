import * as React from 'react'

import classNames from 'classnames'

import { SortIndicator } from './sort-indicator'

import styles from './table.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

type TableProps = Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className'> &
    ObfuscatedClassName

type TableHeaderProps = Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className'> &
    ObfuscatedClassName

type TableBodyProps = Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className'> &
    ObfuscatedClassName

type TableRowProps = Omit<React.HTMLAttributes<HTMLTableRowElement>, 'className'> &
    ObfuscatedClassName

type TableCellProps = Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align' | 'className'> &
    ObfuscatedClassName & {
        /** Horizontal alignment of the cell content. */
        align?: 'start' | 'end'
    }

type SortableProps =
    | {
          /** Renders the sort control and makes the header activatable. */
          sortable: true

          /** Direction for this column, or null when it is sortable but not sorted. */
          sortDirection: 'asc' | 'desc' | null

          /** Called when the sort control is activated. */
          onSort: () => void

          /** Complete localized label for the sort button. */
          sortAriaLabel: string
      }
    | {
          sortable?: false
          sortDirection?: never
          onSort?: never
          sortAriaLabel?: never
      }

type TableColumnHeaderProps = Omit<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    'align' | 'className' | 'onSort'
> &
    ObfuscatedClassName &
    SortableProps & {
        /** Horizontal alignment of the header content. */
        align?: 'start' | 'end'
    }

function ariaSortFor(sortDirection: 'asc' | 'desc' | null) {
    if (sortDirection === 'asc') return 'ascending'
    if (sortDirection === 'desc') return 'descending'
    return 'none'
}

/**
 * Tabular data in native table markup, composed from:
 * * {@link TableHeader}
 * * {@link TableColumnHeader}
 * * {@link TableBody}
 * * {@link TableRow}
 * * {@link TableCell}
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
    { exceptionallySetClassName, ...tableProps },
    ref,
) {
    return (
        <table
            {...tableProps}
            ref={ref}
            className={classNames(styles.table, exceptionallySetClassName)}
        />
    )
})

/** A table header row wrapper. Omit it for a table with no header. */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    function TableHeader({ children, exceptionallySetClassName, ...headerProps }, ref) {
        return (
            <thead
                {...headerProps}
                ref={ref}
                className={classNames(styles.header, exceptionallySetClassName)}
            >
                <tr className={styles.headerRow}>{children}</tr>
            </thead>
        )
    },
)

/** A table body that wraps its rows. */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
    { exceptionallySetClassName, ...bodyProps },
    ref,
) {
    return <tbody {...bodyProps} ref={ref} className={classNames(exceptionallySetClassName)} />
})

/** A table row. Pass `aria-selected` to make it selectable. */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
    { exceptionallySetClassName, ...rowProps },
    ref,
) {
    return (
        <tr {...rowProps} ref={ref} className={classNames(styles.row, exceptionallySetClassName)} />
    )
})

/** A table data cell. */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
    { align = 'start', children, exceptionallySetClassName, ...cellProps },
    ref,
) {
    return (
        <td
            {...cellProps}
            ref={ref}
            className={classNames(styles.cell, styles[`align-${align}`], exceptionallySetClassName)}
        >
            {children}
        </td>
    )
})

/** A table column header, optionally sortable. */
const TableColumnHeader = React.forwardRef<HTMLTableCellElement, TableColumnHeaderProps>(
    function TableColumnHeader(
        {
            sortable,
            sortDirection = null,
            onSort,
            sortAriaLabel,
            align = 'start',
            children,
            exceptionallySetClassName,
            ...headerProps
        },
        ref,
    ) {
        const label = <span className={styles.headerLabel}>{children}</span>

        return (
            <th
                {...headerProps}
                ref={ref}
                aria-sort={sortable ? ariaSortFor(sortDirection) : undefined}
                className={classNames(
                    styles.headerCell,
                    styles[`align-${align}`],
                    sortable && styles.headerCellSortable,
                    exceptionallySetClassName,
                )}
            >
                {sortable ? (
                    <button
                        type="button"
                        className={styles.sortButton}
                        aria-label={sortAriaLabel}
                        onClick={onSort}
                    >
                        {label}
                        <span
                            aria-hidden="true"
                            className={classNames(
                                styles.sortIndicator,
                                !sortDirection && styles.sortIndicatorUnsorted,
                            )}
                        >
                            <SortIndicator direction={sortDirection ?? 'asc'} />
                        </span>
                    </button>
                ) : (
                    label
                )}
            </th>
        )
    },
)

Table.displayName = 'Table'
TableHeader.displayName = 'TableHeader'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableCell.displayName = 'TableCell'
TableColumnHeader.displayName = 'TableColumnHeader'

export { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow }
