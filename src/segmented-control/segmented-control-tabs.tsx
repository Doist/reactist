import * as React from 'react'

import { Box } from '../box'
import { Stack } from '../stack'
import { Tab, TabList, TabPanel, Tabs } from '../tabs'

import styles from './segmented-control.module.css'

import type { StackProps } from '../stack'
import type { AriaLabelProps } from './segmented-control'

type SegmentedControlTabsOption<TOptionId extends string = string> = {
    /** A unique value for the option. */
    id: TOptionId

    /** The visible label for the option, including optional inline icon content. */
    label: React.ReactNode

    /** Optional secondary text, such as a count or status. */
    extraLabel?: string

    /** Optional content displayed after the labels, such as an upgrade icon. */
    extraIcon?: React.ReactNode
} & (
    | {
          /** An element used to render the tab, such as a router link. */
          tabRender?: React.ReactElement
          Wrapper?: never
      }
    | {
          tabRender?: never

          /** A component that wraps the tab content, such as a tooltip. */
          Wrapper?: React.ComponentType<{ children: React.ReactNode }>
      }
) & {
        /** The panel content associated with the option. */
        tabContent: React.ReactNode

        /** Controls when the panel content is mounted. */
        renderMode?: 'always' | 'active' | 'lazy'

        /** Whether the option is unavailable. */
        disabled?: boolean
    }

type ControlledTabsSelectionProps<TOptionId extends string> = {
    /** The currently selected option. */
    selectedOptionId: TOptionId
    initialSelectedOptionId?: never
}

type UncontrolledTabsSelectionProps<TOptionId extends string> = {
    selectedOptionId?: never
    /** The initially selected option. */
    initialSelectedOptionId: TOptionId
}

type SegmentedControlTabsProps<TOptionId extends string = string> = AriaLabelProps &
    (ControlledTabsSelectionProps<TOptionId> | UncontrolledTabsSelectionProps<TOptionId>) & {
        /** The options and corresponding panels displayed by the tab control. */
        options: ReadonlyArray<SegmentedControlTabsOption<TOptionId>>

        /** Called with the newly selected option value. */
        onSelectedOptionChange?: (id: TOptionId) => void

        /** How wide the segmented control should be. */
        width?: 'maxContent' | 'full'

        /** How to align a content-width segmented control within its container. */
        align?: 'start' | 'center' | 'end'

        /** Space between the tab list and its panels. */
        contentOffset?: StackProps['space']

        /** Determines the visual treatment of the tabs. */
        variant?: 'neutral' | 'themed'
    }

function SegmentedControlTabs<TOptionId extends string = string>({
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    selectedOptionId,
    initialSelectedOptionId,
    options,
    onSelectedOptionChange,
    width,
    align,
    contentOffset,
    variant,
}: SegmentedControlTabsProps<TOptionId>) {
    function handleSelectedIdChange(selectedId: string | null | undefined) {
        if (typeof selectedId === 'string') {
            onSelectedOptionChange?.(selectedId as TOptionId)
        }
    }

    const selectionProps =
        selectedOptionId !== undefined
            ? { selectedId: selectedOptionId }
            : { defaultSelectedId: initialSelectedOptionId }
    const labelProps =
        ariaLabel !== undefined
            ? { 'aria-label': ariaLabel }
            : { 'aria-labelledby': ariaLabelledBy }

    return (
        <Tabs
            {...selectionProps}
            variant={variant}
            onSelectedIdChange={
                onSelectedOptionChange === undefined ? undefined : handleSelectedIdChange
            }
        >
            <Stack space={contentOffset} flexGrow={1}>
                <TabList {...labelProps} width={width} align={align}>
                    {options.map(
                        ({
                            id,
                            label,
                            extraLabel,
                            extraIcon,
                            tabRender,
                            Wrapper = React.Fragment,
                            disabled,
                        }) => (
                            <Tab key={id} id={id} render={tabRender} disabled={disabled}>
                                <Wrapper>
                                    <Box
                                        className={styles['tab-item-content']}
                                        height="full"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap="xsmall"
                                    >
                                        {label}
                                        {extraLabel ? (
                                            <span className={styles['tab-item-extra-label']}>
                                                {extraLabel}
                                            </span>
                                        ) : null}
                                        {extraIcon}
                                    </Box>
                                </Wrapper>
                            </Tab>
                        ),
                    )}
                </TabList>
                {options.map(({ id, tabContent, renderMode }) => (
                    <TabPanel key={id} id={id} renderMode={renderMode} className={styles.panel}>
                        {tabContent}
                    </TabPanel>
                ))}
            </Stack>
        </Tabs>
    )
}

export { SegmentedControlTabs }
export type { SegmentedControlTabsOption, SegmentedControlTabsProps }
