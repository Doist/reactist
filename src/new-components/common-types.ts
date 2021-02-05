import type { HTMLAttributes } from 'react'
import type { ClassValue } from 'classnames/types'

export type Space = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
export type Tone = 'normal' | 'secondary' | 'danger'

export type WithEnhancedClassName<T = unknown> = T extends { className?: unknown }
    ? Omit<T, 'className'> & { className?: ClassValue }
    : T extends HTMLElement
    ? Omit<HTMLAttributes<T>, 'className'> & { className?: ClassValue }
    : T & { className?: ClassValue }
