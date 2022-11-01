import * as React from 'react'

import { Box } from '../box'

import type { PropsWithChildren } from 'react'

import styles from './badge.module.css'

type Props = {
    variant: 'neutral' | 'positive' | 'color'
    'aria-label'?: string
}

function Badge({ variant = 'neutral', children, ...rest }: PropsWithChildren<Props>) {
    const variantClassName = styles[`badge-${variant}`]

    return (
        <Box {...rest} className={[styles.badge, variantClassName]}>
            {children}
        </Box>
    )
}

export { Badge }
