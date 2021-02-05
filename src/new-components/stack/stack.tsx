import * as React from 'react'
import flattenChildren from 'react-keyed-flatten-children'
import { forwardRefWithAs } from '../type-helpers'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'
import { Divider } from '../divider'

import type { ResponsiveProp } from '../responsive-props'
import type { Space, WithEnhancedClassName } from '../common-types'
import type { ReusableBoxProps } from '../box'
import type { DividerWeight } from '../divider'

import styles from './stack.module.css'

interface StackProps extends WithEnhancedClassName, ReusableBoxProps {
    space?: ResponsiveProp<Space>
    dividers?: boolean | DividerWeight
}

const Stack = forwardRefWithAs<StackProps>(function Stack(
    { component, space, dividers = false, children, className, ...props },
    ref,
) {
    const isList = component === 'ol' || component === 'ul'
    const inlineItemComponent = isList ? 'li' : 'div'

    return (
        <Box
            component={component}
            className={[className, getClassNames(styles, 'space', space)]}
            ref={ref}
            {...props}
        >
            {React.Children.map(flattenChildren(children), (child, index) => (
                <Box component={inlineItemComponent}>
                    {dividers && index > 0 ? (
                        <Box paddingBottom={space}>
                            <Divider weight={typeof dividers === 'string' ? dividers : undefined} />
                        </Box>
                    ) : null}
                    {child}
                </Box>
            ))}
        </Box>
    )
})

export type { StackProps }
export { Stack }
