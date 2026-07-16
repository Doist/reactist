import * as React from 'react'
import { useEffect, useState } from 'react'

import { Stack } from '../stack'
import { Text } from '../text'

import { CheckboxField } from '.'

function Icon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M6 6.653a1 1 0 011.464-.886l10.246 5.37a1 1 0 01-.002 1.773L7.46 18.24a1 1 0 01-1.461-.887V13l6.96-.674a.328.328 0 000-.652L6 11V6.653z"
            />
        </svg>
    )
}

const Template = ({
    disabled,
    indeterminate,
    label,
    icon,
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
}) => <CheckboxField disabled={disabled} indeterminate={indeterminate} label={label} icon={icon} />

export default {
    title: '📝 Form/CheckboxField',
    component: CheckboxField,

    parameters: {
        badges: ['accessible'],
    },
}

export const BasicExample = {
    render: Template.bind({}),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'Basic Example',

    args: {
        label: 'Default label',
    },
}

export const ImageAsIcon = {
    render: Template.bind({}),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'Image as icon',

    args: {
        label: 'Label with icon',
        icon: '😄',
    },
}

export const ReactElementAsIcon = {
    render: Template.bind({}),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'React element as icon',

    args: {
        label: 'Label with icon',
        icon: <Icon />,
    },
}

export const ReactNodeAsLabel = {
    render: Template.bind({}),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'ReactNode as Label',

    args: {
        label: (
            <>
                Accept our <strong>terms of service</strong>
            </>
        ),
    },
}

function IndeterminateExampleRender() {
    const labels = ['One', 'Two', 'Three', 'Four', 'Five']
    const icons = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']
    const [state, setState] = useState([false, true, false, false, false])
    const checkedCount = state.filter(Boolean).length
    const indeterminate = checkedCount > 0 && checkedCount < state.length

    return (
        <Stack space="medium" dividers="primary">
            <CheckboxField
                checked={checkedCount === state.length}
                onChange={(event) => {
                    const { checked } = event.currentTarget

                    setState((state) => state.map(() => checked))
                }}
                indeterminate={indeterminate}
                label={`Check/uncheck all (${checkedCount} / ${state.length})`}
            />
            <Stack space="medium">
                {state.map((checked, index) => (
                    <CheckboxField
                        key={`${index}-${String(checked)}`}
                        label={labels[index]}
                        icon={icons[index]}
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
            </Stack>
            <Text tone="secondary">
                Mark some (but not all) numbered checkboxes to see the one at the top as
                indeterminate.
            </Text>
        </Stack>
    )
}

export const IndeterminateExample = {
    render: () => <IndeterminateExampleRender />,
    name: 'Indeterminate Example',
    parameters: {
        docs: { source: { type: 'dynamic' } },
        chromatic: { disableSnapshot: false },
    },
}

export const AccessibilityExamples = {
    render: () => (
        <Stack space="medium" dividers="primary">
            <Stack space="medium">
                <CheckboxField aria-label="Golden Retriever" label="aria-label" />
                <Text tone="secondary">
                    A screen reader will announce the checkbox as "Golden Retriever".
                </Text>
            </Stack>
            <Stack space="medium">
                <CheckboxField aria-labelledby="shibainu-text" label="aria-labelledby" />
                <Text id="shibainu-text">Shiba Inu</Text>
                <Text tone="secondary">
                    A screen reader will announce the checkbox as "Shiba Inu".
                </Text>
            </Stack>
            <Stack space="medium">
                <CheckboxField aria-describedby="husky-text" label="aria-describedby" />
                <Text id="husky-text">Husky</Text>
                <Text tone="secondary">A screen reader will describe the checkbox as "Husky".</Text>
            </Stack>
        </Stack>
    ),

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },
    },

    name: 'Accessibility Examples',
}
