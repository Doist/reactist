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
            <Heading level={1} size="larger">
                Header 2 rendered as h1
            </Heading>
            <Heading level={2} size="largest">
                Header 2 rendered as h2
            </Heading>
            <Heading level={2}>Subheader 1 from bold</Heading>
            <Heading level={3} size="larger" weight="medium">
                Subheader 1 from medium
            </Heading>
            <Heading level={2} weight="light">
                Subheader 2
            </Heading>
            <Heading level={3}>Body 1</Heading>
            <Heading level={4} weight="medium">
                Body 2
            </Heading>
            <Heading level={5}>Body 1 rendered as h5</Heading>
            <Heading level={6} size="larger">
                Subheader 1 rendered as h6
            </Heading>
            <Heading level={2} size="smaller" weight="light">
                Body 3
            </Heading>
            <Heading level={3} size="smaller">
                Caption 1
            </Heading>
            <Heading level={3} size="smaller" weight="medium">
                Caption 2
            </Heading>
            <Heading level={3} size="smaller" weight="light">
                Caption 3
            </Heading>
        </>
    )
}
