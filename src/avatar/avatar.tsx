import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'

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

import type { ComponentProps } from 'react'
import type { ObfuscatedClassName } from '../utils/common-types'
import type { AvatarImage, AvatarShape, AvatarSize, ImageSources } from './utils'

type AvatarStyle = React.CSSProperties & {
    '--reactist-avatar-size': string
    '--reactist-avatar-rounded-radius': string
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
} & Omit<ComponentProps<'div'>, 'className' | 'style'>

const AvatarContent = React.forwardRef<HTMLDivElement, AvatarProps>(function AvatarContent(
    {
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
})

/**
 * Displays an avatar from an image URL, a source map keyed by intrinsic
 * image width, or initials derived from the provided name (with a background
 * color).
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
    { image, ...restProps },
    ref,
) {
    return (
        <AvatarContent
            ref={ref}
            // Allows `AvatarContent` to remount when the image map changes,
            // which resets error states
            key={getAvatarImageIdentityKey(image)}
            image={image}
            {...restProps}
        />
    )
})

function getAvatarStyle(size: AvatarSize): AvatarStyle {
    return {
        '--reactist-avatar-size': `${size}px`,
        '--reactist-avatar-rounded-radius': ROUNDED_AVATAR_RADIUS_BY_SIZE[size],
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
