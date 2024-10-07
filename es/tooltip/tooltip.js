import * as React from 'react'
import { useTooltipStore, TooltipAnchor, Tooltip as Tooltip$1, TooltipArrow } from '@ariakit/react'
import { Box } from '../box/box.js'
import modules_95f1407a from './tooltip.module.css.js'

function Tooltip({
    children,
    content,
    position = 'top',
    gapSize = 3,
    withArrow = false,
    exceptionallySetClassName,
}) {
    const tooltip = useTooltipStore({
        placement: position,
        showTimeout: 500,
        hideTimeout: 100,
    })
    const isOpen = tooltip.useState('open')
    const child = React.Children.only(children)

    if (!child) {
        return child
    }

    if (typeof child.ref === 'string') {
        throw new Error('Tooltip: String refs cannot be used as they cannot be forwarded')
    }

    return /*#__PURE__*/ React.createElement(
        React.Fragment,
        null,
        /*#__PURE__*/ React.createElement(TooltipAnchor, {
            render: child,
            store: tooltip,
            ref: child.ref,
        }),
        isOpen && content
            ? /*#__PURE__*/ React.createElement(
                  Tooltip$1,
                  {
                      store: tooltip,
                      gutter: gapSize,
                      render: /*#__PURE__*/ React.createElement(Box, {
                          className: [modules_95f1407a.tooltip, exceptionallySetClassName],
                          background: 'toast',
                          borderRadius: 'standard',
                          paddingX: 'small',
                          paddingY: 'xsmall',
                          maxWidth: 'medium',
                          width: 'fitContent',
                          overflow: 'hidden',
                          textAlign: 'center',
                      }),
                  },
                  withArrow ? /*#__PURE__*/ React.createElement(TooltipArrow, null) : null,
                  typeof content === 'function' ? content() : content,
              )
            : null,
    )
}

export { Tooltip }
//# sourceMappingURL=tooltip.js.map
