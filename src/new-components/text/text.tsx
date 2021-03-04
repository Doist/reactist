import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import type { ComponentTypes } from '../type-helpers'
import type { Tone } from '../common-types'

import styles from './text.module.css'

interface TextProps {
    component?: ComponentTypes
    children: React.ReactNode
    size?: 'xsmall' | 'small' | 'standard' | 'large' | 'xlarge'
    weight?: 'regular' | 'medium' | 'strong'
    tone?: Tone
}

function Text({
    component = 'span',
    size = 'standard',
    weight = 'regular',
    tone = 'normal',
    children,
}: TextProps) {
    return (
        <Box
            component={component}
            className={[
                styles.text,
                size !== 'standard' ? getClassNames(styles, 'size', size) : null,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
            ]}
        >
            {children}
        </Box>
    )
}

export type { TextProps }
export { Text }
