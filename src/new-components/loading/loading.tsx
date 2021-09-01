import React from 'react'
import { Box } from '../box'
import styles from './loading.module.css'

type Size = 'small' | 'medium' | 'large'

type LoaderProps = {
    /**
     * The non-visual label used for assistive technologies.
     */
    label: string
    /**
     * The size of the loading spinner.
     * @default 'small'
     */
    size?: Size
}

const sizeMapping: Record<Size, number> = {
    small: 24,
    medium: 36,
    large: 48,
}

function Loading({ size = 'small', label }: LoaderProps) {
    const numericSize = sizeMapping[size]
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            role="progressbar"
            aria-label={label}
        >
            <svg
                aria-hidden
                width={numericSize}
                height={numericSize}
                viewBox="0 0 24 24"
                className={styles.svg}
            >
                <g fill="none" fillRule="nonzero">
                    <path
                        className={styles.spinner}
                        d="M17.945 3.958A9.955 9.955 0 0 0 12 2c-2.19 0-4.217.705-5.865 1.9L5.131 2.16A11.945 11.945 0 0 1 12 0c2.59 0 4.99.82 6.95 2.217l-1.005 1.741z"
                    />
                    <path
                        className={styles.spinnerBackground}
                        d="M5.13 2.16L6.136 3.9A9.987 9.987 0 0 0 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10a9.986 9.986 0 0 0-4.055-8.042l1.006-1.741A11.985 11.985 0 0 1 24 12c0 6.627-5.373 12-12 12S0 18.627 0 12c0-4.073 2.029-7.671 5.13-9.84z"
                    />
                </g>
            </svg>
        </Box>
    )
}

export { Loading }
export type { LoaderProps }
