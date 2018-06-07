import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import ColorPicker from '../../../src/components/ColorPicker'

// Story Definitions ==========================================================
const ColorPickerPropTypesStory = getPropTypesStory(ColorPicker)
const ColorPickerPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: ColorPickerPropTypesStory,
            options: optionsNoSourceNoProps
        }
    ]
}

class ColorPickersStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { color: 0 }
    }

    render() {
        return (
            <section className="story">
                <ColorPicker
                    color={this.state.color}
                    onChange={color => this.setState(() => ({ color }))}
                />
            </section>
        )
    }
}
const ColorPickersChapter = {
    subtitle: 'Color Picker',
    sections: [
        {
            // eslint-disable-next-line react/display-name
            sectionFn: () => <ColorPickersStory />,
            options: optionsNoSourceNoProps
        }
    ]
}

class CustomColorPickersStory extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { color: 0 }
    }

    render() {
        return (
            <section className="story">
                <ColorPicker
                    color={this.state.color}
                    onChange={color => this.setState(() => ({ color }))}
                    colorList={['red', 'green', 'palegoldenrod', '#FF00FF']}
                />
            </section>
        )
    }
}
const CustomColorPickersChapter = {
    subtitle: 'Custom Colors Color Picker',
    sections: [
        {
            // eslint-disable-next-line react/display-name
            sectionFn: () => <CustomColorPickersStory />,
            options: optionsNoSourceNoProps
        }
    ]
}

// Story setup ================================================================
const Story = () =>
    storiesOf('ColorPicker', module).addWithChapters('Component Overview', {
        chapters: [
            ColorPickerPropTypesChapter,
            ColorPickersChapter,
            CustomColorPickersChapter
        ]
    })

export default Story
