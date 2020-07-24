import React from 'react'
import classNames from 'classnames'

import {
    useTooltipState,
    Tooltip as ReakitTooltip,
    TooltipReference,
    TooltipProps as ReakitTooltipProps,
} from 'reakit/Tooltip'
import { PopoverState } from 'reakit/Popover'

import './styles/tooltip.less'

type TooltipProps = Omit<ReakitTooltipProps, 'children'> & {
    children: React.ReactNode
    content: React.ReactNode
    position?: PopoverState['placement']
    gapSize?: number
}

function Tooltip({
    children,
    content,
    position = 'top',
    gapSize = 3,
    className,
    ...props
}: TooltipProps) {
    const tooltip = useTooltipState({ placement: position, gutter: gapSize })

    const child = React.Children.only<React.ReactElement>(children as React.ReactElement)
    if (!content) {
        return child
    }

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <TooltipReference {...tooltip} ref={(child as any).ref} {...child.props}>
                {(referenceProps) => React.cloneElement(child, referenceProps)}
            </TooltipReference>
            <ReakitTooltip
                {...tooltip}
                {...props}
                className={classNames('reactist_tooltip', className)}
            >
                {content}
            </ReakitTooltip>
        </>
    )
}

export { Tooltip, TooltipProps }
