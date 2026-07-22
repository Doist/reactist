import * as React from 'react'

import { Heading, Text } from '@doist/reactist'

const anchorRef = React.createRef<HTMLAnchorElement>()

function RequiredLink({ targetId }: { targetId: string }) {
    return <a href={'#' + targetId} />
}

export function SafetyCases() {
    return (
        <>
            <Text render={<span />}>Safe span</Text>
            <Text as="a" href="/x" ref={anchorRef}>
                {/* TODO(reactist-codemod): Text as migration requires a prop-free intrinsic element */}
                Anchor with props
            </Text>
            <Text as={RequiredLink} targetId="project-name">
                {/* TODO(reactist-codemod): Text as target may require custom component props */}
                Custom component with required props
            </Text>
            <Text variant="body-3" size="body">
                {/* TODO(reactist-codemod): Text mixes variant with legacy size or weight props */}
                Mixed Text props
            </Text>
            <Heading variant="heading-1" level={1}>
                {/* TODO(reactist-codemod): Heading mixes variant or render with legacy level, size, or weight props */}
                Mixed Heading props
            </Heading>
            <Heading render={<button type="button" />} level={1}>
                {/* TODO(reactist-codemod): Heading mixes variant or render with legacy level, size, or weight props */}
                Mixed Heading render props
            </Heading>
        </>
    )
}
