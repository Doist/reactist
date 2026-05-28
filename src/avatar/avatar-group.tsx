import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import styles from './avatar-group.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'
import type { AvatarShape, AvatarSize } from './utils'

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
                    styles[`avatarGroupSize-${size}`],
                    styles[`avatarGroupShape-${shape}`],
                    exceptionallySetClassName,
                )}
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

export { AvatarGroup }
export type { AvatarGroupProps }
