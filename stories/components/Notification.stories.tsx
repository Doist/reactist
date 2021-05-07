import React from 'react'
import { action } from '@storybook/addon-actions'

import Avatar from '../../src/components/avatar'
import Tip from '../../src/components/tip'
import { Notification } from '../../src/components/notification/notification'
import './styles/notification_story.less'

// Story setup ================================================================

export default {
    title: 'Notification',
    component: Notification,
}

// Story Definitions ==========================================================

export const StandardNotificationStory = () => {
    return (
        <section className="story">
            <p>Standard Notification</p>
            <Notification
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

export const NonClickableNotificationStory = () => {
    return (
        <section className="story">
            <p>Non-clickable Notification</p>
            <Notification
                id="non-clickable-notification"
                title="Your task is due in 5 hours"
                subtitle="Keep going!"
                onClose={action('onClose')}
            />
        </section>
    )
}

export const CustomContentNotificationStory = () => {
    return (
        <section className="story">
            <p>Custom Content Notification</p>
            <Notification
                id="custom-content-notification"
                icon={<Avatar size="s" user={{ name: 'Brock Lesnar', email: 'brock@twist.com' }} />}
                onClose={action('onClose')}
                className="notification-story-notification-container"
            >
                <div className="notification-story-content">
                    <p className="notification-story-text">You received a message from Brock</p>
                    <h4 className="notification-story-heading">
                        Better not leave him hanging
                        <Tip
                            title="Using the notification component"
                            message="Content will be laid out horizontally by default, but you can render any custom content in here, as well as provide your own custom CSS class names."
                        />
                    </h4>
                </div>
            </Notification>
        </section>
    )
}

export const NotificationPlaygroundStory = (args) => {
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
            <Notification
                id="playground-notification"
                {...args}
                onClose={onClose}
                onClick={onClick}
                icon={icon}
            >
                {children}
            </Notification>
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
