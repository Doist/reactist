import './styles/menubutton_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import { MenuButton, MenuButtonItem } from '../../../src/components/MenuButton'

// Story Definitions ==========================================================
const MenuButtonPropTypesStory = getPropTypesStory(MenuButton, MenuButtonItem)
const MenuButtonPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [{ sectionFn: MenuButtonPropTypesStory, options: optionsNoSourceNoProps }]
}

const MenuButtonStory = () => (
    <section className='story'>
        <MenuButton name='Menu Button Trigger' />
    </section>
)
const MenuButtonChapter = {
    subtitle: 'Menu Button without items',
    sections: [{ sectionFn: MenuButtonStory, options: optionsSourceOnly }]
}

const MenuButtonWithItemsStory = () => (
    <section className='story'>
    <MenuButton name='Menu Button Trigger'>
            <MenuButtonItem>Item 1</MenuButtonItem>
            <MenuButtonItem>Item 2</MenuButtonItem>
            <MenuButtonItem>Item 3</MenuButtonItem>
            <MenuButtonItem>Item 4</MenuButtonItem>
        </MenuButton>
    </section>
)
const MenuButtonWithItemsChapter = {
    subtitle: 'Menu Button with items',
    sections: [{ sectionFn: MenuButtonWithItemsStory, options: optionsSourceOnly }]
}

// Story setup ================================================================
const menu_button_story = () =>
storiesOf('MenuButton', module)
    .addWithChapters('Component Overview', {
        chapters: [
            MenuButtonPropTypesChapter,
            MenuButtonChapter,
            MenuButtonWithItemsChapter
        ]
    })

export default menu_button_story
