import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import { ROUNDED_AVATAR_RADIUS_BY_SIZE } from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'
import type { AvatarShape, AvatarSize } from './utils'

type AvatarGroupStyle = React.CSSProperties & {
    '--reactist-avatar-group-size': string
    '--reactist-avatar-group-overlap': string
    '--reactist-avatar-group-mask': string
    '--reactist-avatar-group-rounded-radius': string
    '--reactist-avatar-group-rounded-mask-radius': string
}

const AVATAR_GROUP_OVERLAP_BY_SIZE: Record<AvatarSize, string> = {
    80: '8px',
    72: '8px',
    62: '8px',
    50: '4px',
    40: '4px',
    36: '4px',
    30: '2px',
    28: '2px',
    24: '2px',
    20: '2px',
    18: '2px',
    16: '2px',
    12: '1px',
}

const AVATAR_GROUP_MASK_BY_SIZE: Record<AvatarSize, string> = {
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

/**
 * Props for the `AvatarGroup` component.
 */
type AvatarGroupOwnProps = ObfuscatedClassName & {
    /**
     * The rendered avatar size, in CSS pixels.
     *
     * Direct child Avatar components should use the same size.
     */
    size: AvatarSize

    /**
     * The grouped avatar shape.
     *
     * Direct child Avatar components should use the same shape.
     *
     * @default 'circle'
     */
    shape?: AvatarShape

    /**
     * Additional people not shown in the group. When positive, rendered as a
     * decorative `N` overlay on top of the final avatar; hidden from
     * assistive tech.
     */
    count?: number

    /**
     * Grouped Avatar children.
     */
    children: React.ReactNode

    /**
     * Test identifier applied to the avatar group root element.
     */
    'data-testid'?: string

    /**
     * AvatarGroup owns its root sizing styles. Use `exceptionallySetClassName` for the styling
     * escape hatch.
     */
    style?: never
}

type AvatarGroupProps<ComponentType extends React.ElementType = 'div'> = PolymorphicComponentProps<
    ComponentType,
    AvatarGroupOwnProps,
    'omitClassName'
>

/**
 * Displays a row of overlapping Avatar children with an optional count overlay
 * on the final avatar.
 */
const AvatarGroup = polymorphicComponent<'div', AvatarGroupOwnProps, 'omitClassName'>(
    function AvatarGroup(
        {
            as,
            size,
            shape = 'circle',
            count,
            children,
            exceptionallySetClassName,
            'data-testid': testId,
            ...restProps
        },
        ref,
    ) {
        const overflowCount = count && count > 0 ? count : null

        return (
            <Box
                as={as}
                ref={ref}
                className={classNames(
                    styles.avatarGroup,
                    styles[`avatarGroupShape-${shape}`],
                    exceptionallySetClassName,
                )}
                style={getAvatarGroupStyle(size)}
                data-testid={testId}
                display="inlineFlex"
                alignItems="center"
                position="relative"
                {...restProps}
            >
                {children}
                {overflowCount !== null ? (
                    <span className={styles.avatarGroupCount} aria-hidden="true">
                        {overflowCount}
                    </span>
                ) : null}
            </Box>
        )
    },
)

function getAvatarGroupStyle(size: AvatarSize): AvatarGroupStyle {
    const mask = AVATAR_GROUP_MASK_BY_SIZE[size]
    const roundedRadius = ROUNDED_AVATAR_RADIUS_BY_SIZE[size]

    return {
        '--reactist-avatar-group-size': `${size}px`,
        '--reactist-avatar-group-overlap': AVATAR_GROUP_OVERLAP_BY_SIZE[size],
        '--reactist-avatar-group-mask': mask,
        '--reactist-avatar-group-rounded-radius': roundedRadius,
        '--reactist-avatar-group-rounded-mask-radius': `calc(${roundedRadius} + ${mask})`,
    }
}

export { AvatarGroup }
export type { AvatarGroupProps }
