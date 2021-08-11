import * as React from 'react'
import { polymorphicComponent } from '../../utils/polymorphism'
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

const Inline = polymorphicComponent<'div', InlineProps>(function Inline(
    { as, space, align = 'left', alignY = 'center', children, exceptionallySetClassName, ...props },
    ref,
) {
    return (
        <Box>
            <Box
                as={as}
                display="flex"
                flexWrap="wrap"
                className={[exceptionallySetClassName, getClassNames(styles, 'space', space)]}
                ref={ref}
                alignItems={mapResponsiveProp(alignY, (alignY) =>
                    alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : 'center',
                )}
                justifyContent={mapResponsiveProp(align, (align) =>
                    align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center',
                )}
                {...props}
            >
                {children}
            </Box>
        </Box>
    )
})

export type { InlineProps, InlineAlign }
export { Inline }
