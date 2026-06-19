import type { BadgeProps } from '../../src/badge/badge'

type BadgeTone = BadgeProps['tone']

type ResolvedBadge = {
    id: string
    title: string
    tone: BadgeTone
}

// Ensure valid tones are checked against the Badge's tone prop
const TONE_SET: Record<BadgeTone, true> = {
    info: true,
    positive: true,
    promote: true,
    attention: true,
    warning: true,
}

const VALID_TONES = Object.keys(TONE_SET) as BadgeTone[]

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isBadgeTone(value: unknown): value is BadgeTone {
    return typeof value === 'string' && (VALID_TONES as readonly string[]).includes(value)
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

        if (!isRecord(badgeConfig) || typeof badgeConfig.title !== 'string') {
            return []
        }

        if (!isBadgeTone(badgeConfig.tone)) {
            return []
        }

        return [
            {
                id: badge,
                title: badgeConfig.title,
                tone: badgeConfig.tone,
            },
        ]
    })
}

export { resolveBadges }
export type { ResolvedBadge }
