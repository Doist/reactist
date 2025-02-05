import type classNames from 'classnames'
import type { HTMLAttributes } from 'react'

export type Space = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

export type SpaceWithNegatives =
    | Space
    // once we update to TS 4.1 or higher, we can replace the list below with `-${Space}`
    // see https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
    | '-xsmall'
    | '-small'
    | '-medium'
    | '-large'
    | '-xlarge'
    | '-xxlarge'

export type Tone = 'normal' | 'secondary' | 'danger' | 'positive'
export type AlertTone = 'info' | 'positive' | 'caution' | 'critical'

export type DividerWeight = 'primary' | 'secondary' | 'tertiary' | 'none'

type ClassValue = Parameters<typeof classNames>[number]

export type WithEnhancedClassName<T = unknown> = T extends HTMLElement
    ? Omit<HTMLAttributes<T>, 'className'> & { className?: ClassValue }
    : T extends { className?: unknown }
    ? Omit<T, 'className'> & { className?: ClassValue }
    : T & { className?: ClassValue }

export interface OpenInNewTab {
    openInNewTab?: boolean
    target?: never
    rel?: never
}

export type ObfuscatedClassName = {
    /**
     * Used internally to set the `className` prop of the main container element for this component.
     *
     * Aside from the different name, the prop behaves the same as the native `className`. The only
     * reason for the name change is to discourage applying custom CSS to the design system
     * components, which are supposed to _eventually_ provide all the styling features we may need.
     *
     * This prop is meant to be used only in certain circumstances, when you really need a escape
     * hatch to apply custom styles to a component. Before reaching for this feature, try harder to
     * see if you can solve your needs with what the design system provides.
     *
     * For instance, instead of applying layout-related styles to a non-layout component, consider
     * wrapping it inside a layout component.
     *
     * @see PolymorphicComponent
     */
    exceptionallySetClassName?: string
}
