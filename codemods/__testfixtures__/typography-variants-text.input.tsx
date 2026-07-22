import * as React from 'react'

import { Text, Text as Copy } from '@doist/reactist'

function Link(props: React.ComponentProps<'a'>) {
    return <a {...props} />
}

export function Example() {
    return (
        <>
            <Text size="subtitle">Subheader regular</Text>
            <Text size="subtitle" weight="semibold">
                Subheader semibold
            </Text>
            <Text size="body">Body regular</Text>
            <Text size="body" weight="semibold">
                Body semibold
            </Text>
            <Text size="body" weight="bold" as="span">
                Body bold
            </Text>
            <Copy size="copy">Callout regular</Copy>
            <Text size="copy" weight="semibold">
                Callout semibold
            </Text>
            <Text size="caption">Caption regular</Text>
            <Text size={'caption'} weight={'semibold'}>
                Caption semibold
            </Text>
            <Text size="caption" weight="bold">
                Caption bold
            </Text>
            <Text>Default body</Text>
            <Text as={Link}>Default link</Text>
        </>
    )
}
