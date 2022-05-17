import React from 'react'
import { Box } from '../box'
import { Spinner } from '../spinner'

type Size = 'xsmall' | 'small' | 'medium' | 'large'

type NativeProps = Omit<
    JSX.IntrinsicElements['div'],
    'className' | 'aria-describedby' | 'aria-label' | 'aria-labelledby' | 'role' | 'size'
>

type LoadingProps = NativeProps & {
    /**
     * The size of the loading spinner.
     * @default 'small'
     */
    size?: Size
    /**
     * A escape hatch in case you need to provide a custom class name to the container element.
     */
    exceptionallySetClassName?: string
    /** Identifies the element (or elements) that describes the loading component for assistive technologies. */
    'aria-describedby'?: string
} & (
        | {
              /** Defines a string value that labels the current loading component for assistive technologies. */
              'aria-label': string
              'aria-labelledby'?: never
          }
        | {
              /** Identifies the element (or elements) that labels the current loading component for assistive technologies. */
              'aria-labelledby': string
              'aria-label'?: never
          }
    )

const sizeMapping: Record<Size, number> = {
    xsmall: 16,
    small: 24,
    medium: 36,
    large: 48,
}

function Loading({ size = 'small', exceptionallySetClassName, ...props }: LoadingProps) {
    const numericSize = sizeMapping[size] ?? sizeMapping.small
    const ariaLabel = props['aria-label']
        ? props['aria-label']
        : !props['aria-labelledby']
        ? 'Loading…'
        : undefined

    return (
        <Box
            {...props}
            aria-label={ariaLabel}
            className={exceptionallySetClassName}
            display="flex"
            alignItems="center"
            justifyContent="center"
            role="progressbar"
        >
            <Spinner size={numericSize} aria-hidden />
        </Box>
    )
}

export { Loading }
export type { LoadingProps }
