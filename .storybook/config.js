import { configure, setAddon, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { withKnobs } from '@storybook/addon-knobs/react'
import chaptersAddon from 'react-storybook-addon-chapters'

setAddon(chaptersAddon)
setOptions({
    name: 'Reactist',
    url: 'https://github.com/Doist/reactist',
})

addDecorator(withKnobs)

const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
    require('../stories')
    req.keys().forEach((file) => req(file))
}

configure(loadStories, module)
