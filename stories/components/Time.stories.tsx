import './styles/time_story.less'

import React from 'react'
import dayjs from 'dayjs'
import { boolean } from '@storybook/addon-knobs'

import Time from '../../src/components/time'

// Story setup ================================================================

export default {
    title: 'Time',
    component: Time,
}

const exampleTimes = [
    { title: 'Now', time: dayjs().unix() },
    {
        title: 'Now - 2 Minutes',
        time: dayjs().subtract(2, 'minutes').unix(),
    },
    {
        title: 'Now - 2 Hours',
        time: dayjs().subtract(2, 'hours').unix(),
    },
    {
        title: 'Now - 18 Hours',
        time: dayjs().subtract(18, 'hours').unix(),
    },
    {
        title: 'Now - 2 Days',
        time: dayjs().subtract(2, 'days').unix(),
    },
    {
        title: 'Now - 2 Weeks',
        time: dayjs().subtract(2, 'weeks').unix(),
    },
    {
        title: 'Now - 2 Years',
        time: dayjs().subtract(2, 'years').unix(),
    },
]

// Story Definitions ==========================================================

export const NoHoverEffectStory = () => (
    <section className="story time">
        <p>Normal Time (no hover effect)</p>
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time time={time.time} />
            </div>
        ))}
    </section>
)

export const ExpandTimeStory = () => (
    <section className="story time">
        <p>Expanding time on hover</p>
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time expandOnHover time={time.time} />
            </div>
        ))}
    </section>
)

export const FullyExpandTimeStory = () => (
    <section className="story time">
        <p>Fully expanding time on hover</p>
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time expandFullyOnHover time={time.time} />
            </div>
        ))}
    </section>
)

export const TooltipTimeStory = () => (
    <section className="story time">
        <p>Show full time in tooltip on hover</p>
        {exampleTimes.map((time, index) => (
            <div key={index}>
                <span>{time.title}</span>
                <Time tooltipOnHover time={time.time} />
            </div>
        ))}
    </section>
)

export const TranslatedTimeStory = () => {
    const i18nConfig = {
        locale: 'de',
        hoursSuffix: 'Std',
        minutesSuffix: 'min',
        momentsAgo: 'Gerade eben',
    }

    return (
        <section className="story time">
            <p>Translated times</p>
            {exampleTimes.map((time, index) => (
                <div key={index}>
                    <span>{time.title}</span>
                    <Time expandFullyOnHover config={i18nConfig} time={time.time} />
                </div>
            ))}
        </section>
    )
}

export const TimePlaygroundStory = (args) => (
    <section className="story time">
        <Time {...args} />
    </section>
)

TimePlaygroundStory.args = {
    time: exampleTimes[0].time,
    expandOnHover: boolean('expand on hover:', false),
    expandFullyOnHover: boolean('expand fully on hover:', false),
    refresh: boolean('Refresh:', true),
}
