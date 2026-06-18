import * as React from 'react'

import { useParameter } from 'storybook/manager-api'

import { Badge } from '../../src/badge/badge'
import { IconButton } from '../../src/button/button'
import { Inline } from '../../src/inline'

import { FIGMA_PARAMETER } from './constants'
import { resolveFigmaLinks } from './figma'
import { FigmaIcon } from './figma-icon'

export const FigmaTool = React.memo(function FigmaTool() {
    const figmaParameter = useParameter(FIGMA_PARAMETER, undefined)
    const links = React.useMemo(() => resolveFigmaLinks(figmaParameter), [figmaParameter])

    return (
        <Inline space="xsmall">
            {links.length === 0 ? (
                <Badge tone="info" label="No Figma link" />
            ) : (
                links.map((link) => (
                    <IconButton
                        key={link.url}
                        variant="quaternary"
                        icon={<FigmaIcon />}
                        aria-label={`View in Figma: ${link.label}`}
                        tooltip={link.label}
                        render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
                    />
                ))
            )}
        </Inline>
    )
})
