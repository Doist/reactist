import * as React from 'react'

import {
    /* display import */ Text as Display,
    Text as Hero,
    /* heading import */ Text as Heading,
    Text as Title,
    Text,
} from '@doist/reactist'

export function ConsolidatedComponents() {
    return (
        <>
            <Heading variant="header-1">Header 1</Heading>
            <Heading variant="header-2">Header 2</Heading>
            <Heading variant="header-3">Header 3</Heading>
            <Heading variant="header-4" render={<h6 />}>
                Header 4
            </Heading>
            <Title variant="header-2" render={<button type="button" />}>
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
