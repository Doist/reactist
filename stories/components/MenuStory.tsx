import './styles/menu_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { optionsSourceOnly } from '../utils/StoryUtils'

import { Menu, MenuButton, MenuList, MenuItem, SubMenu, MenuGroup } from '../../src/components/Menu'

function MenuIndicator() {
    return (
        <svg viewBox="0 0 50 43.3">
            <polygon points="25 43.3 50 0 0 0 25 43.3"></polygon>
        </svg>
    )
}

//
// Simple menus
//

function SimpleMenuExample() {
    const [flag, setFlag] = React.useState(false)
    return (
        <section className="story">
            <Menu>
                <MenuButton variant="primary">
                    Simple menu <MenuIndicator />
                </MenuButton>
                <MenuList>
                    <MenuItem label="Edit" onSelect={action('Edit')} />
                    <MenuItem label="Duplicate" onSelect={action('Duplicate')} />
                    <MenuItem label="Remove" onSelect={action('Remove')} />
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton variant="secondary">
                    With sub-menu <MenuIndicator />
                </MenuButton>
                <MenuList aria-label="With sub-menu">
                    <MenuItem label="About Reactist…" onSelect={action('About Reactist…')} />
                    <MenuItem label="Check for updates…" onSelect={action('Check for updates…')} />
                    <hr />
                    <SubMenu label="Preferences">
                        <MenuList>
                            <MenuItem label="Settings" onSelect={action('Settings')} />
                            <MenuItem label="Extensions" onSelect={action('Extensions')} />
                            <hr />
                            <MenuItem label="Notifications" onSelect={action('Notifications')} />
                        </MenuList>
                    </SubMenu>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton variant="link">
                    Menu with extra features <MenuIndicator />
                </MenuButton>
                <MenuList>
                    <MenuItem icon="✏️" label="Edit" onSelect={action('Edit')} />
                    <MenuItem
                        icon="🍻"
                        label="Duplicate"
                        shortcut="Cmd + D"
                        onSelect={action('Duplicate')}
                    />
                    <MenuItem
                        icon={flag ? '👍' : '👎'}
                        label="Toggle thumbs up or down"
                        onSelect={() => {
                            action(flag ? 'Toggle off' : 'Toggle on')(flag ? '👎' : '👍')
                            setFlag((f) => !f)
                            return false // This prevents the menu from closing
                        }}
                    />
                    <hr />
                    <MenuGroup label="Dangerous options">
                        <MenuItem
                            icon="😱"
                            disabled
                            label="Remove all (disabled)"
                            onSelect={action('Remove all')}
                        />
                        <MenuItem
                            icon="⛔"
                            label="Remove first"
                            onSelect={action('Remove first')}
                        />
                        <MenuItem
                            icon="☑️"
                            label="Remove completed"
                            onSelect={action('Remove completed')}
                        />
                    </MenuGroup>
                </MenuList>
            </Menu>
        </section>
    )
}

const SimpleMenuChapter = {
    subtitle: 'Some menu examples',
    sections: [{ sectionFn: () => <SimpleMenuExample />, options: optionsSourceOnly }],
}

//
// List of items, each with its own options menu
//

function Item({ value, name }: { value: string; name: string }) {
    function getLabel(actionName: string) {
        return `${actionName} '${name}'`
    }
    const ariaLabel = getLabel('Options menu for')
    return (
        <li className="item_box">
            <div className="item_name">{name}</div>
            <Menu onItemSelect={(optionId) => action(`${String(optionId)} '${name}'`)(value)}>
                <MenuButton aria-label={ariaLabel}>⋯</MenuButton>
                <MenuList aria-label={ariaLabel}>
                    <MenuItem value="edit" label={getLabel('Edit')} />
                    <MenuItem value="duplicate" label={getLabel('Duplicate')} />
                    <hr />
                    <MenuItem value="remove" label={getLabel('Remove')} />
                </MenuList>
            </Menu>
        </li>
    )
}

const items = [
    { value: '1', name: 'First item' },
    { value: '2', name: 'Second item' },
    { value: '3', name: 'Third item' },
]

function OverflowMenuExample() {
    return (
        <section className="story">
            <p>
                This example is meant to be expanded with future features we plan to support (such
                as allowing to control the visible state of the menu from outside, and allow it to
                be used as a context menu).
            </p>
            <ul>
                {items.map((item) => (
                    <Item {...item} />
                ))}
            </ul>
        </section>
    )
}

const OverflowMenuChapter = {
    subtitle: 'A list of items with an overflow options menu',
    sections: [{ sectionFn: () => <OverflowMenuExample />, options: optionsSourceOnly }],
}

// Story setup ================================================================
function Story() {
    storiesOf('Menu', module).addWithChapters('Component Overview', {
        chapters: [SimpleMenuChapter, OverflowMenuChapter],
    })
}

export default Story
