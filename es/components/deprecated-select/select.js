import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'

const _excluded = ['value', 'options', 'onChange', 'disabled', 'className', 'defaultValue']

function Select(_ref) {
    let { value, options = [], onChange, disabled = true, className = '', defaultValue } = _ref,
        otherProps = _objectWithoutProperties(_ref, _excluded)

    const selectClassName = classNames(
        'reactist_select',
        {
            disabled,
        },
        className,
    )
    return /*#__PURE__*/ React.createElement(
        'select',
        _objectSpread2(
            {
                className: selectClassName,
                value: value,
                onChange: (event) => (onChange ? onChange(event.target.value) : undefined),
                disabled: disabled,
                defaultValue: defaultValue,
            },
            otherProps,
        ),
        options == null
            ? void 0
            : options.map((option) =>
                  /*#__PURE__*/ React.createElement(
                      'option',
                      {
                          key: option.key || option.value,
                          value: option.value,
                          disabled: option.disabled,
                      },
                      option.text,
                  ),
              ),
    )
}

Select.displayName = 'Select'
Select.defaultProps = {
    options: [],
    disabled: false,
}

export { Select }
//# sourceMappingURL=select.js.map
