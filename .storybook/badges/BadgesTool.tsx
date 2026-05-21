import React, { memo, useMemo } from 'react'
import type { CSSProperties } from 'react'
import { useParameter } from 'storybook/manager-api'

import { resolveBadges } from './badges'
import { BADGES_CONFIG_PARAMETER, BADGES_PARAMETER, TOOL_ID } from './constants'

const containerStyle: CSSProperties = {
    alignItems: 'center',
    display: 'inline-flex',
    gap: '4px',
    marginInline: '6px',
}

const badgeStyle: CSSProperties = {
    alignItems: 'center',
    border: '1px solid currentColor',
    borderRadius: '3px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    fontWeight: 600,
    minHeight: '20px',
    padding: '2px 6px',
    whiteSpace: 'nowrap',
}

const emptyBadges: unknown[] = []
const emptyBadgesConfig: Record<string, unknown> = {}

export const BadgesTool = memo(function BadgesTool() {
    const badgesParameter = useParameter(BADGES_PARAMETER, emptyBadges)
    const badgesConfigParameter = useParameter(BADGES_CONFIG_PARAMETER, emptyBadgesConfig)

    const badges = useMemo(
        () => resolveBadges(badgesParameter, badgesConfigParameter),
        [badgesParameter, badgesConfigParameter],
    )

    if (badges.length === 0) {
        return null
    }

    return (
        <div
            key={TOOL_ID}
            aria-label="Story badges"
            style={containerStyle}
            title={badges.map(({ title }) => title).join(', ')}
        >
            {badges.map(({ id, title, styles }, index) => (
                <span key={`${id}-${index}`} style={{ ...badgeStyle, ...styles }}>
                    {title}
                </span>
            ))}
        </div>
    )
})
