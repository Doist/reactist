import React from 'react';
import { storiesOf } from '@storybook/react';
import withDocs from 'storybook-readme/with-docs';

import WelcomeText from './Welcome.md'


const reactist_story = () => storiesOf('Reactist', module)
    .add('Welcome', withDocs(WelcomeText, () => {}))

export default reactist_story
