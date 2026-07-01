import * as React from 'react'

import { Button } from 'storybook/internal/components'
import { Tag, useParameter, useStorybookApi } from 'storybook/manager-api'

import { Badge } from '../components/badge'
import { reactistBadgeTones } from '../components/badge-tones'

import { FIGMA_NOT_NEEDED, FIGMA_PARAMETER } from './constants'
import { resolveFigmaLinks } from './figma'
import { FigmaIcon } from './figma-icon'

export const FigmaTool = React.memo(function FigmaTool() {
    const figmaParameter = useParameter(FIGMA_PARAMETER, undefined)
    const api = useStorybookApi()
    const links = React.useMemo(() => resolveFigmaLinks(figmaParameter), [figmaParameter])

    if (links.length > 0) {
        return (
            <>
                {links.map((link) => (
                    <Button
                        key={link.url}
                        asChild
                        variant="ghost"
                        padding="small"
                        ariaLabel={`View in Figma: ${link.path}`}
                        tooltip={link.path}
                    >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <FigmaIcon />
                        </a>
                    </Button>
                ))}
            </>
        )
    }

    // FIGMA_NOT_NEEDED marks a story as intentionally having no Figma design and opts out of
    // the "No Figma Link" hint
    if (figmaParameter === FIGMA_NOT_NEEDED) {
        return null
    }

    // Standalone documentation pages (unattached MDX, e.g. tips & tricks pages not associated
    // with a component) do not have a corresponding Figma design.
    const storyData = api.getCurrentStoryData()
    if (storyData?.tags?.includes(Tag.UNATTACHED_MDX)) {
        return null
    }

    if (!storyData?.prepared) {
        return null
    }

    return <Badge label="No Figma link" styles={reactistBadgeTones.info} />
})
