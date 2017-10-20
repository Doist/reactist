import './components/styles/story.less'

import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactistStory from './reactist/ReactistStory'
import ButtonStory from './components/ButtonStory'
import ModalStory from './components/ModalStory'
import TimeStory from './components/TimeStory'
import DropdownStory from './components/DropdownStory'
import ProgressBarStory from './components/ProgressBarStory'
import SelectStory from './components/SelectStory'

ReactistStory()
ButtonStory()
ModalStory()
TimeStory()
DropdownStory()
ProgressBarStory()
SelectStory()
