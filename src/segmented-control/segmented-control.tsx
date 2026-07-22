import * as React from 'react'

import { Radio, RadioGroup, useRadioStore } from '@ariakit/react'
import classNames from 'classnames'

import { Box } from '../box'

import styles from './segmented-control.module.css'

import type { RadioStoreProps } from '@ariakit/react'
import type { BoxJustifyContent } from '../box'

type AriaLabelProps =
    | {
          /** The accessible label for the segmented control. */
          'aria-label': string
          'aria-labelledby'?: never
      }
    | {
          'aria-label'?: never
          /** One or more element IDs that label the segmented control. */
          'aria-labelledby': string
      }

type AriaDescriptionProps =
    | {
          /** An accessible description for the segmented control. */
          'aria-description'?: string
          'aria-describedby'?: never
      }
    | {
          'aria-description'?: never
          /** One or more element IDs that describe the segmented control. */
          'aria-describedby'?: string
      }

type SegmentedControlOption<TOptionId extends string = string> = {
    /** A unique value for the option. */
    id: TOptionId

    /** An optional icon displayed above the label. */
    icon?: React.ReactNode

    /** The visible label for the option. */
    label: React.ReactNode

    /** An optional component that wraps the option content, such as a tooltip. */
    Wrapper?: React.ComponentType<{ children: React.ReactNode }>

    /** Whether the option is unavailable. */
    disabled?: boolean
}

type ControlledSelectionProps<TOptionId extends string> = {
    /** The currently selected option. */
    selectedOptionId: TOptionId
    initialSelectedOptionId?: never
}

type UncontrolledSelectionProps<TOptionId extends string> = {
    selectedOptionId?: never
    /** The initially selected option. */
    initialSelectedOptionId: TOptionId
}

type SegmentedControlProps<TOptionId extends string = string> = AriaLabelProps &
    AriaDescriptionProps &
    (ControlledSelectionProps<TOptionId> | UncontrolledSelectionProps<TOptionId>) & {
        /** The options displayed by the segmented control. */
        options: ReadonlyArray<SegmentedControlOption<TOptionId>>

        /** Called with the newly selected option value. */
        onSelectedOptionChange?: (id: TOptionId) => void

        /** How wide the segmented control should be. */
        width?: 'maxContent' | 'full'

        /** How to align a content-width segmented control within its container. */
        align?: 'start' | 'center' | 'end'
    }

type SegmentedControlRadioOption<TOptionId extends string = string> =
    SegmentedControlOption<TOptionId>
type SegmentedControlRadioProps<TOptionId extends string = string> =
    SegmentedControlProps<TOptionId>

function SegmentedControlRadioInner<TOptionId extends string = string>(
    {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-description': ariaDescription,
        'aria-describedby': ariaDescribedBy,
        selectedOptionId,
        initialSelectedOptionId,
        options,
        onSelectedOptionChange,
        width = 'maxContent',
        align = 'start',
    }: SegmentedControlProps<TOptionId>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    function handleValueChange(value: RadioStoreProps['value']) {
        if (typeof value === 'string') {
            onSelectedOptionChange?.(value as TOptionId)
        }
    }

    const store = useRadioStore({
        defaultValue: initialSelectedOptionId,
        value: selectedOptionId,
        setValue: onSelectedOptionChange ? handleValueChange : undefined,
    })

    const justifyContentAlignMap: Record<typeof align, BoxJustifyContent> = {
        start: 'flexStart',
        center: 'center',
        end: 'flexEnd',
    }

    return (
        <Box
            display="flex"
            justifyContent={width === 'full' ? 'center' : justifyContentAlignMap[align]}
        >
            <RadioGroup
                ref={ref}
                store={store}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-description={ariaDescription}
                aria-describedby={ariaDescribedBy}
                render={
                    <Box
                        display="flex"
                        width={width}
                        className={classNames(
                            styles.list,
                            styles['list-neutral'],
                            width === 'full' ? styles.full : null,
                        )}
                    />
                }
            >
                {options.map(({ id, icon, label, Wrapper, disabled }) => {
                    const OptionWrapper = Wrapper ?? React.Fragment

                    return (
                        <Radio
                            key={id}
                            store={store}
                            value={id}
                            disabled={disabled}
                            render={(radioProps) => (
                                <label
                                    className={classNames(
                                        styles.item,
                                        styles['item-neutral'],
                                        styles['radio-item'],
                                        icon !== undefined ? styles['item-with-icon'] : null,
                                    )}
                                >
                                    <input {...radioProps} />
                                    <OptionWrapper>
                                        <span className={styles['item-content']}>
                                            {icon}
                                            {label}
                                        </span>
                                    </OptionWrapper>
                                </label>
                            )}
                        />
                    )
                })}
            </RadioGroup>
        </Box>
    )
}

const SegmentedControlRadio = React.forwardRef(SegmentedControlRadioInner) as <
    TOptionId extends string = string,
>(
    props: SegmentedControlProps<TOptionId> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement

/**
 * @deprecated Use `SegmentedControlRadio`. This alias is retained so consumers of the initial
 * Reactist port can migrate without a breaking change.
 */
const SegmentedControl = SegmentedControlRadio

export { SegmentedControl, SegmentedControlRadio }
export type {
    AriaDescriptionProps,
    AriaLabelProps,
    SegmentedControlOption,
    SegmentedControlProps,
    SegmentedControlRadioOption,
    SegmentedControlRadioProps,
}
