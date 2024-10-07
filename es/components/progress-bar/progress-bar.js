import * as React from 'react'
import { HiddenVisually } from '../../hidden-visually/hidden-visually.js'
import classNames from 'classnames'

function ProgressBar({ fillPercentage = 0, className, 'aria-valuetext': ariaValuetext }) {
    const finalClassName = classNames('reactist_progress_bar', className)
    const width = fillPercentage < 0 ? 0 : fillPercentage > 100 ? 100 : fillPercentage
    return /*#__PURE__*/ React.createElement(
        'div',
        {
            className: finalClassName,
        },
        /*#__PURE__*/ React.createElement('div', {
            className: 'inner',
            style: {
                width: width + '%',
            },
        }),
        /*#__PURE__*/ React.createElement(
            HiddenVisually,
            null,
            /*#__PURE__*/ React.createElement('progress', {
                value: width,
                max: 100,
                'aria-valuetext': ariaValuetext != null ? ariaValuetext : undefined,
            }),
        ),
    )
}

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
//# sourceMappingURL=progress-bar.js.map
