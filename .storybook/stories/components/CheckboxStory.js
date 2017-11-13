import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Checkbox from '../../../src/components/Checkbox'

// Story Definitions ==========================================================
const CheckboxPropTypesStory = getPropTypesStory(Checkbox)
const CheckboxPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: CheckboxPropTypesStory, options: optionsNoSourceNoProps }]
}

class CheckboxStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { checked: true }
    }

    render() {
        return (
            <section className='story'>
                <Checkbox
                    label='Checkbox with a clickable label'
                    checked={ this.state.checked }
                    onChange={ (checked) => this.setState(() => ({ checked })) }
                />
            </section>
        )
    }
}
const CheckboxChapter =  {
    subtitle: 'Checkbox',
    sections: [{ sectionFn: () => <CheckboxStory />, options: optionsNoSourceNoProps }]
}

const CheckboxPlaygroundStory = () => (
    <section className='story'>
        <Checkbox
            label={ text('Label', 'Label next to the checkbox') }
            checked={ boolean('Checked', true) }
            onChange={ () => {} }
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
storiesOf('Checkbox', module)
    .addDecorator(withKnobs)
    .addWithChapters('Component Overview', {
        chapters: [
            CheckboxPropTypesChapter,
            CheckboxChapter
        ]
    })
    .add('Component Playground', CheckboxPlaygroundStory)

export default Story
