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
} from './utils'

import styles from './avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { PolymorphicComponentProps } from '../utils/polymorphism'
import type { AvatarImage as AvatarImageProp, AvatarShape, AvatarSize, ImageSources } from './utils'

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
    image?: AvatarImageProp

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
 * Displays an avatar from an image URL, a source map keyed by intrinsic
 * image width, or initials derived from the provided name (with a background
 * color).
 */
const Avatar = polymorphicComponent<'div', AvatarOwnProps, 'omitClassName'>(function Avatar(
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
    const label = getAvatarLabel({ alt, name, 'aria-label': ariaLabel })
    const isDecorative = Boolean(ariaHidden ?? label === '')

    return (
        <Box
            as={as}
            ref={ref}
            className={classNames(
                styles.avatar,
                styles[`size-${size}`],
                styles[`shape-${shape}`],
                exceptionallySetClassName,
            )}
            data-testid={testId}
            display="inlineFlex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            overflow="hidden"
            textAlign="center"
            {...restProps}
        >
            <AvatarImage
                // Allows `AvatarImage` to remount when the image map changes,
                // which resets error states without replacing the avatar root.
                key={getAvatarImageIdentityKey(image)}
                size={size}
                name={name}
                image={image}
                label={label}
                aria-hidden={isDecorative}
            />
        </Box>
    )
})

function getAvatarLabel({
    alt,
    name,
    'aria-label': ariaLabel,
}: Pick<AvatarProps, 'alt' | 'name' | 'aria-label'>) {
    return ariaLabel ?? alt ?? normalizeAvatarName(name)
}

type AvatarImageProps = {
    size: AvatarSize
    name?: string
    image?: AvatarImageProp
    label?: string
    'aria-hidden'?: boolean
}

function AvatarImage({ size, name, image, label, 'aria-hidden': ariaHidden }: AvatarImageProps) {
    const imageSources = getSources(image, size)
    const [failedImageSources, setFailedImageSources] = React.useState<string[]>([])
    const availableImageSources = getAvailableImageSources(imageSources, failedImageSources)
    const initials = availableImageSources ? '' : getInitials(name)
    const hasInitials = initials !== ''

    if (availableImageSources) {
        return (
            <img
                className={styles.image}
                src={availableImageSources.src}
                srcSet={availableImageSources.srcSet}
                sizes={availableImageSources.sizes}
                alt={label}
                aria-hidden={ariaHidden}
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
        )
    }
    if (hasInitials) {
        return (
            <div
                className={classNames(
                    styles.initials,
                    styles[`meta-color-${getAvatarMetaColorIndex(name)}`],
                )}
                role={label ? 'img' : undefined}
                aria-label={label}
                aria-hidden={ariaHidden}
            >
                {initials}
            </div>
        )
    }

    return null
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

Avatar.displayName = 'Avatar'

export { Avatar }
export type { AvatarProps }
export type { AvatarImage, AvatarShape, AvatarSize } from './utils'
