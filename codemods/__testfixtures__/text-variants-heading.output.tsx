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
        </>
    )
}
