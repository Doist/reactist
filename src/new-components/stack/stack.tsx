import * as React from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import { polymorphicComponent } from '../../utils/polymorphism'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'
import { Divider } from '../divider'

import type { ResponsiveProp } from '../responsive-props'
import type { Space } from '../common-types'
import type { ReusableBoxProps } from '../box'
import type { DividerWeight } from '../divider'

import styles from './stack.module.css'

interface StackProps extends ReusableBoxProps {
    space?: ResponsiveProp<Space>
    dividers?: boolean | DividerWeight
}

const Stack = polymorphicComponent<'div', StackProps>(function Stack(
    { as, space, dividers = false, children, exceptionallySetClassName, ...props },
    ref,
) {
    return (
        <Box
            {...props}
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
