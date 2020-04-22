import './styles/input.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * @typedef {Object} InputProps
 * @property {string | undefined} [className]
 */

/**
 * @typedef {InputProps & React.InputHTMLAttributes<HTMLInputElement>} Props
 */

const Input = React.forwardRef(
    /**
     * @param {Props} props
     * @param {React.Ref<HTMLInputElement>} ref
     */
    (props, ref) => {
        const className = classNames('reactist_input', props.className)
        return <input {...props} className={className} ref={ref} />
    }
)
Input.displayName = 'Input'
Input.propTypes = {
    /** Additional css class applied to the input. */
    className: PropTypes.string
}

export default Input
