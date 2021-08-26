import BaseDecorator from './BaseDecorator'
import '../stories/components/styles/story.less'

export const decorators = [BaseDecorator]

export const parameters = {
    viewMode: 'docs',
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Reactist', 'Design tokens', 'Design system', 'Hooks', 'Components'],
        },
    },
    decorators,
}
