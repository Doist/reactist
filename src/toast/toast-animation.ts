/**
 * Adapted with minor changes from https://github.com/seek-oss/braid-design-system/blob/7a5ebccb/packages/braid-design-system/lib/components/useToast/useFlipList.ts
 *
 * MIT License
 *
 * Copyright (c) 2018 SEEK
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useCallback, useLayoutEffect, useMemo } from 'react'

const ANIMATION_TIMEOUT = 400
const ENTRANCE_TRANSITION = 'transform 0.3s ease, opacity 0.3s ease'
const EXIT_TRANSITION = 'opacity 0.2s ease'

type Transform = {
    property: 'opacity' | 'transform' | 'scale'
    from?: string
    to?: string
}

/**
 * Applies the "from" value of given CSS properties, and also sets a transition CSS property. Then
 * it waits an animation frame before setting the same CSS properties to the target "to" value. This
 * triggers the browser to perform the CSS transition on them.
 *
 * At the end of the animation, it cleans up, unsetting all the CSS properties (including the
 * transition), and calls the "done" callback, if given.
 */
function animate({
    element,
    transforms,
    transition,
    done,
}: {
    element: HTMLElement
    transforms: Transform[]
    transition: string
    done?: () => void
}) {
    const fallbackTimeout = setTimeout(() => {
        done?.()
    }, ANIMATION_TIMEOUT)

    transforms.forEach(({ property, from = '' }) => {
        element.style.setProperty(property, from)
    })
    element.style.setProperty('transition', '')

    function transitionEndHandler(event: TransitionEvent) {
        if (event.target !== element) {
            return
        }
        element.style.setProperty('transition', '')
        done?.()
        element.removeEventListener('transitionend', transitionEndHandler)
        clearTimeout(fallbackTimeout)
    }

    element.addEventListener('transitionend', transitionEndHandler)

    // Call requestAnimationFrame twice to make sure we have a full animation frame at our disposal
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            element.style.setProperty('transition', transition)
            transforms.forEach(({ property, to = '' }) => {
                element.style.setProperty(property, to)
            })
        })
    })
}

type ToastsAnimationToolkit = {
    /**
     * Used for gathering all the active stacked toast elements. Should be used by passing
     * `ref={mappedRef(toastId)}` to the stacked toasts.
     */
    mappedRef: (toastId: string) => (ref: HTMLElement | null) => void

    /**
     * The stacked toasts view should use this callback when it needs to remove a toast, instead of
     * removing it right away. The actual removal from the state (and consequently, from the DOM)
     * should happen in the `onAnimationDone` instead.
     */
    animateRemove: (toastId: string, onAnimationDone: () => void) => void
}

/**
 * Provides the functionality of animating the stacked toasts when they appear and before they
 * disappear.
 *
 * It works by keeping a mapping from toast IDs to the toast elements, and keeping a mapping from
 * toast IDs to their top position. Then, on every single re-render, it compares the new DOM
 * situation with the previously stored one in these mappings. With this information, it applies
 * animations that smoothly transitions between both states.
 */
function useToastsAnimation(): ToastsAnimationToolkit {
    const refs = useMemo(() => new Map<string, HTMLElement | null>(), [])
    const positions = useMemo(() => new Map<string, number>(), [])

    useLayoutEffect(() => {
        const animations: Array<{
            element: HTMLElement
            transforms: Transform[]
            transition: string
        }> = []

        Array.from(refs.entries()).forEach(([id, element]) => {
            if (!element) {
                refs.delete(id)
                return
            }

            const prevTop = positions.get(id)
            const { top, height } = element.getBoundingClientRect()

            if (typeof prevTop === 'number' && prevTop !== top) {
                // Move animation
                animations.push({
                    element,
                    transition: ENTRANCE_TRANSITION,
                    transforms: [{ property: 'transform', from: `translateY(${prevTop - top}px)` }],
                })
            } else if (typeof prevTop !== 'number') {
                // Enter animation
                animations.push({
                    element,
                    transition: ENTRANCE_TRANSITION,
                    transforms: [
                        { property: 'transform', from: `translateY(${height}px)` },
                        { property: 'opacity', from: '0' },
                    ],
                })
            }

            positions.set(id, element.getBoundingClientRect().top)
        })

        animations.forEach(({ element, transforms, transition }) => {
            animate({ element, transforms, transition })
        })
    })

    const animateRemove = useCallback(
        function animateRemove(id: string, onAnimationDone: () => void) {
            const element = refs.get(id)
            if (element) {
                // Removal animation
                animate({
                    element,
                    transforms: [{ property: 'opacity', to: '0' }],
                    transition: EXIT_TRANSITION,
                    done: onAnimationDone,
                })
            }
        },
        [refs],
    )

    const mappedRef = useCallback(
        (id: string) => (ref: HTMLElement | null) => {
            refs.set(id, ref)
        },
        [refs],
    )

    return { mappedRef, animateRemove }
}

export { ANIMATION_TIMEOUT, useToastsAnimation }
