import * as React from 'react'

import { Text, Text as Title } from '@doist/reactist'

export function ExactHeadings() {
    return (
        <>
            <Text variant="header-1">Large</Text>
            <Text variant="header-3" render={<h1 />}>
                Current default
            </Text>
            <Title variant="header-3" render={<h2 />}>
                Visual 20
            </Title>
            <Text variant="header-3" render={<h4 />}>
                Visual 20
            </Text>
            <Text variant="header-2" render={<h1 />}>
                Header 2 rendered as h1
            </Text>
            <Text variant="header-2">Header 2 rendered as h2</Text>
            <Text variant="subheader-1" render={<h2 />}>
                Subheader 1 from bold
            </Text>
            <Text variant="subheader-1" render={<h3 />}>
                Subheader 1 from medium
            </Text>
            <Text variant="subheader-2" render={<h2 />}>
                Subheader 2
            </Text>
            <Text variant="body-1" render={<h3 />}>
                Body 1
            </Text>
            <Text variant="body-2" render={<h4 />}>
                Body 2
            </Text>
            <Text variant="body-1" render={<h5 />}>
                Body 1 rendered as h5
            </Text>
            <Text variant="subheader-1" render={<h6 />}>
                Subheader 1 rendered as h6
            </Text>
            <Text variant="body-3" render={<h2 />}>
                Body 3
            </Text>
            <Text variant="caption-1" render={<h3 />}>
                Caption 1
            </Text>
            <Text variant="caption-2" render={<h3 />}>
                Caption 2
            </Text>
            <Text variant="caption-3" render={<h3 />}>
                Caption 3
            </Text>
        </>
    )
}
