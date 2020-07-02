import './styles/button_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Button from '../../src/components/Button'
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
            <Button variant="white">White Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button!</Button>
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
            <Button size="small" variant="white">
                Small White Button
            </Button>
            <Button size="small" variant="secondary">
                Small Secondary Button
            </Button>
            <Button size="small" variant="danger">
                Small Danger Button!
            </Button>
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
            <Button size="large" variant="white">
                Large White Button
            </Button>
            <Button size="large" variant="secondary">
                Large Secondary Button
            </Button>
            <Button size="large" variant="danger">
                Large Danger Button!
            </Button>
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
            <Button disabled variant="white">
                Disabled White Button
            </Button>
            <Button disabled variant="secondary">
                Disabled Secondary Button
            </Button>
            <Button disabled variant="danger">
                Disabled Danger Button!
            </Button>
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
            <Button loading variant="white">
                Loading White Button
            </Button>
            <Button loading variant="secondary">
                Loading Secondary Button
            </Button>
            <Button loading variant="danger">
                Loading Danger Button!
            </Button>
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
            <Button variant="white">White Button</Button>
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
    return (
        <section className="story playground">
            <Button
                variant={select('Variant', ['primary', 'secondary', 'danger', 'white'], 'primary')}
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
function Story() {
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

export default Story
