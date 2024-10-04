import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { BaseField } from '../base-field/base-field.js'
import { Box } from '../box/box.js'
import modules_aaf25250 from './text-field.module.css.js'
import { useMergeRefs } from 'use-callback-ref'

const _excluded = [
        'variant',
        'id',
        'label',
        'value',
        'auxiliaryLabel',
        'message',
        'tone',
        'type',
        'maxWidth',
        'maxLength',
        'hidden',
        'aria-describedby',
        'startSlot',
        'endSlot',
        'onChange',
    ],
    _excluded2 = ['onChange']
const TextField = /*#__PURE__*/ React.forwardRef(function TextField(_ref, ref) {
    let {
            variant = 'default',
            id,
            label,
            value,
            auxiliaryLabel,
            message,
            tone,
            type = 'text',
            maxWidth,
            maxLength,
            hidden,
            'aria-describedby': ariaDescribedBy,
            startSlot,
            endSlot,
            onChange: originalOnChange,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const internalRef = React.useRef(null)
    const combinedRef = useMergeRefs([ref, internalRef])

    function handleClick(event) {
        var _internalRef$current

        if (event.currentTarget === combinedRef.current) return
        ;(_internalRef$current = internalRef.current) == null
            ? void 0
            : _internalRef$current.focus()
    }

    return /*#__PURE__*/ React.createElement(
        BaseField,
        {
            variant: variant,
            id: id,
            label: label,
            value: value,
            auxiliaryLabel: auxiliaryLabel,
            message: message,
            tone: tone,
            maxWidth: maxWidth,
            maxLength: maxLength,
            hidden: hidden,
            'aria-describedby': ariaDescribedBy,
        },
        (_ref2) => {
            let { onChange } = _ref2,
                extraProps = _objectWithoutProperties(_ref2, _excluded2)

            return /*#__PURE__*/ React.createElement(
                Box,
                {
                    display: 'flex',
                    alignItems: 'center',
                    className: [
                        modules_aaf25250.inputWrapper,
                        tone === 'error' ? modules_aaf25250.error : null,
                        variant === 'bordered' ? modules_aaf25250.bordered : null,
                        props.readOnly ? modules_aaf25250.readOnly : null,
                    ],
                    onClick: handleClick,
                },
                startSlot
                    ? /*#__PURE__*/ React.createElement(
                          Box,
                          {
                              className: modules_aaf25250.slot,
                              display: 'flex',
                              marginRight: variant === 'bordered' ? 'xsmall' : '-xsmall',
                              marginLeft: variant === 'bordered' ? '-xsmall' : 'xsmall',
                          },
                          startSlot,
                      )
                    : null,
                /*#__PURE__*/ React.createElement(
                    'input',
                    _objectSpread2(
                        _objectSpread2(_objectSpread2({}, props), extraProps),
                        {},
                        {
                            type: type,
                            ref: combinedRef,
                            maxLength: maxLength,
                            onChange: (event) => {
                                originalOnChange == null ? void 0 : originalOnChange(event)
                                onChange == null ? void 0 : onChange(event)
                            },
                        },
                    ),
                ),
                endSlot
                    ? /*#__PURE__*/ React.createElement(
                          Box,
                          {
                              className: modules_aaf25250.slot,
                              display: 'flex',
                              marginRight: variant === 'bordered' ? '-xsmall' : 'xsmall',
                              marginLeft: variant === 'bordered' ? 'xsmall' : '-xsmall',
                          },
                          endSlot,
                      )
                    : null,
            )
        },
    )
})

export { TextField }
//# sourceMappingURL=text-field.js.map
