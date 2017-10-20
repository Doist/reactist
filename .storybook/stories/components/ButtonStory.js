import './styles/button_story.less'

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Button from '../../../src/components/Button'
import { alternateBrandingText } from './ButtonStoryTexts'


// Story Definitions ==========================================================
const ButtonPropTypesStory = getPropTypesStory(Button)
const ButtonPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: ButtonPropTypesStory, options: optionsNoSourceNoProps }]
}

const StandardButtonsStory = () => (
    <section className='story'>
        <Button name='Primary Button' />
        <Button white name='White Button'/>
        <Button secondary name='Secondary Button' />
        <Button danger name='Danger Button!'/>
    </section>
)
const StandardButtonsChapter =  {
    subtitle: 'Standard Buttons',
    sections: [{ sectionFn: StandardButtonsStory, options: optionsSourceOnly }]
}

const SmallButtonsStory = () => (
    <section className='story'>
        <Button small name='Small Primary Button' />
        <Button small white name='Small White Button'/>
        <Button small secondary name='Small Secondary Button' />
        <Button small danger name='Small Danger Button!'/>
    </section>
)
const SmallButtonsChapter = {
    subtitle: 'Small Buttons',
    sections: [{ sectionFn: SmallButtonsStory, options: optionsSourceOnly }]
}

const DisabledButtonsStory = () => (
    <section className='story'>
        <Button disabled name='Disabled Primary Button' />
        <Button disabled white name='Disabled White Button'/>
        <Button disabled secondary name='Disabled Secondary Button' />
        <Button disabled danger name='Disabled Danger Button!'/>
    </section>
)
const DisabledButtonsChapter = {
    subtitle: 'Disabled Buttons',
    sections: [{ sectionFn: DisabledButtonsStory, options: optionsSourceOnly }]
}

const LoadingButtonsStory = () => (
    <section className='story'>
        <Button loading name='Loading Primary Button' />
        <Button loading white name='Loading White Button'/>
        <Button loading secondary name='Loading Secondary Button' />
        <Button loading danger name='Loading Danger Button!'/>
    </section>
)
const LoadingButtonsChapter = {
    subtitle: 'Loading Buttons',
    sections: [{ sectionFn: LoadingButtonsStory, options: optionsSourceOnly }]
}

const AlternateBrandingButtonsStory = () => (
    <section className='story alternate_branding'>
        <Button name='Primary Button' />
        <Button white name='White Button'/>
        <Button secondary name='Secondary Button' />
    </section>
)
const AlternaterBrandingButtonsChapter = {
    subtitle: 'Alternate Branding',
    info: alternateBrandingText,
    sections: [{ sectionFn: AlternateBrandingButtonsStory, options: optionsSourceOnly }]
}

const ButtonPlaygroundStory = () => (
    <section className='story'>
        <Button
            name={ text('Name', 'Button Text') }
            secondary={ boolean('Secondary', false) }
            white={ boolean('White', false) }
            danger={ boolean('Danger', false) }
            small={ boolean('Small', false) }
            disabled={ boolean('Disabled', false) }
            loading={ boolean('Loading', false) }
            data_tip={ text('Tooltip', '') }
        />
    </section>
)

// Story setup ================================================================
const button_story = () =>
    storiesOf('Button', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [
                ButtonPropTypesChapter,
                StandardButtonsChapter,
                SmallButtonsChapter,
                DisabledButtonsChapter,
                LoadingButtonsChapter,
                AlternaterBrandingButtonsChapter
            ]
        })
        .add('Component Playground', ButtonPlaygroundStory)

export default button_story
