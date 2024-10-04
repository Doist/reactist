import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import { Stack } from '../stack/stack.js'
import { Text } from '../text/text.js'
import { HiddenVisually } from '../hidden-visually/hidden-visually.js'
import { FieldMessage } from '../base-field/base-field.js'
import { useId } from '../utils/common-helpers.js'
import modules_8e05f7c9 from './switch-field.module.css.js'

const _excluded = [
    'label',
    'message',
    'tone',
    'disabled',
    'hidden',
    'defaultChecked',
    'id',
    'aria-describedby',
    'aria-label',
    'aria-labelledby',
    'onChange',
]
const SwitchField = /*#__PURE__*/ React.forwardRef(function SwitchField(_ref, ref) {
    var _ref2, _props$checked, _props$checked2

    let {
            label,
            message,
            tone = 'neutral',
            disabled = false,
            hidden,
            defaultChecked,
            id: originalId,
            'aria-describedby': originalAriaDescribedBy,
            'aria-label': originalAriaLabel,
            'aria-labelledby': originalAriaLabelledby,
            onChange,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const id = useId(originalId)
    const messageId = useId()
    const ariaDescribedBy =
        originalAriaDescribedBy != null ? originalAriaDescribedBy : message ? messageId : undefined
    const ariaLabel = originalAriaLabel != null ? originalAriaLabel : undefined
    const ariaLabelledBy = originalAriaLabelledby != null ? originalAriaLabelledby : undefined
    const [keyFocused, setKeyFocused] = React.useState(false)
    const [checkedState, setChecked] = React.useState(
        (_ref2 = (_props$checked = props.checked) != null ? _props$checked : defaultChecked) != null
            ? _ref2
            : false,
    )
    const isChecked = (_props$checked2 = props.checked) != null ? _props$checked2 : checkedState
    return /*#__PURE__*/ React.createElement(
        Stack,
        {
            space: 'small',
            hidden: hidden,
        },
        /*#__PURE__*/ React.createElement(
            Box,
            {
                className: [
                    modules_8e05f7c9.container,
                    disabled ? modules_8e05f7c9.disabled : null,
                    isChecked ? modules_8e05f7c9.checked : null,
                    keyFocused ? modules_8e05f7c9.keyFocused : null,
                ],
                as: 'label',
                display: 'flex',
                alignItems: 'center',
            },
            /*#__PURE__*/ React.createElement(
                Box,
                {
                    position: 'relative',
                    display: 'inlineBlock',
                    overflow: 'visible',
                    marginRight: 'small',
                    flexShrink: 0,
                    className: modules_8e05f7c9.toggle,
                },
                /*#__PURE__*/ React.createElement(
                    HiddenVisually,
                    null,
                    /*#__PURE__*/ React.createElement(
                        'input',
                        _objectSpread2(
                            _objectSpread2({}, props),
                            {},
                            {
                                id: id,
                                type: 'checkbox',
                                disabled: disabled,
                                'aria-describedby': ariaDescribedBy,
                                'aria-label': ariaLabel,
                                'aria-labelledby': ariaLabelledBy,
                                ref: ref,
                                checked: isChecked,
                                onChange: (event) => {
                                    onChange == null ? void 0 : onChange(event)

                                    if (!event.defaultPrevented) {
                                        setChecked(event.currentTarget.checked)
                                    }
                                },
                                onBlur: (event) => {
                                    setKeyFocused(false)
                                    props == null
                                        ? void 0
                                        : props.onBlur == null
                                        ? void 0
                                        : props.onBlur(event)
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
                ),
                /*#__PURE__*/ React.createElement('span', {
                    className: modules_8e05f7c9.handle,
                }),
            ),
            /*#__PURE__*/ React.createElement(
                Text,
                {
                    exceptionallySetClassName: modules_8e05f7c9.label,
                },
                label,
            ),
        ),
        message
            ? /*#__PURE__*/ React.createElement(
                  FieldMessage,
                  {
                      id: messageId,
                      tone: tone,
                  },
                  message,
              )
            : null,
    )
})

export { SwitchField }
//# sourceMappingURL=switch-field.js.map
