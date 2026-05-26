const AVATAR_SIZES = [80, 72, 62, 50, 40, 36, 30, 28, 24, 20, 18, 16, 12] as const

/**
 * Supported avatar sizes, in CSS pixels.
 */
type AvatarSize = (typeof AVATAR_SIZES)[number]

/**
 * Supported avatar clipping shapes.
 */
type AvatarShape = 'circle' | 'rounded'

/**
 * Avatar image source.
 *
 * Use a string for a single image URL, or a source map keyed by intrinsic image width. Source maps
 * are converted to native `srcSet` width descriptors.
 */
type AvatarImage = string | Record<number, string>
type AvatarImageSource = {
    sourceSize: number
    src: string
}
type AvatarImageProps = {
    src: string
    srcSet?: string
    sizes?: string
    sources?: AvatarImageSource[]
}

const AVATAR_META_COLOR_COUNT = 20

const ROUNDED_AVATAR_RADIUS_BY_SIZE: Record<AvatarSize, string> = {
    80: '10px',
    72: '10px',
    62: '8.5px',
    50: '7px',
    40: '5.5px',
    36: '5px',
    30: '5px',
    28: '5px',
    24: '3.2px',
    20: '3px',
    18: '3px',
    16: '2px',
    12: '1.6px',
}

const WHITESPACE_REGEXP = new RegExp('\\p{White_Space}+', 'gu')
const GRAPHEME_SEGMENTER =
    typeof Intl !== 'undefined' && 'Segmenter' in Intl
        ? new Intl.Segmenter('und', { granularity: 'grapheme' })
        : undefined

function normalizeAvatarName(name?: string) {
    return name?.normalize('NFC').trim().replace(WHITESPACE_REGEXP, ' ') ?? ''
}

function getGraphemeClusters(value: string) {
    if (GRAPHEME_SEGMENTER) {
        return Array.from(GRAPHEME_SEGMENTER.segment(value), ({ segment }) => segment)
    }

    return Array.from(value)
}

function getInitialGrapheme(value?: string) {
    return getGraphemeClusters(value?.toUpperCase() ?? '')[0] ?? ''
}

function getInitials(name?: string) {
    const nameParts = normalizeAvatarName(name).split(WHITESPACE_REGEXP).filter(Boolean)

    if (nameParts.length === 0) {
        return ''
    }

    if (nameParts.length === 1) {
        return getGraphemeClusters(nameParts[0]!.toUpperCase()).slice(0, 2).join('')
    }

    return `${getInitialGrapheme(nameParts[0])}${getInitialGrapheme(nameParts[nameParts.length - 1])}`
}

function getSortedImageSources(image: Record<number, string>): AvatarImageSource[] {
    return Object.entries(image)
        .map(([sourceSize, src]) => ({ sourceSize: Number(sourceSize), src }))
        .filter(({ sourceSize, src }) => Number.isFinite(sourceSize) && sourceSize > 0 && src)
        .sort((a, b) => a.sourceSize - b.sourceSize)
}

function getImagePropsFromSources(
    sources: AvatarImageSource[],
    sizes?: string,
): AvatarImageProps | undefined {
    if (sources.length === 0) {
        return undefined
    }

    return {
        src: sources[sources.length - 1]!.src,
        srcSet: sources.map(({ sourceSize, src }) => `${src} ${sourceSize}w`).join(', '),
        sizes,
        sources,
    }
}

function getAvatarImageProps(
    image: AvatarImage | undefined,
    size: AvatarSize,
): AvatarImageProps | undefined {
    if (!image) {
        return undefined
    }

    if (typeof image === 'string') {
        return { src: image }
    }

    const sources = getSortedImageSources(image)
    return getImagePropsFromSources(sources, `${size}px`)
}

function getAvailableAvatarImageProps(
    imageProps: AvatarImageProps | undefined,
    failedSources: readonly string[],
) {
    if (!imageProps) {
        return undefined
    }

    if (!imageProps.sources) {
        return failedSources.includes(imageProps.src) ? undefined : imageProps
    }

    return getImagePropsFromSources(
        imageProps.sources.filter(({ src }) => !failedSources.includes(src)),
        imageProps.sizes,
    )
}

function getAvatarMetaColorIndex(name?: string) {
    const normalizedName = normalizeAvatarName(name)
    let hash = 0

    for (const char of normalizedName) {
        hash = (hash * 31 + (char.codePointAt(0) ?? 0)) >>> 0
    }

    return hash % AVATAR_META_COLOR_COUNT
}

export {
    AVATAR_META_COLOR_COUNT,
    AVATAR_SIZES,
    getAvailableAvatarImageProps,
    getAvatarImageProps,
    getAvatarMetaColorIndex,
    getInitials,
    normalizeAvatarName,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
}
export type { AvatarImage, AvatarImageProps, AvatarImageSource, AvatarShape, AvatarSize }
