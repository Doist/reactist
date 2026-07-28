import * as React from 'react'

import { Text, Text as Copy } from '@doist/reactist'

function Link(props: React.ComponentProps<'a'>) {
    return <a {...props} />
}

export function Example() {
    return (
        <>
            <Text variant="subheader-2">Subheader regular</Text>
            <Text variant="subheader-1">Subheader semibold</Text>
            <Text variant="body-3">Body regular</Text>
            <Text variant="body-2">Body semibold</Text>
            <Text variant="body-1" render={<span />}>
                Body bold
            </Text>
            <Copy variant="callout-2">Callout regular</Copy>
            <Text variant="callout-1">Callout semibold</Text>
            <Text variant="caption-3">Caption regular</Text>
            <Text variant="caption-2">Caption semibold</Text>
            <Text variant="caption-1">Caption bold</Text>
            <Text>Default body</Text>
            <Text render={<Link />}>Default link</Text>
        </>
    )
}
