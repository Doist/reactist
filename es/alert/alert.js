import * as React from 'react'
import { getClassNames } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import { Button } from '../button/button.js'
import { Columns, Column } from '../columns/columns.js'
import { AlertIcon } from '../icons/alert-icon.js'
import { CloseIcon } from '../icons/close-icon.js'
import modules_6205a58e from './alert.module.css.js'

function Alert({ id, children, tone, closeLabel, onClose }) {
    return /*#__PURE__*/ React.createElement(
        Box,
        {
            id: id,
            role: 'alert',
            'aria-live': 'polite',
            borderRadius: 'full',
            className: [modules_6205a58e.container, getClassNames(modules_6205a58e, 'tone', tone)],
        },
        /*#__PURE__*/ React.createElement(
            Columns,
            {
                space: 'small',
                alignY: 'center',
            },
            /*#__PURE__*/ React.createElement(
                Column,
                {
                    width: 'content',
                },
                /*#__PURE__*/ React.createElement(AlertIcon, {
                    tone: tone,
                    className: modules_6205a58e.icon,
                }),
            ),
            /*#__PURE__*/ React.createElement(
                Column,
                null,
                /*#__PURE__*/ React.createElement(
                    Box,
                    {
                        paddingY: 'xsmall',
                        paddingRight: onClose != null && closeLabel != null ? undefined : 'small',
                    },
                    children,
                ),
            ),
            onClose != null && closeLabel != null
                ? /*#__PURE__*/ React.createElement(
                      Column,
                      {
                          width: 'content',
                      },
                      /*#__PURE__*/ React.createElement(Button, {
                          variant: 'quaternary',
                          size: 'small',
                          onClick: onClose,
                          'aria-label': closeLabel,
                          icon: /*#__PURE__*/ React.createElement(CloseIcon, null),
                          style: {
                              // @ts-expect-error not sure how to make TypeScript understand custom CSS properties
                              '--reactist-btn-hover-fill': 'transparent',
                          },
                      }),
                  )
                : null,
        ),
    )
}

export { Alert }
//# sourceMappingURL=alert.js.map
