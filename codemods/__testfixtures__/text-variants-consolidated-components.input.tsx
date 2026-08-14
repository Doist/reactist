import * as React from 'react'

import {
    /* display import */ Display,
    Display as Hero,
    /* heading import */ Heading,
    Heading as Title,
    Text,
} from '@doist/reactist'

export function ConsolidatedComponents() {
    return (
        <>
            <Heading level={1} variant="heading-1">
                Header 1
            </Heading>
            <Heading level={2} variant="heading-2">
                Header 2
            </Heading>
            <Heading level="3" variant="heading-3">
                Header 3
            </Heading>
            <Heading level={6} variant="heading-4">
                Header 4
            </Heading>
            <Title variant="heading-2" render={<button type="button" />}>
                Custom header
            </Title>
            <Display variant="display-1">Display 1</Display>
            <Display variant="display-2">Display 2</Display>
            <Display variant="display-3">Display 3</Display>
            <Display variant="display-4">Display 4</Display>
            <Hero variant="display-5" render={<h1 />}>
                Display 5
            </Hero>
            <Text variant="body-1">Body</Text>
        </>
    )
}
