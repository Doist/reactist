import * as React from 'react'

import { Role } from '@ariakit/react'

import { getTypographyClassName } from '../typography/typography'

import styles from './text.module.css'

import type { RoleProps } from '@ariakit/react'
import type { TypographyStyleProps } from '../typography/typography'

type TextVariant =
    | 'subheader-1'
    | 'subheader-2'
    | 'body-1'
    | 'body-2'
    | 'body-3'
    | 'callout-1'
    | 'callout-2'
    | 'caption-1'
    | 'caption-2'
    | 'caption-3'
    | 'footnote-1'
    | 'footnote-2'

type StrikethroughTextProps = {
    /** Visual text style supporting strikethrough. */
    variant:
        | 'subheader-1'
        | 'subheader-2'
        | 'body-3'
        | 'callout-1'
        | 'callout-2'
        | 'caption-2'
        | 'caption-3'
    /** Figma-supported strikethrough decoration. */
    decoration: 'strikethrough'
    /** Uppercase presentation is unavailable with strikethrough. */
    case?: never
}

type UnderlinedTextProps = {
    /** Visual caption style supporting underline. */
    variant: 'caption-2' | 'caption-3'
    /** Figma-supported underline decoration. */
    decoration: 'underline'
    /** Uppercase presentation is unavailable with underline. */
    case?: never
}

type UnmodifiedTextProps = {
    /** Visual text style; defaults to body-3. */
    variant?: TextVariant
    /** Decoration is omitted for the base variant. */
    decoration?: never
    /** Case override is omitted for the base variant. */
    case?: never
}

type UppercaseTextProps = {
    /** Visual footnote style supporting uppercase. */
    variant: 'footnote-1'
    /** Decoration is unavailable with uppercase presentation. */
    decoration?: never
    /** Figma-supported uppercase presentation. */
    case: 'uppercase'
}

type TextProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> &
    TypographyStyleProps & {
        /** Text content. */
        children: React.ReactNode
        /** Custom element rendered with text typography; defaults to a div. */
        render?: RoleProps['render']
    } & (StrikethroughTextProps | UnderlinedTextProps | UppercaseTextProps | UnmodifiedTextProps)

const Text = React.forwardRef<HTMLDivElement, TextProps>(function Text(
    {
        variant = 'body-3',
        decoration,
        case: textCase,
        tone = 'normal',
        align,
        lineClamp,
        exceptionallySetClassName,
        render,
        children,
        ...props
    },
    ref,
) {
    return (
        <Role.div
            {...props}
            render={render}
            className={getTypographyClassName({
                variantClassName: styles['variant-' + variant]!,
                modifierClassNames: [
                    decoration ? styles['decoration-' + decoration] : undefined,
                    textCase ? styles['case-' + textCase] : undefined,
                ],
                tone,
                align,
                lineClamp,
                exceptionallySetClassName,
            })}
            ref={ref}
        >
            {children}
        </Role.div>
    )
})

Text.displayName = 'Text'

export type { TextProps, TextVariant }
export { Text }
