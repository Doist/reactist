import * as React from 'react'
import classNames from 'classnames'
import { polymorphicComponent } from '../../utils/polymorphism'

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
import { PopoverBackdrop } from 'reakit/Popover'

import './menu.less'

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

type MenuButtonProps = Omit<Reakit.MenuButtonProps, keyof Reakit.MenuStateReturn | 'className'>

/**
 * A button to toggle a dropdown menu open or closed.
 */
const MenuButton = polymorphicComponent<'button', MenuButtonProps>(function MenuButton(
    { exceptionallySetClassName, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    return (
        <Reakit.MenuButton
            {...props}
            {...state}
            ref={ref}
            className={classNames('reactist_menubutton', exceptionallySetClassName)}
        />
    )
})

//
// MenuList
//

type MenuBackdropProps = Reakit.MenuStateReturn & {
    children: React.ReactNode
}

const BACKDROP_STYLE: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
}

/**
 * Internal component to provide a backdrop/overlay to all menus. This is needed because reakit's
 * menus do not show an overlay by default.
 */
function MenuBackdrop({
    baseId,
    visible,
    animated,
    animating,
    stopAnimation,
    modal,
    children,
}: MenuBackdropProps) {
    return (
        <PopoverBackdrop
            baseId={baseId}
            visible={visible}
            animated={animated}
            animating={animating}
            stopAnimation={stopAnimation}
            modal={modal}
            style={BACKDROP_STYLE}
        >
            {children}
        </PopoverBackdrop>
    )
}

type MenuListProps = Omit<Reakit.MenuProps, keyof Reakit.MenuStateReturn | 'className'>

/**
 * The dropdown menu itself, containing a list of menu items.
 */
const MenuList = polymorphicComponent<'div', MenuListProps>(function MenuList(
    { exceptionallySetClassName, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    return state.visible ? (
        <MenuBackdrop {...state}>
            <Reakit.Menu
                {...props}
                {...state}
                ref={ref}
                className={classNames('reactist_menulist', exceptionallySetClassName)}
            />
        </MenuBackdrop>
    ) : null
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
    /**
     * The event handler called when the menu item is clicked.
     *
     * This is similar to `onSelect`, but a bit different. You can certainly use it to trigger the
     * action that the menu item represents. But in general you should prefer `onSelect` for that.
     *
     * The main use for this handler is to get access to the click event. This can be used, for
     * example, to call `event.preventDefault()`, which will effectively prevent the rest of the
     * consequences of the click, including preventing `onSelect` from being called. In particular,
     * this is useful in menu items that are links, and you want the click to not trigger navigation
     * under some circumstances.
     */
    onClick?: (event: React.MouseEvent) => void
}

/**
 * A menu item inside a menu list. It can be selected by the user, triggering the `onSelect`
 * callback.
 */
const MenuItem = polymorphicComponent<'button', MenuItemProps>(function MenuItem(
    {
        value,
        children,
        onSelect,
        hideOnSelect = true,
        onClick,
        exceptionallySetClassName,
        ...props
    },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    const { hide } = state

    const handleClick = React.useCallback(
        function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
            onClick?.(event)
            const onSelectResult: unknown =
                onSelect && !event.defaultPrevented ? onSelect() : undefined
            const shouldClose = onSelectResult !== false && hideOnSelect
            handleItemSelect(value)
            if (shouldClose) hide()
        },
        [onSelect, onClick, handleItemSelect, hideOnSelect, hide, value],
    )

    return (
        <Reakit.MenuItem
            {...props}
            {...state}
            ref={ref}
            onClick={handleClick}
            className={exceptionallySetClassName}
        >
            {children}
        </Reakit.MenuItem>
    )
})

//
// SubMenu
//

type SubMenuProps = Pick<MenuProps, 'children' | 'onItemSelect'>

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
    { children, onItemSelect, ...props },
    ref,
) {
    const { handleItemSelect: parentMenuItemSelect, ...state } = React.useContext(MenuContext)
    const { hide: parentMenuHide } = state

    const handleSubItemSelect = React.useCallback(
        function handleSubItemSelect(value) {
            if (onItemSelect) onItemSelect(value)
            parentMenuItemSelect(value)
            parentMenuHide()
        },
        [parentMenuHide, parentMenuItemSelect, onItemSelect],
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

type MenuGroupProps = Omit<NativeProps<HTMLDivElement>, 'className'> & {
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
const MenuGroup = polymorphicComponent<'div', MenuGroupProps>(function MenuGroud(
    { label, children, exceptionallySetClassName, ...props },
    ref,
) {
    const { handleItemSelect, ...state } = React.useContext(MenuContext)
    return (
        <Reakit.MenuGroup ref={ref} {...props} {...state} className={exceptionallySetClassName}>
            {label ? (
                <div role="presentation" className="reactist_menugroup__label">
                    {label}
                </div>
            ) : null}
            {children}
        </Reakit.MenuGroup>
    )
})

export { Menu, MenuButton, MenuList, MenuItem, SubMenu, MenuGroup }
export type { MenuButtonProps, MenuListProps, MenuItemProps, SubMenuProps, MenuGroupProps }
