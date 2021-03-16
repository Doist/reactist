import * as React from 'react'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'

import styles from './heading.module.css'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

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

type SupportedHeadingElementProps = Omit<
    JSX.IntrinsicElements[HeadingElement],
    'className' | 'children'
>

type HeadingProps = SupportedBoxProps &
    SupportedHeadingElementProps & {
        level: HeadingLevel
        weight?: 'regular' | 'light'
        size?: 'smaller' | 'larger' | 'largest'
        children: React.ReactNode
    }

function Heading({ level, weight = 'regular', size, children, ...props }: HeadingProps) {
    // In TypeScript v4.1, this would be properly recognized without needing the type assertion
    // https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types
    const headingElementName = `h${level}` as HeadingElement

    return (
        <Box
            {...props}
            className={[
                styles.heading,
                weight !== 'regular' ? getClassNames(styles, 'weight', weight) : null,
                getClassNames(styles, 'size', size),
            ]}
            component={headingElementName}
        >
            {children}
        </Box>
    )
}

export type { HeadingProps, HeadingLevel }
export { Heading }
