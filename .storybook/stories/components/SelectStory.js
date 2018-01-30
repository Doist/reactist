import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Select from '../../../src/components/Select'

const options = [
    { value: 'intro', text: 'Select a fruit', disabled: true },
    { value: 'apple', text: '🍎 Apple' },
    { value: 'pear', text: '🍐 Pear' },
    { value: 'fish', text: '🐟 Fish', disabled: true },
    { value: 'banana', text: '🍌 Banana' },
    { value: 'grapes', text: '🍇 Grapes' }
]

// Story Definitions ==========================================================
const SelectPropTypesStory = getPropTypesStory(Select)
const SelectPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        { sectionFn: SelectPropTypesStory, options: optionsNoSourceNoProps }
    ]
}

class SelectStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { value: 'intro' }
    }
    render() {
        return (
            <section className="story">
                <Select
                    value={this.state.value}
                    options={options}
                    onChange={value => this.setState(() => ({ value }))}
                />
            </section>
        )
    }
}
const SelectChapter = {
    subtitle: 'Select',
    sections: [
        // eslint-disable-next-line react/display-name
        { sectionFn: () => <SelectStory />, options: optionsNoSourceNoProps }
    ]
}

class SelectPlaygroundStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { value: 'intro' }
    }
    render() {
        return (
            <section className="story">
                <Select
                    value={this.state.value}
                    options={options}
                    onChange={value => this.setState(() => ({ value }))}
                    disabled={boolean('Disabled:', false)}
                />
            </section>
        )
    }
}

// Story setup ================================================================
const Story = () =>
    storiesOf('Select', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [SelectPropTypesChapter, SelectChapter]
        })
        .add('Component Playground', () => <SelectPlaygroundStory />)

export default Story
