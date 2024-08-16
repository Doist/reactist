import {
    Children,
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import classNames from 'classnames'

import {
    Portal,
    useMenuStore,
    Menu as AriakitMenu,
    MenuGroup as AriakitMenuGroup,
    MenuItem as AriakitMenuItem,
    MenuButton as AriakitMenuButton,
    Role,
    type MenuStore,
    type MenuStoreProps,
    type MenuProps as AriakitMenuProps,
    type MenuItemProps as AriakitMenuItemProps,
    type MenuButtonProps as AriakitMenuButtonProps,
    type RoleProps,
} from '@ariakit/react'

import './menu.less'
import type { ObfuscatedClassName } from '../utils/common-types'

type MenuContextState = {
    menuStore: MenuStore | null
    handleItemSelect?: (value: string | null | undefined) => void
    getAnchorRect: (() => { x: number; y: number }) | null
    setAnchorRect: (rect: { x: number; y: number } | null) => void
}

const MenuContext = createContext<MenuContextState>({
    menuStore: null,
    handleItemSelect: () => undefined,
    getAnchorRect: null,
    setAnchorRect: () => undefined,
})

//
// Menu
//

interface MenuProps extends Omit<MenuStoreProps, 'visible'> {
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
    const [anchorRect, setAnchorRect] = useState<{ x: number; y: number } | null>(null)
    const getAnchorRect = useMemo(() => (anchorRect ? () => anchorRect : null), [anchorRect])
    const menuStore = useMenuStore({ focusLoop: true, ...props })

    const value: MenuContextState = useMemo(
        () => ({ menuStore, handleItemSelect: onItemSelect, getAnchorRect, setAnchorRect }),
        [menuStore, onItemSelect, getAnchorRect, setAnchorRect],
    )

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

//
// MenuButton
//

interface MenuButtonProps
    extends Omit<AriakitMenuButtonProps, 'store' | 'className' | 'as'>,
        ObfuscatedClassName {}

/**
 * A button to toggle a dropdown menu open or closed.
 */
const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
    { exceptionallySetClassName, ...props },
    ref,
) {
    const { menuStore } = useContext(MenuContext)
    if (!menuStore) {
        throw new Error('MenuButton must be wrapped in <Menu/>')
    }
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

interface ContextMenuTriggerProps
    extends ObfuscatedClassName,
        React.HTMLAttributes<HTMLDivElement>,
        Pick<RoleProps, 'render'> {}

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
    function ContextMenuTrigger({ render, ...props }, ref) {
        const { setAnchorRect, menuStore } = useContext(MenuContext)
        if (!menuStore) {
            throw new Error('ContextMenuTrigger must be wrapped in <Menu/>')
        }

        const handleContextMenu = useCallback(
            function handleContextMenu(event: React.MouseEvent) {
                event.preventDefault()
                setAnchorRect({ x: event.clientX, y: event.clientY })
                menuStore.show()
            },
            [setAnchorRect, menuStore],
        )

        const isOpen = menuStore.useState('open')
        useEffect(() => {
            if (!isOpen) setAnchorRect(null)
        }, [isOpen, setAnchorRect])

        return <Role.div {...props} onContextMenu={handleContextMenu} ref={ref} render={render} />
    },
)

//
// MenuList
//

interface MenuListProps
    extends Omit<AriakitMenuProps, 'store' | 'className'>,
        ObfuscatedClassName {}

/**
 * The dropdown menu itself, containing a list of menu items.
 */
const MenuList = forwardRef<HTMLDivElement, MenuListProps>(function MenuList(
    { exceptionallySetClassName, modal = true, ...props },
    ref,
) {
    const { menuStore, getAnchorRect } = useContext(MenuContext)
    if (!menuStore) {
        throw new Error('MenuList must be wrapped in <Menu/>')
    }

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

interface MenuItemProps extends AriakitMenuItemProps, ObfuscatedClassName {
    /**
     * An optional value given to this menu item. It is passed on to the parent `Menu`'s
     * `onItemSelect` when you provide that instead of (or alongside) providing individual
     * `onSelect` callbacks to each menu item.
     */
    value?: string

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
const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
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
    const { handleItemSelect, menuStore } = useContext(MenuContext)
    if (!menuStore) {
        throw new Error('MenuItem must be wrapped in <Menu/>')
    }

    const { hide } = menuStore
    const handleClick = useCallback(
        function handleClick(event: React.MouseEvent) {
            onClick?.(event)
            const onSelectResult: unknown =
                onSelect && !event.defaultPrevented ? onSelect() : undefined
            const shouldClose = onSelectResult !== false && hideOnSelect
            handleItemSelect?.(value)
            if (shouldClose) hide()
        },
        [onSelect, onClick, handleItemSelect, hideOnSelect, hide, value],
    )

    return (
        <AriakitMenuItem
            {...props}
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
const SubMenu = forwardRef<HTMLDivElement, SubMenuProps>(function SubMenu(
    { children, onItemSelect },
    ref,
) {
    const { handleItemSelect: parentMenuItemSelect, menuStore } = useContext(MenuContext)
    if (!menuStore) {
        throw new Error('SubMenu must be wrapped in <Menu/>')
    }

    const { hide: parentMenuHide } = menuStore
    const handleSubItemSelect = useCallback(
        function handleSubItemSelect(value: string | null | undefined) {
            onItemSelect?.(value)
            parentMenuItemSelect?.(value)
            parentMenuHide()
        },
        [parentMenuHide, parentMenuItemSelect, onItemSelect],
    )

    const [button, list] = Children.toArray(children)
    const buttonElement = button as React.ReactElement<MenuButtonProps>

    return (
        <Menu onItemSelect={handleSubItemSelect}>
            <AriakitMenuItem store={menuStore} ref={ref} hideOnClick={false} render={buttonElement}>
                {buttonElement.props.children}
            </AriakitMenuItem>
            {list}
        </Menu>
    )
})

//
// MenuGroup
//

interface MenuGroupProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
        ObfuscatedClassName {
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
const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(function MenuGroup(
    { label, children, exceptionallySetClassName, ...props },
    ref,
) {
    const { menuStore } = useContext(MenuContext)
    if (!menuStore) {
        throw new Error('MenuGroup must be wrapped in <Menu/>')
    }

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
