import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import styles from './heading.module.css'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

interface HeadingProps extends Omit<HTMLHeadingElement, 'className'> {
    level: HeadingLevel
    weight?: 'regular' | 'light'
    size?: 'smaller' | 'larger'
}

function Heading({ level, weight = 'regular', size, children, ...props }: HeadingProps) {
    return (
        <Box
            className={[
                styles.heading,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                getClassNames(styles, 'size', size),
            ]}
            component={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
            {...props}
        >
            {children}
        </Box>
    )
}

export type { HeadingProps, HeadingLevel }
export { Heading }
