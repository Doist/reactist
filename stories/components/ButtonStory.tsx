import './styles/button_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Button from '../../src/components/button'
import { alternateBrandingText } from './ButtonStory.md'

// Story Definitions ==========================================================
const ButtonPropTypesStory = getPropTypesStory(Button)
const ButtonPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: ButtonPropTypesStory, options: optionsNoSourceNoProps }],
}

function StandardButtonsStory() {
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

const StandardButtonsChapter = {
    subtitle: 'Standard Buttons',
    sections: [{ sectionFn: StandardButtonsStory, options: optionsSourceOnly }],
}

function SmallButtonsStory() {
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

const SmallButtonsChapter = {
    subtitle: 'Small Buttons',
    sections: [{ sectionFn: SmallButtonsStory, options: optionsSourceOnly }],
}

function LargeButtonsStory() {
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

const LargeButtonsChapter = {
    subtitle: 'Large Buttons',
    sections: [{ sectionFn: LargeButtonsStory, options: optionsSourceOnly }],
}

function DisabledButtonsStory() {
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

const DisabledButtonsChapter = {
    subtitle: 'Disabled Buttons',
    sections: [{ sectionFn: DisabledButtonsStory, options: optionsSourceOnly }],
}

function LoadingButtonsStory() {
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

const LoadingButtonsChapter = {
    subtitle: 'Loading Buttons',
    sections: [{ sectionFn: LoadingButtonsStory, options: optionsSourceOnly }],
}

function AlternateBrandingButtonsStory() {
    return (
        <section className="story alternate_branding">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
        </section>
    )
}

const AlternaterBrandingButtonsChapter = {
    subtitle: 'Alternate Branding',
    info: alternateBrandingText,
    sections: [
        {
            sectionFn: AlternateBrandingButtonsStory,
            options: optionsSourceOnly,
        },
    ],
}

function ButtonPlaygroundStory() {
    const variant = select(
        'Variant',
        ['(none)', 'primary', 'secondary', 'danger', 'link'],
        'primary',
    )
    return (
        <section className="story playground">
            <Button
                variant={variant === '(none)' ? undefined : variant}
                size={select('Size', ['default', 'small', 'large'], 'default')}
                disabled={boolean('Disabled', false)}
                loading={boolean('Loading', false)}
                tooltip={text('Tooltip', '')}
            >
                {text('Name', 'Button Text')}
            </Button>
        </section>
    )
}

// Story setup ================================================================
function ButtonStory() {
    storiesOf('Button', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [
                ButtonPropTypesChapter,
                StandardButtonsChapter,
                SmallButtonsChapter,
                LargeButtonsChapter,
                DisabledButtonsChapter,
                LoadingButtonsChapter,
                AlternaterBrandingButtonsChapter,
            ],
        })
        .add('Component Playground', ButtonPlaygroundStory)
}

export { ButtonStory }
