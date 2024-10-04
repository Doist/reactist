import { objectSpread2 as _objectSpread2 } from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import { useId } from '../utils/common-helpers.js'
import { Text } from '../text/text.js'
import modules_540a88ff from './base-field.module.css.js'
import { Stack } from '../stack/stack.js'
import { Spinner } from '../spinner/spinner.js'
import { Columns, Column } from '../columns/columns.js'

const MAX_LENGTH_THRESHOLD = 10

function fieldToneToTextTone(tone) {
    return tone === 'error' ? 'danger' : tone === 'success' ? 'positive' : 'secondary'
}

function FieldMessage({ id, children, tone }) {
    return /*#__PURE__*/ React.createElement(
        Text,
        {
            as: 'p',
            tone: fieldToneToTextTone(tone),
            size: 'copy',
            id: id,
        },
        tone === 'loading'
            ? /*#__PURE__*/ React.createElement(
                  Box,
                  {
                      as: 'span',
                      marginRight: 'xsmall',
                      display: 'inlineFlex',
                      className: modules_540a88ff.loadingIcon,
                  },
                  /*#__PURE__*/ React.createElement(Spinner, {
                      size: 16,
                  }),
              )
            : null,
        children,
    )
}

function FieldCharacterCount({ children, tone }) {
    return /*#__PURE__*/ React.createElement(
        Text,
        {
            tone: fieldToneToTextTone(tone),
            size: 'copy',
        },
        children,
    )
}

function validateInputLength({ value, maxLength }) {
    if (!maxLength) {
        return {
            count: null,
            tone: 'neutral',
        }
    }

    const currentLength = String(value || '').length
    const isNearMaxLength = maxLength - currentLength <= MAX_LENGTH_THRESHOLD
    return {
        count: currentLength + '/' + maxLength,
        tone: isNearMaxLength ? 'error' : 'neutral',
    }
}

function BaseField({
    variant = 'default',
    label,
    value,
    auxiliaryLabel,
    message,
    tone = 'neutral',
    className,
    children,
    maxWidth,
    maxLength,
    hidden,
    'aria-describedby': originalAriaDescribedBy,
    id: originalId,
}) {
    const id = useId(originalId)
    const messageId = useId()
    const inputLength = validateInputLength({
        value,
        maxLength,
    })
    const [characterCount, setCharacterCount] = React.useState(inputLength.count)
    const [characterCountTone, setCharacterCountTone] = React.useState(inputLength.tone)
    const ariaDescribedBy =
        originalAriaDescribedBy != null ? originalAriaDescribedBy : message ? messageId : null

    const childrenProps = _objectSpread2(
        _objectSpread2(
            {
                id,
                value,
            },
            ariaDescribedBy
                ? {
                      'aria-describedby': ariaDescribedBy,
                  }
                : {},
        ),
        {},
        {
            'aria-invalid': tone === 'error' ? true : undefined,

            onChange(event) {
                if (!maxLength) {
                    return
                }

                const inputLength = validateInputLength({
                    value: event.currentTarget.value,
                    maxLength,
                })
                setCharacterCount(inputLength.count)
                setCharacterCountTone(inputLength.tone)
            },
        },
    )

    React.useEffect(
        function updateCharacterCountOnPropChange() {
            if (!maxLength) {
                return
            }

            const inputLength = validateInputLength({
                value,
                maxLength,
            })
            setCharacterCount(inputLength.count)
            setCharacterCountTone(inputLength.tone)
        },
        [maxLength, value],
    )
    return /*#__PURE__*/ React.createElement(
        Stack,
        {
            space: 'xsmall',
            hidden: hidden,
        },
        /*#__PURE__*/ React.createElement(
            Box,
            {
                className: [
                    className,
                    modules_540a88ff.container,
                    tone === 'error' ? modules_540a88ff.error : null,
                    variant === 'bordered' ? modules_540a88ff.bordered : null,
                ],
                maxWidth: maxWidth,
            },
            label || auxiliaryLabel
                ? /*#__PURE__*/ React.createElement(
                      Box,
                      {
                          as: 'span',
                          display: 'flex',
                          justifyContent: 'spaceBetween',
                          alignItems: 'flexEnd',
                      },
                      /*#__PURE__*/ React.createElement(
                          Text,
                          {
                              size: variant === 'bordered' ? 'caption' : 'body',
                              as: 'label',
                              htmlFor: id,
                          },
                          label
                              ? /*#__PURE__*/ React.createElement(
                                    'span',
                                    {
                                        className: modules_540a88ff.primaryLabel,
                                    },
                                    label,
                                )
                              : null,
                      ),
                      auxiliaryLabel
                          ? /*#__PURE__*/ React.createElement(
                                Box,
                                {
                                    className: modules_540a88ff.auxiliaryLabel,
                                    paddingLeft: 'small',
                                },
                                auxiliaryLabel,
                            )
                          : null,
                  )
                : null,
            children(childrenProps),
        ),
        message || characterCount
            ? /*#__PURE__*/ React.createElement(
                  Columns,
                  {
                      align: 'right',
                      space: 'small',
                      maxWidth: maxWidth,
                  },
                  message
                      ? /*#__PURE__*/ React.createElement(
                            Column,
                            {
                                width: 'auto',
                            },
                            /*#__PURE__*/ React.createElement(
                                FieldMessage,
                                {
                                    id: messageId,
                                    tone: tone,
                                },
                                message,
                            ),
                        )
                      : null,
                  characterCount
                      ? /*#__PURE__*/ React.createElement(
                            Column,
                            {
                                width: 'content',
                            },
                            /*#__PURE__*/ React.createElement(
                                FieldCharacterCount,
                                {
                                    tone: characterCountTone,
                                },
                                characterCount,
                            ),
                        )
                      : null,
              )
            : null,
    )
}

export { BaseField, FieldMessage }
//# sourceMappingURL=base-field.js.map
