import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import {
    getAvailableImageSources,
    getAvatarImageIdentityKey,
    getAvatarMetaColorIndex,
    getInitials,
    getSources,
    normalizeAvatarName,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
} from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'
import type { AvatarImage, AvatarShape, AvatarSize, ImageSources } from './utils'

type AvatarStyle = React.CSSProperties & {
    '--reactist-avatar-size': string
    '--reactist-avatar-rounded-radius': string
}

type AvatarGroupStyle = React.CSSProperties & {
    '--reactist-avatar-group-size': string
    '--reactist-avatar-group-overlap': string
    '--reactist-avatar-group-mask': string
    '--reactist-avatar-group-rounded-radius': string
    '--reactist-avatar-group-rounded-mask-radius': string
}

type AvatarPairStyle = React.CSSProperties & {
    '--reactist-avatar-pair-size': string
    '--reactist-avatar-pair-spacing': string
    '--reactist-avatar-pair-mask': string
    '--reactist-avatar-pair-rounded-radius': string
    '--reactist-avatar-pair-rounded-mask-radius': string
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
 * Props for the `Avatar` component.
 */
type AvatarOwnProps = ObfuscatedClassName & {
    /**
     * The rendered avatar size, in CSS pixels.
     */
    size: AvatarSize

    /**
     * The avatar shape.
     *
     * @default 'circle'
     */
    shape?: AvatarShape

    /**
     * The display name represented by the avatar.
     *
     * Used as the default accessible label, to generate fallback initials, and
     * to assign the deterministic background color when rendering initials.
     */
    name?: string

    /**
     * The avatar image.
     *
     * Pass a string for a single image URL, or a source map keyed by intrinsic
     * image width. Source maps render as native `srcSet`/`sizes` hints, with
     * the largest valid source used as the fallback `src`.
     */
    image?: AvatarImage

    /**
     * Accessible text for the avatar image.
     *
     * Defaults to `name`. Pass an empty string when the avatar is decorative.
     */
    alt?: string

    /**
     * Test identifier applied to the avatar root element.
     */
    'data-testid'?: string

    /**
     * Avatar owns its root sizing styles. Use `exceptionallySetClassName` for the styling escape
     * hatch.
     */
    style?: never
}

type AvatarProps<ComponentType extends React.ElementType = 'div'> = PolymorphicComponentProps<
    ComponentType,
    AvatarOwnProps,
    'omitClassName'
>

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
     * The number of additional people represented by the final avatar.
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
     * Paired Avatar children.
     */
    children: React.ReactNode

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

const AvatarContent = polymorphicComponent<'div', AvatarOwnProps, 'omitClassName'>(
    function AvatarContent(
        {
            as,
            size,
            shape = 'circle',
            name,
            image,
            alt,
            exceptionallySetClassName,
            'data-testid': testId,
            'aria-hidden': ariaHidden,
            'aria-label': ariaLabel,
            ...restProps
        },
        ref,
    ) {
        const imageSources = getSources(image, size)
        const [failedImageSources, setFailedImageSources] = React.useState<string[]>([])
        const availableImageSources = getAvailableImageSources(imageSources, failedImageSources)
        const normalizedName = normalizeAvatarName(name)
        const initials = availableImageSources ? '' : getInitials(name)

        const hasInitials = initials !== ''
        const label = ariaLabel ?? alt ?? normalizedName
        const isDecorative = ariaHidden || label === ''
        const metaColorIndex = hasInitials ? getAvatarMetaColorIndex(name) : undefined

        return (
            <Box
                as={as}
                ref={ref}
                className={classNames(
                    styles.avatar,
                    styles[`shape-${shape}`],
                    metaColorIndex !== undefined && styles[`meta-color-${metaColorIndex}`],
                    !availableImageSources && !hasInitials && styles.empty,
                    exceptionallySetClassName,
                )}
                style={getAvatarStyle(size)}
                data-testid={testId}
                aria-hidden={isDecorative || undefined}
                display="inlineFlex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                overflow="hidden"
                textAlign="center"
                {...restProps}
            >
                {availableImageSources ? (
                    <img
                        className={styles.image}
                        src={availableImageSources.src}
                        srcSet={availableImageSources.srcSet}
                        sizes={availableImageSources.sizes}
                        alt={label ?? ''}
                        onError={(event) => {
                            const failedSource = getFailedImageSource(
                                availableImageSources,
                                event.currentTarget,
                            )

                            setFailedImageSources((currentFailedSources) =>
                                currentFailedSources.includes(failedSource)
                                    ? currentFailedSources
                                    : [...currentFailedSources, failedSource],
                            )
                        }}
                    />
                ) : hasInitials ? (
                    <div
                        className={styles.initials}
                        role={label ? 'img' : undefined}
                        aria-label={label}
                    >
                        {initials}
                    </div>
                ) : null}
            </Box>
        )
    },
)

/**
 * Displays an avatar from an image URL, a source map keyed by intrinsic
 * image width, or initials derived from the provided name (with a background
 * color).
 */
const Avatar = polymorphicComponent<'div', AvatarOwnProps, 'omitClassName'>(function Avatar(
    { as, image, ...restProps },
    ref,
) {
    return (
        <AvatarContent
            as={as}
            ref={ref}
            // Allows `AvatarContent` to remount when the image map changes,
            // which resets error states
            key={getAvatarImageIdentityKey(image)}
            image={image}
            {...restProps}
        />
    )
})

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
        const overflowCount = count != null && count > 0 ? count : null

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
                    <span className={styles.avatarGroupCount}>{`+${overflowCount}`}</span>
                ) : null}
            </Box>
        )
    },
)

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

function getAvatarStyle(size: AvatarSize): AvatarStyle {
    return {
        '--reactist-avatar-size': `${size}px`,
        '--reactist-avatar-rounded-radius': ROUNDED_AVATAR_RADIUS_BY_SIZE[size],
    }
}

function getAvatarPairStyle(size: AvatarSize): AvatarPairStyle {
    const mask = AVATAR_GROUP_MASK_BY_SIZE[size]
    const roundedRadius = ROUNDED_AVATAR_RADIUS_BY_SIZE[size]

    return {
        '--reactist-avatar-pair-size': `${size}px`,
        '--reactist-avatar-pair-spacing': AVATAR_PAIR_SPACING_BY_SIZE[size],
        '--reactist-avatar-pair-mask': mask,
        '--reactist-avatar-pair-rounded-radius': roundedRadius,
        '--reactist-avatar-pair-rounded-mask-radius': `calc(${roundedRadius} + ${mask})`,
    }
}

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

function getAbsoluteImageSource(src: string, image: HTMLImageElement) {
    try {
        return new URL(src, image.ownerDocument.baseURI).href
    } catch {
        return src
    }
}

function getFailedImageSource(imageProps: ImageSources, image: HTMLImageElement) {
    const failedSrc = image.currentSrc || image.src || imageProps.src
    const matchingSource = imageProps.sources?.find(
        ({ src }) => src === failedSrc || getAbsoluteImageSource(src, image) === failedSrc,
    )

    return matchingSource?.src ?? imageProps.src
}

export { Avatar, AvatarGroup, AvatarPair }
export type { AvatarGroupProps, AvatarImage, AvatarPairProps, AvatarProps, AvatarShape, AvatarSize }
