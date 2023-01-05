import * as React from 'react'

import { Box } from '../box'

import styles from './badge.module.css'
import { polymorphicComponent } from '../../utils/polymorphism'

type BadgeProps = {
    variant: 'neutral' | 'positive' | 'color'
}

const Badge = polymorphicComponent<'div', BadgeProps>(function Badge(
    { variant = 'neutral', children, exceptionallySetClassName, ...rest },
    ref,
) {
    return (
        <Box
            {...rest}
            ref={ref}
            display="inline"
            className={[styles.badge, styles[`badge-${variant}`], exceptionallySetClassName]}
        >
            {children}
        </Box>
    )
})

export { Badge }
export type { BadgeProps }
