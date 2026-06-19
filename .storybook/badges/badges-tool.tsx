import * as React from 'react'

import { useParameter } from 'storybook/manager-api'

import { Badge } from '../../src/badge/badge'
import { Inline } from '../../src/inline'

import { resolveBadges } from './badges'
import { BADGES_CONFIG_PARAMETER, BADGES_PARAMETER } from './constants'

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
        <Inline space="xsmall">
            {badges.map(({ id, title, tone }) => (
                <Badge key={id} tone={tone} label={title} />
            ))}
        </Inline>
    )
})
