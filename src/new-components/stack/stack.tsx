import * as React from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import { polymorphicComponent } from '../../utils/polymorphism'
import { getClassNames, mapResponsiveProp } from '../responsive-props'
import { Box } from '../box'
import { Divider } from '../divider'

import type { ResponsiveProp } from '../responsive-props'
import type { Space } from '../common-types'
import type { BoxProps, ReusableBoxProps } from '../box'
import type { DividerWeight } from '../divider'

import styles from './stack.module.css'

interface StackProps extends ReusableBoxProps {
    /** Space between items */
    space?: ResponsiveProp<Space>
    /** Align items horizontally */
    align?: ResponsiveProp<'left' | 'center' | 'right'>
    /** Add dividers if `true`, or specify the weight of the dividers to add */
    dividers?: boolean | DividerWeight
}

const Stack = polymorphicComponent<'div', StackProps>(function Stack(
    { as, space, align = 'left', dividers = false, children, exceptionallySetClassName, ...props },
    ref,
) {
    const alignProps: BoxProps | undefined =
        align === 'left'
            ? undefined
            : {
                  width: 'full',
                  flexDirection: 'column',
                  display: 'flex',
                  alignItems: mapResponsiveProp(align, (align) =>
                      align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center',
                  ),
              }

    return (
        <Box
            {...props}
            {...alignProps}
            as={as}
            className={[exceptionallySetClassName, getClassNames(styles, 'space', space)]}
            ref={ref}
        >
            {dividers
                ? React.Children.map(flattenChildren(children), (child, index) =>
                      index > 0 ? (
                          <>
                              <Divider
                                  weight={typeof dividers === 'string' ? dividers : undefined}
                              />
                              {child}
                          </>
                      ) : (
                          child
                      ),
                  )
                : children}
        </Box>
    )
})

export type { StackProps }
export { Stack }
