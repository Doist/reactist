import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import { ROUNDED_AVATAR_RADIUS_BY_SIZE } from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'
import type { AvatarShape, AvatarSize } from './utils'

type AvatarPairStyle = React.CSSProperties & {
    '--reactist-avatar-pair-size': string
    '--reactist-avatar-pair-spacing': string
    '--reactist-avatar-pair-mask': string
    '--reactist-avatar-pair-rounded-radius': string
    '--reactist-avatar-pair-rounded-mask-radius': string
}

const AVATAR_PAIR_MASK_BY_SIZE: Record<AvatarSize, string> = {
    80: '3px',
    72: '3px',
    62: '3px',
    50: '3px',
    40: '3px',
    36: '2.5px',
    30: '2.5px',
    28: '2px',
    24: '2px',
    20: '2px',
    18: '1.5px',
    16: '1.25px',
    12: '1px',
}

const AVATAR_PAIR_SPACING_BY_SIZE: Record<AvatarSize, string> = {
    80: '36px',
    72: '32px',
    62: '28px',
    50: '22px',
    40: '18px',
    36: '16px',
    30: '14px',
    28: '12px',
    24: '12px',
    20: '10px',
    18: '10px',
    16: '8px',
    12: '6px',
}

/**
 * Props for the `AvatarPair` component.
 */
type AvatarPairOwnProps = ObfuscatedClassName & {
    /**
     * The rendered avatar size, in CSS pixels.
     *
     * Direct child Avatar components should use the same size.
     */
    size: AvatarSize

    /**
     * The paired avatar shape.
     *
     * Direct child Avatar components should use the same shape.
     *
     * @default 'circle'
     */
    shape?: AvatarShape

    /**
     * Exactly two paired Avatar children. The first child is the foreground
     * avatar (positioned bottom-right); the second is the diagonal overlay
     * (positioned top-left, masked where it overlaps the first).
     */
    children: readonly [React.ReactElement, React.ReactElement]

    /**
     * Test identifier applied to the avatar pair root element.
     */
    'data-testid'?: string

    /**
     * AvatarPair owns its root sizing styles. Use `exceptionallySetClassName` for the styling
     * escape hatch.
     */
    style?: never
}

type AvatarPairProps<ComponentType extends React.ElementType = 'div'> = PolymorphicComponentProps<
    ComponentType,
    AvatarPairOwnProps,
    'omitClassName'
>

/**
 * Displays two Avatar children with the second avatar positioned diagonally
 * above-left of the first avatar.
 */
const AvatarPair = polymorphicComponent<'div', AvatarPairOwnProps, 'omitClassName'>(
    function AvatarPair(
        {
            as,
            size,
            shape = 'circle',
            children,
            exceptionallySetClassName,
            'data-testid': testId,
            ...restProps
        },
        ref,
    ) {
        return (
            <Box
                as={as}
                ref={ref}
                className={classNames(
                    styles.avatarPair,
                    styles[`avatarPairShape-${shape}`],
                    exceptionallySetClassName,
                )}
                style={getAvatarPairStyle(size)}
                data-testid={testId}
                display="inlineBlock"
                position="relative"
                {...restProps}
            >
                {children}
            </Box>
        )
    },
)

function getAvatarPairStyle(size: AvatarSize): AvatarPairStyle {
    const mask = AVATAR_PAIR_MASK_BY_SIZE[size]
    const roundedRadius = ROUNDED_AVATAR_RADIUS_BY_SIZE[size]

    return {
        '--reactist-avatar-pair-size': `${size}px`,
        '--reactist-avatar-pair-spacing': AVATAR_PAIR_SPACING_BY_SIZE[size],
        '--reactist-avatar-pair-mask': mask,
        '--reactist-avatar-pair-rounded-radius': roundedRadius,
        '--reactist-avatar-pair-rounded-mask-radius': `calc(${roundedRadius} + ${mask})`,
    }
}

export { AvatarPair }
export type { AvatarPairProps }
