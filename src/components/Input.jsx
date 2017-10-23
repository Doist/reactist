import './styles/input.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Input = ({ ...props }) => {
    const className = classNames('reactist input', props.className)
    return (
        <input className={ className } { ...props } />
    )
}
Input.displayName = 'Input'
Input.propTypes = {
    /** Additional css class applied to the input. */
    className: PropTypes.string
}

export default Input
