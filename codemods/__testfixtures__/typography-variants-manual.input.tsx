import * as React from 'react'

import { Text } from '@doist/reactist'

export function ManualCases({ size, weight, useLabel, props }) {
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
            <Text {...props}>Spread</Text>
        </>
    )
}

export function Shadowed() {
    const Text = (props: React.ComponentProps<'span'>) => <span {...props} />

    return <Text size="caption">Shadowed Text</Text>
}
