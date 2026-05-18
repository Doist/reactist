import * as React from 'react'
import { act } from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { flushMicrotasks } from '../utils/test-helpers'

import { ContextMenuTrigger, Menu, MenuButton, MenuItem, MenuList, SubMenu } from './menu'

function getFocusedElement() {
    if (!document.activeElement) {
        throw new Error('No element with focus was found')
    }
    return document.activeElement
}

type User = ReturnType<typeof userEvent.setup>

async function click(user: User, ...args: Parameters<User['click']>) {
    await act(async () => {
        await user.click(...args)
        await flushMicrotasks()
    })
}

async function hover(user: User, ...args: Parameters<User['hover']>) {
    await act(async () => {
        await user.hover(...args)
        await flushMicrotasks()
    })
}

async function keyboard(user: User, text: string) {
    await act(async () => {
        await user.keyboard(text)
        await flushMicrotasks()
    })
}

describe('Menu', () => {
    it('renders a button that opens and closes the menu when clicked', async () => {
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList
                    aria-label="Some options"
                    // To allow interaction with the menu button
                    modal={false}
                >
                    <MenuItem>First option</MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        // querying by role doesn't work in this case as the menu and menuitem could
        // still be added to the document but as children of a hidden element. To
        // really make sure they're not in the DOM we're querying by text here
        expect(screen.queryByText('First option')).not.toBeInTheDocument()

        await click(user, screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeInTheDocument()

        await click(user, screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.queryByText('First option')).not.toBeInTheDocument()
        await flushMicrotasks()
    })

    it('closes the menu when a menu item is selected (unless the onSelect handler returns false or hideOnSelect is false)', async () => {
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem onSelect={() => undefined}>First option</MenuItem>
                    <MenuItem onSelect={() => false}>Second option</MenuItem>
                    <MenuItem onSelect={() => undefined} hideOnSelect={false}>
                        Third option
                    </MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        // 'First option' closes the menu
        await click(user, screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeVisible()

        await click(user, screen.getByRole('menuitem', { name: 'First option' }))
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()

        // 'Second option' does not close the menu
        await click(user, screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menuitem', { name: 'Second option' })).toBeVisible()

        await click(user, screen.getByRole('menuitem', { name: 'Second option' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        // 'Third option' does not close the menu
        await click(user, screen.getByRole('menuitem', { name: 'Third option' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        await flushMicrotasks()
    })

    it("calls the onSelect and the menu's onItemSelect with the value when menu items are selected", async () => {
        const onItemSelect = jest.fn()
        const onSelect = jest.fn<void, [string]>()

        render(
            <Menu onItemSelect={onItemSelect}>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem value="1st" onSelect={() => onSelect('1st option')}>
                        1st option
                    </MenuItem>
                    <MenuItem value="2nd" onSelect={() => onSelect('2nd option')}>
                        2nd option
                    </MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        for (const opt of ['1st', '2nd']) {
            await click(user, screen.getByRole('button', { name: 'Options menu' }))
            await click(user, screen.getByRole('menuitem', { name: `${opt} option` }))
            expect(onItemSelect).toHaveBeenCalledWith(opt)
            expect(onSelect).toHaveBeenCalledWith(`${opt} option`)
        }

        expect(onItemSelect).toHaveBeenCalledTimes(2)
        expect(onSelect).toHaveBeenCalledTimes(2)
        await flushMicrotasks()
    })

    it('allows to navigate through the menu items using the keyboard', async () => {
        const onItemSelect = jest.fn()
        const onSelect = jest.fn<void, [string]>()

        render(
            <Menu onItemSelect={onItemSelect}>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem value="1st" onSelect={() => onSelect('1st option')}>
                        1st option
                    </MenuItem>
                    <MenuItem value="2nd" onSelect={() => onSelect('2nd option')}>
                        2nd option
                    </MenuItem>
                    <MenuItem value="3rd" onSelect={() => onSelect('3rd option')}>
                        3rd option
                    </MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        act(() => {
            screen.getByRole('button', { name: 'Options menu' }).focus()
        })
        await keyboard(user, '{Enter}')
        expect(await screen.findByRole('menu')).toBeVisible()
        await waitFor(() => {
            expect(screen.getByRole('menu')).toHaveFocus()
        })

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
        expect(screen.getByRole('menuitem', { name: '1st option' })).toHaveFocus()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
        expect(screen.getByRole('menuitem', { name: '2nd option' })).toHaveFocus()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
        expect(screen.getByRole('menuitem', { name: '3rd option' })).toHaveFocus()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowUp' })
        expect(screen.getByRole('menuitem', { name: '2nd option' })).toHaveFocus()

        await keyboard(user, '{Enter}')

        await waitFor(() => {
            expect(onSelect).toHaveBeenCalledWith('2nd option')
            expect(onItemSelect).toHaveBeenCalledWith('2nd')
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        })
    })

    it('allows to render a menu item as a link', async () => {
        render(
            <Menu>
                <MenuButton>Links</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem render={<a href="https://github.com/Doist/reactist" />}>
                        Github repo
                    </MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        await click(user, screen.getByRole('button', { name: 'Links' }))

        // Prevent act warning
        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Github repo' })).toBeVisible()
        })

        const menuItem = screen.getByRole('menuitem', { name: 'Github repo' })
        expect(menuItem).toHaveAttribute('href', 'https://github.com/Doist/reactist')
        expect(menuItem.tagName).toEqual('A')
        // no need to test that clicking a link triggers navigation, and also navigation is not
        // supported in jsdom, so we'd need to mock window.location or something
    })

    it('allows to intercept clicks and prevent the onSelect action to occur', async () => {
        const onSelect = jest.fn()
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem
                        onClick={(event: React.MouseEvent) => event.preventDefault()}
                        onSelect={() => onSelect()}
                    >
                        Click me
                    </MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        await click(user, screen.getByRole('button', { name: 'Options menu' }))
        await click(user, screen.getByRole('menuitem', { name: 'Click me' }))

        await waitFor(() => {
            expect(screen.queryByRole('menu')).not.toBeInTheDocument()
            expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
        })

        expect(onSelect).not.toHaveBeenCalled()
    })

    it('renders a context menu when used with a ContextMenuTrigger', async () => {
        render(
            <Menu>
                <ContextMenuTrigger>Options menu</ContextMenuTrigger>
                <MenuList aria-label="Some options">
                    <MenuItem>First option</MenuItem>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        expect(screen.queryByText('First option')).not.toBeInTheDocument()

        await act(async () => {
            await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Options menu') })
            await flushMicrotasks()
        })

        expect(screen.getByRole('menu')).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeInTheDocument()

        // Close menu to avoid act warning after test ends
        await keyboard(user, '{Escape}')
        await flushMicrotasks()
    })

    it('renders a submenu when a nested menu is hovered', async () => {
        const handleSave = jest.fn()
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem>New</MenuItem>
                    <SubMenu>
                        <MenuButton>More options</MenuButton>
                        <MenuList aria-label="More options">
                            <MenuItem onSelect={handleSave}>Save</MenuItem>
                            <MenuItem>Discard</MenuItem>
                            <MenuItem>Exit</MenuItem>
                        </MenuList>
                    </SubMenu>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        await click(user, screen.getByRole('button', { name: 'Options menu' }))
        await hover(user, screen.getByRole('menuitem', { name: 'More options' }))

        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Save' })).toBeVisible()
        })

        await click(user, screen.getByRole('menuitem', { name: 'Save' }))

        expect(handleSave).toHaveBeenCalled()
        expect(screen.queryByText('More options')).not.toBeInTheDocument()
    })

    it('shows the submenu when the right arrow key is pressed', async () => {
        const handleSave = jest.fn()

        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem>New</MenuItem>
                    <SubMenu>
                        <MenuButton>More options</MenuButton>
                        <MenuList>
                            <MenuItem onSelect={handleSave}>Save</MenuItem>
                            <MenuItem>Discard</MenuItem>
                            <MenuItem>Exit</MenuItem>
                        </MenuList>
                    </SubMenu>
                </MenuList>
            </Menu>,
        )
        const user = userEvent.setup()

        await click(user, screen.getByRole('button', { name: 'Options menu' }))

        await waitFor(() => {
            expect(screen.getByRole('menu')).toHaveFocus()
        })

        await keyboard(user, '{ArrowDown}')
        expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus()

        await keyboard(user, '{ArrowDown}')
        expect(screen.getByRole('menuitem', { name: 'More options' })).toHaveFocus()

        expect(screen.queryByRole('menuitem', { name: 'Save' })).not.toBeInTheDocument()
        await keyboard(user, '{ArrowRight}')
        expect(screen.getByRole('menuitem', { name: 'Save' })).toBeVisible()
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <Menu>
                    <MenuButton>Options menu</MenuButton>
                    <MenuList aria-label="Some options">
                        <MenuItem>First option</MenuItem>
                    </MenuList>
                </Menu>,
            )
            expect(await axe(container)).toHaveNoViolations()
        })

        it('renders with no a11y violations while open', async () => {
            const { container } = render(
                <Menu>
                    <MenuButton>Options menu</MenuButton>
                    <MenuList aria-label="Some options">
                        <MenuItem onSelect={() => undefined}>First option</MenuItem>
                    </MenuList>
                </Menu>,
            )
            const user = userEvent.setup()

            // Open menu
            await click(user, screen.getByRole('button', { name: 'Options menu' }))
            expect(await axe(container)).toHaveNoViolations()
            await keyboard(user, '{Escape}')
            await flushMicrotasks()
        })

        // eslint-disable-next-line jest/no-disabled-tests
        it.skip('focuses on the MenuButton when Menu closes', async () => {
            render(
                <Menu>
                    <MenuButton>Options menu</MenuButton>
                    <MenuList aria-label="Some options">
                        <MenuItem onSelect={() => undefined}>First option</MenuItem>
                    </MenuList>
                </Menu>,
            )
            const user = userEvent.setup()

            // Open menu
            await click(user, screen.getByRole('button', { name: 'Options menu' }))

            await waitFor(() => {
                expect(screen.getByRole('menu')).toHaveFocus()
            })

            await keyboard(user, '{Escape}') // Close menu
            await flushMicrotasks()

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Options menu' })).toHaveFocus()
            })
        })
    })
})
