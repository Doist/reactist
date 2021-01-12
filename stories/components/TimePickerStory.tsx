import React, { useState } from 'react'
import { getPropTypesStory, optionsNoSourceNoProps } from '../utils/StoryUtils'

import TimePicker from '../../src/components/TimePicker'
import { storiesOf } from '@storybook/react'

// Story Definitions ==========================================================
const TimePickerPropTypesStory = getPropTypesStory(TimePicker)
const TimePickerPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: TimePickerPropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

const TimePickerStory = () => {
    const [time, setTime] = useState<string | undefined>()

    return (
        <section className="story">
            <TimePicker onTimeChanged={(time) => setTime(time)} />
            <p>Selected Date: {time ?? 'No time selected'}</p>
        </section>
    )
}

const Story = () =>
    storiesOf('TimePicker', module)
        .addWithChapters('Component Overview', {
            chapters: [TimePickerPropTypesChapter],
        })
        .add('Component Playground', TimePickerStory)

export { Story as TimePickerStory }
