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
            <Text render={<a href="/x" />} ref={anchorRef}>
                Anchor with props
            </Text>
            <Text render={<RequiredLink targetId="project-name" />}>
                Custom component with required props
            </Text>
            {/* TODO(reactist-codemod): dynamic Text as target */}
            <Text as={span}>Lowercase variable component</Text>
            <Text render={<UI.Link />}>Static member component</Text>
            {/* TODO(reactist-codemod): Text mixes variant with legacy size or weight props */}
            <Text variant="body-3" size="body">
                Mixed Text props
            </Text>
            {/* TODO(reactist-codemod): Heading mixes variant or render with legacy level, size, or weight props */}
            <Heading variant="heading-1" size="largest">
                Mixed Heading props
            </Heading>
            {/* TODO(reactist-codemod): Heading mixes variant or render with legacy level, size, or weight props */}
            <Heading render={<button type="button" />} level={1}>
                Mixed Heading render props
            </Heading>
            {/* TODO(reactist-codemod): duplicate Heading variant props */}
            <Heading variant="heading-1" variant="heading-2">
                Duplicate Heading variant
            </Heading>
            {/* TODO(reactist-codemod): duplicate Heading render props */}
            <Heading variant="heading-1" render={<h1 />} render={<h2 />}>
                Duplicate Heading render
            </Heading>
        </>
    )
}
