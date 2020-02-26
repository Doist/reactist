import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Popper from './Popper'
import './styles/tooltip_new.less'
import useId from './utils/useId'
import useForkRef from './utils/useForkRef'

export default function TooltipNew({ title, children, placement = 'bottom' }) {
    const childRef = useRef()
    const handleRef = useForkRef(children.ref, childRef)
    const [isShown, setIsShown] = useState(false)

    const handleEnter = event => {
        const childrenProps = children.props
        if (
            event.type === 'mouseover' &&
            childrenProps.onMouseOver &&
            event.currentTarget === childRef.current
        ) {
            childrenProps.onMouseOver(event)
        }

        if (
            event.type === 'focus' &&
            childrenProps.onFocus &&
            event.currentTarget === childRef.current
        ) {
            childrenProps.onMouseOver(event)
        }

        setIsShown(true)
    }

    const handleLeave = event => {
        const childrenProps = children.props
        if (
            event.type === 'mouseleave' &&
            childrenProps.onMouseLeave &&
            event.currentTarget === childRef.current
        ) {
            childrenProps.onMouseLeave(event)
        }

        if (
            event.type === 'blur' &&
            childrenProps.onBlur &&
            event.currentTarget === childRef.current
        ) {
            childrenProps.onBlur(event)
        }

        setIsShown(false)
    }

    const id = useId('tooltip')
    const childrenProps = {
        ...children.props,
        'aria-describedby': isShown ? id : null,
        onMouseOver: handleEnter,
        onMouseLeave: handleLeave,
        onFocus: handleEnter,
        onBlur: handleLeave,
        ref: handleRef
    }

    return (
        <>
            {React.cloneElement(children, childrenProps)}
            <Popper
                className="reactist tooltip_new"
                placement={placement}
                referenceElement={childRef.current}
                isShown={isShown}
                id={id}
            >
                <div className="tooltip_new__content">{title}</div>
            </Popper>
        </>
    )
}

TooltipNew.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
        .isRequired,
    children: PropTypes.object.isRequired,
    placement: Popper.propTypes.placement
}
