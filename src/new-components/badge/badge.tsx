import classNames from 'classnames'
import * as React from 'react'

import { Box } from '../box'

import type { PropsWithChildren } from 'react'

import styles from './badge.module.css'

type Props = {
    variant: 'neutral' | 'positive' | 'color'
}

function Badge({ variant = 'neutral', children }: PropsWithChildren<Props>) {
    const variantClassName = styles[`badge-${variant}`]

    return <Box className={classNames(styles.badge, variantClassName)}>{children}</Box>
}

export { Badge }
