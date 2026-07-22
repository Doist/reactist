import * as React from 'react'

import { Role } from '@ariakit/react'

import { getTypographyClassName } from '../typography/typography'

import styles from './heading.module.css'

import type { TypographyStyleProps } from '../typography/typography'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
type HeadingVariant = 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4'

type HeadingBaseProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children' | 'className'> &
    TypographyStyleProps & {
        /** Heading content. */
        children: React.ReactNode
    }

type SemanticHeadingProps = {
    /** Semantic HTML heading level. */
    level: HeadingLevel
    /** Visual heading style; inferred from level when omitted. */
    variant?: HeadingVariant
    /** Custom rendering is unavailable when semantic level is supplied. */
    render?: never
}

type RenderedHeadingProps = {
    /** Semantic level is unavailable when a custom element is supplied. */
    level?: never
    /** Visual heading style. */
    variant: HeadingVariant
    /** Custom element receiving heading typography. */
    render: React.ReactElement
}

/** Props for the Heading component. */
type HeadingProps = HeadingBaseProps & (SemanticHeadingProps | RenderedHeadingProps)

function getHeadingVariant(level: HeadingLevel | undefined): HeadingVariant {
    const numericLevel = Number(level ?? 1)

    return ('heading-' + Math.min(numericLevel, 4)) as HeadingVariant
}

function getHeadingRender(level: HeadingLevel | undefined) {
    return level == null ? undefined : React.createElement('h' + level)
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    {
        level,
        variant,
        render,
        tone = 'normal',
        align,
        lineClamp,
        exceptionallySetClassName,
        children,
        ...props
    },
    ref,
) {
    const resolvedVariant = variant ?? getHeadingVariant(level)

    return (
        <Role.h1
            {...props}
            render={render ?? getHeadingRender(level)}
            className={getTypographyClassName({
                variantClassName: styles['variant-' + resolvedVariant]!,
                tone,
                align,
                lineClamp,
                exceptionallySetClassName,
            })}
            ref={ref}
        >
            {children}
        </Role.h1>
    )
})

Heading.displayName = 'Heading'

export type { HeadingLevel, HeadingProps, HeadingVariant }
export { Heading }
