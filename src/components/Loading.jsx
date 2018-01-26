import './styles/loading.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Loading = ({ white, className }) => {
    const loadingClass = classNames(
        'spinner',
        {
            'spinner--white': white
        },
        className
    )
    return (
        <div className={loadingClass}>
            <div className="spinner__dot" />
            <div className="spinner__dot" />
            <div className="spinner__dot" />
        </div>
    )
}
Loading.displayName = 'Loading'
Loading.defaultProps = {
    white: false
}
Loading.propTypes = {
    /** Use white instead of default gray. */
    white: PropTypes.bool,
    /** Additional css class that is applied to Loading. */
    className: PropTypes.string
}

export default Loading
