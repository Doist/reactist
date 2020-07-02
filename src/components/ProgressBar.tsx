import './styles/progress_bar.less'

import React from 'react'
import classNames from 'classnames'

type Props = {
    /** Additional css class applied to the progress bar. */
    className?: string
    /** How much of the progress bar should be filled. Number between 0 and 100 inclusive. */
    fillPercentage?: number
}
function ProgressBar({ fillPercentage = 0, className }: Props) {
    const finalClassName = classNames('reactist_progress_bar', className)
    const width = fillPercentage < 0 ? 0 : fillPercentage > 100 ? 100 : fillPercentage
    return (
        <div className={finalClassName}>
            <div className="inner" style={{ width: `${width}%` }} />
        </div>
    )
}
ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
