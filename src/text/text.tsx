import * as React from 'react'

import { Role } from '@ariakit/react'
import classNames from 'classnames'

import { getBoxClassNames } from '../box'
import { getClassNames } from '../utils/responsive-props'

import styles from './text.module.css'

import type { RoleProps } from '@ariakit/react'
import type { BoxProps } from '../box'
import type { ObfuscatedClassName, Tone } from '../utils/common-types'

const displayVariants = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5'] as const

const headingVariants = ['heading-1', 'heading-2', 'heading-3', 'heading-4'] as const

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

type DisplayTextVariant = (typeof displayVariants)[number]
type HeadingTextVariant = (typeof headingVariants)[number]
type BodyTextVariant = (typeof bodyVariants)[number]

type TextVariant = DisplayTextVariant | HeadingTextVariant | BodyTextVariant
type TextLineClamp = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'

type TextStyleProps = ObfuscatedClassName & {
    /** The semantic color of the text. */
    tone?: Tone
    /** Horizontal text alignment, including responsive values. */
    align?: BoxProps['textAlign']
    /** Truncates text after the given number of lines. */
    lineClamp?: TextLineClamp
}

type TextClassNameOptions = TextStyleProps & {
    variantClassName: string
    fontFamilyClassName?: string
    modifierClassNames?: Array<string | undefined>
}

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
    decoration: 'strikethrough'
    case?: never
}

type UnderlinedTextProps = {
    /** Visual caption style supporting underline. */
    variant: 'caption-2' | 'caption-3'
    decoration: 'underline'
    case?: never
}

type UnmodifiedTextProps = {
    /** Visual text style; defaults to body-3. */
    variant?: TextVariant
    decoration?: never
    case?: never
}

type UppercaseTextProps = {
    /** Visual footnote style supporting uppercase. */
    variant: 'footnote-1'
    decoration?: never
    case: 'uppercase'
}

/** Renders interface copy with a named typography variant, from display text to footnotes. */
type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'> &
    TextStyleProps & {
        children: React.ReactNode
        /**
         * Custom element rendered with the variant's typography. Defaults to the matching heading
         * element for heading variants, and a div otherwise.
         */
        render?: RoleProps['render']
    } & (StrikethroughTextProps | UnderlinedTextProps | UppercaseTextProps | UnmodifiedTextProps)

function isDisplayVariant(variant: TextVariant): variant is DisplayTextVariant {
    return variant.startsWith('display-')
}

function isHeadingVariant(variant: TextVariant): variant is HeadingTextVariant {
    return variant.startsWith('heading-')
}

function getDefaultRender(variant: TextVariant): RoleProps['render'] {
    if (isHeadingVariant(variant)) {
        return React.createElement('h' + variant.slice('heading-'.length))
    }

    return undefined
}

function getTextClassName({
    variantClassName,
    fontFamilyClassName = styles['font-family-default'],
    modifierClassNames,
    tone = 'normal',
    align,
    lineClamp,
    exceptionallySetClassName,
}: TextClassNameOptions) {
    const lineClampMultipleLines = Number(lineClamp ?? 0) > 1

    return classNames(
        getBoxClassNames({
            textAlign: align,
            paddingRight: lineClamp ? 'xsmall' : undefined,
        }),
        exceptionallySetClassName,
        styles.typography,
        fontFamilyClassName,
        variantClassName,
        modifierClassNames,
        tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
        lineClampMultipleLines ? styles.lineClampMultipleLines : null,
        lineClamp ? getClassNames(styles, 'lineClamp', String(lineClamp)) : null,
    )
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
    const display = isDisplayVariant(variant)

    return (
        <Role.div
            {...props}
            render={render ?? getDefaultRender(variant)}
            className={getTextClassName({
                variantClassName: styles['variant-' + variant]!,
                fontFamilyClassName: display ? styles['font-family-sf-for-web'] : undefined,
                modifierClassNames: [
                    display ? styles.display : undefined,
                    decoration ? styles['decoration-' + decoration] : undefined,
                    textCase ? styles['case-' + textCase] : undefined,
                ],
                tone,
                align,
                lineClamp,
                exceptionallySetClassName,
            })}
            // the rendered element varies by variant and render, so the ref is typed broadly
            ref={ref as React.ForwardedRef<HTMLDivElement>}
        >
            {children}
        </Role.div>
    )
})

Text.displayName = 'Text'

export type { TextProps, TextVariant }
export { bodyVariants, displayVariants, headingVariants, Text }
