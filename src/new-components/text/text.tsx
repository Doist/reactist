import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import type { ComponentTypes } from '../type-helpers'
import type { Tone } from '../common-types'

import styles from './text.module.css'

type TextProps = {
    component?: ComponentTypes
    children: React.ReactNode
    size?: 'xsmall' | 'small' | 'standard' | 'large' | 'xlarge'
    weight?: 'regular' | 'medium' | 'strong'
    tone?: Tone
    lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'
}

function Text({
    component = 'span',
    size = 'standard',
    weight = 'regular',
    tone = 'normal',
    children,
    lineClamp,
    ...rest
}: TextProps) {
    const lineClampMultipleLines =
        typeof lineClamp === 'string' ? parseInt(lineClamp, 10) > 1 : (lineClamp || 0) > 1

    return (
        <Box
            {...rest}
            component={component}
            className={[
                styles.text,
                size !== 'standard' ? getClassNames(styles, 'size', size) : null,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
                lineClampMultipleLines ? styles.lineClamp : null,
                lineClamp ? getClassNames(styles, 'line-clamp', lineClamp.toString()) : null,
            ]}
        >
            {children}
        </Box>
    )
}

export type { TextProps }
export { Text }
