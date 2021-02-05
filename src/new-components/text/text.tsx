import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import type { ComponentTypes } from '../type-helpers'
import type { Tone, WithEnhancedClassName } from '../common-types'

import styles from './divider.module.css'

interface TextProps extends WithEnhancedClassName {
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
    className,
    children,
}: TextProps) {
    return (
        <Box
            component={component}
            className={[
                className,
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
