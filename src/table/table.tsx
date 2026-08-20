import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { getClassNames } from '../utils/responsive-props'

import { SortIndicator } from './sort-indicator'

import styles from './table.module.css'

import type { ObfuscatedClassName, Space } from '../utils/common-types'

type TableProps = Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className' | 'border'> &
    ObfuscatedClassName & {
        /**
         * How far the outermost cells hold their content off the table's edges.
         *
         * Row dividers always span the full width, so `none` sets the content
         * flush with whatever sits above and below the table, without taking
         * the dividers past it.
         *
         * @default 'medium'
         */
        edgePadding?: Space | 'none'
    }

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

type TableColumnWidth =
    | 'auto'
    | 'content'
    | '1/2'
    | '1/3'
    | '2/3'
    | '1/4'
    | '3/4'
    | '1/5'
    | '2/5'
    | '3/5'
    | '4/5'

type TableColumnGroupProps = Omit<React.HTMLAttributes<HTMLTableColElement>, 'className'> &
    ObfuscatedClassName

type TableColumnProps = Omit<React.ColHTMLAttributes<HTMLTableColElement>, 'className' | 'width'> &
    ObfuscatedClassName & {
        /** Width of this column, as a fraction of the table. */
        width?: TableColumnWidth
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

function ariaSortFor(sortDirection: 'asc' | 'desc') {
    return sortDirection === 'asc' ? 'ascending' : 'descending'
}

/**
 * Tabular data in native table markup, composed from:
 * * {@link TableColumnGroup}
 * * {@link TableColumn}
 * * {@link TableHeader}
 * * {@link TableColumnHeader}
 * * {@link TableBody}
 * * {@link TableRow}
 * * {@link TableCell}
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
    { edgePadding = 'medium', exceptionallySetClassName, ...tableProps },
    ref,
) {
    return (
        <Box
            {...tableProps}
            as="table"
            ref={ref}
            width="full"
            background="default"
            className={[
                styles.table,
                getClassNames(styles, 'edgePadding', edgePadding),
                exceptionallySetClassName,
            ]}
        />
    )
})

/** Column definitions for the table. Render it as the first child of {@link Table}. */
const TableColumnGroup = React.forwardRef<HTMLTableColElement, TableColumnGroupProps>(
    function TableColumnGroup({ exceptionallySetClassName, ...groupProps }, ref) {
        return (
            <colgroup {...groupProps} ref={ref} className={classNames(exceptionallySetClassName)} />
        )
    },
)

/** A single column definition. */
const TableColumn = React.forwardRef<HTMLTableColElement, TableColumnProps>(function TableColumn(
    { width = 'auto', exceptionallySetClassName, ...columnProps },
    ref,
) {
    return (
        <col
            {...columnProps}
            ref={ref}
            className={classNames(
                styles[`columnWidth-${width.replace('/', '-')}`],
                exceptionallySetClassName,
            )}
        />
    )
})

/** A table header row wrapper. Omit it for a table with no header. */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    function TableHeader({ children, exceptionallySetClassName, ...headerProps }, ref) {
        return (
            <Box
                {...headerProps}
                as="thead"
                ref={ref}
                background="default"
                className={exceptionallySetClassName}
            >
                <tr className={styles.headerRow}>{children}</tr>
            </Box>
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
        const indicatorDirection = sortDirection ?? 'desc'
        const descendingClass = styles.sortIndicatorDescending ?? ''
        const unsortedClass = styles.sortIndicatorUnsorted ?? ''

        return (
            <th
                {...headerProps}
                ref={ref}
                aria-sort={sortDirection ? ariaSortFor(sortDirection) : undefined}
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
                            className={classNames(styles.sortIndicator, {
                                [descendingClass]: indicatorDirection === 'desc',
                                [unsortedClass]: !sortDirection,
                            })}
                        >
                            <SortIndicator />
                        </span>
                    </button>
                ) : (
                    label
                )}
            </th>
        )
    },
)

export {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableColumnHeader,
    TableHeader,
    TableRow,
}
export type {
    TableBodyProps,
    TableCellProps,
    TableColumnGroupProps,
    TableColumnHeaderProps,
    TableColumnProps,
    TableColumnWidth,
    TableHeaderProps,
    TableProps,
    TableRowProps,
}
