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
import * as Ariakit from 'ariakit/menu'
import { Portal } from 'ariakit/portal'

import { Box } from '../box'
import { Text } from '../text'
import { useId } from '../utils/common-helpers'

import styles from './menu.module.css'
import { Tooltip } from '../tooltip'

type NativeProps<E extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>

type MenuContextState = {
    state: Ariakit.MenuState
    handleItemSelect: (value: string | null | undefined) => void
    handleAnchorRectChange: (value: { x: number; y: number } | null) => void
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

type MenuProps = Omit<Ariakit.MenuStateProps, 'visible'> & {
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

type MenuHandle = {
    open: () => void
}

/**
 * Wrapper component to control a menu. It does not render anything, only providing the state
 * management for the menu components inside it.
 */
const Menu = React.forwardRef<MenuHandle, MenuProps>(function Menu(
    { children, onItemSelect, ...props },
    ref,
) {
    const [anchorRect, handleAnchorRectChange] = React.useState<{ x: number; y: number } | null>(
        null,
    )
    const getAnchorRect = React.useMemo(() => {
        return anchorRect ? () => anchorRect : undefined
    }, [anchorRect])

    const state = Ariakit.useMenuState({
        focusLoop: true,
        gutter: 8,
        shift: 4,
        getAnchorRect,
        ...props,
    })

    React.useEffect(() => {
        if (!state.open) handleAnchorRectChange(null)
    }, [state.open])

    React.useImperativeHandle(ref, () => ({ open: state.show }))

    const handleItemSelect = React.useCallback(
        function handleItemSelect(value: string | null | undefined) {
            if (onItemSelect) onItemSelect(value)
        },
        [onItemSelect],
    )

    const value: MenuContextState = React.useMemo(
        () => ({
            state,
            handleItemSelect,
            handleAnchorRectChange,
        }),
        [state, handleItemSelect],
    )

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
})

//
// MenuButton
//

type MenuButtonProps = Omit<Ariakit.MenuButtonProps, 'state' | 'className' | 'as'>

/**
 * A button to toggle a dropdown menu open or closed.
 */
const MenuButton = polymorphicComponent<'button', MenuButtonProps>(function MenuButton(
    { exceptionallySetClassName, ...props },
    ref,
) {
    const { state } = React.useContext(MenuContext)
    return (
        <Ariakit.MenuButton
            {...props}
            state={state}
            ref={ref}
            className={exceptionallySetClassName}
        />
    )
})

//
// MenuItemContent
//

type MenuItemContentProps = {
    id: string

    /**
     * The menu item's label.
     */
    label?: NonNullable<React.ReactNode>

    /**
     * The menu item's description, typically used to provide additional information about what the
     * menu item does.
     *
     * When used, it is rendered below the label. The label is also shown more prominently (e.g.
     * using bold text), while the description is rendered using text in secondary tone.
     *
     * Therefore, for the description to be rendered, you must also provide a `label`.
     */
    description?: React.ReactNode

    /**
     * An optional icon to render next to the menu item's label.
     *
     * For the icon to be rendered, you must also provide a `label`.
     */
    icon?: React.ReactNode

    /**
     * An optional element to render to the right of the menu item's label. It is often used to
     * show a keyboard shortcut for the menu item.
     *
     * For the shortcut to be rendered, you must also provide a `label`.
     */
    shortcut?: React.ReactNode
}

/**
 * Renders the content inside a standard MenuItem. It is extracted into a component for reuse in
 * the SubMenuItem, which is a MenuItem visually, but semantically it's closer to be a MenuButton.
 * @private
 */
function MenuItemContent({ label, description, icon, shortcut, id }: MenuItemContentProps) {
    if (!label) return null
    return (
        <Box
            display="flex"
            gap="small"
            alignItems="center"
            width="full"
            aria-hidden // the menu item is labelled via aria-labelledby and aria-describedby
        >
            {icon ? <div className={styles.menuItemIcon}>{icon}</div> : null}
            <Box
                display="inlineFlex"
                flexDirection="column"
                gap="xsmall"
                paddingY="xsmall"
                alignItems="flexStart"
                overflow="hidden"
                flexGrow={1}
            >
                <Text
                    id={`${id}-label`}
                    weight={description ? 'semibold' : 'regular'}
                    size="copy"
                    lineClamp={1}
                    exceptionallySetClassName={styles.menuItemLabel}
                >
                    {label}
                </Text>
                {description ? (
                    <Text
                        id={`${id}-description`}
                        size="copy"
                        tone="secondary"
                        exceptionallySetClassName={styles.menuItemDescription}
                    >
                        {description}
                    </Text>
                ) : null}
            </Box>
            {shortcut ? <div>{shortcut}</div> : null}
        </Box>
    )
}

//
// SubMenuItem
//

function ArrowRightIcon() {
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

type SubMenuItemProps = Omit<Ariakit.MenuButtonProps, 'state' | 'className' | 'as' | 'children'> &
    Pick<MenuItemProps, 'label' | 'icon'>

/**
 * A menu item to toggle a sub-menu open or closed.
 */
const SubMenuItem = polymorphicComponent<'button', SubMenuItemProps>(function SubMenuItem(
    { exceptionallySetClassName, label, icon, ...props },
    ref,
) {
    const id = useId(props.id)
    const { state } = React.useContext(MenuContext)
    return (
        <Ariakit.MenuButton
            aria-labelledby={label && !props['aria-label'] ? `${id}-label` : undefined}
            {...props}
            state={state}
            ref={ref}
            className={classNames(styles.menuItem, exceptionallySetClassName)}
        >
            <MenuItemContent id={id} icon={icon} label={label} shortcut={<ArrowRightIcon />} />
        </Ariakit.MenuButton>
    )
})

//
// ContextMenuTrigger
//
const ContextMenuTrigger = polymorphicComponent<'div', unknown>(function ContextMenuTrigger(
    { as: component = 'div', ...props },
    ref,
) {
    const { handleAnchorRectChange, state } = React.useContext(MenuContext)
    const handleContextMenu = React.useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault()
            handleAnchorRectChange({ x: event.clientX, y: event.clientY })
            state.show()
        },
        [handleAnchorRectChange, state],
    )

    return React.createElement(component, { ...props, onContextMenu: handleContextMenu, ref })
})

//
// MenuList and SubMenuList
//

type MenuListProps = Omit<Ariakit.MenuProps, 'state' | 'className'>

/**
 * The dropdown menu itself, containing a list of menu items.
 */
const MenuList = polymorphicComponent<'div', MenuListProps>(function MenuList(
    { exceptionallySetClassName, modal = true, ...props },
    ref,
) {
    const { state } = React.useContext(MenuContext)
    if (!state.open) return null

    return (
        <Portal preserveTabOrder>
            <Ariakit.Menu
                {...props}
                state={state}
                ref={ref}
                className={classNames(styles.menuList, exceptionallySetClassName)}
                modal={modal}
            />
        </Portal>
    )
})

/**
 * Mostly equivalent to the `MenuList`, but to be used inside a `SubMenu`.
 */
const SubMenuList = polymorphicComponent<'div', MenuListProps>(function SubMenuList(
    { exceptionallySetClassName, modal = true, ...props },
    ref,
) {
    const { state } = React.useContext(MenuContext)
    if (!state.open) return null

    return (
        <Portal preserveTabOrder>
            <Ariakit.Menu
                {...props}
                state={state}
                ref={ref}
                className={classNames(
                    styles.menuList,
                    styles.subMenuList,
                    exceptionallySetClassName,
                )}
                modal={modal}
            />
        </Portal>
    )
})

//
// MenuItem
//

function useMenuItemClickHandler({
    value,
    hideOnSelect,
    onClick,
    onSelect,
}: Pick<MenuItemProps, 'value' | 'hideOnSelect' | 'onClick' | 'onSelect'>) {
    const { handleItemSelect, state } = React.useContext(MenuContext)
    const { hide } = state

    return React.useCallback(
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
}

type MenuItemProps = {
    /**
     * An optional value given to this menu item.
     *
     * It is passed on to the parent `Menu`'s `onItemSelect` when you provide that instead of (or
     * alongside) providing individual `onSelect` callbacks to each menu item.
     */
    value?: string

    /**
     * The menu item's content.
     *
     * Prefer using `label` instead. In addition to `label`, you can also use `description`, `icon`
     * and `shortcut`, to provide richer content inside the menu item.
     *
     * However, you can still use `children` to provide arbitrary content inside the menu item. You
     * can even combine `children` with the other props to provide a richer menu item. The
     * `children` content will be rendered first, followed by the regular menu item content
     * generated using the `label`, `description`, `icon` and `shortcut` props (if the `label` is
     * present).
     */
    children?: React.ReactNode

    /**
     * The menu item's label.
     */
    label?: NonNullable<React.ReactNode>

    /**
     * The menu item's description, typically used to provide additional information about what the
     * menu item does.
     *
     * When used, it is rendered below the label. The label is also shown more prominently (e.g.
     * using bold text), while the description is rendered using text in secondary tone.
     *
     * Therefore, for the description to be rendered, you must also provide a `label`.
     */
    description?: React.ReactNode

    /**
     * An optional icon to render next to the menu item's label.
     *
     * For the icon to be rendered, you must also provide a `label`.
     */
    icon?: NonNullable<React.ReactNode>

    /**
     * An optional element to render to the right of the menu item's label. It is often used to
     * show a keyboard shortcut for the menu item.
     *
     * For the shortcut to be rendered, you must also provide a `label`.
     */
    shortcut?: React.ReactNode

    /**
     * The tone to use for the menu item.
     */
    tone?: 'normal' | 'destructive'

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
        label,
        description,
        icon,
        shortcut,
        tone,
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
    const id = useId(props.id)
    const { state } = React.useContext(MenuContext)
    const handleClick = useMenuItemClickHandler({ value, onSelect, onClick, hideOnSelect })

    return (
        <Ariakit.MenuItem
            aria-labelledby={label && !props['aria-label'] ? `${id}-label` : undefined}
            aria-describedby={label && description ? `${id}-description` : undefined}
            {...props}
            as={as}
            state={state}
            ref={ref}
            onClick={handleClick}
            className={classNames(
                styles.menuItem,
                tone === 'destructive' ? styles.destructive : null,
                exceptionallySetClassName,
            )}
            hideOnClick={false}
        >
            {children ? (
                <Box width="full" className={label ? undefined : styles.legacyLayout}>
                    {children}
                </Box>
            ) : null}

            <MenuItemContent
                id={id}
                icon={icon}
                label={label}
                description={description}
                shortcut={shortcut}
            />
        </Ariakit.MenuItem>
    )
})

//
// SubMenu
//

type SubMenuProps = Pick<MenuProps, 'children' | 'onItemSelect'>

/**
 * This component can be rendered alongside other `MenuItem` elements inside a `MenuList` to show a
 * sub-menu.
 *
 * Its children are expected to be exactly two elements, in the following order:
 *
 * 1. A `SubMenuItem` element: the menu item that triggers the sub-menu to open.
 * 2. A `SubMenuList` element: the list of menu items that will be shown when the sub-menu is open.
 *
 * ## Usage
 *
 * ```jsx
 * <Menu>
 *   <MenuButton>Menu</MenuButton>
 *   <MenuList>
 *     <MenuItem label="Item 1" />
 *     <MenuItem label="Item 2" />
 *     <SubMenu>
 *       <SubMenuItem label="Submenu" />
 *       <SubMenuList>
 *         <MenuItem label="Submenu Item 1" />
 *         <MenuItem label="Submenu Item 2" />
 *       </SubMenuList>
 *     </SubMenu>
 *   </MenuList>
 * </Menu>
 * ```
 */
const SubMenu = React.forwardRef<HTMLDivElement, SubMenuProps>(function SubMenu(
    { children, onItemSelect },
    ref,
) {
    const { handleItemSelect: parentMenuItemSelect, state } = React.useContext(MenuContext)
    const { hide: parentMenuHide } = state

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
            <Ariakit.MenuItem as="div" state={state} ref={ref} hideOnClick={false}>
                {renderMenuButton}
            </Ariakit.MenuItem>
            <div className={styles.subMenuContainer}>{list}</div>
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
    label: NonNullable<React.ReactNode>

    /**
     * An optional info element to be shown to the right of the label.
     *
     * This is useful and often used to:
     * - Provide a link to any documentation related to the menu items in the group
     * - Show a keyboard shortcut that triggers the menu items in the group
     *
     * It is strongly recommended that this should be a icon-only element. It is also strongly
     * recommended that, when using it to provide a link, you use the very `IconMenuItem` component
     * to make the link be yet another menu item accessible in the menu via keyboard navigation.
     * Here's an example of how to do that:
     *
     * ```jsx
     * <MenuGroup
     *   label="A group of related options"
     *   info={
     *     <IconMenuItem
     *       label="Help about this group of options"
     *       icon="ℹ️"
     *       as="a"
     *       href="http://help.example.com"
     *       target="_blank"
     *       rel="noreferrer noopener"
     *     />
     *   }
     * >
     *   <MenuItem label="First option" icon={<FirstIcon />} />
     *   <MenuItem label="Second option" icon={<SecondIcon />} />
     * </MenuGroup>
     * ```
     */
    info?: React.ReactNode
}

/**
 * A way to semantically group some menu items.
 *
 * This group does not add any visual separator. You can do that yourself adding `<hr />` elements
 * before and/or after the group if you so wish.
 */
const MenuGroup = polymorphicComponent<'div', MenuGroupProps>(function MenuGroup(
    { label, info, children, exceptionallySetClassName, ...props },
    ref,
) {
    const id = useId(props.id)
    const { state } = React.useContext(MenuContext)
    return (
        <Ariakit.MenuGroup
            aria-labelledby={`menugroup-label-${id}`}
            {...props}
            id={id}
            ref={ref}
            state={state}
            className={exceptionallySetClassName}
        >
            <Box display="flex" alignItems="center" gap="small" className={styles.menuGroupLabel}>
                <Text id={`menugroup-label-${id}`} size="copy" weight="semibold">
                    {label}
                </Text>
                {info ? (
                    <Box
                        flexShrink={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className={styles.menuGroupInfo}
                    >
                        {info}
                    </Box>
                ) : null}
            </Box>
            {children}
        </Ariakit.MenuGroup>
    )
})

//
// IconMenuItem & IconsMenuGroup
//

type IconMenuItemProps = Pick<MenuItemProps, 'value' | 'hideOnSelect' | 'onSelect' | 'onClick'> & {
    /**
     * A label for assistive technologies to describe the menu item.
     *
     * When not provided, the `label` is used. But this is useful when you want the tooltip label
     * to be different from the label for assistive technologies.
     */
    'aria-label'?: string

    /**
     * The menu item's label, which is not shown visually on the menu item, but it is used to
     * show a tooltip for the menu item when hovered or focused.
     *
     * It is also used as the semantic label for assistive technologies, unless you provide an
     * `aria-label` as well.
     */
    label: string

    /**
     * A description for assistive technologies to describe the menu item.
     */
    description?: React.ReactNode

    /**
     * The icon to show on the menu item.
     */
    icon: NonNullable<React.ReactNode>
}

/**
 * A menu item that visually only shows as an icon. It must be used inside an `IconsMenuGroup`.
 */
const IconMenuItem = polymorphicComponent<'button', IconMenuItemProps>(function IconMenuItem(
    {
        value,
        label,
        description,
        icon,
        onSelect,
        hideOnSelect = true,
        onClick,
        exceptionallySetClassName,
        as = 'button',
        ...props
    },
    ref,
) {
    const id = useId(props.id)
    const { state } = React.useContext(MenuContext)
    const handleClick = useMenuItemClickHandler({ value, onSelect, onClick, hideOnSelect })

    return (
        <Tooltip content={label}>
            <Ariakit.MenuItem
                aria-label={label}
                aria-describedby={`${id}-description`}
                {...props}
                as={as}
                state={state}
                ref={ref}
                onClick={handleClick}
                className={classNames(styles.iconMenuItem, exceptionallySetClassName)}
                hideOnClick={false}
            >
                {icon}
            </Ariakit.MenuItem>
        </Tooltip>
    )
})

/**
 * Semantically equivalent to `MenuGroup`, but meant to group `IconMenuItem`s only.
 */
const IconsMenuGroup = polymorphicComponent<'div', MenuGroupProps>(function IconsMenuGroup(
    { children, ...props },
    ref,
) {
    return (
        <MenuGroup {...props} ref={ref}>
            <div className={styles.iconsMenuGroup}>{children}</div>
        </MenuGroup>
    )
})

export {
    ContextMenuTrigger,
    IconMenuItem,
    IconsMenuGroup,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    SubMenu,
    SubMenuItem,
    SubMenuList,
}

export type {
    IconMenuItemProps,
    MenuButtonProps,
    MenuGroupProps,
    MenuHandle,
    MenuItemProps,
    MenuListProps,
    MenuProps,
    SubMenuItemProps,
    SubMenuProps,
}
