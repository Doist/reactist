import * as React from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import { forwardRefWithAs } from '../type-helpers'
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

const Stack = forwardRefWithAs<StackProps>(function Stack(
    { component, space, dividers = false, children, className, ...props },
    ref,
) {
    return (
        <Box
            component={component}
            className={[className, getClassNames(styles, 'space', space)]}
            ref={ref}
            {...props}
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
