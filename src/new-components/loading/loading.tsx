import React from 'react'
import { Box } from '../box'
import { Spinner } from '../spinner'

type Size = 'small' | 'medium' | 'large'

type NativeProps = Omit<
    JSX.IntrinsicElements['div'],
    'className' | 'aria-label' | 'aria-labelledby' | 'role' | 'size'
>

type LoadingProps = NativeProps & {
    /**
     * The size of the loading spinner.
     * @default 'small'
     */
    size?: Size
    exceptionallySetClassName?: string
} & (
        | {
              /**
               * The non-visual label used for assistive technologies.
               */
              'aria-label': string
              'aria-labelledby'?: never
          }
        | {
              /**
               * The non-visual label used for assistive technologies.
               */
              'aria-labelledby': string
              'aria-label'?: never
          }
    )

const sizeMapping: Record<Size, number> = {
    small: 24,
    medium: 36,
    large: 48,
}

function Loading({ size = 'small', exceptionallySetClassName, ...props }: LoadingProps) {
    const numericSize = sizeMapping[size] ?? sizeMapping.small
    return (
        <Box
            {...props}
            className={exceptionallySetClassName}
            display="flex"
            alignItems="center"
            justifyContent="center"
            role="progressbar"
        >
            <Spinner size={numericSize} />
        </Box>
    )
}

export { Loading }
export type { LoadingProps }
