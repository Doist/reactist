import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import RangeInput from '../../src/components/RangeInput'

// Story Definitions ==========================================================
const RangeInputPropTypesStory = getPropTypesStory(RangeInput)
const RangeInputPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: RangeInputPropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

class RangeInputStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 50,
        }
    }

    render() {
        return (
            <section className="story">
                <RangeInput
                    value={this.state.value}
                    onChange={(value) => this.setState(() => ({ value }))}
                />
            </section>
        )
    }
}
const RangeInputChapter = {
    subtitle: 'RangeInput',
    sections: [
        {
            // eslint-disable-next-line react/display-name
            sectionFn: () => <RangeInputStory />,
            options: optionsNoSourceNoProps,
        },
    ],
}

class RangeInputPlaygroundStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 50,
        }
    }

    render() {
        return (
            <section className="story">
                <p>Current Value: {this.state.value}</p>
                <RangeInput
                    value={this.state.value}
                    onChange={(value) => this.setState(() => ({ value }))}
                    stepSize={number('Step Size', 1)}
                    min={number('Minimum Value', 0)}
                    max={number('Maximum Value', 100)}
                />
            </section>
        )
    }
}

// Story setup ================================================================
const Story = () =>
    storiesOf('RangeInput', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [RangeInputPropTypesChapter, RangeInputChapter],
        })
        .add('Component Playground', () => <RangeInputPlaygroundStory />)

export default Story
