import * as React from 'react'

import { Text as Heading, Text as Title } from '@doist/reactist'

export function ExactHeadings() {
    return (
        <>
            <Heading variant="header-1">Large</Heading>
            <Heading variant="header-3" render={<h1 />}>
                Current default
            </Heading>
            <Title variant="header-3" render={<h2 />}>
                Visual 20
            </Title>
            <Heading variant="header-3" render={<h4 />}>
                Visual 20
            </Heading>
            <Heading variant="header-2" render={<h1 />}>
                Header 2 rendered as h1
            </Heading>
            <Heading variant="header-2">Header 2 rendered as h2</Heading>
            <Heading variant="subheader-1" render={<h2 />}>
                Subheader 1 from bold
            </Heading>
            <Heading variant="subheader-1" render={<h3 />}>
                Subheader 1 from medium
            </Heading>
            <Heading variant="subheader-2" render={<h2 />}>
                Subheader 2
            </Heading>
            <Heading variant="body-1" render={<h3 />}>
                Body 1
            </Heading>
            <Heading variant="body-2" render={<h4 />}>
                Body 2
            </Heading>
            <Heading variant="body-1" render={<h5 />}>
                Body 1 rendered as h5
            </Heading>
            <Heading variant="subheader-1" render={<h6 />}>
                Subheader 1 rendered as h6
            </Heading>
            <Heading variant="body-3" render={<h2 />}>
                Body 3
            </Heading>
            <Heading variant="caption-1" render={<h3 />}>
                Caption 1
            </Heading>
            <Heading variant="caption-2" render={<h3 />}>
                Caption 2
            </Heading>
            <Heading variant="caption-3" render={<h3 />}>
                Caption 3
            </Heading>
        </>
    )
}
