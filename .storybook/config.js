import { configure, setAddon } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import chaptersAddon from 'react-storybook-addon-chapters'
import { addParameters } from '@storybook/react'

addParameters({
    themes: [
        { name: 'Twist Light', class: 'reactist_theme_twist_light', color: 'white', default: true },
        { name: 'Twist Dark', class: 'reactist_theme_twist_dark', color: 'black' },
    ],
})

setAddon(chaptersAddon)
setOptions({
    name: 'Reactist',
    url: 'https://github.com/Doist/reactist',
})

const loadStories = () => require('../stories')
configure(loadStories, module)
