import './styles/progressbar_story.less'

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
        <ProgressBar fillPercentage={0} />
        <ProgressBar fillPercentage={25} />
        <ProgressBar fillPercentage={50} />
        <ProgressBar fillPercentage={75} />
        <ProgressBar fillPercentage={100} />
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
    fillPercentage: { control: { type: 'number' } },
    className: { control: { type: null } },
}
