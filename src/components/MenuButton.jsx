import './styles/menu_button.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Dropdown from './Dropdown'

const MenuButton = ({ className, name, onClick, children }) => {
    const menuButtonClass = classNames('reactist_menu_button', className)

    if (!children || children.length === 0) {
        return (
            <div className={menuButtonClass} onClick={onClick}>
                <span className="reactist_menu_button_trigger">{name}</span>
            </div>
        )
    }

    return (
        <Dropdown.Box className={menuButtonClass}>
            <Dropdown.Trigger>
                <span className="reactist_menu_button_trigger">{name}</span>
            </Dropdown.Trigger>
            <Dropdown.Body>
                <div className="reactist_menu_button_items">{children}</div>
            </Dropdown.Body>
        </Dropdown.Box>
    )
}
MenuButton.displayName = 'MenuButton'
MenuButton.propTypes = {
    /** Name that is displayed as trigger of the MenuButton.  */
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /** When not providing any children you can control what happens when the MenuButton is clicked. */
    onClick: PropTypes.func,
    /** Children are displayed as items after clicking on the MenuButton. */
    children: PropTypes.arrayOf(PropTypes.node),
    /** Additional css class applied to the MenuButton. */
    className: PropTypes.string
}

const MenuButtonItem = ({ className, onClick, children }) => {
    const menuButtonItemClass = classNames(
        'reactist_menu_button_item',
        className
    )
    return (
        <div className={menuButtonItemClass} onClick={onClick}>
            {children}
        </div>
    )
}
MenuButtonItem.displayName = 'MenuButtonItem'
MenuButtonItem.propTypes = {
    /** Callback when MenuButtonItem is clicked. */
    onClick: PropTypes.func,
    /** Content of the MenuButtonItem. */
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    /** Additional css class applied to the MenuButtonItem. */
    className: PropTypes.string
}

export { MenuButton, MenuButtonItem }
