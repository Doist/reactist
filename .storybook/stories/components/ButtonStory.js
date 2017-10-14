import './styles/button_story.less'

import React from 'react';
import { storiesOf } from '@storybook/react';
import withDocs from 'storybook-readme/with-docs';

import Button from '../../../src/components/Button'
import UsageText from './ButtonUsage.md'

import { setDefaults, withInfo } from '@storybook/addon-info';

setDefaults({
  header: false,
  inline: true,
  source: false,
  propTables: [ Button ],
  propTablesExclusde: ['Preview', 'ReadmeContainer']
});

const ButtonExamplesStory = () => (
    <section className='story'>
        <h1>Button Examples</h1>

        <h2>Basic Buttons</h2>
        <Button name='Primary Button' />
        <Button secondary name='Secondary Button' />
        <Button loading name='Loading'/>
        <Button danger name='Danger!'/>
        <Button disabled danger name='Disabled Danger!'/>

        <h2>Small Buttons</h2>
        <Button small name='Small Primary Button' />
        <Button small secondary name='Small Secondary Button' />
        <Button small danger name='Small Danger Button with a super long name' />

        <h2>White Buttons</h2>
        <Button white name='White Primary Button' />
        <Button white secondary name='White Secondary Button' />

        <section className='alternate-branding'>
            <h1>Alternate Branding Button Examples</h1>

            <h2>Basic Buttons</h2>
            <Button name='Primary Button' />
            <Button secondary name='Secondary Button' />
            <Button loading name='Loading' />

            <h2>Small Buttons</h2>
            <Button small name='Small Primary Button' />
            <Button small secondary name='Small Secondary Button' />

            <h2>White Buttons</h2>
            <Button white name='White Primary Button' />
            <Button white secondary name='White Secondary Button' /></section>
    </section>
)

const button_story = () => storiesOf('Button', module)
    .add('Button Examples', ButtonExamplesStory)
    .add('Usage', withDocs(UsageText, () => {}))

export default button_story
