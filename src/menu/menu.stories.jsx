import * as React from 'react'

import { Button, IconButton } from '../button'
import { Column, Columns } from '../columns'
import KeyboardShortcut from '../components/keyboard-shortcut'
import { Inline } from '../inline'
import { Stack } from '../stack'
import { Text } from '../text'

import { ContextMenuTrigger, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SubMenu } from '.'

function ArrowDown() {
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

function ArrowRight() {
    return (
        <svg width="24" height="24">
            <path
                d="M14.243 12L9.646 7.404a.5.5 0 1 1 .708-.707l4.95 4.95a.5.5 0 0 1 0 .707l-4.95 4.95a.5.5 0 0 1-.708-.708L14.243 12z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    )
}

function StructuredMenuItem({ icon, label, shortcut }) {
    return (
        <Columns space="small" width="full" flexGrow={1}>
            {icon ? (
                <Column width="content" aria-hidden>
                    {icon}
                </Column>
            ) : null}
            <Column width="auto">
                <Text size="copy">{label}</Text>
            </Column>
            {shortcut ? (
                <Column width="content">
                    <KeyboardShortcut>{shortcut}</KeyboardShortcut>
                </Column>
            ) : null}
        </Columns>
    )
}

export default {
    title: '📑 Menus & tabs/Menu',
    component: Menu,

    parameters: {
        badges: ['accessible'],
        figma: {
            label: 'Web › Components / Todoist › Context Menus › Context Menu',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=2057-40323',
        },
    },
}

export const SimpleMenuStory = {
    render: () => (
        <Menu>
            <MenuButton render={<Button variant="primary" endIcon={<ArrowDown />} />}>
                Simple menu
            </MenuButton>
            <MenuList aria-label="Simple menu">
                <MenuItem>Edit</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Remove</MenuItem>
            </MenuList>
        </Menu>
    ),

    name: 'Simple Menu Story',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
}

export const TooltipStory = {
    render: () => (
        <Menu>
            <MenuButton render={<Button variant="primary" tooltip="I have a tooltip" />}>
                Focus on or hover over me
            </MenuButton>
            <MenuList aria-label="Tooltip menu">
                <MenuItem>Edit</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Remove</MenuItem>
            </MenuList>
        </Menu>
    ),

    name: 'Tooltip Story',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
}

export const OutsideInteractionStory = {
    render: () => (
        <Menu>
            <MenuButton render={<Button variant="primary" />}>Menu</MenuButton>
            <MenuList aria-label="Outside interaction menu" modal={false}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Remove</MenuItem>
            </MenuList>
        </Menu>
    ),

    name: 'Outside Interaction Story',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
}

export const SubMenuStory = {
    render: () => (
        <Menu>
            <MenuButton render={<Button variant="secondary" endIcon={<ArrowDown />} />}>
                With SubMenu
            </MenuButton>
            <MenuList aria-label="With SubMenu">
                <MenuItem
                    render={
                        <a
                            href="https://github.com/Doist/reactist"
                            target="_blank"
                            rel="noreferrer noopener"
                        />
                    }
                >
                    Reactist on Github
                </MenuItem>
                <MenuItem>About Reactist…</MenuItem>
                <MenuItem>Check for updates…</MenuItem>
                <hr />
                <SubMenu>
                    <MenuButton>
                        Preferences
                        <ArrowRight />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Extensions</MenuItem>
                        <hr />
                        <MenuItem>Notifications</MenuItem>
                    </MenuList>
                </SubMenu>
            </MenuList>
        </Menu>
    ),

    name: 'SubMenu Story',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
}

export const ContextMenuTriggerStory = {
    render: () => (
        <Stack space="small">
            <Menu>
                <Inline space="xsmall">
                    <ContextMenuTrigger render={<Button variant="primary" width="xsmall" />}>
                        Settings
                    </ContextMenuTrigger>
                    <MenuButton
                        render={
                            <IconButton
                                variant="secondary"
                                icon={<ArrowDown />}
                                aria-label="More"
                            />
                        }
                    />
                </Inline>
                <MenuList aria-label="Settings menu">
                    <MenuItem>Account</MenuItem>
                    <MenuItem>General</MenuItem>
                    <MenuItem>Advanced</MenuItem>
                </MenuList>
            </Menu>
        </Stack>
    ),

    name: 'ContextMenuTrigger Story',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
}

export const ExtraFeaturesStory = {
    render: () => (
        // This prevents the menu from closing
        <Menu>
            <MenuButton render={<Button variant="tertiary" endIcon={<ArrowDown />} />}>
                With extra features
            </MenuButton>
            <MenuList aria-label="Menu with extra features">
                <MenuItem>
                    <StructuredMenuItem icon="✏" label="Edit" />
                </MenuItem>
                <MenuItem>
                    <StructuredMenuItem icon="👯‍♀️️" label="Duplicate" shortcut="Cmd + D" />
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        return false
                    }}
                >
                    <StructuredMenuItem icon="👀" label="This will not close the menu" />
                </MenuItem>
                <hr />
                <MenuGroup label="Dangerous options">
                    <MenuItem>Remove first</MenuItem>
                    <MenuItem>Remove completed</MenuItem>
                    <MenuItem disabled>Remove all (disabled)</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    ),

    name: 'Extra Features Story',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },
}
