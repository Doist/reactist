import * as React from 'react'

import { Heading, Text } from '@doist/reactist'

export function ManualCases({ size, weight, useLabel, level, props }) {
    return (
        <>
            <Text size="copy" weight="bold">
                No exact match
            </Text>
            <Text size={size}>Dynamic</Text>
            <Text weight={weight}>Dynamic weight</Text>
            <Text as={useLabel ? 'label' : 'span'}>Dynamic element</Text>
            <Text as={getComponent().Foo}>Unsupported element</Text>
            <Text as="span" render={<em />}>
                Existing render
            </Text>
            <Text size="body" size="caption">
                Duplicate size
            </Text>
            <Text weight="semibold" weight="bold">
                Duplicate weight
            </Text>
            <Text as="span" as="label">
                Duplicate element
            </Text>
            <Text {...props}>Spread</Text>
            <Heading level={1} size="larger">
                24px
            </Heading>
            <Heading level={2}>16px</Heading>
            <Heading level={3}>14px</Heading>
            <Heading level={3} size="smaller">
                12px
            </Heading>
            <Heading level={1} weight="medium">
                Medium
            </Heading>
            <Heading level={1} weight="light">
                Light
            </Heading>
            <Heading level={level}>Dynamic level</Heading>
            <Heading level={1} size={size}>
                Dynamic size
            </Heading>
            <Heading level={1} weight={weight}>
                Dynamic weight
            </Heading>
            <Heading {...props}>Spread</Heading>
            <Heading {...props} level={level} size={size} weight={weight}>
                Spread and dynamic props
            </Heading>
        </>
    )
}

export function Shadowed() {
    const Text = (props: React.ComponentProps<'span'>) => <span {...props} />

    return <Text size="caption">Shadowed Text</Text>
}
