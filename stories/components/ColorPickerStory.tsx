import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import ColorPicker from '../../src/components/ColorPicker'

// Story Definitions ==========================================================
const ColorPickerPropTypesStory = getPropTypesStory(ColorPicker)
const ColorPickerPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: ColorPickerPropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

class ColorPickersStory extends React.Component {
    state = { color: 0 }

    render() {
        return (
            <section className="story">
                <ColorPicker
                    color={this.state.color}
                    onChange={(color) => this.setState(() => ({ color }))}
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
            options: optionsNoSourceNoProps,
        },
    ],
}

class CustomColorPickersStory extends React.Component {
    state = { color: 0 }

    render() {
        return (
            <section className="story">
                <ColorPicker
                    color={this.state.color}
                    onChange={(color) => this.setState(() => ({ color }))}
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
            options: optionsNoSourceNoProps,
        },
    ],
}

class NamedColorPickersStory extends React.Component {
    state = { color: 0 }

    render() {
        return (
            <section className="story">
                <ColorPicker
                    color={this.state.color}
                    onChange={(color) => this.setState(() => ({ color }))}
                    colorList={[
                        { color: 'red', name: 'Red' },
                        { color: 'green', name: 'Green' },
                        { color: 'palegoldenrod', name: 'Gold' },
                        { color: '#FF00FF', name: 'Pink' },
                        { color: '#ABCDEF', name: 'Blue-Gray-ish' },
                    ]}
                />
            </section>
        )
    }
}
const NamedColorPickersChapter = {
    subtitle: 'Named Colors Color Picker',
    sections: [
        {
            // eslint-disable-next-line react/display-name
            sectionFn: () => <NamedColorPickersStory />,
            options: optionsNoSourceNoProps,
        },
    ],
}

class SmallColorPickerStory extends React.Component {
    state = { color: 0 }

    render() {
        return (
            <section className="story">
                <ColorPicker
                    small
                    color={this.state.color}
                    onChange={(color) => this.setState(() => ({ color }))}
                />
            </section>
        )
    }
}
const SmallColorPickerChapter = {
    subtitle: 'Small Color Picker',
    sections: [
        {
            // eslint-disable-next-line react/display-name
            sectionFn: () => <SmallColorPickerStory />,
            options: optionsNoSourceNoProps,
        },
    ],
}

// Story setup ================================================================
const Story = () =>
    storiesOf('ColorPicker', module).addWithChapters('Component Overview', {
        chapters: [
            ColorPickerPropTypesChapter,
            ColorPickersChapter,
            CustomColorPickersChapter,
            NamedColorPickersChapter,
            SmallColorPickerChapter,
        ],
    })

export default Story
