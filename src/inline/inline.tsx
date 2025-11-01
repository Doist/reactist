import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'
import { mapResponsiveProp } from '../utils/responsive-props'

import type { ReusableBoxProps } from '../box'
import type { Space } from '../utils/common-types'
import type { ResponsiveProp } from '../utils/responsive-props'

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

export type { InlineAlign, InlineProps }
export { Inline }
