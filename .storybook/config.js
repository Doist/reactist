import 'storybook-readme/register';

import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options'
import chaptersAddon from 'react-storybook-addon-chapters'

setAddon(chaptersAddon)
setOptions({
    name: 'Reactist',
    url: 'https://github.com/Doist/reactist'
})

function loadStories() {
    require('./stories');
}

configure(loadStories, module);
