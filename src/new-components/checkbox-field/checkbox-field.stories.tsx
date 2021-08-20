import * as React from 'react'
import { PartialProps } from '../storybook-helper'
import { CheckboxField } from '.'
import { Stack } from '../stack'
import { Text } from '../text'
import { Inline } from '../inline'

export default {
    title: 'Design system/CheckboxField',
    component: CheckboxField,
}

export function InteractivePropsStory({ label, ...props }: PartialProps<typeof CheckboxField>) {
    return <CheckboxField {...props} label={label || 'Default label'} />
}

InteractivePropsStory.argTypes = {
    label: {
        control: { type: 'text' },
        defaultValue: 'Show unread badge',
    },
    disabled: {
        control: { type: 'boolean' },
        defaultValue: false,
    },
    indeterminate: {
        control: false,
    },
}

export function IndeterminateCheckboxStory(props: PartialProps<typeof CheckboxField>) {
    const [state, setState] = React.useState<boolean[]>([false, true, false, false, false])
    const checkedCount = state.filter(Boolean).length
    const indeterminate = checkedCount > 0 && checkedCount < state.length

    return (
        <Stack space="medium" dividers>
            <CheckboxField
                {...props}
                checked={checkedCount === state.length}
                onChange={(event) => {
                    const { checked } = event.currentTarget
                    setState((state) => state.map(() => checked))
                }}
                indeterminate={indeterminate}
                label={`Check/uncheck all (${checkedCount} / ${state.length})`}
            />

            <Inline space="medium">
                {state.map((checked, index) => (
                    <CheckboxField
                        key={`${index}-${String(checked)}`}
                        label={String(index + 1)}
                        checked={checked}
                        onChange={(event) => {
                            const { checked } = event.currentTarget
                            setState((state) => {
                                const newState = [...state]
                                newState[index] = checked
                                return newState
                            })
                        }}
                    />
                ))}
            </Inline>

            <Text tone="secondary">
                Mark some (but not all) numbered checkboxes to see the one at the top as
                indeterminate.
            </Text>
        </Stack>
    )
}

IndeterminateCheckboxStory.argTypes = {
    label: {
        control: false,
    },
    disabled: {
        control: { type: 'boolean' },
        defaultValue: false,
    },
    indeterminate: {
        control: false,
    },
}
