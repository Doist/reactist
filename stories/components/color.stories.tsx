import './styles/color-story.css'

import * as React from 'react'

import { Box } from '../../src/box'
import { Column, Columns } from '../../src/columns'
import { Heading } from '../../src/heading'
import { Stack } from '../../src/stack'
import { Text } from '../../src/text'

export default {
    title: 'Design tokens/Colors',
}

/**
 * The `--reactist-*` colour tokens that still carry a Reactist decision. Everything else Reactist
 * used to alias now reads `--product-library-*` directly at the callsite, so the product library
 * is the place to look for the rest of the palette.
 */
const retainedColors = [
    '--reactist-bg-brand',
    '--reactist-framework-fill-crest',
    '--reactist-content-positive',
    '--reactist-toast-content-secondary',
    '--reactist-scrollbar-thumb-idle',
    '--reactist-actionable-secondary-destructive-hover-fill',
]

function Swatch({ color }: { color: string }) {
    return (
        <Columns key={color} alignY="center" space="small">
            <Column width="content">
                <Box style={{ background: `var(${color})` }} className="color_swatch" />
            </Column>
            <Column>
                <code className="color_swatch__css_variable">{color}</code>
            </Column>
        </Columns>
    )
}

export function Colors() {
    return (
        <Stack space="xlarge" exceptionallySetClassName="story">
            <Heading level={1} size="larger">
                Retained Reactist colours
            </Heading>

            <Text>
                These are the only colour custom properties Reactist still defines itself, because
                they have no product-library equivalent. Every other colour resolves to a{' '}
                <code>--product-library-*</code> token at the point of use.
            </Text>

            <Stack space="small">
                {retainedColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>

            <Text tone="secondary">
                <code>--reactist-toast-box-shadow</code> is also retained, but it is a shadow rather
                than a colour, so it is not shown as a swatch.
            </Text>
        </Stack>
    )
}
