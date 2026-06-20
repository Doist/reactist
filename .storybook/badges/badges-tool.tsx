import * as React from 'react'

import { useParameter } from 'storybook/manager-api'

import { Badge, BadgeGroup } from '../components/badge'

import { resolveBadges } from './badges'
import { BADGES_CONFIG_PARAMETER, BADGES_PARAMETER, TOOL_ID } from './constants'

const emptyBadges: unknown[] = []
const emptyBadgesConfig: Record<string, unknown> = {}

export const BadgesTool = React.memo(function BadgesTool() {
    const badgesParameter = useParameter(BADGES_PARAMETER, emptyBadges)
    const badgesConfigParameter = useParameter(BADGES_CONFIG_PARAMETER, emptyBadgesConfig)

    const badges = React.useMemo(
        () => resolveBadges(badgesParameter, badgesConfigParameter),
        [badgesParameter, badgesConfigParameter],
    )

    if (badges.length === 0) {
        return null
    }

    return (
        <BadgeGroup
            key={TOOL_ID}
            aria-label="Story badges"
            title={badges.map(({ title }) => title).join(', ')}
        >
            {badges.map(({ id, title, styles }, index) => (
                <Badge key={`${id}-${index}`} label={title} styles={styles} />
            ))}
        </BadgeGroup>
    )
})
