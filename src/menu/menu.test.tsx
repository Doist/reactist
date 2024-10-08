import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContextMenuTrigger, Menu, MenuButton, MenuList, MenuItem, SubMenu } from './menu'
import { axe } from 'jest-axe'
import { flushMicrotasks } from '../utils/test-helpers'

function getFocusedElement() {
    if (!document.activeElement) {
        throw new Error('No element with focus was found')
    }
    return document.activeElement
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

        // querying by role doesn't work in this case as the menu and menuitem could
        // still be added to the document but as children of a hidden element. To
        // really make sure they're not in the DOM we're querying by text here
        expect(screen.queryByText('First option')).not.toBeInTheDocument()

        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeInTheDocument()

        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
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

        // 'First option' closes the menu
        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeVisible()

        userEvent.click(screen.getByRole('menuitem', { name: 'First option' }))
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()

        // 'Second option' does not close the menu
        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menuitem', { name: 'Second option' })).toBeVisible()

        userEvent.click(screen.getByRole('menuitem', { name: 'Second option' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        // 'Third option' does not close the menu
        userEvent.click(screen.getByRole('menuitem', { name: 'Third option' }))
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

        for (const opt of ['1st', '2nd']) {
            userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
            userEvent.click(screen.getByRole('menuitem', { name: `${opt} option` }))
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

        screen.getByRole('button', { name: 'Options menu' }).focus()
        userEvent.keyboard('{Enter}')
        expect(await screen.findByRole('menu')).toBeVisible()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
        expect(screen.getByRole('menuitem', { name: '1st option' })).toHaveFocus()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
        expect(screen.getByRole('menuitem', { name: '2nd option' })).toHaveFocus()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
        expect(screen.getByRole('menuitem', { name: '3rd option' })).toHaveFocus()

        fireEvent.keyDown(getFocusedElement(), { key: 'ArrowUp' })
        expect(screen.getByRole('menuitem', { name: '2nd option' })).toHaveFocus()

        userEvent.keyboard('{Enter}')

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
        userEvent.click(screen.getByRole('button', { name: 'Links' }))

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

        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        userEvent.click(screen.getByRole('menuitem', { name: 'Click me' }))

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

        expect(screen.queryByText('First option')).not.toBeInTheDocument()

        userEvent.click(screen.getByText('Options menu'), { button: 2 })

        expect(screen.getByRole('menu')).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeInTheDocument()

        // Close menu to avoid act warning after test ends
        userEvent.keyboard('{Escape}')
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

        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        userEvent.hover(screen.getByRole('menuitem', { name: 'More options' }))

        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Save' })).toBeVisible()
        })

        userEvent.click(screen.getByRole('menuitem', { name: 'Save' }))

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

        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))

        await waitFor(() => {
            expect(screen.getByRole('menu')).toHaveFocus()
        })

        userEvent.keyboard('{ArrowDown}')
        expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus()

        userEvent.keyboard('{ArrowDown}')
        expect(screen.getByRole('menuitem', { name: 'More options' })).toHaveFocus()

        expect(screen.queryByRole('menuitem', { name: 'Save' })).not.toBeInTheDocument()
        userEvent.keyboard('{ArrowRight}')
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

            // Open menu
            userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
            expect(await axe(container)).toHaveNoViolations()
            userEvent.keyboard('{Escape}')
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

            // Open menu
            userEvent.click(screen.getByRole('button', { name: 'Options menu' }))

            await waitFor(() => {
                expect(screen.getByRole('menu')).toHaveFocus()
            })

            userEvent.keyboard('{Escape}') // Close menu
            await flushMicrotasks()

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Options menu' })).toHaveFocus()
            })
        })
    })
})
