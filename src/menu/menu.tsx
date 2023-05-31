import * as React from 'react'
import classNames from 'classnames'

import { polymorphicComponent } from '../utils/polymorphism'

//
// Reactist menu is a thin wrapper around Ariakit's menu components. This may or may not be
// temporary. Our goal is to make it transparent for the users of Reactist of this implementation
// detail. We may change in the future the external lib we use, or even implement it all internally,
// as long as we keep the same outer interface as intact as possible.
//
// Around the heavy lifting of the external lib we just add some features to better integrate the
// menu to Reactist's more opinionated approach (e.g. using our button with its custom variants and
// other features, easily show keyboard shortcuts in menu items, etc.)
//
import {
    Portal,
    MenuStore,
    MenuStoreProps,
    useMenuStore,
    MenuProps as AriakitMenuProps,
    Menu as AriakitMenu,
    MenuGroup as AriakitMenuGroup,
    MenuItem as AriakitMenuItem,
    MenuButton as AriakitMenuButton,
    MenuButtonProps as AriakitMenuButtonProps,
} from '@ariakit/react'

import './menu.less'

type NativeProps<E extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>

type MenuContextState = {
    menuStore: MenuStore
    handleItemSelect: (value: string | null | undefined) => void
    getAnchorRect: (() => { x: number; y: number }) | null
    setAnchorRect: (rect: { x: number; y: number } | null) => void
}

const MenuContext = React.createContext<MenuContextState>(
    // Ariakit gives us no means to obtain a valid initial/default value of type MenuStateReturn
    // (it is normally obtained by calling useMenuState but we can't call hooks outside components).
    // This is however of little consequence since this value is only used if some of the components
    // are used outside Menu, something that should not happen and we do not support.
    // @ts-expect-error
    {},
)

//
// Menu
//

type MenuProps = Omit<MenuStoreProps, 'visible'> & {
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
    const [anchorRect, setAnchorRect] = React.useState<{ x: number; y: number } | null>(null)
    const getAnchorRect = React.useMemo(() => (anchorRect ? () => anchorRect : null), [anchorRect])
    const menuStore = useMenuStore({ focusLoop: true, ...props })

    const handleItemSelect = React.useCallback(
        function handleItemSelect(value: string | null | undefined) {
            onItemSelect?.(value)
        },
        [onItemSelect],
    )

    const value: MenuContextState = React.useMemo(
        () => ({ menuStore, handleItemSelect, getAnchorRect, setAnchorRect }),
        [menuStore, handleItemSelect, getAnchorRect, setAnchorRect],
    )

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

//
// MenuButton
//

type MenuButtonProps = Omit<AriakitMenuButtonProps, 'store' | 'className' | 'as'>

/**
 * A button to toggle a dropdown menu open or closed.
 */
const MenuButton = polymorphicComponent<'button', MenuButtonProps>(function MenuButton(
    { exceptionallySetClassName, ...props },
    ref,
) {
    const { menuStore } = React.useContext(MenuContext)
    return (
        <AriakitMenuButton
            {...props}
            store={menuStore}
            ref={ref}
            className={classNames('reactist_menubutton', exceptionallySetClassName)}
        />
    )
})

//
// ContextMenuTrigger
//
const ContextMenuTrigger = polymorphicComponent<'div', unknown>(function ContextMenuTrigger(
    { as: component = 'div', ...props },
    ref,
) {
    const { setAnchorRect, menuStore } = React.useContext(MenuContext)

    const handleContextMenu = React.useCallback(
        function handleContextMenu(event: React.MouseEvent) {
            event.preventDefault()
            setAnchorRect({ x: event.clientX, y: event.clientY })
            menuStore.show()
        },
        [setAnchorRect, menuStore],
    )

    return React.createElement(component, { ...props, onContextMenu: handleContextMenu, ref })
})

//
// MenuList
//

type MenuListProps = Omit<AriakitMenuProps, 'store' | 'className'>

/**
 * The dropdown menu itself, containing a list of menu items.
 */
const MenuList = polymorphicComponent<'div', MenuListProps>(function MenuList(
    { exceptionallySetClassName, modal = true, ...props },
    ref,
) {
    const { menuStore, getAnchorRect } = React.useContext(MenuContext)
    const isOpen = menuStore.useState('open')

    return isOpen ? (
        <Portal preserveTabOrder>
            <AriakitMenu
                {...props}
                store={menuStore}
                gutter={8}
                shift={4}
                ref={ref}
                className={classNames('reactist_menulist', exceptionallySetClassName)}
                getAnchorRect={getAnchorRect ?? undefined}
                modal={modal}
            />
        </Portal>
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
        as = 'button',
        ...props
    },
    ref,
) {
    const { handleItemSelect, menuStore } = React.useContext(MenuContext)
    const { hide } = menuStore

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
        <AriakitMenuItem
            {...props}
            as={as}
            store={menuStore}
            ref={ref}
            onClick={handleClick}
            className={exceptionallySetClassName}
            hideOnClick={false}
        >
            {children}
        </AriakitMenuItem>
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
const SubMenu = React.forwardRef<HTMLDivElement, SubMenuProps>(function SubMenu(
    { children, onItemSelect },
    ref,
) {
    const { handleItemSelect: parentMenuItemSelect, menuStore } = React.useContext(MenuContext)
    const { hide: parentMenuHide } = menuStore

    const handleSubItemSelect = React.useCallback(
        function handleSubItemSelect(value: string | null | undefined) {
            if (onItemSelect) onItemSelect(value)
            parentMenuItemSelect(value)
            parentMenuHide()
        },
        [parentMenuHide, parentMenuItemSelect, onItemSelect],
    )

    const [button, list] = React.Children.toArray(children)

    // Ariakit needs to be able to pass props to the MenuButton
    // and combine it with the MenuItem component
    const renderMenuButton = React.useCallback(
        function renderMenuButton(props: MenuButtonProps) {
            return React.cloneElement(button as React.ReactElement, props)
        },
        [button],
    )

    return (
        <Menu onItemSelect={handleSubItemSelect}>
            <AriakitMenuItem as="div" store={menuStore} ref={ref} hideOnClick={false}>
                {renderMenuButton}
            </AriakitMenuItem>
            {list}
        </Menu>
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
const MenuGroup = polymorphicComponent<'div', MenuGroupProps>(function MenuGroup(
    { label, children, exceptionallySetClassName, ...props },
    ref,
) {
    const { menuStore } = React.useContext(MenuContext)
    return (
        <AriakitMenuGroup
            {...props}
            ref={ref}
            store={menuStore}
            className={exceptionallySetClassName}
        >
            {label ? (
                <div role="presentation" className="reactist_menugroup__label">
                    {label}
                </div>
            ) : null}
            {children}
        </AriakitMenuGroup>
    )
})

export { ContextMenuTrigger, Menu, MenuButton, MenuList, MenuItem, SubMenu, MenuGroup }
export type { MenuButtonProps, MenuListProps, MenuItemProps, MenuGroupProps }
