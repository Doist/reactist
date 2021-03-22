import * as React from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import { forwardRefWithAs } from '../type-helpers'
import { getClassNames, mapResponsiveProp } from '../responsive-props'
import { Box } from '../box'

import type { ResponsiveProp } from '../responsive-props'
import type { Space } from '../common-types'
import type { ReusableBoxProps } from '../box'

import styles from './inline.module.css'

type InlineAlign = 'left' | 'center' | 'right'

interface InlineProps extends ReusableBoxProps {
    space?: ResponsiveProp<Space>
    align?: ResponsiveProp<InlineAlign>
    alignY?: ResponsiveProp<'top' | 'center' | 'bottom'>
}

const Inline = forwardRefWithAs<InlineProps>(function Inline(
    { component, space, align = 'left', alignY = 'center', children, ...props },
    ref,
) {
    const isList = component === 'ol' || component === 'ul'
    const inlineItemComponent = isList ? 'li' : 'div'

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            className={getClassNames(styles, 'space', space)}
            ref={ref}
            alignItems={mapResponsiveProp(alignY, (alignY) =>
                alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : 'center',
            )}
            justifyContent={mapResponsiveProp(align, (align) =>
                align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center',
            )}
            {...props}
        >
            {React.Children.map(flattenChildren(children), (child) =>
                child != null ? <Box component={inlineItemComponent}>{child}</Box> : null,
            )}
        </Box>
    )
})

export type { InlineProps, InlineAlign }
export { Inline }