import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Manager, Reference, Popper as _Popper } from 'react-popper'
import normalizeKey from './utils/normalizeKey'
import getZIndex from './utils/getZIndex'
import isFixedPosition from './utils/isFixedPosition'
import './styles/popper.less'

// arrow distance to anchor (in px)
const ARROW_GAP = 12

/**
 * Popper is a component that puts content
 * above other elements.
 * It's absolute positioned by default and doesn't support overlays.
 * For an implementation of overlays and fixed only positioning
 * check the Popover component.
 *
 * @param {Object} referenceElement Popper could be positioned either by a HTMLElement
 *                                   or a prop render function that serves a React component
 *
 * @param {Object} modifiers Modifies the popper behaviour/position, Modifiers
 *                           list available on https://popper.js.org/popper-documentation.html#modifiers
 *
 */
function Popper({
    children,
    modifiers = {},
    placement = 'bottom',
    referenceElement,
    offsetX = '',
    offsetY = '',
    hasArrow = true,
    isShown = false,
    onClose = () => {},
    onShown = () => {},
    className = '',
    ...props
}) {
    const isReferenceRenderProp = typeof referenceElement === 'function'

    const popperRef = useRef(null)
    const referenceElementRef = useRef(null)

    const [positionFixed, setPositionFixed] = useState(
        isReferenceRenderProp ? false : isFixedPosition(referenceElement)
    )

    useEffect(
        () => {
            if (isShown) {
                // Set first the position to fixed and only after
                // to the final value, due to an issue where if something
                // inside the Popper get's focused, while it's calculating
                // its position, the whole page would be scrolled to the top.
                //
                // ref: https://github.com/mui-org/material-ui/issues/16740
                popperRef.current.style.position = 'fixed'

                window.requestAnimationFrame(() => {
                    if (popperRef.current) {
                        popperRef.current.style.position = positionFixed
                            ? 'fixed'
                            : 'absolute'
                    }
                })

                onShown()
            }
        },
        [isShown, onShown, positionFixed]
    )

    useEffect(() => {
        if (referenceElementRef.current) {
            setPositionFixed(isFixedPosition(referenceElementRef.current))
        }
    }, [])

    useEffect(
        () => {
            if (isShown) {
                const handleDocumentClick = event => {
                    if (
                        popperRef.current &&
                        !popperRef.current.contains(event.target)
                    ) {
                        onClose(event)
                    }
                }

                if ('ontouchend' in window) {
                    document.addEventListener('touchend', handleDocumentClick)
                } else {
                    document.addEventListener('click', handleDocumentClick)
                }

                return () => {
                    document.removeEventListener(
                        'touchend',
                        handleDocumentClick
                    )
                    document.removeEventListener('click', handleDocumentClick)
                }
            }
        },
        [isShown, onClose]
    )

    const handleKeyDown = evt => {
        const key = normalizeKey(evt.key)

        if (key === 'Escape' && typeof onClose === 'function') {
            evt.stopPropagation()
            onClose(evt)
        }
    }

    if (hasArrow) {
        offsetY = `${offsetY} + ${ARROW_GAP}px`
    }

    if (offsetX || offsetY) {
        modifiers = {
            ...modifiers,
            offset: { enabled: true, offset: `${offsetX}, ${offsetY}` },
            computeStyle: { gpuAcceleration: false }
        }
    }

    return (
        <Manager>
            {isReferenceRenderProp ? (
                <Reference>
                    {({ ref }) => {
                        return referenceElement({
                            ref: node => {
                                referenceElementRef.current = node
                                ref(node)
                            },
                            isExpanded: isShown
                        })
                    }}
                </Reference>
            ) : null}
            {isShown
                ? ReactDOM.createPortal(
                      <_Popper
                          innerRef={node => (popperRef.current = node)}
                          referenceElement={
                              isReferenceRenderProp
                                  ? undefined
                                  : referenceElement
                          }
                          modifiers={modifiers}
                          placement={placement}
                          positionFixed={positionFixed}
                      >
                          {({ ref, style, placement, arrowProps }) => {
                              style = {
                                  ...style,
                                  zIndex: getZIndex(
                                      referenceElementRef.current ||
                                          referenceElement
                                  )
                              }

                              return (
                                  <div
                                      className={className + ' popper'}
                                      ref={ref}
                                      style={style}
                                      data-placement={placement}
                                      onKeyDown={handleKeyDown}
                                      {...props}
                                  >
                                      {hasArrow ? (
                                          <div
                                              className="popper__arrow"
                                              ref={arrowProps.ref}
                                              style={arrowProps.style}
                                          />
                                      ) : null}
                                      {typeof children === 'function'
                                          ? children()
                                          : children}
                                  </div>
                              )
                          }}
                      </_Popper>,
                      document.body
                  )
                : null}
        </Manager>
    )
}

Popper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    modifiers: PropTypes.object,
    offsetX: PropTypes.string,
    offsetY: PropTypes.string,
    placement: PropTypes.oneOf([
        'top-start',
        'bottom-start',
        'left-start',
        'right-start',
        'top',
        'bottom',
        'left',
        'right',
        'top-end',
        'bottom-end',
        'left-end',
        'right-end'
    ]),
    referenceElement: PropTypes.oneOfType([
        PropTypes.instanceOf(HTMLElement),
        PropTypes.func
    ]),
    hasArrow: PropTypes.bool,
    className: PropTypes.string,
    isShown: PropTypes.bool,
    onClose: PropTypes.func,
    onShown: PropTypes.func
}

export default Popper
