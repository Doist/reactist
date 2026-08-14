import * as React from 'react'

import { Text as Heading, Text } from '@doist/reactist'

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
            <Text render={<span />}>Safe span</Text>
            <Text as="a" href="/x" ref={anchorRef}>
                {/* TODO(reactist-codemod): Text as migration requires no props besides size or weight */}
                Anchor with props
            </Text>
            <Text as={RequiredLink} targetId="project-name">
                {/* TODO(reactist-codemod): Text as migration requires no props besides size or weight */}
                Custom component with required props
            </Text>
            <Text as={span}>
                {/* TODO(reactist-codemod): dynamic Text as target */}
                Lowercase variable component
            </Text>
            <Text as={UI.Link}>
                {/* TODO(reactist-codemod): Text as component requires manual render props */}
                Static member component
            </Text>
            <Text variant="body-3" size="body">
                {/* TODO(reactist-codemod): Text mixes variant with legacy size or weight props */}
                Mixed Text props
            </Text>
            <Heading variant="heading-1" size="largest">
                {/* TODO(reactist-codemod): Heading mixes variant or render with legacy level, size, or weight props */}
                Mixed Heading props
            </Heading>
            <Heading render={<button type="button" />} level={1}>
                {/* TODO(reactist-codemod): Heading mixes variant or render with legacy level, size, or weight props */}
                Mixed Heading render props
            </Heading>
            <Heading variant="heading-1" variant="heading-2">
                {/* TODO(reactist-codemod): duplicate Heading variant props */}
                Duplicate Heading variant
            </Heading>
            <Heading variant="heading-1" render={<h1 />} render={<h2 />}>
                {/* TODO(reactist-codemod): duplicate Heading render props */}
                Duplicate Heading render
            </Heading>
        </>
    )
}
