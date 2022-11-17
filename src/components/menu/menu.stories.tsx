import * as React from 'react'
import { action } from '@storybook/addon-actions'
import KeyboardShortcut from '../keyboard-shortcut'
import { Button } from '../../new-components/button'
import { Inline } from '../../new-components/inline'
import { Stack } from '../../new-components/stack'
import { Columns, Column } from '../../new-components/columns'
import { ContextMenuTrigger, Menu, MenuButton, MenuList, MenuItem, MenuGroup, SubMenu } from '.'
import { ButtonLink } from '../../new-components/button-link'
import { Text } from '../../new-components/text'

function MenuIndicator() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
        </svg>
    )
}

// Story setup ================================================================

export default {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        badges: ['accessible'],
    },
}

//
// Simple menus
//

function StructuredMenuItem({
    icon,
    label,
    shortcut,
}: {
    icon?: React.ReactNode
    label: NonNullable<React.ReactNode>
    shortcut?: string
}) {
    return (
        <Columns space="small" width="full" flexGrow={1}>
            {icon ? (
                <Column width="content" aria-hidden>
                    {icon}
                </Column>
            ) : null}
            <Column width="auto">
                <div>{label}</div>
            </Column>
            {shortcut ? (
                <Column width="content">
                    <KeyboardShortcut>{shortcut}</KeyboardShortcut>
                </Column>
            ) : null}
        </Columns>
    )
}

export function SimpleMenuExample() {
    const [flag, setFlag] = React.useState(false)
    return (
        <section className="story">
            <p>Some menu examples</p>
            <Inline space="large">
                <Menu>
                    <MenuButton as={Button} variant="primary" endIcon={<MenuIndicator />}>
                        Simple menu
                    </MenuButton>
                    <MenuList aria-label="Simple menu">
                        <MenuItem onSelect={action('Edit')}>Edit</MenuItem>
                        <MenuItem onSelect={action('Copy')}>Copy</MenuItem>
                        <MenuItem onSelect={action('Paste')}>Paste</MenuItem>
                        <MenuItem onSelect={action('Duplicate')}>Duplicate</MenuItem>
                        <MenuItem onSelect={action('Remove')}>Remove</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton
                        as={Button}
                        variant="secondary"
                        tooltip="And a tooltip too"
                        endIcon={<MenuIndicator />}
                    >
                        With sub-menu
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
                        <MenuItem onSelect={action('Check for updates…')}>
                            Check for updates…
                        </MenuItem>
                        <hr />
                        <SubMenu>
                            <MenuButton>Preferences</MenuButton>
                            <MenuList>
                                <MenuItem onSelect={action('Settings')}>Settings</MenuItem>
                                <MenuItem onSelect={action('Extensions')}>Extensions</MenuItem>
                                <hr />
                                <MenuItem onSelect={action('Notifications')}>
                                    Notifications
                                </MenuItem>
                            </MenuList>
                        </SubMenu>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} variant="tertiary" endIcon={<MenuIndicator />}>
                        With extra features
                    </MenuButton>
                    <MenuList aria-label="Menu with extra features">
                        <MenuItem onSelect={action('Edit')}>
                            <StructuredMenuItem icon="✏" label="Edit" />
                        </MenuItem>
                        <MenuItem onSelect={action('Duplicate')}>
                            <StructuredMenuItem icon="👯‍♀️️" label="Duplicate" shortcut="Cmd + D" />
                        </MenuItem>
                        <MenuItem
                            onSelect={() => {
                                action(flag ? 'Toggle off' : 'Toggle on')(flag ? '👎' : '👍')
                                setFlag((f) => !f)
                                return false // This prevents the menu from closing
                            }}
                        >
                            <StructuredMenuItem
                                icon={flag ? '👍' : '👎'}
                                label="Toggle thumbs up or down"
                            />
                        </MenuItem>
                        <hr />
                        <MenuGroup label="Dangerous options">
                            <MenuItem onSelect={action('Remove first')}>Remove first</MenuItem>
                            <MenuItem onSelect={action('Remove completed')}>
                                Remove completed
                            </MenuItem>
                            <MenuItem disabled onSelect={action('Remove all')}>
                                Remove all (disabled)
                            </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Inline>
        </section>
    )
}

//
// List of items, each with its own options menu
//

function OverflowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
        >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
    )
}

function Item({ value, name }: { value: string; name: string }) {
    function getLabel(actionName: string) {
        return `${actionName} '${name}'`
    }
    const ariaLabel = getLabel('Options menu for')
    return (
        <Columns as="li" border="primary" borderRadius="standard" padding="small" alignY="center">
            <Column width="auto">{name}</Column>
            <Column width="content">
                <Menu onItemSelect={(itemValue) => action(`${String(itemValue)} '${name}'`)(value)}>
                    <MenuButton
                        as={Button}
                        variant="quaternary"
                        icon={<OverflowIcon />}
                        aria-label={ariaLabel}
                    />
                    <MenuList aria-label={ariaLabel}>
                        <MenuItem value="edit">{getLabel('Edit')}</MenuItem>
                        <MenuItem value="duplicate">{getLabel('Duplicate')}</MenuItem>
                        <hr />
                        <MenuItem value="remove">{getLabel('Remove')}</MenuItem>
                    </MenuList>
                </Menu>
            </Column>
        </Columns>
    )
}

const items = [
    { value: '1', name: 'First item' },
    { value: '2', name: 'Second item' },
    { value: '3', name: 'Third item' },
]

export function OverflowMenuExample() {
    return (
        <section className="story">
            <p>A list of items with an overflow options menu</p>
            <p>
                This example is meant to be expanded with future features we plan to support (such
                as allowing to control the visible state of the menu from outside, and allow it to
                be used as a context menu).
            </p>
            <Stack as="ul" space="small">
                {items.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </Stack>
        </section>
    )
}

export function ContextMenuExample() {
    return (
        <section className="story">
            <Stack space="small">
                <Text>Right click on the Settings button, or click on the more button:</Text>
                <Menu>
                    <Inline space="xsmall">
                        <ContextMenuTrigger
                            as={ButtonLink}
                            variant="primary"
                            width="xsmall"
                            href="https://todoist.com/app/settings"
                            openInNewTab
                        >
                            Settings
                        </ContextMenuTrigger>

                        <MenuButton
                            as={Button}
                            variant="secondary"
                            icon={<MenuIndicator />}
                            aria-label="More"
                        />
                    </Inline>

                    <MenuList aria-label="Settings menu">
                        <MenuItem onSelect={action('Account')}>Account</MenuItem>
                        <MenuItem onSelect={action('General')}>General</MenuItem>
                        <MenuItem onSelect={action('Advanced')}>Advanced</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
        </section>
    )
}
