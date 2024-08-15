import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { Portal } from '@ariakit/react'

import { generateElementId } from '../utils/common-helpers'
import { Box } from '../box'
import { Stack } from '../stack'
import { isActionObject, StaticToast, type StaticToastProps } from './static-toast'

import styles from './toast.module.css'

import type { Space } from '../utils/common-types'
import { useToastsAnimation } from './toast-animation'

/**
 * The props needed to fire up a new notification toast.
 */
type ToastProps = StaticToastProps & {
    /**
     * The number of seconds the toast is expected to be shown before it is dismissed automatically,
     * or false to disable auto-dismiss.
     *
     * It defaults to whatever is the autoDismissDelay set in the ToastsProvider.
     */
    autoDismissDelay?: number | false

    /**
     * The label for the button that dismisses the toast.
     *
     * It defaults to the value set in the ToastsProvider, but individual toasts can have a
     * different value if needed.
     */
    dismissLabel?: string

    /**
     * Whether to show the dismiss button or not.
     *
     * Use this value with care. If combined with disabling `autoDismissDelay`, it may leave you
     * with toasts that the user won't be able to dismiss at will. It then is your responsibility to
     * dismiss the toast by calling the function returned by `showToast`.
     */
    showDismissButton?: boolean
}

//
// InternalToast component and its props
//

type InternalToastProps = Omit<ToastProps, 'autoDismissDelay' | 'dismissLabel'> &
    Required<Pick<ToastProps, 'autoDismissDelay' | 'dismissLabel'>> & {
        toastId: string
        onRemoveToast: (toastId: string) => void
    }

/** @private */
const InternalToast = forwardRef<HTMLDivElement, InternalToastProps>(function InternalToast(
    {
        message,
        description,
        icon,
        action,
        autoDismissDelay,
        dismissLabel,
        showDismissButton = true,
        toastId,
        onDismiss,
        onRemoveToast,
    },
    ref,
) {
    const [timeoutRunning, setTimeoutRunning] = useState(Boolean(autoDismissDelay))
    const timeoutRef = useRef<number | undefined>()

    const startTimeout = useCallback(function startTimeout() {
        setTimeoutRunning(true)
    }, [])

    const stopTimeout = useCallback(function stopTimeout() {
        setTimeoutRunning(false)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
    }, [])

    const removeToast = useCallback(
        function removeToast() {
            onRemoveToast(toastId)
            onDismiss?.()
        },
        [onDismiss, onRemoveToast, toastId],
    )

    useEffect(
        function setupAutoDismiss() {
            if (!timeoutRunning || !autoDismissDelay) return
            timeoutRef.current = window.setTimeout(removeToast, autoDismissDelay * 1000)
            return stopTimeout
        },
        [autoDismissDelay, removeToast, stopTimeout, timeoutRunning],
    )

    /**
     * If the action is toast action object and not a custom element,
     * the `onClick` property is wrapped in another handler responsible
     * for removing the toast when the action is triggered.
     */
    const actionWithCustomActionHandler = useMemo(() => {
        if (!isActionObject(action)) {
            return action
        }

        return {
            ...action,
            onClick: function handleActionClick() {
                if (!action) {
                    return
                }

                action.onClick()
                removeToast()
            },
        }
    }, [action, removeToast])

    return (
        <StaticToast
            ref={ref}
            message={message}
            description={description}
            icon={icon}
            action={actionWithCustomActionHandler}
            onDismiss={showDismissButton ? removeToast : undefined}
            dismissLabel={dismissLabel}
            // @ts-expect-error
            onMouseEnter={stopTimeout}
            onMouseLeave={startTimeout}
        />
    )
})

//
// Internal state and context
//

type InternalToastEntry = Omit<InternalToastProps, 'onRemoveToast'>
type ToastsList = readonly InternalToastEntry[]

type ShowToastAction = (props: ToastProps) => () => void
const ToastsContext = createContext<ShowToastAction>(() => () => undefined)

/**
 * The props needed by the ToastsProvider component.
 *
 * @see ToastsProvider
 */
type ToastsProviderProps = {
    /**
     * The default label to apply to toast dismiss buttons.
     *
     * This is useful in environments that need locatization, so you do not need to pass the same
     * translated label every time you trigger a toast.
     *
     * However, you can still apply a different label to a specific toast, by passing a different
     * value when calling showToast.
     *
     * @default 'Close'
     */
    defaultDismissLabel?: string

    /**
     * The default number of seconds after which the toast will be dismissed automatically.
     *
     * You can pass a different value to a specific toast when calling `showToast`. You can even
     * pass `false` if you want a certain toast to never be dismissed automatically.
     *
     * @default 10 (seconds)
     */
    defaultAutoDismissDelay?: number

    /**
     * The padding used to separate the toasts from the viewport borders.
     *
     * @default 'large'
     */
    padding?: Space

    /**
     * The app wrapped by the provider.
     */
    children: NonNullable<React.ReactNode>

    /**
     * Custom classname for the toasts container, if you need to fine-tune the position or other styles
     */
    containerClassName?: string
}

