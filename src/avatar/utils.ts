const AVATAR_SIZES = [80, 72, 62, 50, 40, 36, 30, 28, 24, 20, 18, 16, 12] as const

type AvatarSize = (typeof AVATAR_SIZES)[number]
type AvatarShape = 'circle' | 'rounded'
type AvatarImage = string | Record<number, string>

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

const FILTER_CHARS_REGEXP = new RegExp('[^\\p{L}\\p{M}\\p{Zs} ]', 'gu')

function normalizeAvatarName(name?: string) {
    return name?.trim().replace(/\s+/g, ' ') ?? ''
}

function getFirstCodePoint(value?: string) {
    const [firstCodePoint = ''] = Array.from(value ?? '')
    return firstCodePoint
}

function getInitials(name?: string) {
    const words = normalizeAvatarName(name)
        .replace(FILTER_CHARS_REGEXP, '')
        .split(' ')
        .filter(Boolean)

    const firstWord = words[0]
    const lastWord = words[words.length - 1]
    const firstInitial = getFirstCodePoint(firstWord)
    const lastInitial = getFirstCodePoint(lastWord)

    if (!firstInitial) {
        return ''
    }

    if (lastInitial && firstInitial !== lastInitial) {
        return `${firstInitial}${lastInitial}`.toUpperCase()
    }

    return firstInitial.toUpperCase()
}

function getSortedImageSources(image: Record<number, string>) {
    return Object.entries(image)
        .map(([sourceSize, src]) => ({ sourceSize: Number(sourceSize), src }))
        .filter(({ sourceSize, src }) => Number.isFinite(sourceSize) && sourceSize > 0 && src)
        .sort((a, b) => a.sourceSize - b.sourceSize)
}

function resolveAvatarImage(
    image: AvatarImage | undefined,
    size: AvatarSize,
    pixelRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
) {
    if (!image) {
        return undefined
    }

    if (typeof image === 'string') {
        return image
    }

    const sources = getSortedImageSources(image)
    if (sources.length === 0) {
        return undefined
    }

    const targetPixels = size * pixelRatio
    return (
        sources.find(({ sourceSize }) => sourceSize >= targetPixels) ?? sources[sources.length - 1]!
    ).src
}

function getAvatarImageSrcSet(image: AvatarImage | undefined) {
    if (!image || typeof image === 'string') {
        return undefined
    }

    const sources = getSortedImageSources(image)
    if (sources.length === 0) {
        return undefined
    }

    return sources.map(({ sourceSize, src }) => `${src} ${sourceSize}w`).join(', ')
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
    getAvatarImageSrcSet,
    getAvatarMetaColorIndex,
    getInitials,
    normalizeAvatarName,
    resolveAvatarImage,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
}
export type { AvatarImage, AvatarShape, AvatarSize }
