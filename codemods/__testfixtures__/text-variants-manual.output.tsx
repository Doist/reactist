import * as React from 'react'

import { Text as Heading, Text } from '@doist/reactist'

export function ManualCases({ size, weight, useLabel, level, props }) {
    return (
        <>
            <Text size={size}>
                {/* TODO(reactist-codemod): dynamic Text size */}
                Dynamic
            </Text>
            <Text weight={weight}>
                {/* TODO(reactist-codemod): dynamic Text weight */}
                Dynamic weight
            </Text>
            <Text as={useLabel ? 'label' : 'span'}>
                {/* TODO(reactist-codemod): dynamic Text as target */}
                Dynamic element
            </Text>
            <Text as={getComponent().Foo}>
                {/* TODO(reactist-codemod): dynamic Text as target */}
                Unsupported element
            </Text>
            <Text as="span" render={<em />}>
                {/* TODO(reactist-codemod): Text already has render prop */}
                Existing render
            </Text>
            <Text size="body" size="caption">
                {/* TODO(reactist-codemod): duplicate Text size props */}
                Duplicate size
            </Text>
            <Text weight="semibold" weight="bold">
                {/* TODO(reactist-codemod): duplicate Text weight props */}
                Duplicate weight
            </Text>
            <Text as="span" as="label">
                {/* TODO(reactist-codemod): duplicate Text as props */}
                Duplicate element
            </Text>
            <Text {...props}>
                {/* TODO(reactist-codemod): spread props may supply or override text props */}
                Spread
            </Text>
            <Heading level={1} weight="medium">
                {/* TODO(reactist-codemod): Heading metrics have no exact variant */}
                Medium
            </Heading>
            <Heading level={1} weight="light">
                {/* TODO(reactist-codemod): Heading metrics have no exact variant */}
                Light
            </Heading>
            <Heading level={level}>
                {/* TODO(reactist-codemod): dynamic Heading level */}
                Dynamic level
            </Heading>
            <Heading level={1} size={size}>
                {/* TODO(reactist-codemod): dynamic Heading size */}
                Dynamic size
            </Heading>
            <Heading level={1} weight={weight}>
                {/* TODO(reactist-codemod): dynamic Heading weight */}
                Dynamic weight
            </Heading>
            <Heading {...props}>
                {/* TODO(reactist-codemod): spread props may supply or override text props; dynamic Heading level */}
                Spread
            </Heading>
            <Heading {...props} level={level} size={size} weight={weight}>
                {/* TODO(reactist-codemod): spread props may supply or override text props; dynamic Heading level; dynamic Heading size; dynamic Heading weight */}
                Spread and dynamic props
            </Heading>
        </>
    )
}

export function Shadowed() {
    const Text = (props: React.ComponentProps<'span'>) => <span {...props} />

    return <Text size="caption">Shadowed Text</Text>
}
