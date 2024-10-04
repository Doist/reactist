import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { BaseField } from '../base-field/base-field.js'
import { Box } from '../box/box.js'
import modules_1fa9b208 from './select-field.module.css.js'

const _excluded = [
    'variant',
    'id',
    'label',
    'value',
    'auxiliaryLabel',
    'message',
    'tone',
    'maxWidth',
    'children',
    'hidden',
    'aria-describedby',
    'onChange',
]
const SelectField = /*#__PURE__*/ React.forwardRef(function SelectField(_ref, ref) {
    let {
            variant = 'default',
            id,
            label,
            value,
            auxiliaryLabel,
            message,
            tone,
            maxWidth,
            children,
            hidden,
            'aria-describedby': ariaDescribedBy,
            onChange: originalOnChange,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

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
            hidden: hidden,
            'aria-describedby': ariaDescribedBy,
        },
        (extraProps) =>
            /*#__PURE__*/ React.createElement(
                Box,
                {
                    'data-testid': 'select-wrapper',
                    className: [
                        modules_1fa9b208.selectWrapper,
                        tone === 'error' ? modules_1fa9b208.error : null,
                        variant === 'bordered' ? modules_1fa9b208.bordered : null,
                    ],
                },
                /*#__PURE__*/ React.createElement(
                    'select',
                    _objectSpread2(
                        _objectSpread2(_objectSpread2({}, props), extraProps),
                        {},
                        {
                            ref: ref,
                            onChange: (event) => {
                                originalOnChange == null ? void 0 : originalOnChange(event)
                            },
                        },
                    ),
                    children,
                ),
                /*#__PURE__*/ React.createElement(SelectChevron, {
                    'aria-hidden': true,
                }),
            ),
    )
})

function SelectChevron(props) {
    return /*#__PURE__*/ React.createElement(
        'svg',
        _objectSpread2(
            {
                width: '16',
                height: '16',
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
            },
            props,
        ),
        /*#__PURE__*/ React.createElement('path', {
            d:
                'M11.646 5.646a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L8 9.293l3.646-3.647z',
            fill: 'currentColor',
        }),
    )
}

export { SelectField }
//# sourceMappingURL=select-field.js.map
