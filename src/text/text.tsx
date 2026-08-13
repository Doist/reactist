import * as React from 'react'

import { Role } from '@ariakit/react'
import classNames from 'classnames'

import { getBoxClassNames } from '../box'

import styles from './text.module.css'

import type { RoleProps } from '@ariakit/react'
import type { BoxProps } from '../box'
import type { ObfuscatedClassName, Tone } from '../utils/common-types'

const displayVariants = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5'] as const

const headerVariants = ['header-1', 'header-2', 'header-3', 'header-4'] as const

const bodyVariants = [
    'subheader-1',
    'subheader-2',
    'body-1',
    'body-2',
    'body-3',
    'callout-1',
    'callout-2',
    'caption-1',
    'caption-2',
    'caption-3',
    'footnote-1',
    'footnote-2',
] as const

type HeaderTextVariant = (typeof headerVariants)[number]
type BodyTextVariant = (typeof bodyVariants)[number]

type TextVariant = (typeof displayVariants)[number] | HeaderTextVariant | BodyTextVariant
type TextLineClamp = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'

type TextStyleProps = ObfuscatedClassName & {
    /** The semantic color of the text. */
    tone?: Tone
    /** Horizontal text alignment, including responsive values. */
    align?: BoxProps['textAlign']
    /** Truncates text after the given number of lines. */
    lineClamp?: TextLineClamp
    /** Adds a line under or through the text. */
    decoration?: 'strikethrough' | 'underline'
}

type DefaultCaseTextProps = {
    /** Visual text style; defaults to body-3. */
    variant?: TextVariant
    /** Uppercase text is only available with footnote-1. */
    case?: never
}

type UppercaseTextProps = {
    /** Visual footnote style supporting uppercase. */
    variant: 'footnote-1'
    /** Converts the text to uppercase. */
    case: 'uppercase'
}

/** Renders interface copy with a named typography variant, from display text to footnotes. */
type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'> &
    TextStyleProps & {
        children: React.ReactNode
        /**
         * Custom element rendered with the variant's typography. Defaults to the matching heading
         * element for header variants, and a div otherwise.
         */
        render?: RoleProps['render']
    } & (DefaultCaseTextProps | UppercaseTextProps)

function isHeaderVariant(variant: TextVariant): variant is HeaderTextVariant {
    return variant.startsWith('header-')
}

const headerElements: Record<HeaderTextVariant, React.ReactElement> = {
    'header-1': <h1 />,
    'header-2': <h2 />,
    'header-3': <h3 />,
    'header-4': <h4 />,
}

/** Renders interface copy with a named typography variant, from display text to footnotes. */
const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
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
    const display = variant.startsWith('display-')

    return (
        <Role.div
            {...props}
            render={render ?? (isHeaderVariant(variant) ? headerElements[variant] : undefined)}
            className={classNames(
                getBoxClassNames({
                    textAlign: align,
                    paddingRight: lineClamp ? 'xsmall' : undefined,
                }),
                exceptionallySetClassName,
                styles.text,
                styles['font-family-default'],
                styles['variant-' + variant],
                display ? styles.display : null,
                decoration ? styles['decoration-' + decoration] : null,
                textCase ? styles['case-' + textCase] : null,
                tone !== 'normal' ? styles['tone-' + tone] : null,
                Number(lineClamp ?? 0) > 1 ? styles.lineClampMultipleLines : null,
                lineClamp ? styles['lineClamp-' + lineClamp] : null,
            )}
            // the rendered element varies by variant and render, so the ref is typed broadly
            ref={ref as React.ForwardedRef<HTMLDivElement>}
        >
            {children}
        </Role.div>
    )
})

Text.displayName = 'Text'

export type { TextProps, TextVariant }
export { bodyVariants, displayVariants, headerVariants, Text }
