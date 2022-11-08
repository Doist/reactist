import * as React from 'react'
import { action } from '@storybook/addon-actions'

import { Box } from '../../src/new-components/box'
import { Button } from '../../src/new-components/button'
import { Text } from '../../src/new-components/text'
import { TextField } from '../../src/new-components/text-field'
import { Avatar } from '../../src'
import { DeprecatedNotification } from '../../src/components/deprecated-notification'
import './styles/notification_story.less'

// Story setup ================================================================

export default {
    title: 'Components/DeprecatedNotification',
    component: DeprecatedNotification,
    parameters: {
        badges: ['accessible', 'deprecated'],
    },
}

// Story Definitions ==========================================================

export function StandardNotificationStory() {
    return (
        <section className="story">
            <p>Standard Notification</p>
            <DeprecatedNotification
                id="standard-notification"
                icon={<span className="notification-story-notification-dot" />}
                title="You have a new message!"
                subtitle="Click here to view."
                onClose={action('onClose')}
                onClick={action('onClick')}
            />
        </section>
    )
}

export function NonClickableNotificationStory() {
    return (
        <section className="story">
            <p>Non-clickable Notification</p>
            <DeprecatedNotification
                id="non-clickable-notification"
                title="Your task is due in 5 hours"
                subtitle="Keep going!"
                onClose={action('onClose')}
            />
        </section>
    )
}

export function CustomContentNotificationStory() {
    return (
        <section className="story">
            <p>Custom Content Notification</p>
            <DeprecatedNotification
                id="custom-content-notification"
                icon={<Avatar size="s" user={{ name: 'Brock Lesnar', email: 'brock@twist.com' }} />}
                onClose={action('onClose')}
                className="notification-story-notification-container"
            >
                <div className="notification-story-content">
                    <p className="notification-story-text">You received a message from Brock</p>
                    <h4 className="notification-story-heading">Better not leave him hanging</h4>
                </div>
            </DeprecatedNotification>
        </section>
    )
}

export function NotificationPlaygroundStory(args) {
    const onClose = args.onClose ? action('onClose') : undefined
    const onClick = args.onClick ? action('onClick') : undefined
    const icon = args.icon ? (
        <div className="notification-story-avatar-container">
            <Avatar size="s" user={{ name: 'Ada bot', email: 'adabot@twist.com' }} />
        </div>
    ) : null
    const children = args.children ? (
        <div className="notification-story-notification-container">
            <p className="notification-story-text">
                If children is provided, then{' '}
                <strong>it will be rendered instead of the title and subtitle</strong>
            </p>
        </div>
    ) : null

    return (
        <section className="story playground">
            <DeprecatedNotification
                id="playground-notification"
                {...args}
                onClose={onClose}
                onClick={onClick}
                icon={icon}
            >
                {children}
            </DeprecatedNotification>
        </section>
    )
}

export function AccessibilityExample() {
    const [textContent, setTextContent] = React.useState('Test message')
    const [notificationContent, setNotificationContent] = React.useState(textContent)
    const [currentAriaLive, setCurrentAriaLive] = React.useState<'off' | 'polite' | 'assertive'>(
        'assertive',
    )

    function onChangeValue(event: React.FormEvent<HTMLInputElement>) {
        setCurrentAriaLive(
            (event.target as HTMLInputElement).value as 'off' | 'polite' | 'assertive',
        )
    }

    return (
        <section className="story">
            <DeprecatedNotification
                id="notification-off"
                aria-live={currentAriaLive}
                title={notificationContent}
                onClose={action('onClose')}
            />

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="spaceBetween"
                marginTop="xlarge"
            >
                <Box>
                    <Box
                        marginTop="medium"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        onChange={onChangeValue}
                    >
                        <input
                            type="radio"
                            id="off"
                            name="aria-live"
                            value="off"
                            checked={currentAriaLive === 'off'}
                        />
                        <label htmlFor="off">aria-live="off"</label>
                        <input
                            type="radio"
                            id="polite"
                            name="aria-live"
                            value="polite"
                            checked={currentAriaLive === 'polite'}
                        />
                        <label htmlFor="polite">aria-live="polite"</label>
                        <input
                            type="radio"
                            id="assertive"
                            name="aria-live"
                            value="assertive"
                            checked={currentAriaLive === 'assertive'}
                        />
                        <label htmlFor="assertive">aria-live="assertive"</label>
                    </Box>

                    <br />

                    {currentAriaLive === 'off' ? (
                        <Text tone="secondary">
                            Changes will not be announced by a screen reader.
                        </Text>
                    ) : null}
                    {currentAriaLive === 'polite' ? (
                        <Text tone="secondary">
                            Changes will be announced by a screen reader after the current content.
                        </Text>
                    ) : null}

                    {currentAriaLive === 'assertive' ? (
                        <Text tone="secondary">
                            Changes will be announced by a screen reader immediately.
                        </Text>
                    ) : null}
                </Box>

                <Box display="flex" flexDirection="row" alignItems="flexEnd">
                    <TextField
                        label="Content"
                        value={textContent}
                        onChange={(event) => setTextContent(event.currentTarget.value)}
                    />
                    &nbsp;
                    <Button variant="primary" onClick={() => setNotificationContent(textContent)}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </section>
    )
}

NotificationPlaygroundStory.args = {
    title: 'You have a new notification',
    subtitle: 'Click to open',
    closeAltText: 'Close me!',
    icon: true,
    children: false,
    onClose: true,
    onClick: true,
}

NotificationPlaygroundStory.argTypes = {
    icon: {
        control: {
            type: 'boolean',
        },
    },
    onClose: {
        control: {
            type: 'boolean',
        },
    },
    onClick: {
        control: {
            type: 'boolean',
        },
    },
    className: {
        control: {
            type: null,
        },
    },
    customCloseButton: {
        control: {
            type: null,
        },
    },
    id: {
        control: {
            type: null,
        },
    },
}
