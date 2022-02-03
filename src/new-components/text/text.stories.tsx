import React from 'react'

import { Stack } from '../stack'
import { Text } from './text'
import { ResponsiveWidthRef, select, selectWithNone } from '../storybook-helper'

export default {
    title: 'Design system/Text',
    component: Text,
    parameters: {
        badges: ['accessible'],
    },
}

export function TextStory() {
    return (
        <section className="story">
            <Stack space="medium">
                <Text size="subtitle" weight="regular">
                    Subtitle Regular
                </Text>
                <Text size="subtitle" tone="secondary">
                    Subtitle Secondary
                </Text>
                <Text size="subtitle" tone="danger">
                    Subtitle Danger
                </Text>
                <Text size="subtitle" weight="semibold">
                    Subtitle Semibold
                </Text>
                <Text size="subtitle" weight="bold">
                    Subtitle Bold
                </Text>

                <Text size="body" weight="regular">
                    Body Regular
                </Text>
                <Text size="body" tone="secondary">
                    Body Secondary
                </Text>
                <Text size="body" tone="danger">
                    Body Danger
                </Text>
                <Text size="body" weight="semibold">
                    Body Semibold
                </Text>
                <Text size="body" weight="bold">
                    Body Bold
                </Text>

                <Text size="copy" weight="regular">
                    Copy Regular
                </Text>
                <Text size="copy" tone="secondary">
                    Copy Secondary
                </Text>
                <Text size="copy" tone="danger">
                    Copy Danger
                </Text>
                <Text size="copy" weight="semibold">
                    Copy Semibold
                </Text>
                <Text size="copy" weight="bold">
                    Copy Bold
                </Text>

                <Text size="caption" weight="regular">
                    Caption Regular
                </Text>
                <Text size="caption" tone="secondary">
                    Caption Secondary
                </Text>
                <Text size="caption" tone="danger">
                    Caption Danger
                </Text>
                <Text size="caption" weight="semibold">
                    Caption Semibold
                </Text>
                <Text size="caption" weight="bold">
                    Caption Bold
                </Text>
            </Stack>
        </section>
    )
}

export function TruncatedTextStory() {
    return (
        <section className="story">
            <Stack space="medium">
                <Text lineClamp={1}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident cumque
                    recusandae quibusdam, veniam cum illo? Inventore, doloremque necessitatibus!
                    Sequi porro alias mollitia, temporibus quidem, aut modi tempora placeat laborum
                    eos sapiente necessitatibus autem ipsum officia rerum distinctio consectetur
                    tenetur qui! Perspiciatis ab corporis, itaque alias ex optio voluptatum nulla
                    consequatur aut explicabo dolorem rerum ratione magnam. Mollitia dignissimos et
                    ad commodi quasi molestias fugiat repellendus, magni distinctio voluptate neque
                    quos esse asperiores iure excepturi eligendi eaque veniam voluptas blanditiis
                    temporibus, omnis laborum quidem autem totam. Iure, numquam. Totam facilis
                    dolorum, consequatur, eligendi est dolores modi dolore maiores ipsum magnam a.
                </Text>

                <Text lineClamp={4}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident cumque
                    recusandae quibusdam, veniam cum illo? Inventore, doloremque necessitatibus!
                    Sequi porro alias mollitia, temporibus quidem, aut modi tempora placeat laborum
                    eos sapiente necessitatibus autem ipsum officia rerum distinctio consectetur
                    tenetur qui! Perspiciatis ab corporis, itaque alias ex optio voluptatum nulla
                    consequatur aut explicabo dolorem rerum ratione magnam. Mollitia dignissimos et
                    ad commodi quasi molestias fugiat repellendus, magni distinctio voluptate neque
                    quos esse asperiores iure excepturi eligendi eaque veniam voluptas blanditiis
                    temporibus, omnis laborum quidem autem totam. Iure, numquam. Totam facilis
                    dolorum, consequatur, eligendi est dolores modi dolore maiores ipsum magnam a.
                </Text>
            </Stack>
        </section>
    )
}

export function ResponsiveTextStory(props: React.ComponentProps<typeof Text>) {
    return (
        <>
            <ResponsiveWidthRef />
            <Text {...props} align={{ mobile: 'end', tablet: 'center', desktop: 'start' }} />
        </>
    )
}

ResponsiveTextStory.argTypes = {
    size: select(['caption', 'copy', 'body', 'subtitle'], 'body'),
    weight: select(['regular', 'semibold', 'bold'], 'regular'),
    lineClamp: selectWithNone([1, 2, 3, 4, 5], 'none'),
    tone: select(['normal', 'secondary', 'danger'], 'normal'),
    align: { control: false },
    children: {
        control: { type: 'text' },
        defaultValue: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    },
}

export function TextPlaygroundStory(props: React.ComponentProps<typeof Text>) {
    return (
        <section className="story playground">
            <Text {...props} />
        </section>
    )
}

TextPlaygroundStory.argTypes = {
    size: select(['caption', 'copy', 'body', 'subtitle'], 'body'),
    weight: select(['regular', 'semibold', 'bold'], 'regular'),
    lineClamp: selectWithNone([1, 2, 3, 4, 5], 'none'),
    tone: select(['normal', 'secondary', 'danger'], 'normal'),
    align: selectWithNone(['start', 'center', 'end', 'justify'], 'none'),
    children: {
        control: { type: 'text' },
        defaultValue: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    },
}
