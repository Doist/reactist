import * as React from 'react'
import { Transition } from 'react-transition-group'

import { Box } from '../box'

import styles from './animated-expansion-panel-content.module.css'

const HEIGHT_TRANSITION_DURATION = 200 /* milliseconds */

/** Vertical offset (px) the content drops in from as it opens. Negative = starts
 *  slightly above its resting place and settles down, matching the direction the
 *  height reveals (top-down), so the two motions read as one. */
const CONTENT_ENTER_OFFSET = -12

/* On open the content drops in with a gentle overshoot, and its fade is delayed
 * slightly so it trails the reveal/drop rather than fading in from the first frame.
 * On close it just fades out promptly (no delay, no spring). */
const OPEN_TRANSITION =
    'opacity 150ms ease-out 50ms, transform 190ms cubic-bezier(0.34, 1.3, 0.64, 1)'
const CLOSE_TRANSITION = 'opacity 140ms ease-in, transform 190ms cubic-bezier(0.4, 0, 0.2, 1)'

function setElementHeight(element: HTMLElement, height: number | 'auto') {
    element.style.transitionDuration = `${HEIGHT_TRANSITION_DURATION}ms`
    element.style.height = height === 'auto' ? height : `${height}px`
}

/**
 * Drives the content's own motion (opacity + vertical offset). The bounce lives
 * here — on the content itself — rather than on the container height, so it reads
 * the same regardless of what sits below it. (A height-only overshoot is only
 * visible by displacing following content.) Spring easing lives in the inline
 * transition above.
 */
function setContentMotion(
    element: HTMLElement | null,
    opacity: 0 | 1,
    offset: number,
    transition?: string,
) {
    if (!element) {
        return
    }
    if (transition !== undefined) {
        element.style.transition = transition
    }
    element.style.opacity = String(opacity)
    element.style.transform = offset === 0 ? 'none' : `translateY(${offset}px)`
}

type Props = {
    /** The content to be collapsed */
    children: React.ReactNode

    /** The expanded/collapse state of the panel */
    isExpanded: boolean

    /** Callback fired when the expansion animation completes */
    onEntered?: () => void
}

/**
 * Internal wrapper used by `ExpansionPanelContent`. Animates the container's
 * height to reveal/hide the space, while the content cross-fades and springs
 * into place (driven imperatively so the motion still runs when entering from
 * `display: none`).
 */
function AnimatedExpansionPanelContent({ isExpanded, children, onEntered }: Props) {
    const transitionElementRef = React.useRef<HTMLDivElement>(null)
    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)

    const handleEnter = React.useCallback(() => {
        if (!transitionElementRef.current) {
            return
        }

        setElementHeight(transitionElementRef.current, 0)
        setContentMotion(contentRef.current, 0, CONTENT_ENTER_OFFSET, OPEN_TRANSITION)
    }, [])

    const handleEntering = React.useCallback(() => {
        if (!transitionElementRef.current) {
            return
        }

        setElementHeight(transitionElementRef.current, wrapperRef.current?.clientHeight ?? 0)
        setContentMotion(contentRef.current, 1, 0)
    }, [])

    const handleEntered = React.useCallback(() => {
        if (!transitionElementRef.current) {
            return
        }
        setElementHeight(transitionElementRef.current, 'auto')
        onEntered?.()
    }, [onEntered])

    const handleExit = React.useCallback(() => {
        if (!transitionElementRef.current) {
            return
        }
        setElementHeight(transitionElementRef.current, wrapperRef.current?.clientHeight ?? 0)
        setContentMotion(contentRef.current, 1, 0, CLOSE_TRANSITION)
    }, [])

    const handleExiting = React.useCallback(() => {
        if (!transitionElementRef.current) {
            return
        }

        // Reading this property is important, even if we do not consume the value.
        // Without this, the expanded -> collapsed animation will not work.
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        wrapperRef.current?.clientHeight
        setElementHeight(transitionElementRef.current, 0)
        setContentMotion(contentRef.current, 0, 0)
    }, [])

    return (
        <Transition
            nodeRef={transitionElementRef}
            onEntering={handleEntering}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExiting={handleExiting}
            onExit={handleExit}
            timeout={HEIGHT_TRANSITION_DURATION}
            in={isExpanded}
        >
            {(state) => (
                <Box
                    ref={transitionElementRef}
                    overflow="hidden"
                    className={[styles.container, state === 'entered' ? styles.entered : null]}
                    style={state === 'exited' ? { display: 'none' } : undefined}
                >
                    <Box display="flex" ref={wrapperRef}>
                        <Box width="full" ref={contentRef}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            )}
        </Transition>
    )
}

export { AnimatedExpansionPanelContent }
