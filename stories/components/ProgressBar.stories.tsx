import './styles/progressbar_story.less'

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

export const ProgressBarPlaygroundStory = (args) => (
    <section className="story">
        <ProgressBar {...args} />
    </section>
)

ProgressBarPlaygroundStory.args = {
    fillPercentage: 50,
}

ProgressBarPlaygroundStory.argTypes = {
    fillPercentage: {
        control: {
            type: 'number',
        },
    },
    className: {
        control: {
            type: null,
        },
    },
}
