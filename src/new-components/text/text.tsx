import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import { polymorphicComponent } from '../../utils/polymorphism'
import type { Tone } from '../common-types'

import styles from './text.module.css'

type TextProps = {
    children: React.ReactNode
    size?: 'caption' | 'copy' | 'body' | 'subtitle'
    weight?: 'regular' | 'semibold' | 'bold'
    tone?: Tone
    lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'
}

const Text = polymorphicComponent<'span', TextProps>(function Text(
    {
        as = 'span',
        size = 'body',
        weight = 'regular',
        tone = 'normal',
        children,
        lineClamp,
        exceptionallySetClassName,
        ...props
    },
    ref,
) {
    const lineClampMultipleLines =
        typeof lineClamp === 'string' ? parseInt(lineClamp, 10) > 1 : (lineClamp || 0) > 1

    return (
        <Box
            {...props}
            as={as}
            className={[
                exceptionallySetClassName,
                styles.text,
                size !== 'body' ? getClassNames(styles, 'size', size) : null,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
                lineClampMultipleLines ? styles.lineClamp : null,
                lineClamp ? getClassNames(styles, 'line-clamp', lineClamp.toString()) : null,
            ]}
            // Prevents emojis from being cut-off
            // See https://github.com/Doist/reactist/pull/528
            paddingRight={lineClamp ? 'xsmall' : undefined}
            ref={ref}
        >
            {children}
        </Box>
    )
})

export type { TextProps }
export { Text }
