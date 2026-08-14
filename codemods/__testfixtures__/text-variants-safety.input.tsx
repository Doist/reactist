import * as React from 'react'

import { Heading, Text } from '@doist/reactist'

const anchorRef = React.createRef<HTMLAnchorElement>()

function RequiredLink({ targetId }: { targetId: string }) {
    return <a href={'#' + targetId} />
}

function RequiredChildren({ children }: { children: React.ReactNode }) {
    return <a>{children}</a>
}

function span() {
    return <span />
}

const UI = { Link: RequiredChildren }

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
            <Text as={span}>Lowercase variable component</Text>
            <Text as={UI.Link}>Static member component</Text>
            <Text variant="body-3" size="body">
                Mixed Text props
            </Text>
            <Heading variant="heading-1" size="largest">
                Mixed Heading props
            </Heading>
            <Heading render={<button type="button" />} level={1}>
                Mixed Heading render props
            </Heading>
            <Heading variant="heading-1" variant="heading-2">
                Duplicate Heading variant
            </Heading>
            <Heading variant="heading-1" render={<h1 />} render={<h2 />}>
                Duplicate Heading render
            </Heading>
        </>
    )
}
