import * as React from 'react'

import { Heading, Heading as Title } from '@doist/reactist'

export function ExactHeadings() {
    return (
        <>
            <Heading level={1} size="largest">
                Large
            </Heading>
            <Heading level={1}>Current default</Heading>
            <Title level={2} size="larger">
                Visual 20
            </Title>
            <Heading level={4} size="largest" weight="regular">
                Visual 20
            </Heading>
        </>
    )
}
