import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'
import {
    useMenuStore,
    MenuButton as MenuButton$1,
    Role,
    Portal,
    Menu as Menu$1,
    MenuItem as MenuItem$1,
    MenuGroup as MenuGroup$1,
} from '@ariakit/react'

const _excluded = ['children', 'onItemSelect'],
    _excluded2 = ['exceptionallySetClassName'],
    _excluded3 = ['render'],
    _excluded4 = ['exceptionallySetClassName', 'modal'],
    _excluded5 = [
        'value',
        'children',
        'onSelect',
        'hideOnSelect',
        'onClick',
        'exceptionallySetClassName',
    ],
    _excluded6 = ['label', 'children', 'exceptionallySetClassName']
const MenuContext = /*#__PURE__*/ React.createContext({
    menuStore: null,
    handleItemSelect: () => undefined,
    getAnchorRect: null,
    setAnchorRect: () => undefined,
})
/**
 * Wrapper component to control a menu. It does not render anything, only providing the state
 * management for the menu components inside it.
 */

function Menu(_ref) {
    let { children, onItemSelect } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const [anchorRect, setAnchorRect] = React.useState(null)
    const getAnchorRect = React.useMemo(() => (anchorRect ? () => anchorRect : null), [anchorRect])
    const menuStore = useMenuStore(
        _objectSpread2(
            {
                focusLoop: true,
            },
            props,
        ),
    )
    const value = React.useMemo(
        () => ({
            menuStore,
            handleItemSelect: onItemSelect,
            getAnchorRect,
            setAnchorRect,
        }),
        [menuStore, onItemSelect, getAnchorRect, setAnchorRect],
    )
    return /*#__PURE__*/ React.createElement(
        MenuContext.Provider,
        {
            value: value,
        },
        children,
    )
}
/**
 * A button to toggle a dropdown menu open or closed.
 */

const MenuButton = /*#__PURE__*/ React.forwardRef(function MenuButton(_ref2, ref) {
    let { exceptionallySetClassName } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded2)

    const { menuStore } = React.useContext(MenuContext)

    if (!menuStore) {
        throw new Error('MenuButton must be wrapped in <Menu/>')
    }

    return /*#__PURE__*/ React.createElement(
        MenuButton$1,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                store: menuStore,
                ref: ref,
                className: classNames('reactist_menubutton', exceptionallySetClassName),
            },
        ),
    )
})
const ContextMenuTrigger = /*#__PURE__*/ React.forwardRef(function ContextMenuTrigger(_ref3, ref) {
    let { render } = _ref3,
        props = _objectWithoutProperties(_ref3, _excluded3)

    const { setAnchorRect, menuStore } = React.useContext(MenuContext)

    if (!menuStore) {
        throw new Error('ContextMenuTrigger must be wrapped in <Menu/>')
    }

    const handleContextMenu = React.useCallback(
        function handleContextMenu(event) {
            event.preventDefault()
            setAnchorRect({
                x: event.clientX,
                y: event.clientY,
            })
            menuStore.show()
        },
        [setAnchorRect, menuStore],
    )
    const isOpen = menuStore.useState('open')
    React.useEffect(() => {
        if (!isOpen) setAnchorRect(null)
    }, [isOpen, setAnchorRect])
    return /*#__PURE__*/ React.createElement(
        Role.div,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                onContextMenu: handleContextMenu,
                ref: ref,
                render: render,
            },
        ),
    )
})
/**
 * The dropdown menu itself, containing a list of menu items.
 */

const MenuList = /*#__PURE__*/ React.forwardRef(function MenuList(_ref4, ref) {
    let { exceptionallySetClassName, modal = true } = _ref4,
        props = _objectWithoutProperties(_ref4, _excluded4)

    const { menuStore, getAnchorRect } = React.useContext(MenuContext)

    if (!menuStore) {
        throw new Error('MenuList must be wrapped in <Menu/>')
    }

    const isOpen = menuStore.useState('open')
    return isOpen
        ? /*#__PURE__*/ React.createElement(
              Portal,
              {
                  preserveTabOrder: true,
              },
              /*#__PURE__*/ React.createElement(
                  Menu$1,
                  _objectSpread2(
                      _objectSpread2({}, props),
                      {},
                      {
                          store: menuStore,
                          gutter: 8,
                          shift: 4,
                          ref: ref,
                          className: classNames('reactist_menulist', exceptionallySetClassName),
                          getAnchorRect: getAnchorRect != null ? getAnchorRect : undefined,
                          modal: modal,
                      },
                  ),
              ),
          )
        : null
})
/**
 * A menu item inside a menu list. It can be selected by the user, triggering the `onSelect`
 * callback.
 */

