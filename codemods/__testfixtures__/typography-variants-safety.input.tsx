import * as React from 'react'

import { Heading, Text } from '@doist/reactist'

const anchorRef = React.createRef<HTMLAnchorElement>()

function RequiredLink({ targetId }: { targetId: string }) {
    return <a href={'#' + targetId} />
}

export function SafetyCases() {
    return (
        <>
            <Text as="span">Safe span</Text>
            <Text as="a" href="/x" ref={anchorRef}>
                Anchor with props
            </Text>
            <Text as={RequiredLink} targetId="project-name">
                Custom component with required props
            </Text>
            <Text variant="body-3" size="body">
                Mixed Text props
            </Text>
            <Heading variant="heading-1" level={1}>
                Mixed Heading props
            </Heading>
            <Heading render={<button type="button" />} level={1}>
                Mixed Heading render props
            </Heading>
        </>
    )
}
