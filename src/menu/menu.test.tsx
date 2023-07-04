import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
    ContextMenuTrigger,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    SubMenu,
    MenuHandle,
} from './menu'
import { axe } from 'jest-axe'

function getFocusedElement() {
    if (!document.activeElement) {
        throw new Error('No element with focus was found')
    }
    return document.activeElement
}

describe('Menu', () => {
    it('renders a button that opens and closes the menu when clicked', () => {
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList
                    aria-label="Some options"
                    // To allow interaction with the menu button
                    modal={false}
                >
                    <MenuItem label="First option" />
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
    })

    it('closes the menu when a menu item is selected (unless the onSelect handler returns false or hideOnSelect is false)', () => {
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem onSelect={() => undefined} label="First option" />
                    <MenuItem onSelect={() => false} label="Second option" />
                    <MenuItem
                        onSelect={() => undefined}
                        hideOnSelect={false}
                        label="Third option"
                    />
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
    })

    it("calls the onSelect and the menu's onItemSelect with the value when menu items are selected", () => {
        const onItemSelect = jest.fn()
        const onSelect = jest.fn<void, [string]>()

        render(
            <Menu onItemSelect={onItemSelect}>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem
                        value="1st"
                        label="1st option"
                        onSelect={() => onSelect('1st option')}
                    />
                    <MenuItem
                        value="2nd"
                        label="2nd option"
                        onSelect={() => onSelect('2nd option')}
                    />
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
    })

    it('allows to navigate through the menu items using the keyboard', async () => {
        const onItemSelect = jest.fn()
        const onSelect = jest.fn<void, [string]>()

        render(
            <Menu onItemSelect={onItemSelect}>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem
                        value="1st"
                        label="1st option"
                        onSelect={() => onSelect('1st option')}
                    />
                    <MenuItem
                        value="2nd"
                        label="2nd option"
                        onSelect={() => onSelect('2nd option')}
                    />
                    <MenuItem
                        value="3rd"
                        label="3rd option"
                        onSelect={() => onSelect('3rd option')}
                    />
                </MenuList>
            </Menu>,
        )

        screen.getByRole('button', { name: 'Options menu' }).focus()
        userEvent.keyboard('{Enter}')

        await waitFor(() => {
            expect(screen.getByRole('menu')).toBeVisible()
            expect(screen.getByRole('menuitem', { name: '1st option' })).toHaveFocus()
        })

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
                    <MenuItem as="a" href="https://github.com/Doist/reactist" label="Github repo" />
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

    it('uses the description as the semantic description of the menu item', () => {
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem
                        label="Sign-out"
                        description="All your work is saved before signing out"
                    />
                </MenuList>
            </Menu>,
        )
        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menuitem', { name: 'Sign-out' })).toHaveAccessibleDescription(
            'All your work is saved before signing out',
        )
    })

    it('allows to override the aria label and description of the menu item', () => {
        render(
            <>
                <Menu>
                    <MenuButton>Options menu</MenuButton>
                    <MenuList aria-label="Some options">
                        <MenuItem
                            aria-label="Alternative label"
                            aria-describedby="logout-description"
                            label="Sign-out"
                            description="All your work is saved before signing out"
                        />
                    </MenuList>
                </Menu>
                <div id="logout-description">Alternative description</div>
            </>,
        )
        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        expect(
            screen.getByRole('menuitem', { name: 'Alternative label' }),
        ).toHaveAccessibleDescription('Alternative description')
    })

    it('supports rendering custom menu item content using the `children` prop', () => {
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem label="Edit">Custom edit content</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </MenuList>
            </Menu>,
        )
        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveTextContent(
            'Custom edit content',
        )
        expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
    })

    it('allows to intercept clicks and prevent the onSelect action to occur', async () => {
        const onSelect = jest.fn()
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem
                        label="Click me"
                        onClick={(event: React.MouseEvent) => event.preventDefault()}
                        onSelect={() => onSelect()}
                    />
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

    it('renders a context menu when used with a ContextMenuTrigger', () => {
        render(
            <Menu>
                <ContextMenuTrigger>Options menu</ContextMenuTrigger>
                <MenuList aria-label="Some options">
                    <MenuItem label="First option" />
                </MenuList>
            </Menu>,
        )

        expect(screen.queryByText('First option')).not.toBeInTheDocument()

        userEvent.click(screen.getByText('Options menu'), { button: 2 })

        expect(screen.getByRole('menu')).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: 'First option' })).toBeInTheDocument()

        // Close menu to avoid act warning after test ends
        userEvent.keyboard('{Escape}')
    })

    it('renders a submenu when a nested menu button is clicked', async () => {
        const handleSave = jest.fn()
        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem>New</MenuItem>
                    <SubMenu>
                        <MenuButton>More options</MenuButton>
                        <MenuList aria-label="More options">
                            <MenuItem label="Save" onSelect={handleSave} />
                            <MenuItem label="Discard" />
                            <MenuItem label="Exit" />
                        </MenuList>
                    </SubMenu>
                </MenuList>
            </Menu>,
        )

        userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        userEvent.click(screen.getByRole('menuitem', { name: 'More options' }))

        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Save' })).toBeVisible()
        })

        userEvent.click(screen.getByRole('menuitem', { name: 'Save' }))

        expect(handleSave).toHaveBeenCalled()
        expect(screen.queryByText('More options')).not.toBeInTheDocument()
    })

    it('focuses on the submenu when the right arrow key is pressed', async () => {
        const handleSave = jest.fn()

        render(
            <Menu>
                <MenuButton>Options menu</MenuButton>
                <MenuList aria-label="Some options">
                    <MenuItem>New</MenuItem>
                    <SubMenu>
                        <MenuButton>More options</MenuButton>
                        <MenuList>
                            <MenuItem label="Save" onSelect={handleSave} />
                            <MenuItem label="Discard" />
                            <MenuItem label="Exit" />
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

        userEvent.keyboard('{ArrowRight}')

        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Save' })).toHaveFocus()
        })

        userEvent.keyboard('{Enter}')

        await waitFor(() => {
            expect(handleSave).toHaveBeenCalled()
            expect(screen.queryByText('More options')).not.toBeInTheDocument()
        })
    })

    it('can be open programmatically', () => {
        function OpenMenuWithKeyboard() {
            const menuRef = React.useRef<MenuHandle>(null)

            React.useEffect(() => {
                function handleKeyDown(event: KeyboardEvent) {
                    if (event.key === '$' && event.ctrlKey && event.shiftKey && menuRef.current) {
                        event.preventDefault()
                        event.stopPropagation()
                        menuRef.current.open()
                    }
                }
                window.addEventListener('keydown', handleKeyDown)
                return () => window.removeEventListener('keydown', handleKeyDown)
            }, [])

            return (
                <Menu ref={menuRef}>
                    <MenuButton>Menu</MenuButton>
                    <MenuList aria-label="Settings menu">
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            )
        }

        render(<OpenMenuWithKeyboard />)
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
        userEvent.keyboard('{ctrl}{shift}$')
        expect(screen.getByRole('menuitem', { name: 'Logout' })).toBeInTheDocument()
        userEvent.keyboard('{Escape}')
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
    })

    describe('a11y', () => {
        it('renders with no a11y violations', async () => {
            const { container } = render(
                <Menu>
                    <MenuButton>Options menu</MenuButton>
                    <MenuList aria-label="Some options">
                        <MenuItem label="First option" />
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
                        <MenuItem onSelect={() => undefined} label="First option" />
                    </MenuList>
                </Menu>,
            )

            userEvent.click(screen.getByRole('button', { name: 'Options menu' }))
            expect(await axe(container)).toHaveNoViolations()
        })

        it('focuses on the MenuButton when Menu closes', async () => {
            const { container } = render(
                <Menu>
                    <MenuButton>Options menu</MenuButton>
                    <MenuList aria-label="Some options">
                        <MenuItem onSelect={() => undefined} label="First option" />
                    </MenuList>
                </Menu>,
            )

            // Open menu
            userEvent.click(screen.getByRole('button', { name: 'Options menu' }))

            await waitFor(() => {
                expect(screen.getByRole('menu')).toHaveFocus()
            })

            // Close menu
            userEvent.type(container, '{esc}')

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Options menu' })).toHaveFocus()
            })
        })
    })
})
