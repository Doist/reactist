import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import { Text } from '../text/text.js'
import { CheckboxIcon } from './checkbox-icon.js'
import modules_664a6a80 from './checkbox-field.module.css.js'
import { useForkRef } from './use-fork-ref.js'

const _excluded = ['label', 'icon', 'disabled', 'indeterminate', 'defaultChecked', 'onChange']
const CheckboxField = /*#__PURE__*/ React.forwardRef(function CheckboxField(_ref, ref) {
    var _ref2, _props$checked, _props$checked2

    let { label, icon, disabled, indeterminate, defaultChecked, onChange } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const isControlledComponent = typeof props.checked === 'boolean'

    if (typeof indeterminate === 'boolean' && !isControlledComponent) {
        // eslint-disable-next-line no-console
        console.warn('Cannot use indeterminate on an uncontrolled checkbox')
        indeterminate = undefined
    }

    if (!label && !props['aria-label'] && !props['aria-labelledby']) {
        // eslint-disable-next-line no-console
        console.warn('A Checkbox needs a label')
    }

    const [keyFocused, setKeyFocused] = React.useState(false)
    const [checkedState, setChecked] = React.useState(
        (_ref2 = (_props$checked = props.checked) != null ? _props$checked : defaultChecked) != null
            ? _ref2
            : false,
    )
    const isChecked = (_props$checked2 = props.checked) != null ? _props$checked2 : checkedState
    const internalRef = React.useRef(null)
    const combinedRef = useForkRef(internalRef, ref)
    React.useEffect(
        function setIndeterminate() {
            if (internalRef.current && typeof indeterminate === 'boolean') {
                internalRef.current.indeterminate = indeterminate
            }
        },
        [indeterminate],
    )
    return /*#__PURE__*/ React.createElement(
        Box,
        {
            as: 'label',
            display: 'flex',
            alignItems: 'center',
            className: [
                modules_664a6a80.container,
                disabled ? modules_664a6a80.disabled : null,
                isChecked ? modules_664a6a80.checked : null,
                keyFocused ? modules_664a6a80.keyFocused : null,
            ],
        },
        /*#__PURE__*/ React.createElement(
            'input',
            _objectSpread2(
                _objectSpread2({}, props),
                {},
                {
                    ref: combinedRef,
                    type: 'checkbox',
                    'aria-checked': indeterminate ? 'mixed' : isChecked,
                    checked: isChecked,
                    disabled: disabled,
                    onChange: (event) => {
                        onChange == null ? void 0 : onChange(event)

                        if (!event.defaultPrevented) {
                            setChecked(event.currentTarget.checked)
                        }
                    },
                    onBlur: (event) => {
                        setKeyFocused(false)
                        props == null ? void 0 : props.onBlur == null ? void 0 : props.onBlur(event)
                    },
                    onKeyUp: (event) => {
                        setKeyFocused(true)
                        props == null
                            ? void 0
                            : props.onKeyUp == null
                            ? void 0
                            : props.onKeyUp(event)
                    },
                },
            ),
        ),
        /*#__PURE__*/ React.createElement(CheckboxIcon, {
            checked: isChecked,
            disabled: disabled,
            indeterminate: indeterminate,
            'aria-hidden': true,
        }),
        icon
            ? /*#__PURE__*/ React.createElement(
                  Box,
                  {
                      display: 'flex',
                      className: modules_664a6a80.icon,
                      'aria-hidden': true,
                  },
                  icon,
              )
            : null,
        label
            ? /*#__PURE__*/ React.createElement(
                  Box,
                  {
                      display: 'flex',
                      className: modules_664a6a80.label,
                  },
                  /*#__PURE__*/ React.createElement(Text, null, label),
              )
            : null,
    )
})

export { CheckboxField }
//# sourceMappingURL=checkbox-field.js.map
