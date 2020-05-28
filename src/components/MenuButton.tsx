import './styles/menu_button.less'

import React from 'react'
import classNames from 'classnames'
import Dropdown from './Dropdown'

type Props = {
    /** Additional css class applied to the MenuButton. */
    className?: string
    /** When not providing any children you can control what happens when the MenuButton is clicked. */
    onClick?: React.MouseEventHandler
    /** Name that is displayed as trigger of the MenuButton.  */
    name?: React.ReactNode
    /** Children are displayed as items after clicking on the MenuButton. */
    children?: React.ReactNode[]
}

function MenuButton({ className, name, onClick, children }: Props) {
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

type MenuButtonItemProps = {
    /** Additional css class applied to the MenuButtonItem. */
    className?: string
    /** Callback when MenuButtonItem is clicked. */
    onClick?: React.MouseEventHandler
}

function MenuButtonItem({
    className,
    onClick,
    /** Content of the MenuButtonItem. */
    children,
}: React.PropsWithChildren<MenuButtonItemProps>) {
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

export { MenuButton, MenuButtonItem }
