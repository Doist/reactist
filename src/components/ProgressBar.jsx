import './styles/progress_bar.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ProgressBar = ({ fillPercentage, className }) => {
    const finalClassName = classNames('reactist_progress_bar', className)
    const width =
        fillPercentage < 0 ? 0 : fillPercentage > 100 ? 100 : fillPercentage
    return (
        <div className={finalClassName}>
            <div className="inner" style={{ width: `${width}%` }} />
        </div>
    )
}
ProgressBar.displayName = 'ProgressBar'
ProgressBar.defaultProps = {
    fillPercentage: 0
}
ProgressBar.propTypes = {
    /** How much of the progress bar should be filled. Number between 0 and 100 inclusive. */
    fillPercentage: PropTypes.number,
    /** Additional css class applied to the progress bar. */
    className: PropTypes.string
}

export default ProgressBar
