import * as React from 'react'

import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'

import { BaseField } from '../base-field'
import { Box } from '../box'
import { OutlinedControlContainer } from '../control-presentation/outlined-control-container'

import styles from './text-area.module.css'

import type { FieldComponentProps } from '../base-field'

interface TextAreaProps
    extends Omit<FieldComponentProps<HTMLTextAreaElement>, 'characterCountPosition'> {
    /**
     * The value of the text area.
     *
     * If this prop is not specified, the text area will be uncontrolled and the component will
     * manage its own state.
     */
    value?: string

    /**
     * The number of visible text lines for the text area.
     *
     * If it is specified, it must be a positive integer. If it is not specified, the default
     * value is 2 (set by the browser).
     *
     * When `autoExpand` is true, this value serves the purpose of specifying the minimum number
     * of rows that the textarea will shrink to when the content is not large enough to make it
     * expand.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows
     */
    rows?: number

    /**
     * If `true`, the textarea will be automatically resized to fit the content, and the ability to
     * manually resize the textarea will be disabled.
     */
    autoExpand?: boolean

    /**
     * If `true`, the ability to manually resize the textarea will be disabled.
     *
     * When `autoExpand` is true, this property serves no purpose, because the ability to manually
     * resize the textarea is always disabled when `autoExpand` is true.
     */
    disableResize?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    {
        id,
        label,
        value,
        auxiliaryLabel,
        message,
        tone,
        maxWidth,
        maxLength,
        hidden,
        'aria-describedby': ariaDescribedBy,
        rows,
        autoExpand = false,
        disableResize = false,
        onChange: originalOnChange,
        ...props
    },
    ref,
) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = useMergeRefs([ref, internalRef])

    useAutoExpand({ value, autoExpand, containerRef, internalRef })

    const textAreaClassName = classNames([
        autoExpand ? styles.disableResize : null,
        disableResize ? styles.disableResize : null,
    ])

    return (
        <BaseField
            id={id}
            label={label}
            value={value}
            auxiliaryLabel={auxiliaryLabel}
            message={message}
            tone={tone}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
            maxWidth={maxWidth}
            maxLength={maxLength}
        >
            {({
                id: resolvedId,
                'aria-describedby': describedBy,
                'aria-invalid': invalid,
                onChange,
            }) => (
                <OutlinedControlContainer
                    borderRadius="small"
                    exceptionallySetClassName={styles.chrome}
                >
                    <Box
                        width="full"
                        display="flex"
                        className={styles.innerContainer}
                        ref={containerRef}
                    >
                        <textarea
                            {...props}
                            ref={combinedRef}
                            id={resolvedId}
                            rows={rows}
                            value={value}
                            maxLength={maxLength}
                            aria-describedby={describedBy}
                            aria-invalid={invalid}
                            className={textAreaClassName}
                            onChange={(event) => {
                                originalOnChange?.(event)
                                onChange?.(event)
                            }}
                        />
                    </Box>
                </OutlinedControlContainer>
            )}
        </BaseField>
    )
})

function useAutoExpand({
    value,
    autoExpand,
    containerRef,
    internalRef,
}: {
    value: string | undefined
    autoExpand: boolean
    containerRef: React.RefObject<HTMLDivElement>
    internalRef: React.RefObject<HTMLTextAreaElement>
}) {
    const isControlled = value !== undefined

    React.useEffect(
        function setupAutoExpandWhenUncontrolled() {
            const textAreaElement = internalRef.current
            if (!textAreaElement || !autoExpand || isControlled) {
                return undefined
            }

            const containerElement = containerRef.current

            function handleAutoExpand(value: string) {
                if (containerElement) {
                    containerElement.dataset.replicatedValue = value
                }
            }

            function handleInput(event: Event) {
                handleAutoExpand((event.currentTarget as HTMLTextAreaElement).value)
            }

            // Apply change initially, in case the text area has a non-empty initial value
            handleAutoExpand(textAreaElement.value)
            textAreaElement.addEventListener('input', handleInput)
            return () => textAreaElement.removeEventListener('input', handleInput)
        },
        [autoExpand, containerRef, internalRef, isControlled],
    )

    React.useEffect(
        function setupAutoExpandWhenControlled() {
            if (!isControlled || !autoExpand) {
                return
            }

            const containerElement = containerRef.current
            if (containerElement) {
                containerElement.dataset.replicatedValue = value
            }
        },
        [value, containerRef, isControlled, autoExpand],
    )
}

export { TextArea }
export type { TextAreaProps }
