import React from 'react'

import { Columns, Column } from '../../src/new-components/columns'
import { Stack } from '../../src/new-components/stack'
import { Heading } from '../../src/new-components/heading'
import { Box } from '../../src/new-components/box'
import './styles/color-story.less'

export default {
    title: 'Design tokens/Colors',
}

const frameworkFillColors = [
    '--reactist-framework-fill-accent',
    '--reactist-framework-fill-aside',
    '--reactist-framework-fill-background',
    '--reactist-framework-fill-base',
    '--reactist-framework-fill-crater',
    '--reactist-framework-fill-crest',
    '--reactist-framework-fill-elevated',
    '--reactist-framework-fill-selected',
    '--reactist-framework-fill-highlight',
    '--reactist-framework-fill-ledge',
    '--reactist-framework-fill-peak',
    '--reactist-framework-fill-pinnacle',
    '--reactist-framework-fill-ridge',
    '--reactist-framework-fill-summit',
]

const frameworkBorderColors = [
    '--reactist-divider-primary',
    '--reactist-divider-secondary',
    '--reactist-divider-tertiary',
]

const contentColors = [
    '--reactist-content-primary',
    '--reactist-content-secondary',
    '--reactist-content-tertiary',
    '--reactist-content-quaternary',
    '--reactist-content-light-on-dark',
]

const chromaticFillColors = [
    '--reactist-chromatic-fill-red',
    '--reactist-chromatic-fill-orange',
    '--reactist-chromatic-fill-green',
    '--reactist-chromatic-fill-teal',
    '--reactist-chromatic-fill-blue',
    '--reactist-chromatic-fill-purple',
    '--reactist-chromatic-fill-charcoal',
    '--reactist-chromatic-fill-grey',
    '--reactist-chromatic-fill-midnight',
]

const chromaticContentColors = [
    '--reactist-chromatic-content-red',
    '--reactist-chromatic-content-orange',
    '--reactist-chromatic-content-green',
    '--reactist-chromatic-content-green-background',
    '--reactist-chromatic-content-green-background-highlight',
    '--reactist-chromatic-content-teal',
    '--reactist-chromatic-content-blue',
    '--reactist-chromatic-content-purple',
    '--reactist-chromatic-content-charcoal',
    '--reactist-chromatic-content-grey',
]

const chromaticHighlightColors = [
    '--reactist-chromatic-highlight-blue',
    '--reactist-chromatic-highlight-green',
    '--reactist-chromatic-highlight-red',
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
                Framework
            </Heading>

            <Heading level={2}>Framework-Fill</Heading>
            <Stack space="small">
                {frameworkFillColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>

            <Heading level={2}>Framework-Border</Heading>
            <Stack space="small">
                {frameworkBorderColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>

            <Heading level={1} size="larger">
                Content
            </Heading>
            <Stack space="small">
                {contentColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>

            <Heading level={1} size="larger">
                Chromatic
            </Heading>

            <Heading level={2}>Chromatic-Fill</Heading>
            <Stack space="small">
                {chromaticFillColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>

            <Heading level={2}>Chromatic-Content</Heading>
            <Stack space="small">
                {chromaticContentColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>

            <Heading level={2}>Chromatic-Highlight</Heading>
            <Stack space="small">
                {chromaticHighlightColors.map((color) => (
                    <Swatch color={color} key={color} />
                ))}
            </Stack>
        </Stack>
    )
}
