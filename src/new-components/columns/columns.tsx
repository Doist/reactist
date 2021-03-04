import * as React from 'react'
import { forwardRefWithAs } from '../type-helpers'
import { getClassNames, mapResponsiveProp } from '../responsive-props'
import { Box } from '../box'

import type { ResponsiveProp, ResponsiveBreakpoints } from '../responsive-props'
import type { Space } from '../common-types'
import type { ReusableBoxProps } from '../box'

import styles from './columns.module.css'
import stackStyles from '../stack/stack.module.css'

type ColumnWidth =
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

interface ColumnProps {
    width?: ColumnWidth
}

const Column = forwardRefWithAs<ColumnProps>(function Column(
    { component, width = 'auto', children, ...props },
    ref,
) {
    return (
        <Box
            className={[
                styles.column,
                width !== 'content'
                    ? getClassNames(styles, 'columnWidth', width.replace('/', '-'))
                    : null,
            ]}
            ref={ref}
            {...props}
        >
            {children}
        </Box>
    )
})

type ColumnsHorizontalAlignment = 'left' | 'center' | 'right'
type ColumnsVerticalAlignment = 'top' | 'center' | 'bottom'
type ColumnsCollapseBelow = ResponsiveBreakpoints

interface ColumnsProps extends ReusableBoxProps {
    space?: ResponsiveProp<Space>
    align?: ResponsiveProp<ColumnsHorizontalAlignment>
    alignY?: ResponsiveProp<ColumnsVerticalAlignment>
    collapseBelow?: ResponsiveBreakpoints
}

const Columns = forwardRefWithAs<ColumnsProps>(function Columns(
    { space, align, alignY, collapseBelow, children, ...props },
    ref,
) {
    return (
        <Box
            className={[
                getClassNames(styles, 'space', space),
                getClassNames(stackStyles, 'space', space),
            ]}
            flexDirection={
                collapseBelow === 'desktop'
                    ? ['column', 'column', 'row']
                    : collapseBelow === 'tablet'
                    ? ['column', 'row']
                    : 'row'
            }
            display="flex"
            alignItems={mapResponsiveProp(alignY, (alignY) =>
                alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : 'center',
            )}
            justifyContent={mapResponsiveProp(align, (align) =>
                align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center',
            )}
            ref={ref}
            {...props}
        >
            {children}
        </Box>
    )
})

export type {
    ColumnProps,
    ColumnsProps,
    ColumnWidth,
    ColumnsCollapseBelow,
    ColumnsHorizontalAlignment,
    ColumnsVerticalAlignment,
}

export { Column, Columns }
