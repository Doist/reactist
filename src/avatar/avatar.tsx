import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'

import {
    getAvailableImageSources,
    getAvatarImageIdentityKey,
    getAvatarMetaColorIndex,
    getInitials,
    getSources,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
} from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { AvatarImage, AvatarShape, AvatarSize, ImageSources } from './utils'

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
}

/**
 * Displays an avatar from an image URL, a source map keyed by intrinsic
 * image width, or initials derived from the provided name (with a background
 * color).
 */
function Avatar({ image, ...props }: AvatarProps) {
    return (
        <AvatarContent
            // Allows `AvatarContent` to remount when the image map changes,
            // which resets error states
            key={getAvatarImageIdentityKey(image)}
            image={image}
            {...props}
        />
    )
}

function AvatarContent({
    size,
    shape = 'circle',
    name,
    image,
    alt,
    exceptionallySetClassName,
    'data-testid': testId,
}: AvatarProps) {
    const imageSources = getSources(image, size)
    const [failedImageSources, setFailedImageSources] = React.useState<string[]>([])
    const availableImageSources = getAvailableImageSources(imageSources, failedImageSources)

    const initials = getInitials(name)
    const label = alt ?? name
    const isDecorative = label === ''

    return (
        <Box
            className={classNames(
                styles.avatar,
                styles[`shape-${shape}`],
                exceptionallySetClassName,
            )}
            style={getAvatarStyle(size, name)}
            data-testid={testId}
        >
            {availableImageSources ? (
                <img
                    className={styles.image}
                    src={availableImageSources.src}
                    srcSet={availableImageSources.srcSet}
                    sizes={availableImageSources.sizes}
                    alt={label ?? ''}
                    aria-hidden={isDecorative}
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
            ) : (
                <div
                    className={styles.initials}
                    role={label ? 'img' : undefined}
                    aria-label={label}
                    aria-hidden={isDecorative}
                >
                    {initials}
                </div>
            )}
        </Box>
    )
}

function getAvatarStyle(size: AvatarSize, name?: string): AvatarStyle {
    const metaColorIndex = getAvatarMetaColorIndex(name)

    return {
        '--reactist-avatar-size': `${size}px`,
        '--reactist-avatar-rounded-radius': ROUNDED_AVATAR_RADIUS_BY_SIZE[size],
        '--reactist-avatar-meta-fill': `var(--reactist-avatar-meta-fill-${metaColorIndex})`,
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

export { Avatar }
export type { AvatarImage, AvatarProps, AvatarShape, AvatarSize }
