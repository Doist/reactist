import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import type { ComponentTypes } from '../type-helpers'
import type { Tone } from '../common-types'

import styles from './text.module.css'

type SupportedBoxProps = Pick<
    React.ComponentProps<typeof Box>,
    | 'padding'
    | 'paddingX'
    | 'paddingY'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft'
>

type TextProps = SupportedBoxProps & {
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
    ...rest
}: TextProps) {
    return (
        <Box
            {...rest}
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
