import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import styles from './avatar-pair.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'
import type { AvatarShape, AvatarSize } from './utils'

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
                    styles[`avatarPairSize-${size}`],
                    styles[`avatarPairShape-${shape}`],
                    exceptionallySetClassName,
                )}
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

export { AvatarPair }
export type { AvatarPairProps }
