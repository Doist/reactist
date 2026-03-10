import './styles/progressbar_story.less'

import * as React from 'react'

import { Box } from '../../src/box'
import ProgressBar from '../../src/components/progress-bar'

// Story setup ================================================================
export default {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    parameters: {
        badges: ['accessible'],
    },
}

// Story Definitions ==========================================================

export const ProgressBarStory = () => (
    <section className="story">
        <p>Progress Bars</p>
        <Box paddingY="small">
            <ProgressBar fillPercentage={0} />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={25} />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={50} />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={75} />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={100} />
        </Box>
    </section>
)

export const ProgressBarWithScaleStory = () => (
    <section className="story">
        <p>Progress Bars with Scale</p>
        <Box paddingY="small">
            <ProgressBar fillPercentage={0} showScale />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={25} showScale />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={50} showScale />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={75} showScale />
        </Box>
        <Box paddingY="small">
            <ProgressBar fillPercentage={100} showScale />
        </Box>
    </section>
)

export const ProgressBarPlaygroundStory = (args) => (
    <section className="story">
        <ProgressBar {...args} />
    </section>
)

ProgressBarPlaygroundStory.args = {
    fillPercentage: 50,
    showScale: false,
}

ProgressBarPlaygroundStory.argTypes = {
    fillPercentage: {
        control: {
            type: 'number',
        },
    },
    showScale: {
        control: {
            type: 'boolean',
        },
    },
    className: {
        control: {
            type: null,
        },
    },
}
