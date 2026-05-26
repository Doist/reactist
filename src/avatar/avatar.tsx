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

function getAccessibleProps({ label, isImage }: { label: string | undefined; isImage: boolean }) {
    if (isImage) {
        return {}
    }

    if (label === '') {
        return { 'aria-hidden': true } as const
    }

    if (label) {
        return { role: 'img', 'aria-label': label } as const
    }

    return {}
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
    const [failedImage, setFailedImage] = React.useState<AvatarImage | undefined>()

    const imageFailed = failedImage === image
    const resolvedImage = imageFailed ? undefined : resolveAvatarImage(image, size)
    const srcSet = getAvatarImageSrcSet(image)
    const initials = getInitials(name)
    const label = alt ?? name
    const isDecorative = label === ''
    const hasFallbackInitials = !resolvedImage && initials
    const isEmpty = !resolvedImage && !initials

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
            {...getAccessibleProps({ label, isImage: Boolean(resolvedImage) })}
        >
            {resolvedImage ? (
                <img
                    className={styles.image}
                    src={resolvedImage}
                    srcSet={srcSet}
                    sizes={srcSet ? `${size}px` : undefined}
                    alt={label ?? ''}
                    aria-hidden={isDecorative ? true : undefined}
                    onError={() => setFailedImage(image)}
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
