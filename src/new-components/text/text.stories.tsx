import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import { Stack } from '../stack'
import { Text } from './text'

export default {
    title: 'Design system/Text',
    component: Text,
}

export function TextStory() {
    return (
        <section className="story">
            <Stack space="medium">
                <Text size="xlarge" weight="strong" tone="secondary">
                    Text, xlarge, strong, secondary (16px)
                </Text>
                <Text size="xlarge" weight="strong" tone="danger">
                    Text, xlarge, strong, danger
                </Text>
                <Text size="xlarge" weight="strong">
                    Text, xlarge, strong
                </Text>
                <Text size="xlarge" weight="medium">
                    Text, xlarge, medium
                </Text>
                <Text size="xlarge" weight="regular">
                    Text, xlarge, regular
                </Text>

                <Text size="large" weight="strong" tone="secondary">
                    Text, large, strong, secondary (16px)
                </Text>
                <Text size="large" weight="strong" tone="danger">
                    Text, large, strong, danger
                </Text>
                <Text size="large" weight="strong">
                    Text, large, strong
                </Text>
                <Text size="large" weight="medium">
                    Text, large, medium
                </Text>
                <Text size="large" weight="regular">
                    Text, large, regular
                </Text>

                <Text size="standard" weight="strong" tone="secondary">
                    Text, standard, strong, secondary (14px)
                </Text>
                <Text size="standard" weight="strong" tone="danger">
                    Text, standard, strong, danger
                </Text>
                <Text size="standard" weight="strong">
                    Text, standard, strong
                </Text>
                <Text size="standard" weight="medium">
                    Text, standard, medium
                </Text>
                <Text size="standard" weight="regular">
                    Text, standard, regular
                </Text>

                <Text size="small" weight="strong" tone="secondary">
                    Text, small, strong, secondary (12px)
                </Text>
                <Text size="small" weight="strong" tone="danger">
                    Text, small, strong, danger
                </Text>
                <Text size="small" weight="strong">
                    Text, small, strong
                </Text>
                <Text size="small" weight="medium">
                    Text, small, medium
                </Text>
                <Text size="small" weight="regular">
                    Text, small, regular
                </Text>

                <Text size="xsmall" weight="strong" tone="secondary">
                    Text, xsmall, strong, secondary (10px)
                </Text>
                <Text size="xsmall" weight="strong" tone="danger">
                    Text, xsmall, strong, danger
                </Text>
                <Text size="xsmall" weight="strong">
                    Text, xsmall, strong
                </Text>
                <Text size="xsmall" weight="medium">
                    Text, xsmall, medium
                </Text>
                <Text size="xsmall" weight="regular">
                    Text, ssmall, regular
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

export function TextPlaygroundStory() {
    const size = select('size', ['xsmall', 'small', 'standard', 'large', 'xlarge'], 'standard')
    const weight = select('weight', ['regular', 'medium', 'strong'], 'regular')
    const tone = select('tone', ['normal', 'secondary', 'danger'], 'normal')
    const lineClamp = select('lineClamp', { none: undefined, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }, 1)
    const children = text('children', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit')

    return (
        <section className="story playground">
            <Text tone={tone} size={size} weight={weight} lineClamp={lineClamp}>
                {children}
            </Text>
        </section>
    )
}
