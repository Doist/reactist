import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import './styles/button_story.less'
import Button from '../../src/components/button'
import { alternateBrandingText } from './ButtonStory.md'

export default {
    title: 'Button',
    component: Button,
}

// Story Definitions ==========================================================

export const StandardButtonsStory = () => {
    return (
        <section className="story">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button!</Button>
            <Button variant="link">Link Button</Button>
            <Button>Plain Button</Button>
            <p>
                You can <Button variant="link">add link buttons inline</Button> and it works as
                you&apos;d expect.
            </p>
        </section>
    )
}

export const SmallButtonsStory = () => {
    return (
        <section className="story">
            <Button size="small" variant="primary">
                Small Primary Button
            </Button>
            <Button size="small" variant="secondary">
                Small Secondary Button
            </Button>
            <Button size="small" variant="danger">
                Small Danger Button!
            </Button>
            <Button size="small" variant="link">
                Small Link Button
            </Button>
            <Button size="small">Small Plain Button</Button>
        </section>
    )
}

export const LargeButtonsStory = () => {
    return (
        <section className="story">
            <Button size="large" variant="primary">
                Large Primary Button
            </Button>
            <Button size="large" variant="secondary">
                Large Secondary Button
            </Button>
            <Button size="large" variant="danger">
                Large Danger Button!
            </Button>
            <Button size="large" variant="link">
                Large Link Button
            </Button>
            <Button size="large">Large Plain Button</Button>
        </section>
    )
}

export const DisabledButtonsStory = () => {
    return (
        <section className="story">
            <Button disabled variant="primary">
                Disabled Primary Button
            </Button>
            <Button disabled variant="secondary">
                Disabled Secondary Button
            </Button>
            <Button disabled variant="danger">
                Disabled Danger Button!
            </Button>
            <Button disabled variant="link">
                Disabled Link Button
            </Button>
            <Button disabled>Disabled Plain Button</Button>
        </section>
    )
}

export const LoadingButtonsStory = () => {
    return (
        <section className="story">
            <Button loading variant="primary">
                Loading Primary Button
            </Button>
            <Button loading variant="secondary">
                Loading Secondary Button
            </Button>
            <Button loading variant="danger">
                Loading Danger Button!
            </Button>
            <p>
                Note: <code>loading</code> has no effect on link or plain buttons. Use{' '}
                <code>disabled</code> instead.
            </p>
        </section>
    )
}

export const AlternateBrandingButtonsStory = () => {
    return (
        <section className="story alternate_branding">
            <p>
                If you want your buttons to have a different color scheme you need to import a
                <code>.css</code> file and overwrite the following rules:
            </p>
            <ReactMarkdown source={alternateBrandingText} />
            <br />
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
        </section>
    )
}

export const ButtonPlaygroundStory = (args) => {
    return (
        <section className="story playground">
            <Button {...args}>{text('Name', 'Button Text')}</Button>
        </section>
    )
}

ButtonPlaygroundStory.args = {
    variant: select('Variant', ['(none)', 'primary', 'secondary', 'danger', 'link'], 'primary'),
    size: select('Size', ['default', 'small', 'large'], 'default'),
    disabled: false,
    loading: false,
    tooltip: '',
}

ButtonPlaygroundStory.argTypes = {
    disabled: 'boolean',
    loading: 'boolean',
    variant: {
        type: 'select',
        options: ['(none)', 'primary', 'secondary', 'danger', 'link'],
    },
    size: {
        type: 'select',
        options: ['default', 'small', 'large'],
    },
}
