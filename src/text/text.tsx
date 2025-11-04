import * as React from 'react'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'
import { getClassNames } from '../utils/responsive-props'

import styles from './text.module.css'

import type { BoxProps } from '../box'
import type { Tone } from '../utils/common-types'

type TextProps = {
    children: React.ReactNode
    /**
     * The size of the text.
     *
     * The supported values, from smaller size to larger size, are:
     * 'caption', 'copy', 'body', and 'subtitle'
     *
     * @default 'body'
     */
    size?: 'caption' | 'copy' | 'body' | 'subtitle'
    /**
     * The weight of the text font.
     *
     * @default 'regular'
     */
    weight?: 'regular' | 'semibold' | 'bold'
    /**
     * The tone (semantic color) of the text.
     *
     * @default 'normal'
     */
    tone?: Tone
    /**
     * Used to truncate the text to a given number of lines.
     *
     * It will add an ellipsis (`…`) to the text at the end of the last line, only if the text was
     * truncated. If the text fits without it being truncated, no ellipsis is added.
     *
     * By default, the text is not truncated at all, no matter how many lines it takes to render it.
     *
     * @default undefined
     */
    lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'
    /**
     * How to align the text horizontally.
     *
     * @default 'start'
     */
    align?: BoxProps['textAlign']
}

const Text = polymorphicComponent<'div', TextProps>(function Text(
    {
        as,
        size = 'body',
        weight = 'regular',
        tone = 'normal',
        align,
        children,
        lineClamp,
        exceptionallySetClassName,
        ...props
    },
    ref,
) {
    const lineClampMultipleLines =
        typeof lineClamp === 'string' ? Number(lineClamp) > 1 : (lineClamp ?? 1) > 1

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
                lineClampMultipleLines ? styles.lineClampMultipleLines : null,
                lineClamp ? getClassNames(styles, 'lineClamp', lineClamp.toString()) : null,
            ]}
            textAlign={align}
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
