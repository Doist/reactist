import React from 'react'

import { Stack } from '../stack'
import { Text } from './text'
import { select } from '../storybook-helper'

export default {
    title: 'Design system/Text',
    component: Text,
    argTypes: {
        size: select(['caption', 'copy', 'body', 'subtitle'], 'body'),
        weight: select(['regular', 'semibold', 'bold'], 'regular'),
        lineClamp: select([1, 2, 3, 4, 5], 1),
        children: {
            control: {
                type: 'text',
            },
            defaultValue: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
        },
        tone: select(['normal', 'secondary', 'danger'], 'normal'),
    },
}

export function TextStory() {
    return (
        <section className="story">
            <Stack space="medium">
                <Text size="subtitle" weight="bold" tone="secondary">
                    Text, subtitle, bold, secondary (16px)
                </Text>
                <Text size="subtitle" weight="bold" tone="danger">
                    Text, subtitle, bold, danger
                </Text>
                <Text size="subtitle" weight="bold">
                    Text, subtitle, bold
                </Text>
                <Text size="subtitle" weight="semibold">
                    Text, subtitle, semibold
                </Text>
                <Text size="subtitle" weight="regular">
                    Text, subtitle, regular
                </Text>

                <Text size="body" weight="bold" tone="secondary">
                    Text, body, bold, secondary (14px)
                </Text>
                <Text size="body" weight="bold" tone="danger">
                    Text, body, bold, danger
                </Text>
                <Text size="body" weight="bold">
                    Text, body, bold
                </Text>
                <Text size="body" weight="semibold">
                    Text, body, semibold
                </Text>
                <Text size="body" weight="regular">
                    Text, body, regular
                </Text>

                <Text size="copy" weight="bold" tone="secondary">
                    Text, copy, bold, secondary (13px)
                </Text>
                <Text size="copy" weight="bold" tone="danger">
                    Text, copy, bold, danger
                </Text>
                <Text size="copy" weight="bold">
                    Text, copy, bold
                </Text>
                <Text size="copy" weight="semibold">
                    Text, copy, semibold
                </Text>
                <Text size="copy" weight="regular">
                    Text, copy, regular
                </Text>

                <Text size="caption" weight="bold" tone="secondary">
                    Text, caption, bold, secondary (12px)
                </Text>
                <Text size="caption" weight="bold" tone="danger">
                    Text, caption, bold, danger
                </Text>
                <Text size="caption" weight="bold">
                    Text, caption, bold
                </Text>
                <Text size="caption" weight="semibold">
                    Text, caption, semibold
                </Text>
                <Text size="caption" weight="regular">
                    Text, caption, regular
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

export function TextPlaygroundStory({ children, ...args }: React.ComponentProps<typeof Text>) {
    return (
        <section className="story playground">
            <Text {...args}>{children}</Text>
        </section>
    )
}
