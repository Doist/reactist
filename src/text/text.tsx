import * as React from 'react'

import { Role } from '@ariakit/react'

import { getTypographyClassName } from '../typography/typography'

import typographyStyles from '../typography/typography.module.css'
import styles from './text.module.css'

import type { RoleProps } from '@ariakit/react'
import type { TypographyStyleProps } from '../typography/typography'

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
    TypographyStyleProps & {
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
            className={getTypographyClassName({
                variantClassName: styles['variant-' + variant]!,
                fontFamilyClassName: display
                    ? typographyStyles['font-family-sf-for-web']
                    : undefined,
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
