import * as React from 'react'

import { Heading, Text } from '@doist/reactist'

const Title = Heading
const title = React.createElement(Heading, { level: 1, size: 'largest' }, 'Created title')

export function IndirectHeading() {
    return (
        <>
            <Heading level={1} size="largest">
                Direct title
            </Heading>
            <Title level={1} size="largest">
                Aliased title
            </Title>
            {title}
            <Text>Body</Text>
        </>
    )
}
