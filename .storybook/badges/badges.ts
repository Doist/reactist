import type { CSSProperties } from 'react'

type UnknownRecord = Record<string, unknown>

type BadgeConfig = {
    title?: unknown
    styles?: unknown
}

type ResolvedBadge = {
    id: string
    title: string
    styles: CSSProperties | undefined
}

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isBadgeConfig(value: unknown): value is BadgeConfig {
    return isRecord(value)
}

function resolveStyles(styles: unknown): CSSProperties | undefined {
    return isRecord(styles) ? (styles as CSSProperties) : undefined
}

function resolveBadges(badges: unknown, badgesConfig: unknown): ResolvedBadge[] {
    if (!Array.isArray(badges) || !isRecord(badgesConfig)) {
        return []
    }

    return badges.flatMap((badge) => {
        if (typeof badge !== 'string') {
            return []
        }

        const badgeConfig = badgesConfig[badge]

        if (!isBadgeConfig(badgeConfig) || typeof badgeConfig.title !== 'string') {
            return []
        }

        return [
            {
                id: badge,
                title: badgeConfig.title,
                styles: resolveStyles(badgeConfig.styles),
            },
        ]
    })
}

export { resolveBadges }
export type { ResolvedBadge }
