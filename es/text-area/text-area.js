import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'
import { BaseField } from '../base-field/base-field.js'
import { Box } from '../box/box.js'
import modules_2728c236 from './text-area.module.css.js'

const _excluded = [
        'variant',
        'id',
        'label',
        'value',
        'auxiliaryLabel',
        'message',
        'tone',
        'maxWidth',
        'maxLength',
        'hidden',
        'aria-describedby',
        'rows',
        'autoExpand',
        'disableResize',
        'onChange',
    ],
    _excluded2 = ['onChange']
const TextArea = /*#__PURE__*/ React.forwardRef(function TextArea(_ref, ref) {
    let {
            variant = 'default',
            id,
            label,
            value,
            auxiliaryLabel,
            message,
            tone,
            maxWidth,
            maxLength,
            hidden,
            'aria-describedby': ariaDescribedBy,
            rows,
            autoExpand = false,
            disableResize = false,
            onChange: originalOnChange,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const containerRef = React.useRef(null)
    const internalRef = React.useRef(null)
    const combinedRef = useMergeRefs([ref, internalRef])
    const textAreaClassName = classNames([
        autoExpand ? modules_2728c236.disableResize : null,
        disableResize ? modules_2728c236.disableResize : null,
    ])
    React.useEffect(
        function setupAutoExpand() {
            const containerElement = containerRef.current

            function handleAutoExpand(value) {
                if (containerElement) {
                    containerElement.dataset.replicatedValue = value
                }
            }

            function handleInput(event) {
                handleAutoExpand(event.currentTarget.value)
            }

            const textAreaElement = internalRef.current

            if (!textAreaElement || !autoExpand) {
                return undefined
            } // Apply change initially, in case the text area has a non-empty initial value

            handleAutoExpand(textAreaElement.value)
            textAreaElement.addEventListener('input', handleInput)
            return () => textAreaElement.removeEventListener('input', handleInput)
        },
        [autoExpand],
    )
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
            hidden: hidden,
            'aria-describedby': ariaDescribedBy,
            className: [
                modules_2728c236.textAreaContainer,
                tone === 'error' ? modules_2728c236.error : null,
                variant === 'bordered' ? modules_2728c236.bordered : null,
            ],
            maxWidth: maxWidth,
            maxLength: maxLength,
        },
        (_ref2) => {
            let { onChange } = _ref2,
                extraProps = _objectWithoutProperties(_ref2, _excluded2)

            return /*#__PURE__*/ React.createElement(
                Box,
                {
                    width: 'full',
                    display: 'flex',
                    className: modules_2728c236.innerContainer,
                    ref: containerRef,
                },
                /*#__PURE__*/ React.createElement(
                    'textarea',
                    _objectSpread2(
                        _objectSpread2(_objectSpread2({}, props), extraProps),
                        {},
                        {
                            ref: combinedRef,
                            rows: rows,
                            className: textAreaClassName,
                            maxLength: maxLength,
                            onChange: (event) => {
                                originalOnChange == null ? void 0 : originalOnChange(event)
                                onChange == null ? void 0 : onChange(event)
                            },
                        },
                    ),
                ),
            )
        },
    )
})

export { TextArea }
//# sourceMappingURL=text-area.js.map
