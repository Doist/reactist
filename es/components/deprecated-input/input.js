import { objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'

/**
 * @deprecated
 */

const Input = /*#__PURE__*/ React.forwardRef(function Input(props, ref) {
    const className = classNames('reactist_input', props.className)
    return /*#__PURE__*/ React.createElement(
        'input',
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                className: className,
                ref: ref,
            },
        ),
    )
})
Input.displayName = 'Input'

export { Input }
//# sourceMappingURL=input.js.map
