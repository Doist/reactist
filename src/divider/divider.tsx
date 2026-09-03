import * as React from 'react'

import { Box } from '../box'
import { getClassNames } from '../utils/responsive-props'

import styles from './divider.module.css'

import type { DividerWeight, ObfuscatedClassName } from '../utils/common-types'

interface DividerProps extends ObfuscatedClassName {
    weight?: Exclude<DividerWeight, 'none'>
}

function Divider({ weight = 'tertiary', exceptionallySetClassName, ...props }: DividerProps) {
    return (
        <Box
            as="hr"
            className={[exceptionallySetClassName, getClassNames(styles, 'weight', weight)]}
            {...props}
        />
    )
}

export type { DividerProps, DividerWeight }
export { Divider }
