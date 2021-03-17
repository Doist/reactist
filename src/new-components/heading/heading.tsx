import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import styles from './heading.module.css'

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
    children: React.ReactNode
    lineClamp?: number
}

function Heading({
    level,
    weight = 'regular',
    size,
    children,
    lineClamp = 0,
    ...props
}: HeadingProps) {
    // In TypeScript v4.1, this would be properly recognized without needing the type assertion
    // https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types
    const headingElementName = `h${level}` as HeadingElement
    const dataLineClampAttribute = lineClamp ? { 'data-line-clamp': lineClamp } : null

    return (
        <Box
            {...props}
            {...dataLineClampAttribute}
            className={[
                styles.heading,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                getClassNames(styles, 'size', size),
                lineClamp > 1 ? styles.lineClamp : null,
                lineClamp ? getClassNames(styles, 'line-clamp', lineClamp.toString()) : null,
            ]}
            component={headingElementName}
        >
            {children}
        </Box>
    )
}

export type { HeadingProps, HeadingLevel }
export { Heading }
