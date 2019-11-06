import './styles/time_story.less'

import React from 'react'
import dayjs from 'dayjs'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'

import {
    getPropTypesStory,
    optionsSourceOnly,
    optionsNoSourceNoProps
} from '../utils/StoryUtils'

import Time from '../../../src/components/Time'

const exampleTimes = [
    { title: 'Now', time: dayjs().unix() },
    {
        title: 'Now - 2 Minutes',
        time: dayjs()
            .subtract(2, 'minutes')
            .unix()
    },
    {
        title: 'Now - 2 Hours',
        time: dayjs()
            .subtract(2, 'hours')
            .unix()
    },
    {
        title: 'Now - 18 Hours',
        time: dayjs()
            .subtract(18, 'hours')
            .unix()
    },
    {
        title: 'Now - 2 Days',
        time: dayjs()
            .subtract(2, 'days')
            .unix()
    },
    {
        title: 'Now - 2 Weeks',
        time: dayjs()
            .subtract(2, 'weeks')
            .unix()
    },
    {
        title: 'Now - 2 Years',
        time: dayjs()
            .subtract(2, 'years')
            .unix()
    }
]

// Story Definitions ==========================================================
const TimePropTypesStory = getPropTypesStory(Time)
const TimePropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        { sectionFn: TimePropTypesStory, options: optionsNoSourceNoProps }
    ]
}

const NoHoverEffectStory = () => (
    <section className="story time">
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time time={time.time} />
            </div>
        ))}
    </section>
)
const NoHoverEffectChapter = {
    subtitle: 'Normal Time (no hover effect)',
    sections: [{ sectionFn: NoHoverEffectStory, options: optionsSourceOnly }]
}

const ExpandTimeStory = () => (
    <section className="story time">
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time expandOnHover time={time.time} />
            </div>
        ))}
    </section>
)
const ExpandTimeChapter = {
    subtitle: 'Expanding time on hover',
    sections: [{ sectionFn: ExpandTimeStory, options: optionsSourceOnly }]
}

const FullyExpandTimeStory = () => (
    <section className="story time">
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time expandFullyOnHover time={time.time} />
            </div>
        ))}
    </section>
)
const FullyExpandTimeChapter = {
    subtitle: 'Fully expanding time on hover',
    sections: [{ sectionFn: FullyExpandTimeStory, options: optionsSourceOnly }]
}

const TooltipTimeStory = () => (
    <section className="story time">
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time tooltipOnHover time={time.time} />
            </div>
        ))}
    </section>
)
const TooltipTimeChapter = {
    subtitle: 'Show full time in tooltip on hover',
    sections: [{ sectionFn: TooltipTimeStory, options: optionsSourceOnly }]
}

const TranslatedTimeStory = () => {
    const i18nConfig = {
        locale: 'de',
        hoursSuffix: 'Std',
        minutesSuffix: 'min',
        momentsAgo: 'Gerade eben'
    }

    return (
        <section className="story time">
            {exampleTimes.map((time, index) => (
                <div key={index}>
                    <span>{time.title}</span>
                    <Time
                        expandFullyOnHover
                        config={i18nConfig}
                        time={time.time}
                    />
                </div>
            ))}
        </section>
    )
}
const TranslatedTimeChapter = {
    subtitle: 'Translated times',
    sections: [{ sectionFn: TranslatedTimeStory, options: optionsSourceOnly }]
}

const TimePlaygroundStory = () => (
    <section className="story time">
        <Time
            time={number('time:', exampleTimes[0].time)}
            expandOnHover={boolean('expand on hover:', false)}
            expandFullyOnHover={boolean('expand fully on hover:', false)}
            refresh={boolean('Refresh:', true)}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('Time', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [
                TimePropTypesChapter,
                NoHoverEffectChapter,
                ExpandTimeChapter,
                FullyExpandTimeChapter,
                TooltipTimeChapter,
                TranslatedTimeChapter
            ]
        })
        .add('Component Playground', TimePlaygroundStory)

export default Story
