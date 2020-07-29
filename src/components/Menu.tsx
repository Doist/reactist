import * as React from 'react'
import classNames from 'classnames'
import Button, { ButtonProps } from './Button'

//
// Reactist menu is a thin wrapper around Reakit's menu components. This may or may not be
// temporary. Our goal is to make it transparent for the users of Reactist of this implementation
// detail. We may change in the future the external lib we use, or even implement it all internally,
// as long as we keep the same outer interface as intact as possible.
//
// Around the heavy lifting of the external lib we just add some features to better integrate the
// menu to Reactist's more opinionated approach (e.g. using our button with its custom variants and
// other features, easily show keyboard shortcuts in menu items, etc.)
//
import * as Reakit from 'reakit/Menu'

import './styles/menu.less'

type NativeProps<E extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>

type MenuContextState = Reakit.MenuStateReturn & {
    handleItemSelect: (value: string | null | undefined) => void
}

const MenuContext = React.createContext<MenuContextState>(
    // Reakit gives us no means to obtain a valid initial/default value of type MenuStateReturn
    // (it is normally obtained by calling useMenuState but we can't call hooks outside components).
    // This is however of little consequence since this value is only used if some of the components
    // are used outside Menu, something that should not happen and we do not support.
    // @ts-expect-error
    {},
)

//
// Menu
//

type MenuProps = Omit<Reakit.MenuInitialState, 'visible'> & {
    /**
     * The `Menu` must contain a `MenuList` that defines the menu options. It must also contain a
     * `MenuButton` that triggers the menu to be opened or closed.
     */
    children: React.ReactNode

    /**
     * An optional callback that will be called back whenever a menu item is selected. It receives
     * the `value` of the selected `MenuItem`.
     *
     * If you pass down this callback, it is recommended that you properly memoize it so it does not
     * change on every render.
     */
    onItemSelect?: (value: string | null | undefined) => void
}

/**
 * Wrapper component to control a menu. It does not render anything, only providing the state
 * management for the menu components inside it.
 */
function Menu({ children, onItemSelect, ...props }: MenuProps) {
    const state = Reakit.useMenuState({ loop: true, ...props })

    const handleItemSelect = React.useCallback(
        function handleItemSelect(value: string | null | undefined) {
            if (onItemSelect) onItemSelect(value)
        },
        [onItemSelect],
    )

    const value: MenuContextState = React.useMemo(
        () => ({
            ...state,
            handleItemSelect,
        }),
        [state, handleItemSelect],
    )

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

//
// MenuButton
//

type MenuButtonProps = NativeProps<HTMLButtonElement> &
    Partial<Pick<ButtonProps, 'loading' | 'variant' | 'size' | 'tooltip'>>

/**
 * A button to toggle a dropdown menu open or closed.
 */
const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
    { className, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    return (
        <Reakit.MenuButton
            {...props}
            {...state}
            ref={ref}
            as={Button}
            className={classNames('reactist_menubutton', className)}
        />
    )
})

//
// MenuList
//

type MenuListProps = NativeProps<HTMLDivElement>

/**
 * The dropdown menu itself, containing a list of menu items.
 */
