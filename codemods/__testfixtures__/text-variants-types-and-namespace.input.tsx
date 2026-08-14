import * as React from 'react'

import * as Reactist from '@doist/reactist'
import {
    type Display,
    type DisplayProps,
    type DisplayVariant,
    type Heading,
    type HeadingLevel,
    type HeadingProps,
    type HeadingVariant,
} from '@doist/reactist'

export { Heading as PublicHeading, type HeadingProps as PublicHeadingProps } from '@doist/reactist'

type HeadingComponent = typeof Heading
type NamespacedHeadingProps = Reactist.HeadingProps

const IndirectHeading = Reactist.Heading
const { Heading: NamespaceHeading, Display: NamespaceDisplay, Text: NamespaceText } = Reactist

export function NamespaceCases() {
    return (
        <>
            <Reactist.Text size="caption">Caption</Reactist.Text>
            <Reactist.Heading level={1}>Heading</Reactist.Heading>
            <Reactist.Display variant="display-1">Display</Reactist.Display>
        </>
    )
}
