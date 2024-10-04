import * as React from 'react'
import { getClassNames } from '../utils/responsive-props.js'
import { Box } from '../box/box.js'
import { Columns, Column } from '../columns/columns.js'
import { AlertIcon } from '../icons/alert-icon.js'
import modules_1b547e7e from './notice.module.css.js'

function Notice({ id, children, tone }) {
    return /*#__PURE__*/ React.createElement(
        Box,
        {
            id: id,
            role: 'alert',
            'aria-live': 'polite',
            className: [modules_1b547e7e.container, getClassNames(modules_1b547e7e, 'tone', tone)],
        },
        /*#__PURE__*/ React.createElement(
            Columns,
            {
                space: 'small',
                alignY: 'top',
            },
            /*#__PURE__*/ React.createElement(
                Column,
                {
                    width: 'content',
                },
                /*#__PURE__*/ React.createElement(AlertIcon, {
                    tone: tone,
                }),
            ),
            /*#__PURE__*/ React.createElement(
                Column,
                null,
                /*#__PURE__*/ React.createElement(
                    Box,
                    {
                        paddingY: 'xsmall',
                    },
                    children,
                ),
            ),
        ),
    )
}

export { Notice }
//# sourceMappingURL=notice.js.map
