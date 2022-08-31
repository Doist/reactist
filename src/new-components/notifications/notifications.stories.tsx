import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { Box } from '../box'
import { Button } from '../button'
import { Stack } from '../stack'

import { NotificationsProvider, useNotifications } from './notifications'

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
    return (
        <Box padding="large">
            <Stack space="large">
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
            </Stack>
        </Box>
    )
}
