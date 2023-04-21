import * as React from 'react'
import { action as storybookAction } from '@storybook/addon-actions'

import { AlertIcon } from '../icons/alert-icon'
import { PasswordVisibleIcon } from '../icons/password-visible-icon'

import { Box } from '../box'
import { Button, ButtonProps } from '../button'
import { CheckboxField } from '../checkbox-field'
import { Heading } from '../heading'
import { Inline } from '../inline'
import { SelectField } from '../select-field'
import { Spinner } from '../spinner'
import { Stack } from '../stack'
import { SwitchField } from '../switch-field'

import { StaticToast, StaticToastProps } from './static-toast'
import { Toast, ToastsProvider, useToasts } from './use-toasts'
import { Text } from '../text'

export default {
    title: 'Design system/Toast',
    parameters: {
        badges: ['accessible'],
        layout: 'fullscreen',
    },
    decorators: [
        (Story: () => JSX.Element) => (
            <ToastsProvider>
                <Story />
            </ToastsProvider>
        ),
    ],
}

const message = [
    'Task was successfully deleted',
    'Message was sent',
    'Someone invited you to collaborate on a project',
    'The project could not be deleted because there are other members collaborating on it',
    'Your invitation could not be sent. Please try again.',
    'There was an error trying to delete the channel. Please, try again.',
    'An unknown error happened. If the issue persist, contact our support team.',
]

const actions = ['Undo', 'Retry', 'Details']

function getRandom<T>(list: Array<T>): T {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return list[Math.floor(Math.random() * list.length)]!
}

export function NotificationToastsStory() {
    const showToast = useToasts()
    const count = React.useRef(0)
    const [actionDismisses, setActionDismisses] = React.useState(false)
    const [showSticky, setShowSticky] = React.useState(false)
    return (
        <Box padding="large">
            <Stack space="xlarge">
                <Heading level={1} size="larger">
                    Toasts
                </Heading>
                <Text>
                    Use the <code>useToast</code> hook to fire notification-like toasts.
                </Text>
                <Box>
                    <Inline space="large">
                        <Button
                            variant="primary"
                            onClick={() =>
                                showToast({ message: `${count.current++}: ${getRandom(message)}` })
                            }
                        >
                            Show toast
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                const actionLabel = getRandom(actions)
                                showToast({
                                    message: `${count.current++}: ${getRandom(message)}`,
                                    action: {
                                        label: actionLabel,
                                        onClick: ({ onDismiss }) => {
                                            onDismiss?.()
                                            storybookAction(actionLabel)
                                        },
                                    },
                                })
                            }}
                        >
                            Show toast with action
                        </Button>
                    </Inline>
                </Box>
                <CheckboxField
                    label="Action dismisses toast?"
                    checked={actionDismisses}
                    onChange={(event) => setActionDismisses(event.target.checked)}
                />
                <SwitchField
                    label="Show sticky toast?"
                    checked={showSticky}
                    onChange={(event) => setShowSticky(event.target.checked)}
                    hint={
                        <>
                            Using the <code>&lt;Toast/&gt;</code> component, you can achieve having
                            a toast that remains in view, and you control when it goes away.
                        </>
                    }
                />
            </Stack>
            {showSticky ? (
                <Toast
                    message="This is a sticky toast"
                    showDismissButton={false}
                    autoDismissDelay={false}
                />
            ) : null}
        </Box>
    )
}

export function StaticToastStory() {
    const [showIcon, setShowIcon] = React.useState(false)
    const [showDismiss, setShowDismiss] = React.useState(false)
    const [actionVariant, setActionVariant] = React.useState<
        ButtonProps['variant'] | 'default' | 'loading' | 'icon-button' | 'none'
    >('none')

    const onClick = storybookAction('Toast action')
    const action: StaticToastProps['action'] =
        actionVariant === 'default' ? (
            { label: 'Accept invitation', onClick }
        ) : actionVariant === 'loading' ? (
            <Spinner size={16} />
        ) : actionVariant === 'icon-button' ? (
            <Button
                variant="quaternary"
                icon={<PasswordVisibleIcon />}
                aria-label="Done"
                size="small"
                onClick={onClick}
            />
        ) : actionVariant !== 'none' ? (
            <Button variant={actionVariant} onClick={onClick}>
                Accept invitation
            </Button>
        ) : undefined

    const commonProps = {
        icon: showIcon ? <AlertIcon tone="info" /> : undefined,
        onDismiss: showDismiss ? () => undefined : undefined,
        action,
    }

    return (
        <Stack space="xlarge" padding="large">
            <Heading level={1} size="larger">
                Statically-rendered toasts
            </Heading>
            <Text>
                Use the <code>StaticToast</code> component to render a toast in custom positions.
            </Text>
            <Box>
                <Inline space="large">
                    <CheckboxField
                        label="Show icon?"
                        checked={showIcon}
                        onChange={(event) => setShowIcon(event.target.checked)}
                    />
                    <CheckboxField
                        label="Show dismiss button?"
                        checked={showDismiss}
                        onChange={(event) => setShowDismiss(event.target.checked)}
                    />
                </Inline>
            </Box>
            <SelectField
                label="Action button variant"
                value={actionVariant}
                onChange={(event) => {
                    // @ts-expect-error
                    setActionVariant(event.target.value)
                }}
                maxWidth="xsmall"
            >
                <option value="none">none</option>
                <option value="default">default</option>
                <optgroup label="Custom button">
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="tertiary">tertiary</option>
                    <option value="quaternary">quaternary</option>
                </optgroup>
                <optgroup label="Custom element">
                    <option value="icon-button">icon-button</option>
                    <option value="loading">loading</option>
                </optgroup>
            </SelectField>

            <Stack space="medium">
                <Heading level="2">Message only</Heading>
                <StaticToast
                    message="Someone invited you to collaborate on a project"
                    {...commonProps}
                />
            </Stack>

            <Stack space="medium">
                <Heading level="2">Message and description</Heading>
                <StaticToast
                    message="Someone invited you to collaborate on a project"
                    description="You need to accept the invitation in order to collaborate."
                    {...commonProps}
                />
            </Stack>

            <Stack space="medium">
                <Heading level="2">Very long content</Heading>
                <StaticToast
                    message="The project you were invited to could not be loaded into your workspace at this time"
                    description="Please, try to access the project again in a few minutes. If the problem persists, contact our support team"
                    {...commonProps}
                />
            </Stack>
        </Stack>
    )
}

StaticToastStory.parameters = {
    chromatic: { disableSnapshot: false },
}
