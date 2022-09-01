import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { Box } from '../box'
import { Button } from '../button'
import { Stack } from '../stack'
import { SwitchField } from '../switch-field'

import { Notification, NotificationsProvider, useNotifications } from './notifications'

export default {
    title: 'Design system/Notifications',
    parameters: {
        badges: ['accessible'],
        layout: 'fullscreen',
    },
    decorators: [
        (Story: () => JSX.Element) => (
            <NotificationsProvider>
                <Story />
            </NotificationsProvider>
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

export function NotificationsStory() {
    const showNotification = useNotifications()
    const count = React.useRef(0)
    const [showSticky, setShowSticky] = React.useState(false)
    return (
        <Box padding="large">
            <Stack space="xxlarge">
                <Button
                    variant="primary"
                    onClick={() =>
                        showNotification({ message: `${count.current++}: ${getRandom(message)}` })
                    }
                >
                    Show notification
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        const actionLabel = getRandom(actions)
                        showNotification({
                            message: `${count.current++}: ${getRandom(message)}`,
                            action: {
                                label: actionLabel,
                                onClick: action(actionLabel),
                            },
                        })
                    }}
                >
                    Show notification with action
                </Button>
                <SwitchField
                    label="Show sticky notification?"
                    checked={showSticky}
                    onChange={(event) => setShowSticky(event.target.checked)}
                    hint={
                        <>
                            Using the <code>&lt;Notification/&gt;</code> component, you can achieve
                            having a notification that remains in view, and you control when it goes
                            away.
                        </>
                    }
                />
            </Stack>
            {showSticky ? (
                <Notification
                    message="This is a sticky notification"
                    showDismissButton={false}
                    autoDismissDelay={false}
                />
            ) : null}
        </Box>
    )
}
