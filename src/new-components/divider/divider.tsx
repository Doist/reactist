import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import styles from './divider.module.css'

type DividerWeight = 'regular' | 'strong'

interface DividerProps {
    weight?: DividerWeight
}

function Divider({ weight = 'regular', ...props }: DividerProps) {
    return (
        <Box
            component="hr"
            className={[
                styles.divider,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
            ]}
            {...props}
        />
    )
}

export type { DividerProps, DividerWeight }
export { Divider }
