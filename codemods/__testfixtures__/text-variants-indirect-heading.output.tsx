import * as React from 'react'

import { Text as Heading, Text } from '@doist/reactist'

/* TODO(reactist-codemod): indirect Heading reference */
const Title = Heading
/* TODO(reactist-codemod): indirect Heading reference */
const title = React.createElement(Heading, { level: 1, size: 'largest' }, 'Created title')

export function IndirectHeading() {
    return (
        <>
            <Heading variant="header-1">Direct title</Heading>
            <Title level={1} size="largest">
                Aliased title
            </Title>
            {title}
            <Text>Body</Text>
        </>
    )
}
