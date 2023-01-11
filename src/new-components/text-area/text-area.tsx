import * as React from 'react'
import { useMergeRefs } from 'use-callback-ref'
import { BaseField, BaseFieldVariantProps, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './text-area.module.css'

type TextAreaProps = FieldComponentProps<HTMLTextAreaElement> &
    BaseFieldVariantProps & {
        /**
         * The number of visible text lines for the text area.
         *
         * If it is specified, it must be a positive integer or the string `"auto"`. When it's
         * `"auto"`, the textarea will automatically expand or shrink its height to fit the content.
         *
         * If it is not specified, the default value is 2 (set by the browser).
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows
         */
        rows?: number | 'auto'
    }

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    {
        variant = 'default',
        id,
        label,
        secondaryLabel,
        auxiliaryLabel,
        hint,
        message,
        tone,
        maxWidth,
        hidden,
        'aria-describedby': ariaDescribedBy,
        rows,
        ...props
    },
    ref,
) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = useMergeRefs([ref, internalRef])

    React.useEffect(
        function setupAutoGrow() {
            const containerElement = containerRef.current
            function handleInput(event: Event) {
                if (containerElement) {
                    containerElement.dataset.replicatedValue = (event.currentTarget as HTMLTextAreaElement).value
                }
            }

            const textAreaElement = internalRef.current
            if (!textAreaElement || rows !== 'auto') return undefined
            textAreaElement.addEventListener('input', handleInput)
            return () => textAreaElement.removeEventListener('input', handleInput)
        },
        [rows],
    )

    return (
        <BaseField
            variant={variant}
            id={id}
            label={label}
            secondaryLabel={secondaryLabel}
            auxiliaryLabel={auxiliaryLabel}
            hint={hint}
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
        >
            {(extraProps) => (
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
                        rows={rows === 'auto' ? undefined : rows}
                        className={rows === 'auto' ? styles.autoGrow : undefined}
                    />
                </Box>
            )}
        </BaseField>
    )
})

export { TextArea }
export type { TextAreaProps }
