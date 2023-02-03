import * as React from 'react'
import { getClassNames } from '../utils/responsive-props'
import { Box } from '../box'
import type { DividerWeight } from '../utils/common-types'

import styles from './divider.module.css'

interface DividerProps {
    weight?: Exclude<DividerWeight, 'none'>
}

function Divider({ weight = 'tertiary', ...props }: DividerProps) {
    return <Box as="hr" className={getClassNames(styles, 'weight', weight)} {...props} />
}

export type { DividerProps, DividerWeight }
export { Divider }
