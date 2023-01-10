import * as React from 'react'
import { polymorphicComponent } from '../../utils/polymorphism'
import { mapResponsiveProp } from '../responsive-props'
import { Box } from '../box'

import type { ResponsiveProp } from '../responsive-props'
import type { Space } from '../common-types'
import type { ReusableBoxProps } from '../box'

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
        <Box
            {...props}
            as={as}
            display="flex"
            flexWrap="wrap"
            gap={space}
            className={exceptionallySetClassName}
            ref={ref}
            alignItems={mapResponsiveProp(alignY, (alignY) =>
                alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : 'center',
            )}
            justifyContent={mapResponsiveProp(align, (align) =>
                align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center',
            )}
        >
            {children}
        </Box>
    )
})

export type { InlineProps, InlineAlign }
export { Inline }
