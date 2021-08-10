import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'
import styles from './heading.module.css'
import type { Tone } from '../common-types'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type SupportedHeadingElementProps = Omit<
    JSX.IntrinsicElements[HeadingElement],
    'className' | 'children'
>

type HeadingProps = SupportedHeadingElementProps & {
    level: HeadingLevel
    weight?: 'regular' | 'light'
    size?: 'smaller' | 'larger' | 'largest'
    tone?: Tone
    children: React.ReactNode
    lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    { level, weight = 'regular', size, tone = 'normal', children, lineClamp, ...props },
    ref,
) {
    // In TypeScript v4.1, this would be properly recognized without needing the type assertion
    // https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types
    const headingElementName = `h${level}` as HeadingElement
    const lineClampMultipleLines =
        typeof lineClamp === 'string' ? parseInt(lineClamp, 10) > 1 : (lineClamp || 0) > 1

    return (
        <Box
            {...props}
            className={[
                styles.heading,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
                getClassNames(styles, 'size', size),
                lineClampMultipleLines ? styles.lineClamp : null,
                lineClamp ? getClassNames(styles, 'line-clamp', lineClamp.toString()) : null,
            ]}
            as={headingElementName}
            ref={ref}
        >
            {children}
        </Box>
    )
})

export type { HeadingProps, HeadingLevel }
export { Heading }