const MenuItem = /*#__PURE__*/ React.forwardRef(function MenuItem(_ref5, ref) {
    let {
            value,
            children,
            onSelect,
            hideOnSelect = true,
            onClick,
            exceptionallySetClassName,
        } = _ref5,
        props = _objectWithoutProperties(_ref5, _excluded5)

    const { handleItemSelect, menuStore } = React.useContext(MenuContext)

    if (!menuStore) {
        throw new Error('MenuItem must be wrapped in <Menu/>')
    }

    const { hide } = menuStore
    const handleClick = React.useCallback(
        function handleClick(event) {
            onClick == null ? void 0 : onClick(event)
            const onSelectResult = onSelect && !event.defaultPrevented ? onSelect() : undefined
            const shouldClose = onSelectResult !== false && hideOnSelect
            handleItemSelect == null ? void 0 : handleItemSelect(value)
            if (shouldClose) hide()
        },
        [onSelect, onClick, handleItemSelect, hideOnSelect, hide, value],
    )
    return /*#__PURE__*/ React.createElement(
        MenuItem$1,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                store: menuStore,
                ref: ref,
                onClick: handleClick,
                className: exceptionallySetClassName,
                hideOnClick: false,
            },
        ),
        children,
    )
})
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

const SubMenu = /*#__PURE__*/ React.forwardRef(function SubMenu({ children, onItemSelect }, ref) {
    const { handleItemSelect: parentMenuItemSelect, menuStore } = React.useContext(MenuContext)

    if (!menuStore) {
        throw new Error('SubMenu must be wrapped in <Menu/>')
    }

    const { hide: parentMenuHide } = menuStore
    const handleSubItemSelect = React.useCallback(
        function handleSubItemSelect(value) {
            onItemSelect == null ? void 0 : onItemSelect(value)
            parentMenuItemSelect == null ? void 0 : parentMenuItemSelect(value)
            parentMenuHide()
        },
        [parentMenuHide, parentMenuItemSelect, onItemSelect],
    )
    const [button, list] = React.Children.toArray(children)
    const buttonElement = button
    return /*#__PURE__*/ React.createElement(
        Menu,
        {
            onItemSelect: handleSubItemSelect,
        },
        /*#__PURE__*/ React.createElement(
            MenuItem$1,
            {
                store: menuStore,
                ref: ref,
                hideOnClick: false,
                render: buttonElement,
            },
            buttonElement.props.children,
        ),
        list,
    )
})
/**
 * A way to semantically group some menu items.
 *
 * This group does not add any visual separator. You can do that yourself adding `<hr />` elements
 * before and/or after the group if you so wish.
 */

const MenuGroup = /*#__PURE__*/ React.forwardRef(function MenuGroup(_ref6, ref) {
    let { label, children, exceptionallySetClassName } = _ref6,
        props = _objectWithoutProperties(_ref6, _excluded6)

    const { menuStore } = React.useContext(MenuContext)

    if (!menuStore) {
        throw new Error('MenuGroup must be wrapped in <Menu/>')
    }

    return /*#__PURE__*/ React.createElement(
        MenuGroup$1,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                store: menuStore,
                className: exceptionallySetClassName,
            },
        ),
        label
            ? /*#__PURE__*/ React.createElement(
                  'div',
                  {
                      role: 'presentation',
                      className: 'reactist_menugroup__label',
                  },
                  label,
              )
            : null,
        children,
    )
})

export { ContextMenuTrigger, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SubMenu }
//# sourceMappingURL=menu.js.map
