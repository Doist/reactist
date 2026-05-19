import * as React from 'react'

import { action } from 'storybook/actions'

import KeyCapturer from '../../src/components/key-capturer'
import { Stack } from '../../src/stack'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof KeyCapturer> = {
    title: 'Components/KeyCapturer',
    component: KeyCapturer,
}
export default meta

type Story = StoryObj<typeof KeyCapturer>

export const Playground: Story = {
    parameters: {
        docs: { source: { type: 'code' } },
    },
    render: () => (
        <section className="story">
            <Stack as="section" exceptionallySetClassName="story" space="large">
                <KeyCapturer
                    eventName="onKeyDown"
                    onArrowUp={action('Up')}
                    onArrowDown={action('Down')}
                    onArrowLeft={action('Left')}
                    onArrowRight={action('Right')}
                    onEnter={action('Enter')}
                    onBackspace={action('Backspace')}
                    onEscape={action('Escape')}
                    propagateArrowUp
                    propagateArrowDown
                    propagateArrowLeft
                    propagateArrowRight
                    propagateEnter
                    propagateBackspace
                    propagateEscape
                >
                    <input type="text" />
                </KeyCapturer>
            </Stack>
        </section>
    ),
}
