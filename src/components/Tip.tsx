import './styles/tip.less'

import React from 'react'
import classNames from 'classnames'

import ThinQuestionMark from './icons/ThinQuestionMarkIcon.svg'
import Dropdown from './Dropdown'

interface Props {
    /** Additional css class that is applied to the Tip. */
    className?: string
    /** Title of the tip. */
    title?: React.ReactNode
    /** Message of the tip. */
    message?: React.ReactNode
    /** Whether the tip content should be displayed to the top or not. Maps to the Dropdown.Box top property. */
    top?: boolean
}

function Tip({ title, message, top, className }: Props) {
    const tipClass = classNames('reactist_tip__container', className)
    return (
        <Dropdown.Box top={top} className={tipClass}>
            <Dropdown.Trigger>
                <ThinQuestionMark />
            </Dropdown.Trigger>
            <Dropdown.Body>
                <div className="reactist_tip">
                    <p className="reactist_tip--title">{title}</p>
                    <p className="reactist_tip--message">{message}</p>
                </div>
            </Dropdown.Body>
        </Dropdown.Box>
    )
}
Tip.displayName = 'Tip'
Tip.defaultProps = {
    top: false,
}

export default Tip
