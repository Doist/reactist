import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Menu, MenuButton, MenuList, MenuItem } from '../Menu'

function getFocusedElement() {
    if (!document.activeElement) {
        throw new Error('No element with focus was found')
    }
    return document.activeElement
}

it('renders a button that opens and closes the menu when clicked', () => {
    render(
        <Menu>
            <MenuButton>Options menu</MenuButton>
            <MenuList aria-label="Some options">
                <MenuItem label="First option" />
            </MenuList>
        </Menu>,
    )
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Options menu' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'First option' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Options menu' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
})

it('closes the menu when a menu item is selected (unless the onSelect handler returns false or hideOnSelect is false)', () => {
    render(
        <Menu>
            <MenuButton>Options menu</MenuButton>
            <MenuList aria-label="Some options">
                <MenuItem label="First option" onSelect={() => undefined} />
                <MenuItem label="Second option" onSelect={() => false} />
                <MenuItem label="Third option" onSelect={() => undefined} hideOnSelect={false} />
            </MenuList>
        </Menu>,
    )

    // 'First option' closes the menu
    fireEvent.click(screen.getByRole('button', { name: 'Options menu' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'First option' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()

    // 'Second option' does not close the menu
    fireEvent.click(screen.getByRole('button', { name: 'Options menu' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Second option' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    // 'Third option' does not close the menu
    fireEvent.click(screen.getByRole('menuitem', { name: 'Third option' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
})

it("calls the onSelect and the menu's onItemSelect with the value when menu items are selected", () => {
    const onItemSelect = jest.fn()
    const onSelect = jest.fn()

    render(
        <Menu onItemSelect={onItemSelect}>
            <MenuButton>Options menu</MenuButton>
            <MenuList aria-label="Some options">
                <MenuItem value="1st" label="1st option" onSelect={() => onSelect('1st option')} />
                <MenuItem value="2nd" label="2nd option" onSelect={() => onSelect('2nd option')} />
            </MenuList>
        </Menu>,
    )

    for (const opt of ['1st', '2nd']) {
        fireEvent.click(screen.getByRole('button', { name: 'Options menu' }))
        fireEvent.click(screen.getByRole('menuitem', { name: `${opt} option` }))
        expect(onItemSelect).toHaveBeenCalledWith(opt)
        expect(onSelect).toHaveBeenCalledWith(`${opt} option`)
    }

    expect(onItemSelect).toHaveBeenCalledTimes(2)
    expect(onSelect).toHaveBeenCalledTimes(2)
})

it('allows to navigate through the menu items using the keyboard', () => {
    const onItemSelect = jest.fn()
    const onSelect = jest.fn()

    render(
        <Menu onItemSelect={onItemSelect}>
            <MenuButton>Options menu</MenuButton>
            <MenuList aria-label="Some options">
                <MenuItem value="1st" label="1st option" onSelect={() => onSelect('1st option')} />
                <MenuItem value="2nd" label="2nd option" onSelect={() => onSelect('2nd option')} />
                <MenuItem value="3rd" label="3rd option" onSelect={() => onSelect('3rd option')} />
            </MenuList>
        </Menu>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Options menu' }))
    expect(screen.getByRole('menuitem', { name: '1st option' })).toHaveFocus()
    fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
    fireEvent.keyDown(getFocusedElement(), { key: 'ArrowDown' })
    expect(screen.getByRole('menuitem', { name: '3rd option' })).toHaveFocus()
    fireEvent.keyDown(getFocusedElement(), { key: 'ArrowUp' })
    expect(screen.getByRole('menuitem', { name: '2nd option' })).toHaveFocus()
    fireEvent.keyDown(getFocusedElement(), { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith('2nd option')
    expect(onItemSelect).toHaveBeenCalledWith('2nd')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})
