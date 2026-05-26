import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'

import {
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

type AvatarProps = ObfuscatedClassName & {
    size: AvatarSize
    shape?: AvatarShape
    name?: string
    image?: AvatarImage
    alt?: string
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

    return [imageProps.src, imageProps.srcSet, imageProps.sizes].filter(Boolean).join('|')
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
    const [imageFailed, setImageFailed] = React.useState(false)

    const visibleImage = imageFailed ? undefined : imageProps
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
                    onError={() => setImageFailed(true)}
                />
            ) : (
                initials
            )}
        </Box>
    )
}

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
