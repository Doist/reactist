import * as React from 'react'

import { Display } from '../display'
import { Heading } from '../heading'
import { Text } from '../text'

import styles from './typography.stories.module.css'

type ReferenceRow = {
    height: number
    content?: React.ReactNode
    alignEnd?: boolean
}

const rows: ReferenceRow[] = [
    { height: 128, content: <Display variant="display-1">Display 1</Display>, alignEnd: true },
    { height: 117, content: <Display variant="display-2">Display 2</Display> },
    { height: 96, content: <Display variant="display-3">Display 3</Display> },
    { height: 74, content: <Display variant="display-4">Display 4</Display> },
    { height: 56, content: <Display variant="display-5">Display 5</Display> },
    { height: 43, content: <Heading level={1}>Header 1</Heading> },
    { height: 35, content: <Heading level={2}>Header 2</Heading> },
    { height: 27, content: <Heading level={3}>Header 3</Heading> },
    { height: 24, content: <Heading level={4}>Header 4</Heading> },
    { height: 23, content: <Text variant="subheader-1">Subheader 1</Text> },
    {
        height: 23,
        content: (
            <Text variant="subheader-1" decoration="strikethrough">
                Subheader 1 Strikethrough
            </Text>
        ),
    },
    { height: 24, content: <Text variant="subheader-2">Subheader 2</Text> },
    {
        height: 24,
        content: (
            <Text variant="subheader-2" decoration="strikethrough">
                Subheader 2 Strikethrough
            </Text>
        ),
    },
    { height: 24 },
    { height: 24 },
    { height: 21, content: <Text variant="body-1">Body 1</Text> },
    { height: 22, content: <Text variant="body-2">Body 2</Text> },
    { height: 22, content: <Text variant="body-3">Body 3</Text> },
    {
        height: 22,
        content: (
            <Text variant="body-3" decoration="strikethrough">
                Body 3 Strikethrough
            </Text>
        ),
    },
    { height: 20, content: <Text variant="callout-1">Callout 1</Text> },
    {
        height: 20,
        content: (
            <Text variant="callout-1" decoration="strikethrough">
                Callout 1 Strikethrough
            </Text>
        ),
    },
    { height: 20, content: <Text variant="callout-2">Callout 2</Text> },
    {
        height: 20,
        content: (
            <Text variant="callout-2" decoration="strikethrough">
                Callout 2 Strikethrough
            </Text>
        ),
    },
    { height: 20, content: <Text variant="caption-1">Caption 1</Text> },
    { height: 15, content: <Text variant="caption-2">Caption 2</Text> },
    {
        height: 15,
        content: (
            <Text variant="caption-2" decoration="strikethrough">
                Caption 2 Strikethrough
            </Text>
        ),
    },
    {
        height: 15,
        content: (
            <Text variant="caption-2" decoration="underline">
                Caption 2 Underline
            </Text>
        ),
    },
    { height: 20, content: <Text variant="caption-3">Caption 3</Text> },
    {
        height: 20,
        content: (
            <Text variant="caption-3" decoration="underline">
                Caption 3 Underline
            </Text>
        ),
    },
    {
        height: 20,
        content: (
            <Text variant="caption-3" decoration="strikethrough">
                Caption 3 Strikethrough
            </Text>
        ),
    },
    { height: 13, content: <Text variant="footnote-1">Footnote 1</Text> },
    {
        height: 13,
        content: (
            <Text variant="footnote-1" case="uppercase">
                Footnote 1 Caps
            </Text>
        ),
    },
    { height: 13, content: <Text variant="footnote-2">Footnote 2</Text> },
]

export default {
    title: 'Typography/SF reference',
    parameters: {
        figma: {
            path: 'Global > Text Styles > SF *FOR WEB*',
            url: 'https://www.figma.com/design/xo9yAsH8PQUpi0eTJh9pmR/Product-Library---Global?node-id=9062-3316',
        },
    },
}

export function SFReference() {
    return (
        <section className={styles.reference} data-testid="sf-reference">
            <div className={styles.header}>Web (SF – default)</div>
            <div className={styles.rows}>
                {rows.map(({ height, content, alignEnd }, index) => (
                    <div
                        className={alignEnd ? styles.rowEnd : styles.row}
                        data-reference-row
                        key={index}
                        style={{ height }}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </section>
    )
}

SFReference.parameters = { chromatic: { disableSnapshot: false } }
