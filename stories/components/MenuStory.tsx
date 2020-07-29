import './styles/menu_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { optionsSourceOnly } from '../utils/StoryUtils'

import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, SubMenu } from '../../src/components/Menu'
import KeyboardShortcut from '../../src/components/KeyboardShortcut'
import Button from '../../src/components/Button'

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
                <MenuButton as={Button} variant="primary">
                    Simple menu <MenuIndicator />
                </MenuButton>
                <MenuList aria-label="Simple menu">
                    <MenuItem onSelect={action('Edit')}>Edit</MenuItem>
                    <MenuItem onSelect={action('Duplicate')}>Duplicate</MenuItem>
                    <MenuItem onSelect={action('Remove')}>Remove</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} variant="secondary" tooltip="And a tooltip too">
                    With sub-menu <MenuIndicator />
                </MenuButton>
                <MenuList aria-label="With sub-menu">
                    <MenuItem
                        as="a"
                        href="https://github.com/Doist/reactist"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Reactist on Github
                    </MenuItem>
                    <MenuItem onSelect={action('About Reactist…')}>About Reactist…</MenuItem>
                    <MenuItem onSelect={action('Check for updates…')}>Check for updates…</MenuItem>
                    <hr />
                    <SubMenu>
                        <MenuButton>Preferences</MenuButton>
                        <MenuList>
                            <MenuItem onSelect={action('Settings')}>Settings</MenuItem>
                            <MenuItem onSelect={action('Extensions')}>Extensions</MenuItem>
                            <hr />
                            <MenuItem onSelect={action('Notifications')}>Notifications</MenuItem>
                        </MenuList>
                    </SubMenu>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton>
                    With extra features <MenuIndicator />
                </MenuButton>
                <MenuList aria-label="Menu with extra features">
                    <MenuItem onSelect={action('Edit')}>
                        <span className="menu_item_icon" aria-hidden>
                            ✏️
                        </span>
                        <span className="menu_item_label">Edit</span>
                    </MenuItem>
                    <MenuItem onSelect={action('Duplicate')}>
                        <span className="menu_item_icon" aria-hidden>
                            👯‍♀️
                        </span>
                        <span className="menu_item_label">Duplicate</span>
                        <KeyboardShortcut>Cmd + D</KeyboardShortcut>
                    </MenuItem>
                    <MenuItem
                        onSelect={() => {
                            action(flag ? 'Toggle off' : 'Toggle on')(flag ? '👎' : '👍')
                            setFlag((f) => !f)
                            return false // This prevents the menu from closing
                        }}
                    >
                        <span className="menu_item_icon" aria-hidden>
                            {flag ? '👍' : '👎'}
                        </span>
                        <span className="menu_item_label">Toggle thumbs up or down</span>
                    </MenuItem>
                    <hr />
                    <MenuGroup label="Dangerous options">
                        <MenuItem onSelect={action('Remove first')}>Remove first</MenuItem>
                        <MenuItem onSelect={action('Remove completed')}>Remove completed</MenuItem>
                        <MenuItem disabled onSelect={action('Remove all')}>
                            Remove all (disabled)
                        </MenuItem>
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
            <Menu onItemSelect={(itemValue) => action(`${String(itemValue)} '${name}'`)(value)}>
                <MenuButton as={Button} aria-label={ariaLabel}>
                    ⋯
                </MenuButton>
                <MenuList aria-label={ariaLabel}>
                    <MenuItem value="edit">{getLabel('Edit')}</MenuItem>
                    <MenuItem value="duplicate">{getLabel('Duplicate')}</MenuItem>
                    <hr />
                    <MenuItem value="remove">{getLabel('Remove')}</MenuItem>
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
