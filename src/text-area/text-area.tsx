import * as React from 'react'
import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'
import { BaseField, BaseFieldVariantProps, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

interface TextAreaProps
    extends Omit<FieldComponentProps<HTMLTextAreaElement>, 'characterCountPosition'>,
        Omit<
            BaseFieldVariantProps,
            'supportsStartAndEndSlots' | 'endSlot' | 'endSlotPosition' | 'value'
        > {
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
        variant = 'default',
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
            variant={variant}
            id={id}
            label={label}
            value={value}
            auxiliaryLabel={auxiliaryLabel}
            message={message}
            tone={tone}
            hidden={hidden}
            aria-describedby={ariaDescribedBy}
            className={[
                styles.textAreaContainer,
                tone === 'error' ? styles.error : null,
                variant === 'bordered' ? styles.bordered : null,
            ]}
            maxWidth={maxWidth}
            maxLength={maxLength}
        >
            {({ onChange, ...extraProps }) => (
                <Box
                    width="full"
                    display="flex"
                    className={styles.innerContainer}
                    ref={containerRef}
                >
                    <textarea
                        {...props}
                        {...extraProps}
                        ref={combinedRef}
                        rows={rows}
                        className={textAreaClassName}
                        maxLength={maxLength}
                        onChange={(event) => {
                            originalOnChange?.(event)
                            onChange?.(event)
                        }}
                    />
                </Box>
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
