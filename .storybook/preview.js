import BaseDecorator from './BaseDecorator'

export const decorators = [BaseDecorator]

export const parameters = {
    options: {
        storySort: {
            method: 'alphabetical',
        },
    },
    decorators,
}
