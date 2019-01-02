import './styles/input.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Input = React.forwardRef((props, ref) => {
    const className = classNames('reactist input', props.className)
    return <input className={className} {...props} ref={ref} />
})
Input.displayName = 'Input'
Input.propTypes = {
    /** Additional css class applied to the input. */
    className: PropTypes.string
}

export default Input
