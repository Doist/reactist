import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'

import {
    getAvatarImageSrcSet,
    getAvatarMetaColorIndex,
    getInitials,
    resolveAvatarImage,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
} from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { AvatarImage, AvatarShape, AvatarSize } from './utils'

type AvatarStyle = React.CSSProperties & {
    '--reactist-avatar-size': string
    '--reactist-avatar-rounded-radius': string
    '--reactist-avatar-meta-fill': string
}

type AvatarProps = ObfuscatedClassName & {
    size: AvatarSize
    shape?: AvatarShape
    name?: string
    image?: AvatarImage
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

function Avatar({
    size,
    shape = 'circle',
    name,
    image,
    alt,
    exceptionallySetClassName,
    'data-testid': testId,
}: AvatarProps) {
    const [imageState, setImageState] = React.useState<{
        failedSrc?: string
        previousResolvedImage?: string
    }>({})

    const resolvedImage = resolveAvatarImage(image, size)
    if (imageState.previousResolvedImage !== resolvedImage) {
        setImageState({ previousResolvedImage: resolvedImage })
    }

    const imageFailed =
        imageState.previousResolvedImage === resolvedImage && imageState.failedSrc === resolvedImage
    const visibleImage = imageFailed ? undefined : resolvedImage
    const srcSet = getAvatarImageSrcSet(image)
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
                    src={visibleImage}
                    srcSet={srcSet}
                    sizes={srcSet ? `${size}px` : undefined}
                    alt={label ?? ''}
                    aria-hidden={isDecorative ? true : undefined}
                    onError={() =>
                        setImageState({
                            failedSrc: visibleImage,
                            previousResolvedImage: resolvedImage,
                        })
                    }
                />
            ) : (
                initials
            )}
        </Box>
    )
}
Avatar.displayName = 'Avatar'

export { Avatar }
export type { AvatarImage, AvatarProps, AvatarShape, AvatarSize }
