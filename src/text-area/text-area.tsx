import * as React from 'react'
import classNames from 'classnames'
import { useMergeRefs } from 'use-callback-ref'
import { BaseField, BaseFieldVariantProps, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

interface TextAreaProps
    extends FieldComponentProps<HTMLTextAreaElement>,
        Omit<BaseFieldVariantProps, 'supportsStartAndEndSlots' | 'endSlot' | 'endSlotPosition'> {
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

    const textAreaClassName = classNames([
        autoExpand ? styles.disableResize : null,
        disableResize ? styles.disableResize : null,
    ])

    React.useEffect(
        function setupAutoExpand() {
            const containerElement = containerRef.current

            function handleAutoExpand(value: string) {
                if (containerElement) {
                    containerElement.dataset.replicatedValue = value
                }
            }

            function handleInput(event: Event) {
                handleAutoExpand((event.currentTarget as HTMLTextAreaElement).value)
            }

            const textAreaElement = internalRef.current
            if (!textAreaElement || !autoExpand) {
                return undefined
            }

            // Apply change initially, in case the text area has a non-empty initial value
            handleAutoExpand(textAreaElement.value)

            textAreaElement.addEventListener('input', handleInput)
            return () => textAreaElement.removeEventListener('input', handleInput)
        },
        [autoExpand],
    )

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

export { TextArea }
export type { TextAreaProps }
