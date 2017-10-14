import { configure } from '@storybook/react';
import 'storybook-readme/register';

function loadStories() {
  require('./stories');
}

configure(loadStories, module);
