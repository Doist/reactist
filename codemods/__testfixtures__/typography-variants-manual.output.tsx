import * as React from 'react'

import { Text } from '@doist/reactist'

export function ManualCases({ size, weight, useLabel, props }) {
    return (
        <>
            <Text size="copy" weight="bold">
                {/* TODO(reactist-codemod): Text size and weight have no exact variant */}
                No exact match
            </Text>
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
                {/* TODO(reactist-codemod): spread props may supply or override typography props */}
                Spread
            </Text>
        </>
    )
}

export function Shadowed() {
    const Text = (props: React.ComponentProps<'span'>) => <span {...props} />

    return <Text size="caption">Shadowed Text</Text>
}
