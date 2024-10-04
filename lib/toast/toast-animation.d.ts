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
declare const ANIMATION_TIMEOUT = 400;
type ToastsAnimationToolkit = {
    /**
     * Used for gathering all the active stacked toast elements. Should be used by passing
     * `ref={mappedRef(toastId)}` to the stacked toasts.
     */
    mappedRef: (toastId: string) => (ref: HTMLElement | null) => void;
    /**
     * The stacked toasts view should use this callback when it needs to remove a toast, instead of
     * removing it right away. The actual removal from the state (and consequently, from the DOM)
     * should happen in the `onAnimationDone` instead.
     */
    animateRemove: (toastId: string, onAnimationDone: () => void) => void;
};
/**
 * Provides the functionality of animating the stacked toasts when they appear and before they
 * disappear.
 *
 * It works by keeping a mapping from toast IDs to the toast elements, and keeping a mapping from
 * toast IDs to their top position. Then, on every single re-render, it compares the new DOM
 * situation with the previously stored one in these mappings. With this information, it applies
 * animations that smoothly transitions between both states.
 */
declare function useToastsAnimation(): ToastsAnimationToolkit;
export { ANIMATION_TIMEOUT, useToastsAnimation };