/**
 * Provides the state management and rendering of the toasts currently active.
 *
 * You need to render this near the top of your app components tree, in order to `useToasts`.
 *
 * @see useToasts
 */
function ToastsProvider({
    children,
    padding = 'large',
    defaultAutoDismissDelay = 10 /* seconds */,
    defaultDismissLabel = 'Close',
    containerClassName,
}: ToastsProviderProps) {
    const [toasts, setToasts] = useState<ToastsList>([])
    const { mappedRef, animateRemove } = useToastsAnimation()

    const removeToast = useCallback(
        function onRemoveToast(toastId: string) {
            animateRemove(toastId, () => {
                setToasts((list) => {
                    const index = list.findIndex((n) => n.toastId === toastId)
                    if (index < 0) return list
                    const copy = [...list]
                    copy.splice(index, 1)
                    return copy
                })
            })
        },
        [animateRemove],
    )

    const showToast = useCallback(
        function showToast(props: ToastProps) {
            const toastId = generateElementId('toast')
            const newToast: InternalToastEntry = {
                autoDismissDelay: defaultAutoDismissDelay,
                dismissLabel: defaultDismissLabel,
                ...props,
                toastId,
            }
            setToasts((list) => [...list, newToast])
            return () => removeToast(toastId)
        },
        [defaultAutoDismissDelay, defaultDismissLabel, removeToast],
    )

    return (
        <ToastsContext.Provider value={showToast}>
            {children}
            <Portal>
                {toasts.length === 0 ? null : (
                    <Box
                        className={[styles.stackedToastsView, containerClassName]}
                        position="fixed"
                        width="full"
                        paddingX={padding}
                        paddingBottom={padding}
                        data-testid="toasts-container"
                    >
                        <Stack space="medium">
                            {toasts.map(({ toastId, ...props }) => (
                                <InternalToast
                                    key={toastId}
                                    ref={mappedRef(toastId)}
                                    toastId={toastId}
                                    onRemoveToast={removeToast}
                                    {...props}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}
            </Portal>
        </ToastsContext.Provider>
    )
}

/**
 * Provides a function `showToast` that shows a new toast every time you call it.
 *
 * ```jsx
 * const showToast = useToasts()
 *
 * <button onClick={() => showToast({ message: 'Hello' })}>
 *   Say hello
 * </button>
 * ```
 *
 * All toasts fired via this function are rendered in a global fixed location, and stacked one on
 * top of the other.
 *
 * When called, `showToast` returns a function that dismisses the toast when called.
 *
 * @see ToastsProvider
 */
function useToasts() {
    return useContext(ToastsContext)
}

/**
 * Adds a toast to be rendered, stacked alongside any other currently active toasts.
 *
 * For most situations, you should prefer to use the `showToast` function obtained from `useToasts`.
 * This component is provided for convenience to render toasts in the markup, but it has some
 * peculiarities, which are discussed below.
 *
 * Internally, this calls `showToast`. It is provided for two reasons:
 *
 * 1. Convenience, when you want to fire a toast in markup/jsx code. Keep in mind, though, that
 *    toasts rendered in this way will be removed from view when the context where it is rendered
 *    is unmounted. Unlike toasts fired with `showToast`, which will normally be dismissed, either
 *    by the user or after a delay. They'll still be animated on their way out, though.
 * 2. When combined with disabling dismissing it (e.g. `showDismissButton={false}` and
 *    `autoDismissDelay={false}` it provides a way to show "permanent" toasts that only go away when
 *    the component ceases to be rendered).
 *
 * This is useful for cases when the consumer wants to control when a toast is visible, and to keep
 * it visible based on an app-specific condition.
 *
 * Something important to note about this component is that it triggers the toast based on the props
 * passed when first rendered, and it does not update the toast if these props change on subsequent
 * renders. In this sense, this is an imperative component, more than a descriptive one. This is
 * done to simplify the internals, and to keep it in line with how `showToast` works: you fire up a
 * toast imperatively, and you loose control over it. It remains rendered according to the props you
 * first passed.
 *
 * @see useToasts
 */
function Toast(props: ToastProps) {
    const showToast = useToasts()
    const propsRef = useRef<ToastProps>(props)
    useEffect(() => {
        const dismissToast = showToast(propsRef.current)
        return dismissToast
    }, [showToast])
    return null
}

export { Toast, ToastsProvider, useToasts }
export type { ToastProps, ToastsProviderProps }
