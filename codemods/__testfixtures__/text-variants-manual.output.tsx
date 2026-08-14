import * as React from 'react'

import { Text as Heading, Text } from '@doist/reactist'

export function ManualCases({ size, weight, useLabel, level, props }) {
    return (
        <>
            {/* TODO(reactist-codemod): dynamic Text size */}
            <Text size={size}>Dynamic</Text>
            {/* TODO(reactist-codemod): dynamic Text weight */}
            <Text weight={weight}>Dynamic weight</Text>
            {/* TODO(reactist-codemod): dynamic Text as target */}
            <Text as={useLabel ? 'label' : 'span'}>Dynamic element</Text>
            {/* TODO(reactist-codemod): dynamic Text as target */}
            <Text as={getComponent().Foo}>Unsupported element</Text>
            {/* TODO(reactist-codemod): Text already has render prop */}
            <Text as="span" render={<em />}>
                Existing render
            </Text>
            {/* TODO(reactist-codemod): duplicate Text size props */}
            <Text size="body" size="caption">
                Duplicate size
            </Text>
            {/* TODO(reactist-codemod): duplicate Text weight props */}
            <Text weight="semibold" weight="bold">
                Duplicate weight
            </Text>
            {/* TODO(reactist-codemod): duplicate Text as props */}
            <Text as="span" as="label">
                Duplicate element
            </Text>
            {/* TODO(reactist-codemod): spread props may supply or override text props */}
            <Text {...props}>Spread</Text>
            {/* TODO(reactist-codemod): Heading metrics have no exact variant */}
            <Heading level={1} weight="medium">
                Medium
            </Heading>
            {/* TODO(reactist-codemod): Heading metrics have no exact variant */}
            <Heading level={1} weight="light">
                Light
            </Heading>
            {/* TODO(reactist-codemod): dynamic Heading level */}
            <Heading level={level}>Dynamic level</Heading>
            {/* TODO(reactist-codemod): dynamic Heading size */}
            <Heading level={1} size={size}>
                Dynamic size
            </Heading>
            {/* TODO(reactist-codemod): dynamic Heading weight */}
            <Heading level={1} weight={weight}>
                Dynamic weight
            </Heading>
            {/* TODO(reactist-codemod): spread props may supply or override text props; dynamic Heading level */}
            <Heading {...props}>Spread</Heading>
            {/* TODO(reactist-codemod): spread props may supply or override text props; dynamic Heading level; dynamic Heading size; dynamic Heading weight */}
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
