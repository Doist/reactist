import * as React from 'react'
import { storiesOf } from '@storybook/react'
import {
    selectSize,
    times,
    reusableBoxProps,
    Placeholder,
    ResponsiveWidthRef,
    Wrapper,
    selectWithNone,
} from '../storybook-helper'
import { Stack } from '../stack'
import { Columns, Column } from './columns'

import type {
    ColumnsProps,
    ColumnsHorizontalAlignment,
    ColumnsVerticalAlignment,
    ColumnsCollapseBelow,
} from './columns'

storiesOf('Columns', module)
    .add('Columns (alignment)', () => {
        const props: Partial<ColumnsProps> = {
            space: selectSize('space'),
            align: selectWithNone<ColumnsHorizontalAlignment>(
                'align',
                ['left', 'center', 'right'],
                'none',
            ),
            alignY: selectWithNone<ColumnsVerticalAlignment>(
                'alignY',
                ['top', 'center', 'bottom'],
                'none',
            ),
            ...reusableBoxProps(),
        }
        return (
            <Stack space="xlarge">
                <Wrapper title="Use alignY to control vertical alignment" border={true}>
                    <Columns {...props}>
                        {times(5).map((i) => (
                            <Column key={i}>
                                <Placeholder label={i + 1} height={(i + 1) * 30} />
                            </Column>
                        ))}
                    </Columns>
                </Wrapper>
                <Wrapper title="Use align to control horizontal alignment" border={true}>
                    <Stack space="medium">
                        <Columns {...props}>
                            <Column width="1/5">
                                <Placeholder height={20} />
                            </Column>
                            <Column width="1/5">
                                <Placeholder height={20} />
                            </Column>
                        </Columns>
                    </Stack>
                </Wrapper>
            </Stack>
        )
    })

    .add('Columns (widths)', () => {
        const space = selectSize('space', 'medium')
        return (
            <Stack space="large" dividers>
                <Wrapper>
                    <Stack space="large">
                        <Columns space={space}>
                            <Column width="1/2">
                                <Placeholder label="1/2" />
                            </Column>
                            <Column width="1/2">
                                <Placeholder label="1/2" />
                            </Column>
                        </Columns>
                    </Stack>
                </Wrapper>
                <Wrapper>
                    <Stack space="large">
                        <Columns space={space}>
                            <Column width="1/3">
                                <Placeholder label="1/3" />
                            </Column>
                            <Column width="2/3">
                                <Placeholder label="2/3" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="1/3">
                                <Placeholder label="1/3" />
                            </Column>
                            <Column width="1/3">
                                <Placeholder label="1/3" />
                            </Column>
                            <Column width="1/3">
                                <Placeholder label="1/3" />
                            </Column>
                        </Columns>
                    </Stack>
                </Wrapper>
                <Wrapper>
                    <Stack space="large">
                        <Columns space={space}>
                            <Column width="1/4">
                                <Placeholder label="1/4" />
                            </Column>
                            <Column width="3/4">
                                <Placeholder label="3/4" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="1/4">
                                <Placeholder label="1/4" />
                            </Column>
                            <Column width="1/4">
                                <Placeholder label="1/4" />
                            </Column>
                            <Column width="1/4">
                                <Placeholder label="1/4" />
                            </Column>
                            <Column width="1/4">
                                <Placeholder label="1/4" />
                            </Column>
                        </Columns>
                    </Stack>
                </Wrapper>
                <Wrapper>
                    <Stack space="large">
                        <Columns space={space}>
                            <Column width="content">
                                <Placeholder label="content" />
                            </Column>
                            <Column width="auto">
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="2/3">
                                <Placeholder label="2/3" />
                            </Column>
                            <Column width="auto">
                                <Placeholder label="auto" />
                            </Column>
                            <Column width="content">
                                <Placeholder label="content" />
                            </Column>
                        </Columns>
                    </Stack>
                </Wrapper>
                <Wrapper>
                    <Stack space="medium">
                        <Columns space={space}>
                            <Column width="content">
                                <Placeholder label="content" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="1/5">
                                <Placeholder label="1/5" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="1/4">
                                <Placeholder label="1/4" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="1/3">
                                <Placeholder label="1/3" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="2/5">
                                <Placeholder label="2/5" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="1/2">
                                <Placeholder label="1/2" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="3/5">
                                <Placeholder label="3/5" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="2/3">
                                <Placeholder label="2/3" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="3/4">
                                <Placeholder label="3/4" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                        <Columns space={space}>
                            <Column width="4/5">
                                <Placeholder label="4/5" />
                            </Column>
                            <Column>
                                <Placeholder label="auto" />
                            </Column>
                        </Columns>
                    </Stack>
                </Wrapper>
            </Stack>
        )
    })

    .add('Columns (responsive)', () => (
        <>
            <ResponsiveWidthRef />
            <Stack space="large" dividers>
                <Wrapper title="Space between columns reduces on smaller screen sizes">
                    <Columns space={['xsmall', 'medium', 'xlarge']}>
                        {times(5).map((i) => (
                            <Column key={i}>
                                <Placeholder label={i + 1} height={50} />
                            </Column>
                        ))}
                    </Columns>
                </Wrapper>
                <Wrapper title="Use collapseBelow to control if/when the columns become stacked depending on viewport width">
                    <Columns
                        collapseBelow={selectWithNone<ColumnsCollapseBelow>(
                            'collapseBelow',
                            ['tablet', 'desktop'],
                            'tablet',
                        )}
                        space={selectSize('space', 'medium')}
                    >
                        {times(5).map((i) => (
                            <Column key={i}>
                                <Placeholder label={i + 1} height={50} />
                            </Column>
                        ))}
                    </Columns>
                </Wrapper>
            </Stack>
        </>
    ))
