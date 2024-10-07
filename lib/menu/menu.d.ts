import * as React from 'react';
import { MenuStoreProps, MenuProps as AriakitMenuProps, MenuItemProps as AriakitMenuItemProps, MenuButtonProps as AriakitMenuButtonProps, RoleProps } from '@ariakit/react';
import './menu.less';
import type { ObfuscatedClassName } from '../utils/common-types';
interface MenuProps extends Omit<MenuStoreProps, 'visible'> {
    /**
     * The `Menu` must contain a `MenuList` that defines the menu options. It must also contain a
     * `MenuButton` that triggers the menu to be opened or closed.
     */
    children: React.ReactNode;
    /**
     * An optional callback that will be called back whenever a menu item is selected. It receives
     * the `value` of the selected `MenuItem`.
     *
     * If you pass down this callback, it is recommended that you properly memoize it so it does not
     * change on every render.
     */
    onItemSelect?: (value: string | null | undefined) => void;
}
/**
 * Wrapper component to control a menu. It does not render anything, only providing the state
 * management for the menu components inside it.
 */
declare function Menu({ children, onItemSelect, ...props }: MenuProps): React.JSX.Element;
interface MenuButtonProps extends Omit<AriakitMenuButtonProps, 'store' | 'className' | 'as'>, ObfuscatedClassName {
}
/**
 * A button to toggle a dropdown menu open or closed.
 */
declare const MenuButton: React.ForwardRefExoticComponent<Omit<MenuButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface ContextMenuTriggerProps extends ObfuscatedClassName, React.HTMLAttributes<HTMLDivElement>, Pick<RoleProps, 'render'> {
}
declare const ContextMenuTrigger: React.ForwardRefExoticComponent<ContextMenuTriggerProps & React.RefAttributes<HTMLDivElement>>;
interface MenuListProps extends Omit<AriakitMenuProps, 'store' | 'className'>, ObfuscatedClassName {
}
/**
 * The dropdown menu itself, containing a list of menu items.
 */
declare const MenuList: React.ForwardRefExoticComponent<Omit<MenuListProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface MenuItemProps extends AriakitMenuItemProps, ObfuscatedClassName {
    /**
     * An optional value given to this menu item. It is passed on to the parent `Menu`'s
     * `onItemSelect` when you provide that instead of (or alongside) providing individual
     * `onSelect` callbacks to each menu item.
     */
    value?: string;
    /**
     * When `true` the menu item is disabled and won't be selectable or be part of the keyboard
     * navigation across the menu options.
     *
     * @default true
     */
    disabled?: boolean;
    /**
     * When `true` the menu will close when the menu item is selected, in addition to performing the
     * action that the menu item is set out to do.
     *
     * Set this to `false` to make sure that a given menu item does not auto-closes the menu when
     * selected. This should be the exception and not the norm, as the default is to auto-close.
     *
     * @default true
     */
    hideOnSelect?: boolean;
    /**
     * The action to perform when the menu item is selected.
     *
     * If you return `false` from this function, the menu will not auto-close when this menu item
     * is selected. Though you should use `hideOnSelect` for this purpose, this allows you to
     * achieve the same effect conditionally and dynamically deciding at run time.
     */
    onSelect?: () => unknown;
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
    onClick?: (event: React.MouseEvent) => void;
}
/**
 * A menu item inside a menu list. It can be selected by the user, triggering the `onSelect`
 * callback.
 */
declare const MenuItem: React.ForwardRefExoticComponent<Omit<MenuItemProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type SubMenuProps = Pick<MenuProps, 'children' | 'onItemSelect'>;
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
declare const SubMenu: React.ForwardRefExoticComponent<SubMenuProps & React.RefAttributes<HTMLDivElement>>;
interface MenuGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>, ObfuscatedClassName {
    /**
     * A label to be shown visually and also used to semantically label the group.
     */
    label: string;
}
/**
 * A way to semantically group some menu items.
 *
 * This group does not add any visual separator. You can do that yourself adding `<hr />` elements
 * before and/or after the group if you so wish.
 */
declare const MenuGroup: React.ForwardRefExoticComponent<MenuGroupProps & React.RefAttributes<HTMLDivElement>>;
export { ContextMenuTrigger, Menu, MenuButton, MenuList, MenuItem, SubMenu, MenuGroup };
export type { MenuButtonProps, MenuListProps, MenuItemProps, MenuGroupProps };
