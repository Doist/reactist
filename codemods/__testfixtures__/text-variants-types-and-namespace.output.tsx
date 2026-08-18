import * as React from 'react'

import * as Reactist from '@doist/reactist'
import {
    type Text as Display,
    /* TODO(reactist-codemod): removed DisplayProps type requires manual migration */
    type DisplayProps,
    /* TODO(reactist-codemod): removed DisplayVariant type requires manual migration */
    type DisplayVariant,
    type Text as Heading,
    /* TODO(reactist-codemod): removed HeadingLevel type requires manual migration */
    type HeadingLevel,
    /* TODO(reactist-codemod): removed HeadingProps type requires manual migration */
    type HeadingProps,
    /* TODO(reactist-codemod): removed HeadingVariant type requires manual migration */
    type HeadingVariant,
} from '@doist/reactist'

/* TODO(reactist-codemod): re-exported Heading requires manual migration */
/* TODO(reactist-codemod): re-exported HeadingProps requires manual migration */
export { Heading as PublicHeading, type HeadingProps as PublicHeadingProps } from '@doist/reactist'

/* TODO(reactist-codemod): indirect Heading reference */
type HeadingComponent = typeof Heading
/* TODO(reactist-codemod): namespace HeadingProps type requires manual migration */
type NamespacedHeadingProps = Reactist.HeadingProps

/* TODO(reactist-codemod): namespace Heading reference requires manual migration */
const IndirectHeading = Reactist.Heading
/* TODO(reactist-codemod): namespace Heading destructuring requires manual migration */
/* TODO(reactist-codemod): namespace Display destructuring requires manual migration */
/* TODO(reactist-codemod): namespace Text destructuring requires manual migration */
const { Heading: NamespaceHeading, Display: NamespaceDisplay, Text: NamespaceText } = Reactist

export function NamespaceCases() {
    return (
        <>
            {/* TODO(reactist-codemod): namespace Text reference requires manual migration */}
            <Reactist.Text size="caption">Caption</Reactist.Text>
            {/* TODO(reactist-codemod): namespace Heading reference requires manual migration */}
            <Reactist.Heading level={1}>Heading</Reactist.Heading>
            {/* TODO(reactist-codemod): namespace Display reference requires manual migration */}
            <Reactist.Display variant="display-1">Display</Reactist.Display>
        </>
    )
}
