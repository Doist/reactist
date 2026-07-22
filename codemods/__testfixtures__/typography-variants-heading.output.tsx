import * as React from 'react'

import { Heading, Heading as Title } from '@doist/reactist'

export function ExactHeadings() {
    return (
        <>
            <Heading level={1} variant="heading-1">
                Large
            </Heading>
            <Heading level={1} variant="heading-3">
                Current default
            </Heading>
            <Title level={2} variant="heading-3">
                Visual 20
            </Title>
            <Heading level={4} variant="heading-3">
                Visual 20
            </Heading>
        </>
    )
}