const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(function MenuList(
    { className, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    return (
        <Reakit.Menu
            {...props}
            {...state}
            ref={ref}
            className={classNames('reactist_menulist', className)}
        />
    )
})

//
// MenuItem
//

type MenuItemProps = {
    /**
     * An optional value given to this menu item. It is passed on to the parent `Menu`'s
     * `onItemSelect` when you provide that instead of (or alongside) providing individual
     * `onSelect` callbacks to each menu item.
     */
    value?: string
    /**
     * The content inside the menu item.
     */
    children: React.ReactNode
    /**
     * When `true` the menu item is disabled and won't be selectable or be part of the keyboard
     * navigation across the menu options.
     *
     * @default true
     */
    disabled?: boolean
    /**
     * A class name to apply to the menu item element.
     */
    className?: string
    /**
     * When `true` the menu will close when the menu item is selected, in addition to performing the
     * action that the menu item is set out to do.
     *
     * Set this to `false` to make sure that a given menu item does not auto-closes the menu when
     * selected. This should be the exception and not the norm, as the default is to auto-close.
     *
     * @default true
     */
    hideOnSelect?: boolean
    /**
     * The action to perform when the menu item is selected.
     *
     * If you return `false` from this function, the menu will not auto-close when this menu item
     * is selected. Though you should use `hideOnSelect` for this purpose, this allows you to
     * achieve the same effect conditionally and dynamically deciding at run time.
     */
    onSelect?: () => unknown
}

/**
 * A menu item inside a menu list. It can be selected by the user, triggering the `onSelect`
 * callback.
 */
const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
    { value, children, onSelect, hideOnSelect = true, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    const { hide } = state

    const handleClick = React.useCallback(
        function handleClick() {
            const onSelectResult: unknown = onSelect ? onSelect() : undefined
            const shouldClose = onSelectResult !== false && hideOnSelect
            handleItemSelect(value)
            if (shouldClose) hide()
        },
        [onSelect, handleItemSelect, hideOnSelect, hide, value],
    )

    return (
        <Reakit.MenuItem {...props} {...state} ref={ref} onClick={handleClick}>
            {children}
        </Reakit.MenuItem>
    )
})

//
// SubMenu
//

type SubMenuProps = {
    /**
     * The children of the sub-menu specify the structure of the options in the sub-menu.
     *
     * See the component documentation below for details.
     */
    children: React.ReactNode
}

/**
 * This component can be rendered alongside other `MenuItem` inside a `MenuList` in order to have
 * a sub-menu.
 *
 * Its children are expected to have the structure of a first level menu (a `MenuButton` and a
 * `MenuList`).
 *
 * ```jsx
 * <MenuItem label="Edit profile" />
 * <SubMenu>
 *   <MenuButton>More options</MenuButton>
 *   <MenuList>
 *     <MenuItem label="Preferences" />
 *     <MenuItem label="Sign out" />
 *   </MenuList>
 * </SubMenu>
 * ```
 *
 * The `MenuButton` will become a menu item in the current menu items list, and it will lead to
 * opening a sub-menu with the menu items list below it.
 */
const SubMenu = React.forwardRef<HTMLButtonElement, SubMenuProps>(function SubMenu(
    { children, ...props },
    ref,
) {
    const { handleItemSelect: parentMenuItemSelect, ...state } = React.useContext(MenuContext)
    const { hide: parentMenuHide } = state

    const handleSubItemSelect = React.useCallback(
        function handleSubItemSelect(value) {
            parentMenuItemSelect(value)
            parentMenuHide()
        },
        [parentMenuHide, parentMenuItemSelect],
    )

    const [button, list] = React.Children.toArray(children)

    return (
        <Reakit.MenuItem {...state} {...props} ref={ref}>
            {(buttonProps) => (
                <Menu onItemSelect={handleSubItemSelect}>
                    {React.cloneElement(button as React.ReactElement, {
                        ...buttonProps,
                        className: classNames(buttonProps.className, 'reactist_submenu_button'),
                    })}
                    {list}
                </Menu>
            )}
        </Reakit.MenuItem>
    )
})

//
// MenuGroup
//

type MenuGroupProps = NativeProps<HTMLDivElement> & {
    /**
     * A label to be shown visually and also used to semantically label the group.
     */
    label: string
}

/**
 * A way to semantically group some menu items.
 *
 * This group does not add any visual separator. You can do that yourself adding `<hr />` elements
 * before and/or after the group if you so wish.
 */
const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(function MenuGroud(
    { label, children, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    return (
        <Reakit.MenuGroup ref={ref} {...props} {...state}>
            {label ? (
                <div role="presentation" className="reactist_menugroup__label">
                    {label}
                </div>
            ) : null}
            {children}
        </Reakit.MenuGroup>
    )
})

export {
    Menu,
    MenuButton,
    MenuButtonProps,
    MenuList,
    MenuListProps,
    MenuItem,
    MenuItemProps,
    SubMenu,
    SubMenuProps,
    MenuGroup,
    MenuGroupProps,
}
