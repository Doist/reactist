import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'

import {
    getAvailableAvatarImageProps,
    getAvatarImageProps,
    getAvatarMetaColorIndex,
    getInitials,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
} from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { AvatarImage, AvatarImageProps, AvatarShape, AvatarSize } from './utils'

type AvatarStyle = React.CSSProperties & {
    '--reactist-avatar-size': string
    '--reactist-avatar-rounded-radius': string
    '--reactist-avatar-meta-fill': string
}

/**
 * Props for the `Avatar` component.
 */
type AvatarProps = ObfuscatedClassName & {
    /**
     * The rendered avatar size, in CSS pixels.
     */
    size: AvatarSize

    /**
     * The avatar shape.
     *
     * Use `circle` for user avatars and `rounded` for workspace or object avatars.
     *
     * @default 'circle'
     */
    shape?: AvatarShape

    /**
     * The display name represented by the avatar.
     *
     * Used as the default accessible label, to generate fallback initials, and to assign the
     * deterministic fallback meta color.
     */
    name?: string

    /**
     * The avatar image.
     *
     * Pass a string for a single image URL, or a source map keyed by intrinsic image width. Source
     * maps render as native `srcSet`/`sizes` hints, with the largest valid source used as the
     * fallback `src`.
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
}

type AvatarContentProps = ObfuscatedClassName & {
    size: AvatarSize
    shape: AvatarShape
    name?: string
    imageProps?: AvatarImageProps
    alt?: string
    'data-testid'?: string
}

function getAvatarStyle(size: AvatarSize, name?: string): AvatarStyle {
    const metaColorIndex = getAvatarMetaColorIndex(name)

    return {
        '--reactist-avatar-size': `${size}px`,
        '--reactist-avatar-rounded-radius': ROUNDED_AVATAR_RADIUS_BY_SIZE[size],
        '--reactist-avatar-meta-fill': `var(--reactist-avatar-meta-fill-${metaColorIndex})`,
    }
}

function getAvatarImageKey(imageProps?: AvatarImageProps) {
    if (!imageProps) {
        return 'fallback'
    }

    if (imageProps.sources) {
        return imageProps.sources.map(({ sourceSize, src }) => `${sourceSize}:${src}`).join('|')
    }

    return imageProps.src
}

function getAbsoluteImageSource(src: string, image: HTMLImageElement) {
    try {
        return new URL(src, image.ownerDocument.baseURI).href
    } catch {
        return src
    }
}

function getFailedImageSource(imageProps: AvatarImageProps, image: HTMLImageElement) {
    const failedSrc = image.currentSrc || image.src || imageProps.src
    const matchingSource = imageProps.sources?.find(
        ({ src }) => src === failedSrc || getAbsoluteImageSource(src, image) === failedSrc,
    )

    return matchingSource?.src ?? imageProps.src
}

function AvatarContent({
    size,
    shape,
    name,
    imageProps,
    alt,
    exceptionallySetClassName,
    'data-testid': testId,
}: AvatarContentProps) {
    const [failedImageSources, setFailedImageSources] = React.useState<string[]>([])

    const visibleImage = getAvailableAvatarImageProps(imageProps, failedImageSources)
    const initials = getInitials(name)
    const label = alt ?? name
    const isDecorative = label === ''
    const hasFallbackInitials = !visibleImage && initials
    const isEmpty = !visibleImage && !initials

    return (
        <Box
            className={classNames(
                styles.avatar,
                styles[`shape-${shape}`],
                hasFallbackInitials ? styles.fallback : undefined,
                isEmpty ? styles.empty : undefined,
                exceptionallySetClassName,
            )}
            style={getAvatarStyle(size, name)}
            data-testid={testId}
            role={!visibleImage && label ? 'img' : undefined}
            aria-label={!visibleImage && label ? label : undefined}
            aria-hidden={!visibleImage && isDecorative ? true : undefined}
        >
            {visibleImage ? (
                <img
                    className={styles.image}
                    src={visibleImage.src}
                    srcSet={visibleImage.srcSet}
                    sizes={visibleImage.sizes}
                    alt={label ?? ''}
                    aria-hidden={isDecorative ? true : undefined}
                    onError={(event) => {
                        const failedSource = getFailedImageSource(visibleImage, event.currentTarget)

                        setFailedImageSources((currentFailedSources) =>
                            currentFailedSources.includes(failedSource)
                                ? currentFailedSources
                                : [...currentFailedSources, failedSource],
                        )
                    }}
                />
            ) : (
                initials
            )}
        </Box>
    )
}

/**
 * Displays an avatar from an image URL or deterministic initials fallback.
 */
function Avatar({ size, shape = 'circle', name, image, alt, ...props }: AvatarProps) {
    const imageProps = getAvatarImageProps(image, size)

    return (
        <AvatarContent
            key={getAvatarImageKey(imageProps)}
            {...props}
            size={size}
            shape={shape}
            name={name}
            imageProps={imageProps}
            alt={alt}
        />
    )
}
Avatar.displayName = 'Avatar'

export { Avatar }
export type { AvatarImage, AvatarProps, AvatarShape, AvatarSize }
