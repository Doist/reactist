import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import type { WithEnhancedClassName } from '../common-types'

import styles from './divider.module.css'

type DividerWeight = 'regular' | 'strong'

interface DividerProps extends WithEnhancedClassName {
    weight?: DividerWeight
}

function Divider({ weight = 'regular', className, ...props }: DividerProps) {
    return (
        <Box
            component="hr"
            className={[
                className,
                styles.divider,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
            ]}
            {...props}
        />
    )
}

export type { DividerProps, DividerWeight }
export { Divider }
