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
