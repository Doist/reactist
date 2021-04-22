import BaseDecorator from './BaseDecorator'
import '../stories/components/styles/story.less'

export const decorators = [BaseDecorator]

export const parameters = {
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Reactist'],
        },
    },
    decorators,
}
