import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { decorate } from '@storybook/addon-actions'

import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Checkbox from '../../src/components/Checkbox'

// Story Definitions ==========================================================
const CheckboxPropTypesStory = getPropTypesStory(Checkbox)
const CheckboxPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: CheckboxPropTypesStory, options: optionsNoSourceNoProps }],
}

type CheckboxStoryState = {
    checked: boolean
}

class CheckboxStory extends React.Component<unknown, CheckboxStoryState> {
    constructor(props, context) {
        super(props, context)
        this.state = { checked: true }
    }

    render() {
        return (
            <section className="story">
                <Checkbox
                    label="Checkbox with a clickable label"
                    checked={this.state.checked}
                    onChange={(checked) => this.setState(() => ({ checked }))}
                />
            </section>
        )
    }
}
const CheckboxChapter = {
    subtitle: 'Checkbox',
    sections: [
        // eslint-disable-next-line react/display-name
        { sectionFn: () => <CheckboxStory />, options: optionsNoSourceNoProps },
    ],
}

type CheckboxPlaygroundStoryState = {
    checked: boolean
}

class CheckboxPlaygroundStory extends React.Component<unknown, CheckboxPlaygroundStoryState> {
    constructor(props, context) {
        super(props, context)
        this.state = { checked: true }
    }

    render() {
        return (
            <section className="story">
                <Checkbox
                    label={text('Label', 'Label next to the checkbox')}
                    checked={boolean('Checked', this.state.checked)}
                    disabled={boolean('Disabled', false)}
                    onChange={decorate([(checked) => this.setState(() => ({ checked }))]).action(
                        'Checkbox Toggle',
                    )}
                />
            </section>
        )
    }
}

// Story setup ================================================================
const Story = () =>
    storiesOf('Checkbox', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [CheckboxPropTypesChapter, CheckboxChapter],
        })
        .add('Component Playground', () => <CheckboxPlaygroundStory />)

export { Story as CheckboxStory }
